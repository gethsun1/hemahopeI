// scripts/deploy_charity_platform.ts

import { ethers } from "ethers";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(); // Replace with your provider configuration

  const signer = provider.getSigner(); // Get the default signer from the provider

  console.log("Deploying CharityPlatform contract with the account:", await signer.getAddress());

  const CharityPlatform = await ethers.ContractFactory.fromSolidity("CharityPlatform", signer).deploy();

  console.log("CharityPlatform contract deployed to:", CharityPlatform.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
