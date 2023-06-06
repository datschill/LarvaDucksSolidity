const { expect } = require("chai");
const { ethers } = require("hardhat");

const cryptopunks = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
const ogcards = '0x96AaF5008913C3Ae12541f6ea7717c9A0DD74F4d';
const doodles = '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e';
const alpaca = '0x3DB5463A9e2d04334192C6f2DD4B72DeF4751A61';

describe("LarvaDucks - Public Mint",  function () {
    let larvaDucks
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
    });

    it("Should be able to mint", async () => {
        // Open the sale
        await larvaDucks.setSaleOpen(true);
        // Can mint 3
        await expect(larvaDucks.publicMint(owner.address, 3, { value: ethers.utils.parseEther('0.09') })).to.be.not.reverted;
        // Received 3 NFTs
        expect(await larvaDucks.balanceOf(owner.address)).to.be.equal(3);
    })

    it("Shouldn't be able to mint", async () => {
        // Can't mint if the sale is not opened
        await expect(larvaDucks.publicMint(owner.address, 3)).to.be.revertedWith("Sale not open");
        // Open the sale
        await larvaDucks.setSaleOpen(true);
        // Can't mint 0
        await expect(larvaDucks.publicMint(owner.address, 0)).to.be.revertedWith("Should mint at least one");
        // Cant mint more than 5
        await expect(larvaDucks.publicMint(owner.address, 6)).to.be.revertedWith("Too many tokens claimed");
        // Can't mint if not enough ETH are sent
        await expect(larvaDucks.publicMint(owner.address, 3)).to.be.revertedWith("Not enough ETH sent");
    })
  });