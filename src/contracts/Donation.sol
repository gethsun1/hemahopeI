// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HemaHope.sol";

/**
 * @title Donation
 * @dev A smart contract representing donations to charity campaigns.
 */
contract Donation {
    HemaHope public charityPlatform; // Instance of the CharityPlatform contract

    /**
     * @dev Event emitted when a donation is made to a campaign.
     * @param campaignAddress The address of the campaign.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     */
    event DonationMade(address indexed campaignAddress, address indexed donor, string itemDescription);

    /**
     * @dev Constructor to initialize the Donation contract with the CharityPlatform instance.
     * @param _charityPlatformAddress The address of the CharityPlatform contract.
     */
    constructor(address _charityPlatformAddress) {
        charityPlatform = HemaHope(_charityPlatformAddress);
    }

    /**
     * @dev Function to donate a physical item to a specific campaign through the CharityPlatform contract.
     * @param campaignAddress The address of the campaign to donate to.
     * @param donor The address of the donor.
     * @param itemDescription The description of the donated physical item.
     */
    function donatePhysicalItem(address campaignAddress, address donor, string memory itemDescription) external {
        // Forward the physical item donation to the CharityPlatform contract's receivePhysicalItem function
        charityPlatform.receivePhysicalItem(campaignAddress, donor, itemDescription);
        emit DonationMade(campaignAddress, donor, itemDescription);
    }
}
