import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import { NavButton } from './components/NavButton';
import { ConnectButton } from './components/ConnectButton';
import { ConfigModal } from './components/ConfigModal';
import { BeatLoader } from 'react-spinners';
import { CurrencyField } from './components/CurrencyField';
import {getWethContract,getUniContract, getPrice, runSwap} from './AlphaRouterService'

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined)
  const [signerAdderss, setSignerAddress] = useState(undefined)

  const [slippageAmount,setSlippageAmount]=useState(2)
  const [deadlineMinutes,setDeadlineMinutes]=useState(10)


  const [inputAmount,setInputAmount]=useState(undefined)
  const [outputAmount,setOutputAmount]=useState(undefined)
  const [transaction,setTransaction]=useState(undefined)
  const [loading,setLoading]=useState(undefined)
  const [ratio,setRation]=useState(undefined)
  const [wethContract,setWethContract]=useState(undefined)
  const [uniContract,setUniContract]=useState(undefined)
  const [wethAmount,setWethAmount]=useState(undefined)
  const [uniAmount,setUniAmount]=useState(undefined)





  const onLoad = async() =>{
    const provider1 = await new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider1)
    // console.log(provider)
    // console.log(provider._isProvider)

    const wethContract = getWethContract()
    setWethContract(wethContract)

    const uniContract = getUniContract()
    setUniContract(uniContract)
  }

  useEffect(()=>{
    onLoad();
    
  },[])

  

  const getSigner = async provider => {
   await provider.send("eth_requestAccounts",[]);
    const signer1 =await provider.getSigner();
    setSigner(signer1);
    getWalletAddress(signer1)
  }
  const isConnected = () => signer !== undefined
  const getWalletAddress = (signer1) =>{
    signer1.getAddress().then(address =>{
      setSignerAddress(address)

     //todo: connect weth and uni contracts
     wethContract.balanceOf(address).then(res=>setWethAmount(Number(ethers.utils.formatEther(res))))
     uniContract.balanceOf(address).then(res=>setUniAmount(Number(ethres.utils.formatEther(res))))

    })
  }
  const getSwapPrice = (inputAmount) =>{
    setLoading(true)
    setInputAmount(inputAmount)
    const swap = getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now()/1000+(deadlineMinutes*60)),
      signerAdderss
    ).then(data=>{
      setTransaction(data[0])
      setOutputAmount(data[1])
      setRation(data[2])
      setLoading(false)
    })
  }
  return (
    <div className="w-full h-screen bg-zinc-200">
      <div className='flex  justify-between'>
        <div className='mx-auto flex m-5 bg-blue-50 p-5 rounded-full border-2 border-blue-50  justify-center items-center'>
          <NavButton name={"Swap"} isBold={true}/>
          <NavButton name={"Pool"}/>
          <NavButton name={"Vote"}/>
          <NavButton name={"Charts"}/>
        </div>
        <div className='m-5 flex justify-end items-center'>
          <div>
            <ConnectButton
            provider={provider}
            isConnected={isConnected}
            signerAddress={signerAdderss}
            getSigner={getSigner}
            />
          </div>
        </div>
      </div>
      <div className=' flex justify-center items-center mt-[100px]'>
      <div className='bg-zinc-100 w-[30%] h-[300px] rounded-xl'>
        <div className='flex justify-between m-3'>
          <p className='text-md'>Swap</p>
          <ConfigModal
            slippageAmount={slippageAmount}
            setSlippageAmount={setSlippageAmount}
            deadlineMinutes={deadlineMinutes}
            setDeadlineMinutes={setDeadlineMinutes}
          />
        </div>
        <div>
          <CurrencyField
           field="input"
           tokenName="WETH"
           getSwapPrice={getSwapPrice}
           signer={signer}
           balance={wethAmount}
          />
          <CurrencyField
           field="output"
           tokenName="UNI"
           value={outputAmount}
           signer={signer}
           balance={wethAmount}
           spinner={BeatLoader}
           loading={loading}
          />
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
