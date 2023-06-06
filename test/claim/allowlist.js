const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClaimLarvaDucks - Allow list",  function () {
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
    });

    it("Should allow list a collection", async () => {
        // Allow list collection
        await expect(claimLarvaDucks.addAllowListedCollection(larvaDucks.address)).not.to.be.reverted;
        // LarvaDucks is allow listed
        expect(await claimLarvaDucks.isCollectionAllowListed(larvaDucks.address)).to.be.equal(true);
    })

    it("Should remove allowlisted collection", async () => {
        // Allow list collection
        await expect(claimLarvaDucks.addAllowListedCollection(larvaDucks.address)).not.to.be.reverted;
        // LarvaDucks is allow listed
        expect(await claimLarvaDucks.isCollectionAllowListed(larvaDucks.address)).to.be.equal(true);
        // Remove list collection
        await expect(claimLarvaDucks.removeAllowListedCollection(0)).not.to.be.reverted;
        // LarvaDucks is not allow listed
        expect(await claimLarvaDucks.isCollectionAllowListed(larvaDucks.address)).to.be.equal(false);
    })
  });