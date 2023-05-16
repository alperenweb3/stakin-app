import "./App.css";
import { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const stakingAddress = "0x507f7e5dFc44fDb45E56fd1ABceE91CC3DFFefd9";
const AW3TokenAddress = "0xAC17E4f26dc73c103c8Bb61235d69326C5B83bE4";

function App() {
  const { contract } = useContract(stakingAddress);
  const { contract: AW3Token, isLoading: isStakingTokenLoading } =
    useContract(AW3TokenAddress);
  console.log(isStakingTokenLoading);

  const address = useAddress();

  console.log("UseAddress", address);

  const { data, isLoading } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);
  // console.log(contract);
  // console.log(data);
  console.log(isLoading);

  const [amountToStake, setAmountToStake] = useState("0");

  return (
    <>
      <div className="container">
        <main className="main">
          <h1 className="title">Welcome to staking app!</h1>​
          <p className="description">
            Stake certain amount and get reward tokens back!
          </p>
          ​
          <div className="connect">
            <ConnectWallet />
          </div>
          {
            address && 
            <div className="stakeContainer">
            <input
              type="number"
              className="textbox"
              value={amountToStake}
              onChange={(e) => setAmountToStake(e.target.value)}
            />
            {/* WEB3 BUTTONS START */}
            {/* Stake Button */}
            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {
                //ERC20 token should be created as variable
                await AW3Token.setAllowance(stakingAddress, amountToStake);
                await contract.call("stake", [
                  ethers.utils.parseEther(amountToStake),
                ]);
              }}
              theme="dark"
            >
              Stake
            </Web3Button>

            {/* Stake Button */}
            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {
                await contract.call("withdraw", [
                  ethers.utils.parseEther(amountToStake),
                ]);
              }}
              theme="dark"
            >
              Unstake
            </Web3Button>

            {/* Claim Rewards Button */}
            <Web3Button
              contractAddress={stakingAddress}
              action={async (contract) => {
                await contract.call("claimRewards");
              }}
              theme="dark"
            >
              Claim Rewards!
            </Web3Button>
            {/* WEB3 BUTTONS END */}
          </div>
          }
          <div className="grid">
            <p className="card">
              Staked:{" "}
              {data?._tokensStaked &&
                ethers.utils.formatEther(data?._tokensStaked)}{" "}
              AW3
            </p>
            <p className="card">
              Rewards:{" "}
              {data?._rewards &&
                Number(ethers.utils.formatEther(data?._rewards)).toFixed(
                  2
                )}{" "}
              KTR
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
