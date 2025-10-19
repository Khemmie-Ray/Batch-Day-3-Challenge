"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GiMegaphone } from "react-icons/gi";
import { createBaseAccountSDK, pay, getPaymentStatus } from "@base-org/account";
import { SignInWithBaseButton } from "@base-org/account-ui/react";

const Echo = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const sdk = createBaseAccountSDK({
    appName: "Base Account Quick-start",
    appLogoUrl: "https://base.org/logo.png",
  });

  const handleSignIn = async () => {
    try {
      await sdk.getProvider().request({ method: "wallet_connect" });
      setIsSignedIn(true);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  // 0x4c89c5bBCD6D15aC5981C7C421925527c9CC6CA7

  return (
    <div className="flex justify-center items-center min-h-[100vh] w-[100%]">
      <div className="lg:w-[30%] md:w-[40%] w-[100%] shadow-[20px] p-8 mx-auto rounded-[21px] border border-white/10">
        <div className="text-center">
          <h1 className="lg:text-[36px] md:text-[28px] text-[22px] font-bold flex items-center justify-center">
            Welcome to Echo{" "}
            <GiMegaphone className="text-blue-900 text-[30px] ml-3" />
          </h1>
          <p className="text-[12px] w-[80%]">
            Let your voice echo for a cause. Join the Echo List, powered by
            Base.
          </p>
        </div>
        <div className="my-6">
        <SignInWithBaseButton 
            align="center"
            variant="solid"
            onClick={handleSignIn}
          />
          </div>
      </div>
    </div>
  );
};

export default Echo;
