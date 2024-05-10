// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Campaign
 * @dev A smart contract representing a charity campaign for physical item donations on the blockchain.
 */
contract Campaign {
    struct Donation {
        address donor;
        string itemDescription; // Description of the donated physical item
    }

    address public manager; // Address of the campaign manager
    string public name; // Name of the campaign
    string public description; // Description of the campaign
    string public targetItems; // Target items for the campaign
    uint256 public totalDonations; // Total number of physical item donations received
    bool public isActive; // Flag indicating whether the campaign is active
    mapping(address => bool) public donors; // Mapping to track donors
    mapping(uint256 => Donation) public donations; // Mapping to store donation details

    // Events to log important actions
    event DonationReceived(address indexed donor, string itemDescription);
    event CampaignClosed();

    /**
     * @dev Constructor to initialize the campaign with details.
     * @param _name The name of the campaign.
     * @param _description The description of the campaign.
     * @param _targetItems The target items for the campaign.
     * @param _manager The address of the campaign manager.
     */
    constructor(string memory _name, string memory _description, string memory _targetItems, address _manager) {
        name = _name;
        description = _description;
        targetItems = _targetItems;
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
     * @dev Receive a physical item donation for the campaign.
     * @param _itemDescription The description of the donated physical item.
     */
    function receivePhysicalItem(string memory _itemDescription) public {
        require(isActive, "Campaign is not active");
        require(bytes(_itemDescription).length > 0, "Item description must be provided");

        uint256 donationId = totalDonations;
        Donation memory newDonation = Donation(msg.sender, _itemDescription);
        donations[donationId] = newDonation;
        donors[msg.sender] = true;
        totalDonations++;

        emit DonationReceived(msg.sender, _itemDescription);
    }

    /**
     * @dev Close the campaign.
     */
    function closeCampaign() public onlyManager {
        require(isActive, "Campaign is already closed");
        isActive = false;
        emit CampaignClosed();
    }
}
