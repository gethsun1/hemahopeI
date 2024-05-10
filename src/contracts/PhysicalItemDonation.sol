// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CharityPlatform.sol";

/**
 * @title PhysicalItemDonation
 * @dev A smart contract representing donations of physical items to charity campaigns.
 */
contract PhysicalItemDonation {
    CharityPlatform public charityPlatform; // Instance of the CharityPlatform contract

    /**
     * @dev Event emitted when a physical item donation is made to a campaign.
     * @param campaignAddress The address of the campaign.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated item.
     */
    event PhysicalItemDonated(address indexed campaignAddress, address indexed donor, string itemDescription);

    /**
     * @dev Constructor to initialize the PhysicalItemDonation contract with the CharityPlatform instance.
     * @param _charityPlatformAddress The address of the CharityPlatform contract.
     */
    constructor(address _charityPlatformAddress) {
        charityPlatform = CharityPlatform(_charityPlatformAddress);
    }

    /**
     * @dev Function to donate a physical item to a specific campaign through the CharityPlatform contract.
     * @param campaignAddress The address of the campaign to donate to.
     * @param itemDescription The description of the donated item.
     */
    function donatePhysicalItem(address campaignAddress, string memory itemDescription) external {
        // Forward the physical item donation to the CharityPlatform contract's receivePhysicalItem function
        charityPlatform.receivePhysicalItem(campaignAddress, msg.sender, itemDescription);
        emit PhysicalItemDonated(campaignAddress, msg.sender, itemDescription);
    }
}
