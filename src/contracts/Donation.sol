// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HemaHope.sol";

/**
 * @title Donation
 * @dev A smart contract representing donations to charity campaigns.
 */
contract Donation {
    HemaHope public charityPlatform; // Instance of the CharityPlatform contract
    address public owner; // Owner of the Donation contract

    /**
     * @dev Event emitted when a donation is made to a campaign.
     * @param campaignAddress The address of the campaign.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     * @param quantity The quantity of items donated.
     * @param ipfsHash The IPFS hash of the uploaded image.
     */
    event DonationMade(
        address indexed campaignAddress,
        address indexed donor,
        string itemDescription,
        uint256 quantity,
        string ipfsHash
    );

    /**
     * @dev Constructor to initialize the Donation contract with the CharityPlatform instance.
     * @param _charityPlatformAddress The address of the CharityPlatform contract.
     */
    constructor(address _charityPlatformAddress) {
        charityPlatform = HemaHope(_charityPlatformAddress);
        owner = msg.sender; // Set the contract deployer as the owner
    }

    /**
     * @dev Modifier to restrict access to only the owner of the Donation contract.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    /**
     * @dev Function to donate physical items to a specific campaign through the CharityPlatform contract.
     * @param campaignAddress The address of the campaign to donate to.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     * @param quantity The quantity of items donated.
     * @param ipfsHash The IPFS hash of the uploaded image.
     */
    function donatePhysicalItems(
        address campaignAddress,
        address donor,
        string memory itemDescription,
        uint256 quantity,
        string memory ipfsHash
    ) external onlyOwner {
        require(campaignAddress != address(0), "Invalid campaign address");
        require(donor != address(0), "Invalid donor address");
        require(bytes(itemDescription).length > 0, "Item description must be provided");
        require(quantity > 0, "Quantity must be greater than 0");
        require(bytes(ipfsHash).length > 0, "IPFS hash must be provided");

        // Forward the physical item donation to the CharityPlatform contract's receivePhysicalItem function
        for (uint256 i = 0; i < quantity; i++) {
            charityPlatform.receivePhysicalItem(campaignAddress, donor, itemDescription);
        }

        // Emit the DonationMade event with the IPFS hash of the uploaded image
        emit DonationMade(campaignAddress, donor, itemDescription, quantity, ipfsHash);
    }


    /**
    * @dev Function to donate a physical item to a specific campaign or to the charity platform.
    * @param campaignAddress The address of the campaign to donate to (optional, set to 0x0 for direct donation).
    * @param donor The address of the donor.
    * @param itemDescription The description of the donated physical item.
    * @param quantity The quantity of items donated.
    * @param ipfsHash The IPFS hash of the uploaded image.
    */
    function donatePhysicalItem(
        address campaignAddress,
        address donor,
        string memory itemDescription,
        uint256 quantity,
        string memory ipfsHash
    ) external onlyOwner {
        require(donor != address(0), "Invalid donor address");
        require(bytes(itemDescription).length > 0, "Item description must be provided");
        require(quantity > 0, "Quantity must be greater than 0");
        require(bytes(ipfsHash).length > 0, "IPFS hash must be provided");

        if (campaignAddress != address(0)) {
            // Donate to a specific campaign if campaign address is provided
            charityPlatform.receivePhysicalItem(campaignAddress, donor, itemDescription);
        } else {
            // Donate directly to the charity platform
            charityPlatform.donateToPlatform(donor, itemDescription, ipfsHash);
        }

        // Emit the DonationMade event with the quantity parameter included
        emit DonationMade(campaignAddress, donor, itemDescription, quantity, ipfsHash);
    }


    /**
     * @dev Function to update the address of the CharityPlatform contract. Only the owner can perform this action.
     * @param _charityPlatformAddress The new address of the CharityPlatform contract.
     */
    function updateCharityPlatform(address _charityPlatformAddress) external onlyOwner {
        require(_charityPlatformAddress != address(0), "Invalid CharityPlatform address");
        charityPlatform = HemaHope(_charityPlatformAddress);
    }
}
