// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("SaviorFactory", {
    from: deployer,
    // args: [],
    log: true,
    waitConfirmations: 5,
  });

  await deploy("SaviorToken", {
    from: deployer,
    // args: [],
    log: true,
    waitConfirmations: 5,
  });
  const SaviorToken = await ethers.getContract("SaviorToken", deployer);

  const tokenAddress = SaviorToken.address;

  await deploy("Savior", {
    from: deployer,
    args: [
        deployer,
        deployer,
        tokenAddress
    ],
    log: true,
    waitConfirmations: 5,
  });


  // Getting a previously deployed contract
//   const Savior = await ethers.getContract("Savior", deployer);
  /* 
    // To take ownership of Savior using the ownable library uncomment next line and add the 
    // address you want to be the owner. 
    
    await Savior.transferOwnership(
      "ADDRESS_HERE"
    );

    //const Savior = await ethers.getContractAt('Savior', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const Savior = await deploy("Savior", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const Savior = await deploy("Savior", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["SaviorToken", "SaviorFactory", "Savior"];
