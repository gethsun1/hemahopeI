

  async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
    "Deploying contracts with the account:",
    deployer.address
    );

    const HemaHope = await ethers.getContractFactory("HemaHope");
    const contract = await HemaHope.deploy();

    console.log("Contract deployed at:", contract.address);

    const saySomething = await contract.speak();
    
    console.log("saySomething value:", saySomething);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });