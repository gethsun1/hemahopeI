const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Campaign contract with the account:", deployer.address);

  const Campaign = await ethers.getContractFactory("Campaign");
  const campaign = await Campaign.deploy(
    "Test Charity Campaign", 
    "A test campaign for charity donations", 
    "Clothes, Books, Toys", 
    deployer.address // Passing the deployer's address as the campaign manager
  );

  console.log("Campaign contract deployed at:", campaign.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
