import React from 'react'

export const CurrencyField = () => {
    const getPrice = (value) =>{
        props.getSwapPrice(value)
    }
  return (
    <div>
        <div className='flex'>
            <div>
                {props.loading ? (
                    <div>
                    <props.spinner/>
                    </div>
                ):(
                    <input
                    className=''
                    placeholder='0.0'
                    value={props.value}
                    onBlur={e=>(props.field=='input'?getPrice(e.target.value):null)}
                    />
                )}
            </div>
            <div className='flex flex-col'>
                <p>{props.tokenName}</p>
                <span>Balance: {props.balance?.toFixed(3)}</span>
            </div>
        </div>
    </div>
  )
}
