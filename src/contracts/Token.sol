// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Token
 * @dev A standard ERC20 token contract with additional functionalities.
 */
contract Token is ERC20 {   
    address public owner; // Address of the token owner

    /**
     * @dev Constructor to initialize the Token contract.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     * @param initialSupply The initial supply of the token.
     */
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply); // Mint initial supply and assign to the contract deployer
        owner = msg.sender; // Set the owner as the contract deployer
    }

    /**
     * @dev Modifier to restrict access to only the owner of the token.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the token owner can perform this action");
        _;
    }

    /**
     * @dev Function to transfer ownership of the token to a new address.
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address"); // Ensure the new owner address is valid
        owner = newOwner; // Transfer ownership to the new address
    }
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


    /**
     * @dev Function to mint new tokens and assign them to a specified account.
     * @param account The address to which the new tokens will be minted.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount); // Mint new tokens and assign to the specified account
    }
    event TokensMinted(address indexed account, uint256 amount);


    /**
     * @dev Function to burn tokens from a specified account.
     * @param account The address from which tokens will be burned.
     * @param amount The amount of tokens to burn.
     */
    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount); // Burn tokens from the specified account
    }
    event TokensBurned(address indexed account, uint256 amount);

}
