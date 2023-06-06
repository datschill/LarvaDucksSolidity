const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClaimLarvaDucks - Claim",  function () {
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

    it("Should check if a claim is available", async () => {
        // Is Claim Available
        expect(await claimLarvaDucks.isClaimAvailableForCollection(addr1.address, larvaDucks.address)).to.be.equal(true);
    })

    it("Should get claimable collections", async () => {
        // -> LD Collection
        const claimableCollectionsAddr1 = await claimLarvaDucks.getClaimableCollections(addr1.address);
        expect(claimableCollectionsAddr1).to.have.lengthOf(1);
        expect(claimableCollectionsAddr1).to.include(larvaDucks.address);
        // -> No collections
        const claimableCollectionsAddr2 = await claimLarvaDucks.getClaimableCollections(addr2.address);
        expect(claimableCollectionsAddr2).to.have.lengthOf(0);


        // Allow listed collections
        // expect(await claimLarvaDucks.getAllowListedCollections()).to.be.equal([larvaDucks.address]);
    })

    it("Should toggle claim opened", async () => {
        // Claim closed
        expect(await claimLarvaDucks.claimOpened()).to.be.equal(false);
        await claimLarvaDucks.switchClaimOpened()
        // Claim opened
        expect(await claimLarvaDucks.claimOpened()).to.be.equal(true);
    })

    it("Should add claimable LD", async () => {
        let claimableLD = await claimLarvaDucks.getClaimableLarvaDucks();
        expect(claimableLD).to.have.lengthOf(0);
        // Add claimable LD
        await claimLarvaDucks.addClaimableLarvaDucks([3, 4, 5, 6]);
        claimableLD = await claimLarvaDucks.getClaimableLarvaDucks();
        expect(claimableLD).to.have.lengthOf(4);
    })

    it("Should remove claimable LD", async () => {
        // Add claimable LD
        await claimLarvaDucks.addClaimableLarvaDucks([3, 4, 5, 6]);
        let claimableLD = await claimLarvaDucks.getClaimableLarvaDucks();
        expect(claimableLD).to.have.lengthOf(4);
        // Remove claimable LD
        await claimLarvaDucks.removeClaimableLarvaDucks([4, 5]);
        claimableLD = await claimLarvaDucks.getClaimableLarvaDucks();
        expect(claimableLD).to.have.lengthOf(2);
    })

    it("Should be able to claim LD", async () => {
        await expect(claimLarvaDucks.claimForCollections(addr1.address, [larvaDucks.address])).to.be.revertedWith("Claim is closed");
        // Open claim
        await claimLarvaDucks.switchClaimOpened()
        await expect(claimLarvaDucks.claimForCollections(addr1.address, [larvaDucks.address])).to.be.revertedWith("Not enough LarvaDucks available to claim");
        // Add claimable LD
        await claimLarvaDucks.addClaimableLarvaDucks([3, 4, 5, 6]);
        // Claim
        await expect(claimLarvaDucks.claimForCollections(addr1.address, [larvaDucks.address])).not.to.be.reverted;
        // Correct balance
        expect(await larvaDucks.balanceOf(addr1.address)).to.be.equal(5);
    })
  });