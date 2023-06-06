const { ethers } = require("hardhat");

const larvaDucksAddress = '0x1D8D70AD07C8E7E442AD78E4AC0A16f958Eba7F0';
const claimLarvaDucksAddress = '0xA9e6Bfa2BF53dE88FEb19761D9b2eE2e821bF1Bf';

const claimerAddress = '0x3E5a90F582d45Cf83e0446D53B3069E86162003b';

async function main() {
    const LarvaDucks = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucks.attach(
        larvaDucksAddress // The deployed contract address
    );

    const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    const claimLarvaDucks = await ClaimLarvaDucksContract.attach(
        claimLarvaDucksAddress
    );

    let recipients = [claimerAddress, claimLarvaDucksAddress];
    let amounts = [1, 4];
    // Airdrop
    await larvaDucks.airdrop(recipients, amounts)

    // Add claimable LD
    await claimLarvaDucks.addClaimableLarvaDucks([1, 2, 3, 4]);
    // Allow list LD
    await claimLarvaDucks.addAllowListedCollection(larvaDucksAddress);
    // Open claim
    await claimLarvaDucks.switchClaimOpened();
    // Update Claim
    await claimLarvaDucks.updateClaimPerCollection(3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
