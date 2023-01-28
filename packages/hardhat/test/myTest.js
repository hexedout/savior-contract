const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("My Dapp", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("Savior", function () {
    it("Should deploy Savior", async function () {
      const Savior = await ethers.getContractFactory("Savior");

      myContract = await Savior.deploy();
    });
  });
});
