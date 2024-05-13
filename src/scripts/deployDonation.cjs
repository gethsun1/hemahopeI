const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Donation contract with the account:", deployer.address);

  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy(
    "0xFdaf0F4c35D14AEE918672B890bbC2379694019B", // Active address of CharityPlatform contract
  );

  console.log("Donation contract deployed at:", donation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
