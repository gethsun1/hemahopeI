// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
    uint256 public creationTimestamp; // Timestamp of campaign creation
    uint256 public durationInDays; // Duration of the campaign in days
    uint256 public campaignCount; // Total count of campaigns
    uint256 public totalItemsDonated; // Total count of items donated
    mapping(address => bool) public donors; // Mapping to track donors
    mapping(uint256 => Donation) public donations; // Mapping to store donation details

    // Events to log important actions
    event DonationReceived(address indexed donor, string itemDescription);
    event CampaignClosed();
    event CampaignDetailsUpdated(string name, string description, string targetItems, uint256 durationInDays);

    /**
     * @dev Constructor to initialize the campaign with details.
     * @param _name The name of the campaign.
     * @param _description The description of the campaign.
     * @param _targetItems The target items for the campaign.
     * @param _manager The address of the campaign manager.
     * @param _durationInDays The duration of the campaign in days.
     */
    constructor(string memory _name, string memory _description, string memory _targetItems, address _manager, uint256 _durationInDays) {
        name = _name;
        description = _description;
        targetItems = _targetItems;
        manager = _manager;
        isActive = true;
        creationTimestamp = block.timestamp;
        durationInDays = _durationInDays;
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
        totalItemsDonated++;

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

    /**
     * @dev Get the name of the campaign.
     */
    function getCampaignName() public view returns (string memory) {
        return name;
    }

    /**
     * @dev Get the description of the campaign.
     */
    function getCampaignDescription() public view returns (string memory) {
        return description;
    }

    /**
     * @dev Get the target items for the campaign.
     */
    function getTargetItems() public view returns (string memory) {
        return targetItems;
    }

    /**
     * @dev Get the duration of the campaign in days.
     */
    function getDurationInDays() public view returns (uint256) {
        return durationInDays;
    }

    /**
     * @dev Get the timestamp of campaign creation.
     */
    function getCreationTimestamp() public view returns (uint256) {
        return creationTimestamp;
    }

    /**
     * @dev Get the total count of campaigns.
     */
    function getCampaignCount() public view returns (uint256) {
        return campaignCount;
    }

    /**
     * @dev Get the total count of items donated.
     */
    function getTotalItemsDonated() public view returns (uint256) {
        return totalItemsDonated;
    }

    /**
     * @dev Check if the campaign is active.
     */
    function checkIsActive() public view returns (bool) {
        return isActive;
    }
}
