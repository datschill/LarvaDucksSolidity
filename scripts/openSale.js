const { ethers } = require("hardhat");

async function main() {
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.attach(
        "0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240" // The deployed contract address
    );

    let isSaleOpen = await larvaDucks.publicSaleOpened();
    console.log('Sale Opened :', isSaleOpen);

    await larvaDucks.setSaleOpen(true);

    // NODE not yet sync
    // isSaleOpen = await larvaDucks.publicSaleOpened();
    // console.log('Sale Opened :', isSaleOpen);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
