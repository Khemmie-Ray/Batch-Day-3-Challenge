// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Echo} from "../src/Echo.sol";

contract EchoScript is Script {
    Echo public echo;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        echo = new Echo();

        vm.stopBroadcast();
    }
}
