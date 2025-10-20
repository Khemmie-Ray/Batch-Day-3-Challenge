"use client"

import { numberToHex, encodeFunctionData } from "viem";
import { baseAccountSdk } from "./walletService";
import { getCryptoKeyAccount, base } from "@base-org/account";

const joinEcho_Abi = [
  {
    type: "function",
    name: "joinEchoList", // ✅ match your actual contract name exactly
    inputs: [{ name: "_username", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export const handleTransaction = async (username: string) => {
  const sdk = baseAccountSdk();
  const provider = sdk?.getProvider() as {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };

  if (!provider) {
    throw new Error("No provider found");
  }

  try {
    // Get the user's account
    const cryptoAccount = await getCryptoKeyAccount();
    const fromAddress = cryptoAccount?.account?.address;

    if (!fromAddress) {
      throw new Error("No account found");
    }

    const paymasterServiceUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    const echoAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    if (!echoAddress) {
      throw new Error("Contract address missing in environment variables");
    }

    // Prepare the transaction
    const calls = [
      {
        to: echoAddress,
        value: "0x0",
        data: encodeFunctionData({
          abi: joinEcho_Abi,
          functionName: "joinEchoList",
          args: [username],
        }),
      },
    ];

    // Send the transaction with Paymaster sponsorship
    const result = await provider.request({
      method: "wallet_sendCalls",
      params: [
        {
          version: "1.0",
          chainId: numberToHex(base.constants.CHAIN_IDS.baseSepolia),
          from: fromAddress,
          calls,
          capabilities: {
            paymasterService: {
              url: paymasterServiceUrl,
            },
          },
        },
      ],
    });

    console.log("Sponsored transaction sent:", result);
    return result;
  } catch (error) {
    console.error("Sponsored transaction failed:", error);
    throw error;
  }
};

export const checkPaymasterSupport = async (): Promise<boolean> => {
  const sdk = baseAccountSdk();
  const provider = sdk?.getProvider() as {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };

  try {
    const cryptoAccount = await getCryptoKeyAccount();
    const address = cryptoAccount?.account?.address;

    if (!address) {
      throw new Error("No account found");
    }

    const capabilities = (await provider.request({
      method: "wallet_getCapabilities",
      params: [address],
    })) as Record<string, any>;

    const baseCapabilities = capabilities[base.constants.CHAIN_IDS.baseSepolia];

    if (baseCapabilities?.paymasterService?.supported) {
      console.log("✅ Paymaster service is supported");
      return true;
    } else {
      console.log("❌ Paymaster service not supported");
      return false;
    }
  } catch (error) {
    console.error("Failed to check paymaster capabilities:", error);
    return false;
  }
};
