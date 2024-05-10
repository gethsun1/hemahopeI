// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

/**
 * @title Campaign
 * @dev A smart contract representing a charity campaign on the blockchain.
 */
contract Campaign {
    struct Donation {
        address donor;
        uint256 amount;
        string itemType; // Type of donation: "Cash", "Item", "Crypto"
        uint256 tokenId; // For token donations, if applicable
    }

    address public manager; // Address of the campaign manager
    string public name; // Name of the campaign
    string public description; // Description of the campaign
    uint256 public goalAmount; // Fundraising goal amount for the campaign
    uint256 public totalDonations; // Total amount of donations received
    bool public isActive; // Flag indicating whether the campaign is active
    mapping(address => bool) public donors; // Mapping to track donors
    mapping(uint256 => Donation) public donations; // Mapping to store donation details

    // Events to log important actions
    event DonationReceived(address indexed donor, uint256 amount, string itemType, uint256 indexed donationId);
    event CampaignClosed();

    /**
     * @dev Constructor to initialize the campaign with details.
     * @param _name The name of the campaign.
     * @param _description The description of the campaign.
     * @param _goalAmount The fundraising goal amount for the campaign.
     * @param _manager The address of the campaign manager.
     */
    constructor(string memory _name, string memory _description, uint256 _goalAmount, address _manager) {
        name = _name;
        description = _description;
        goalAmount = _goalAmount;
        manager = _manager;
        isActive = true;
    }

    /**
     * @dev Modifier to restrict access to only the campaign manager.
     */
    modifier onlyManager() {
        require(msg.sender == manager, "Only the campaign manager can perform this action");
        _;
    }

    /**
     * @dev Receive a donation for the campaign.
     * @param _itemType The type of donation (e.g., "Cash", "Item", "Crypto").
     * @param _tokenId The token ID for token donations (if applicable).
     */
    function receiveDonation(string memory _itemType, uint256 _tokenId) public payable onlyManager {
        require(isActive, "Campaign is not active");
        require(msg.value > 0 || bytes(_itemType).length > 0, "Donation amount or item type must be provided");

        uint256 donationId = totalDonations;
        Donation memory newDonation = Donation(msg.sender, msg.value, _itemType, _tokenId);
        donations[donationId] = newDonation;
        donors[msg.sender] = true;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value, _itemType, donationId);
    }

    /**
     * @dev Close the campaign.
     */
    function closeCampaign() public onlyManager {
        require(isActive, "Campaign is already closed");
        isActive = false;
        emit CampaignClosed();
    }

    /**
     * @dev Withdraw collected funds from the campaign.
     */
    function withdrawFunds() public onlyManager {
        require(!isActive, "Campaign must be closed to withdraw funds");
        payable(manager).transfer(address(this).balance);
    }

    /**
     * @dev Withdraw tokens from the campaign (if applicable).
     * @param tokenAddress The address of the token contract.
     */
    function withdrawTokens(address tokenAddress) public onlyManager {
        require(!isActive, "Campaign must be closed to withdraw tokens");
        Token tokenContract = Token(tokenAddress);
        uint256 tokenBalance = tokenContract.balanceOf(address(this));
        tokenContract.transfer(manager, tokenBalance);
    }
}
