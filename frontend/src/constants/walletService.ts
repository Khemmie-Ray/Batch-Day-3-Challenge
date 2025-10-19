import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";

let sdkInstance: ReturnType<typeof createBaseAccountSDK> | null = null;

export const baseAccountSdk = () => {
  if (!sdkInstance) {
    try {
      sdkInstance = createBaseAccountSDK({
        appName: "Echo",
        appLogoUrl: "https://base.org/logo.png",
        appChainIds: [baseSepolia.id], 
      });
    } catch (err) {
      console.error("Failed to create Base Account SDK:", err);
    }
  }
  return sdkInstance;
};

export const isWalletAvailable = (): boolean => {
  try {
    const sdk = baseAccountSdk();
    const provider = sdk?.getProvider();
    return !!provider;
  } catch (err) {
    console.error("Error checking wallet availability:", err);
    return false;
  }
};

export const connectWallet = async (): Promise<{ address: string }> => {
  const sdk = baseAccountSdk();
  const provider = sdk?.getProvider();

  if (!provider) {
    throw new Error("No provider found!");
  }

  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts found");
  }

  return { address: accounts[0] };
};

export const switchToBaseSepolia = async (provider: any): Promise<boolean> => {
  try {
    if (!provider) {
      throw new Error("No provider available");
    }

    const chainIdHex = await provider.request({ method: "eth_chainId" });
    const currentChainId = parseInt(chainIdHex, 16);
    const targetChainId = baseSepolia.id;

    if (currentChainId === targetChainId) {
      console.log("Already on Base Sepolia");
      return true;
    }

    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${targetChainId.toString(16)}` }],
    });

    console.log("Switched to Base Sepolia");
    return true;
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${baseSepolia.id.toString(16)}`,
              chainName: "Base Sepolia",
              rpcUrls: ["https://sepolia.base.org"],
              blockExplorerUrls: ["https://sepolia.basescan.org"],
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error("Failed to add Base Sepolia:", addError);
        return false;
      }
    } else {
      console.error("Failed to switch network:", error);
      return false;
    }
  }
};

export const disconnectWallet = async (sdk: any): Promise<boolean> => {
  try {
    if (sdk && typeof sdk.disconnect === "function") {
      await sdk.disconnect();
      console.log("Wallet disconnected successfully");
      return true;
    } else {
      console.warn("SDK disconnect function not available");
      return false;
    }
  } catch (error) {
    console.error("Failed to disconnect wallet:", error);
    return false;
  }
};
