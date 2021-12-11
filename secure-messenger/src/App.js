import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function App() {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  async function loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  useEffect(() => {
    if (account) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [account]);

  useEffect(() => {
    loadBlockChain();
  }, [isConnected]);

  const connectWallet = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.request({
          method: "eth_requestAccounts",
        }); //connect Metamask
        setAccount(address);
        setIsConnected(true);
        const obj = {
          connectedStatus: true,
          status: "",
          address: address,
        };
        return obj;
      } catch (error) {
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
        };
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      };
    }
  };

  return (
    <div>
      <h1>Connected to metamask: {JSON.stringify(isConnected)}</h1>
      <p>Your account: {account}</p>
      <button onClick={connectWallet}>Connect</button>
    </div>
  );
}
