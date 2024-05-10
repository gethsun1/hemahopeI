// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

/**
 * @title CharityPlatform
 * @dev A smart contract to manage charity campaigns and donations on the blockchain.
 */
contract CharityPlatform {
    address public owner; // The owner of the CharityPlatform contract
    Campaign[] public campaigns; // Array to store deployed Campaign contracts
    mapping(address => uint256) public donations; // Mapping to track donations from addresses

    // Events to log important actions
    event CampaignCreated(address indexed campaignAddress, string name);
    event DonationReceived(address indexed campaignAddress, address indexed donor, uint256 amount);
    event CampaignClosed(address indexed campaignAddress);
    event PhysicalItemReceived(address indexed campaignAddress, address indexed donor, string itemDescription);

    /**
     * @dev Constructor to set the owner of the contract.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Modifier to restrict access to only the owner of the contract.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    /**
     * @dev Create a new charity campaign.
     * @param name The name of the campaign.
     * @param description The description of the campaign.
     * @param goalAmount The fundraising goal amount for the campaign.
     */
    function createCampaign(string memory name, string memory description, uint256 goalAmount) public onlyOwner {
        Campaign newCampaign = new Campaign(name, description, goalAmount, msg.sender);
        campaigns.push(newCampaign);
        emit CampaignCreated(address(newCampaign), name);
    }

    /**
     * @dev Donate to a specific charity campaign.
     * @param campaignAddress The address of the campaign contract.
     * @param amount The donation amount.
     */
    function donate(address campaignAddress, uint256 amount) public payable {
        Campaign campaign = Campaign(campaignAddress);
        string memory itemType = "Cash"; // Default item type for cash donations
        campaign.receiveDonation{value: msg.value}(itemType, 0); // Pass a default value for tokenId (0)
        donations[msg.sender] += amount;
        emit DonationReceived(campaignAddress, msg.sender, amount);
    }

    /**
     * @dev Close a charity campaign.
     * @param campaignAddress The address of the campaign contract to be closed.
     */
    function closeCampaign(address campaignAddress) public onlyOwner {
        Campaign campaign = Campaign(campaignAddress);
        campaign.closeCampaign();
        emit CampaignClosed(campaignAddress);
    }

    /**
     * @dev Withdraw collected donations from the contract.
     * @param amount The amount to be withdrawn.
     */
    function withdrawDonations(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner).transfer(amount);
    }

    /**
     * @dev Receive a physical item donation for a specific campaign.
     * @param campaignAddress The address of the campaign contract.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated item.
     */
    function receivePhysicalItem(address campaignAddress, address donor, string memory itemDescription) public onlyOwner {
        emit PhysicalItemReceived(campaignAddress, donor, itemDescription);
        // You can implement further logic here, such as storing the item in a designated storage area or updating campaign details.
    }
}
