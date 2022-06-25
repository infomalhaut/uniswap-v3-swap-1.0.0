import React,{useState} from 'react'
import { NavButton } from './NavButton'

export const ConnectButton = (props) => {
    const {isConnected, signerAddress, getSigner, provider} = props
  return (
    <>
        {isConnected() ? (
            <div>
                <NavButton name={`${signerAddress?.substring(0,10)}...`}/>
            </div>
        ):(
            <div onClick={()=>getSigner(provider)}>
            <NavButton name={"Connect Wallet"}/>
            </div>
        )}
    </>
  )
}
