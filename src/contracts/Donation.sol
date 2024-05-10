// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CharityPlatform.sol";

/**
 * @title Donation
 * @dev A smart contract representing donations to charity campaigns.
 */
contract Donation {
    CharityPlatform public charityPlatform; // Instance of the CharityPlatform contract

    /**
     * @dev Event emitted when a donation is made to a campaign.
     * @param campaignAddress The address of the campaign.
     * @param donor The address of the donor.
     * @param amount The donation amount.
     */
    event DonationMade(address indexed campaignAddress, address indexed donor, uint256 amount);

    /**
     * @dev Constructor to initialize the Donation contract with the CharityPlatform instance.
     * @param _charityPlatformAddress The address of the CharityPlatform contract.
     */
    constructor(address _charityPlatformAddress) {
        charityPlatform = CharityPlatform(_charityPlatformAddress);
    }

    /**
     * @dev Function to donate to a specific campaign through the CharityPlatform contract.
     * @param campaignAddress The address of the campaign to donate to.
     * @param amount The donation amount.
     */
    function donateToCampaign(address campaignAddress, uint256 amount) external payable {
        // Forward the donation to the CharityPlatform contract's donate function
        charityPlatform.donate{value: msg.value}(campaignAddress, amount);
        emit DonationMade(campaignAddress, msg.sender, amount);
    }
}
