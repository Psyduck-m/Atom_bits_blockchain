import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
    const contractABI = abi.abi;
    const [allWaves, setAllWaves] = useState([]);
    const [inputText, setText] = useState("");
    const [randomWaves, setRandomWaves] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0xcBb6Cb4a21Ea2fd3CaA09e600ea62a5A93cb6f31";

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };


  

  const getRandomWaves = async () => {
    try {  setRandomWaves([]);




          if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        // Retrieve all waves from the smart contract
        const allWaves = await wavePortalContract.getAllWaves();

        // Select a random subset of the waves array
        const randomIndex = Math.floor(Math.random() * allWaves.length);
        const randomWaves = allWaves.slice(randomIndex, randomIndex + 5);

        for (const wave of randomWaves) {
            console.log(wave.message);
        }
        setRandomWaves(randomWaves);
  
            } else {
                console.log("Ethereum object doesn't exist!");
            }

        
        
    } catch (error) {
        console.log(error);
    }
};

  

    const wave = async (message) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
                /*
                 * Execute the actual wave from the smart contract
                 */
                const waveTxn = await wavePortalContract.wave(message);
                console.log(message);
                console.log("Mining...", waveTxn.hash);
                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllWaves = async () => {
        const { ethereum } = window;

        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                const waves = await wavePortalContract.getAllWaves();

                const wavesCleaned = waves.map((wave) => {
                    return {
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message,
                    };
                });

                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        let wavePortalContract;

        const onNewWave = (from, timestamp, message) => {
            console.log("NewWave", from, timestamp, message);
            setAllWaves((prevState) => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        };

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            wavePortalContract.on("NewWave", onNewWave);
        }

        return () => {
            if (wavePortalContract) {
                wavePortalContract.off("NewWave", onNewWave);
            }
        };
    }, []);

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">Atom🪐</div>

                <div className="bio">
                    Hi I am Sidak and this project is part of the recruitment task for BITS Blockchain
                </div>


              <div className = "question">
              <input size = "39" placeholder = "What Question would you like on the test?"
    onChange={e => setText(e.target.value)} 
    onKeyPress={event => {
    if (event.key === 'Enter') {
        wave(inputText);
        setText('');
    }}}
/>
                
              <button onClick={() => wave(inputText)}>Enter</button>
              </div>

              
              


                {!currentAccount && (
                    <button className="waveButton" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}


              <div className="App">
           
            <button className = "q" onClick={getRandomWaves}>Get Questions</button>
         
            {randomWaves.map((wave, index) => (
                <div key={index} style={{ backgroundColor: "Oldlace", marginTop: "16px", padding: "8px" }}>{wave.message}</div>
            ))}
        </div>

                {allWaves.map((wave, index) => {
                    return (
                        <div key={index} style={{ backgroundColor: "cornflowerblue", marginTop: "16px", padding: "8px" }}>
                            <div>Question Uploaded!</div>
                            <div>Question: {wave.message}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default App;