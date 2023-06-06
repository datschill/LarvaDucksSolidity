const { ethers } = require("hardhat");

const claimLarvaDucksAddress = '0x2D510657d8e153b3BAAf7fE1cb0bCeE9690DCBD2';

const claimerAddress = '0x3E5a90F582d45Cf83e0446D53B3069E86162003b';

const collectionToAllowlist = '0xeB3a9A839dFeEaf71db1B4eD6a8ae0cCB171b227';

// mappingCollection: {
//     '0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240': 'LarvaDucks',
//     '0x620b70123fB810F6C653DA7644b5dD0b6312e4D8': 'Space Doodles',
//     '0x3DB5463A9e2d04334192C6f2DD4B72DeF4751A61': 'ALPACADABRAZ',
//     '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7': 'Meebits',
//     '0x79FCDEF22feeD20eDDacbB2587640e45491b757f': 'mfers',
//     '0x6080B6D2C02E9a0853495b87Ce6a65e353b74744': 'EightBit Me'
// },

async function main() {
    const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    const claimLarvaDucks = await ClaimLarvaDucksContract.attach(
        claimLarvaDucksAddress
    );

    // Allow list LD
    await claimLarvaDucks.addAllowListedCollection(collectionToAllowlist);
    // // Open claim
    // await claimLarvaDucks.switchClaimOpened();
    // // Update Claim
    // await claimLarvaDucks.updateClaimPerCollection(3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
