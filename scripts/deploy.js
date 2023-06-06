const { ethers } = require("hardhat");

async function main() {
  const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
  const larvaDucks = await LarvaDucksContract.deploy();
  await larvaDucks.deployed();
  console.log("LarvaDucks deployed to:", larvaDucks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
