// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SaviorToken is ERC20 {
    constructor() ERC20("SaviorToken", "SAVE") {
        _mint(msg.sender, 10_000 * 10 ** 18);
    }

    function faucet(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
