import { baseSepolia } from "viem/chains";
import { createPublicClient, numberToHex, http, encodeFunctionData } from "viem";

const joinEcho_Abi = [
      {
    "type": "function",
    "name": "joinEcholist",
    "inputs": [
      { "name": "_username", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]

export const createClient = (rpcUrl:string) => {
    return createPublicClient({
        chain: baseSepolia,
        transport: http(rpcUrl),
})}