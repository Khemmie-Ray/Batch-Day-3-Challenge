"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GiMegaphone } from "react-icons/gi";


const Echo = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);



 

  // const handleSignIn = async () => {
  //   try {
  //     await sdk.getProvider().request({ method: "wallet_connect" });
  //     setIsSignedIn(true);
  //   } catch (error) {
  //     console.error("Sign in failed:", error);
  //   }
  // };

  // 

  return (
    <div className="flex justify-center items-center min-h-[100vh] w-[100%]">
      <div className="inline-flex items-center p-[2px] bg-[radial-gradient(circle_at_center,_#FFFFFF80,_#0000ff5f)] lg:w-[30%] md:w-[40%] w-[100%] rounded-[21px] shadow-[20px]">
        <div className="p-8 w-[100%] rounded-[21px] bg-black">
          <div className="text-center">
            <h1 className="lg:text-[36px] md:text-[28px] text-[22px] font-bold flex items-center justify-center bg-gradient-to-b from-[#211f92] to-[#7096ff] text-transparent bg-clip-text">
              Welcome to Echo{" "}
              <GiMegaphone className="text-white ml-3" />
            </h1>
            <p className="text-[12px] w-[80%]">
              Let your voice echo for a cause. Join the Echo List, powered by
              Base.
            </p>
          </div>
          <div className="my-6">
            {/* {!isSignedIn && <SignInWithBaseButton
              align="center"
              variant="solid"
              onClick={handleSignIn}
            />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Echo;
