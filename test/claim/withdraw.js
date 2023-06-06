const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClaimLarvaDucks - Withdraw",  function () {
    let larvaDucks;
    let claimLarvaDucks;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    before(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    })

    beforeEach(async function () {
        // Deploy main contract
        const LarvaDuckContract = await ethers.getContractFactory("LarvaDucks");
        larvaDucks = await LarvaDuckContract.deploy();
        await larvaDucks.deployed();
        // console.log("LarvaDucks deployed to:", larvaDucks.address);

        const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
        claimLarvaDucks = await ClaimLarvaDucksContract.deploy(larvaDucks.address);
        await claimLarvaDucks.deployed();
        // console.log("ClaimLarvaDucks deployed to:", claimLarvaDucks.address);

        // Allow list LD
        await claimLarvaDucks.addAllowListedCollection(larvaDucks.address)

        // Airdrop LD to wallet and claim contract
        await larvaDucks.airdrop([addr1.address, claimLarvaDucks.address], [3, 4]);
    });

    it("Should withdraw LD", async () => {
        // Withdraw
        await expect(claimLarvaDucks.withdrawNFTs(addr2.address, [3, 5])).not.to.be.reverted;
        // Correct balance
        expect(await larvaDucks.balanceOf(addr2.address)).to.be.equal(2);
        // Correct balance
        expect(await larvaDucks.balanceOf(claimLarvaDucks.address)).to.be.equal(2);
    })

    it("Should withdraw any collection", async () => {
        // Withdraw
        await expect(claimLarvaDucks.withdrawCollectionNFTs(larvaDucks.address, addr2.address, [5])).not.to.be.reverted;
        // Correct balance
        expect(await larvaDucks.balanceOf(addr2.address)).to.be.equal(1);
        // Correct balance
        expect(await larvaDucks.balanceOf(claimLarvaDucks.address)).to.be.equal(3);
    })
  });