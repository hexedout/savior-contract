pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Savior.sol";

contract SaviorFactory {
    Savior[] public saviors;

    function create(address _target, address _receiver, address _token) public {
        Savior savior = new Savior(_target, _receiver, _token);
        saviors.push(savior);
    }

    function getSaviors() public view returns (Savior[] memory) {
        return saviors;
    }
}
