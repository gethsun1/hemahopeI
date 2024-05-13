// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

/**
 * @title HemaHope
 * @dev A smart contract to manage charity campaigns and physical item donations on the blockchain.
 */
contract HemaHope {
    address public owner; // The owner of the HemaHope contract
    mapping(address => Campaign) public campaigns; // Mapping to store deployed Campaign contracts
    address[] public campaignAddresses; // Array to store campaign addresses
    mapping(address => uint256) public directDonations; // Mapping to track direct donations

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
     * @param duration The duration of the campaign in days.
     */
    function createPhysicalItemCampaign(string memory name, string memory description, string memory targetItems, uint256 duration) public onlyOwner {
        Campaign newCampaign = new Campaign(name, description, targetItems, msg.sender, duration);
        campaigns[address(newCampaign)] = newCampaign;
        campaignAddresses.push(address(newCampaign)); // Add campaign address to the array
        emit CampaignCreated(address(newCampaign), name);
    }


    /**
     * @dev Fetch all campaign addresses.
     * @return Array of campaign addresses.
     */
    function getAllCampaigns() public view returns (address[] memory) {
        return campaignAddresses;
    }
    

    /**
     * @dev Receive a physical item donation for a specific campaign.
     * @param campaignAddress The address of the campaign contract.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     */
    function receivePhysicalItem(address campaignAddress, address donor, string memory itemDescription) public {
        Campaign campaign = campaigns[campaignAddress];
        require(address(campaign) != address(0), "Campaign not found");
        
        string memory combinedDescription = string(abi.encodePacked("Donor: ", donor, " - Item Description: ", itemDescription));
        campaign.receivePhysicalItem(combinedDescription);
        emit PhysicalItemReceived(campaignAddress, donor, itemDescription);
    }  

         /**
     * @dev Function to donate directly to the charity platform.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     * @param ipfsHash The IPFS hash of the uploaded image.
     */
    function donateToPlatform(address donor, string memory itemDescription, string memory ipfsHash) public {
        require(bytes(itemDescription).length > 0, "Item description must be provided");
        require(bytes(ipfsHash).length > 0, "IPFS hash must be provided");

        directDonations[donor] += 1; // Track direct donations
        emit PhysicalItemReceived(address(this), donor, itemDescription); // Emit event for direct donation
    }


    /**
     * @dev Close a charity campaign.
     * @param campaignAddress The address of the campaign contract to be closed.
     */
    function closeCampaign(address campaignAddress) public onlyOwner {
        Campaign campaign = campaigns[campaignAddress];
        require(address(campaign) != address(0), "Campaign not found");
        
        campaign.closeCampaign();
        emit CampaignClosed(campaignAddress);
    }

    /**
     * @dev Get details of a campaign.
     * @param campaignAddress The address of the campaign contract.
     * @return Details of the campaign.
     */
    function getCampaignDetails(address campaignAddress) public view returns (string memory, string memory, string memory, uint256, bool, uint256, uint256, uint256, uint256) {
        Campaign campaign = campaigns[campaignAddress];
        require(address(campaign) != address(0), "Campaign not found");

        return (
            campaign.getCampaignName(),
            campaign.getCampaignDescription(),
            campaign.getTargetItems(),
            campaign.getDurationInDays(),
            campaign.checkIsActive(),
            campaign.getCreationTimestamp(),
            campaign.getCampaignCount(),
            campaign.getTotalItemsDonated(),
            campaign.totalDonations()
        );
    }
}
