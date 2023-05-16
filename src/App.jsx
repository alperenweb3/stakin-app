import "./App.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

import {ethers} from "ethers";

function App() {

  const { contract } = useContract("0x507f7e5dFc44fDb45E56fd1ABceE91CC3DFFefd9");
  const address = useAddress();

  const { data, isLoading } = useContractRead(contract, "getStakeInfo", [address])
  // console.log(contract);
  // console.log(data);
  console.log(isLoading);

  return (
    <>
      <div className="container">
        <main className="main">
          <h1 className="title">Welcome to staking app!</h1>
​
          <p className="description">
            Stake certain amount and get reward tokens back!
          </p>
​
          <div className="connect">
            <ConnectWallet />
          </div>
​
          <div className="grid">
          <a className="card">
          Staked: {data?._tokensStaked && ethers.utils.formatEther(data?._tokensStaked)} AW3 <br></br>
          </a>
          <a className="card">
          Rewards: {data?._rewards && Number(ethers.utils.formatEther(data?._rewards)).toFixed(2)} KTR
          </a>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
