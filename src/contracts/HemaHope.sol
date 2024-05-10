// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

/**
 * @title HemaHope
 * @dev A smart contract to manage charity campaigns and physical item donations on the blockchain.
 */
contract HemaHope {
    address public owner; // The owner of the HemaHope contract
    Campaign[] public campaigns; // Array to store deployed Campaign contracts
    bool public isActive;

    // Events to log important actions
    event CampaignCreated(address indexed campaignAddress, string name);
    event PhysicalItemReceived(address indexed campaignAddress, address indexed donor, string itemDescription);
    event CampaignClosed(address indexed campaignAddress);

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
     * @dev Create a new physical item donation campaign.
     * @param name The name of the campaign.
     * @param description The description of the campaign.
     * @param targetItems The target items for the campaign.
     */
    function createPhysicalItemCampaign(string memory name, string memory description, string memory targetItems) public onlyOwner {
        Campaign newCampaign = new Campaign(name, description, targetItems, msg.sender);
        campaigns.push(newCampaign);
        emit CampaignCreated(address(newCampaign), name);
    }

    /**
     * @dev Receive a physical item donation for a specific campaign.
     * @param campaignAddress The address of the campaign contract.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     */
    function receivePhysicalItem(address campaignAddress, address donor, string memory itemDescription) public {
        Campaign campaign = Campaign(campaignAddress);
        string memory combinedDescription = string(abi.encodePacked("Donor: ", donor, " - Item Description: ", itemDescription));
        campaign.receivePhysicalItem(combinedDescription);
        emit PhysicalItemReceived(campaignAddress, donor, itemDescription);
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
     * @dev Activate or deactivate the HemaHope platform.
     * @param active Flag to set the platform active or inactive.
     */
    function setActive(bool active) external onlyOwner {
        isActive = active;
    }
}
