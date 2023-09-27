import { useEffect, useState } from 'react'
import { getInfoUser } from '../storage/local'
import { btcLogo, rskLogo } from '../data'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getBalance } from '../scripts';
const { ethers } = require("ethers");

function Advanced({ setAdvancedPopup }) {
    const [keys, setKeys] = useState(null)
    const [btcExpanded, setBtcExpanded] = useState(false)
    const [rskExpanded, setRskExpanded] = useState(false)
    const [btcShown, setBtcShown] = useState(false)
    const [rskShown, setRskShown] = useState(false)

    useEffect(() => {
        const keysData = getInfoUser().key.data
        const modified = {
            addressBtc: keysData.ethAddress,
            addressRsk: keysData.ethAddress,
            // pubKey: keysData.pubKey,
            privKey: keysData.privKey,
        }
        setKeys(modified)
    }, [])

    const [copy, setCopy] = useState("Click to copy")
    const resetTooltip = () => {
        setTimeout(() => {
            setCopy("Click to copy")
        }, 50)
        document.removeEventListener("mouseout", resetTooltip);
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        setCopy("Copied to clipboard!")
        document.addEventListener("mouseout", resetTooltip);
    }

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-2/5">
                <div className="rounded-xl bg-white shadow-xl w-full p-5">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4">Advanced</h3>
                    <div className="py-10 mx-10">
                        <div className="flex items-center flex-col gap-5">
                            <div className="flex items-center space-x-2 w-full">
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                                    <img src={btcLogo} alt="" className="w-10 h-10" />
                                </div>
                                {
                                    keys !== null &&
                                    <div className='flex flex-col w-full'>
                                        <div className='relative flex items-center justify-between w-full'>
                                            <div className='group flex items-center'>
                                                <p className="rounded-lg cursor-pointer px-2 py-0.5 text-left font-semibold group-hover:bg-gray-200"
                                                    onClick={() => copyText(keys.addressBtc)}
                                                >
                                                    {keys.addressBtc}</p>
                                                <span className="pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
                                                    {copy}
                                                </span>
                                            </div>
                                            {
                                                btcExpanded ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setBtcExpanded(false); setBtcShown(false) }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>

                                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setBtcExpanded(true); setBtcShown(false) }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                            }
                                        </div>
                                        {
                                            btcExpanded &&
                                            <div className='flex items-center justify-between'>
                                                {
                                                    btcExpanded &&
                                                    <div className='group flex items-center'>
                                                        <p className="hover:bg-gray-200 px-2 py-0.5 rounded-lg cursor-pointer text-xs text-gray-500"
                                                            onClick={() => copyText(keys.privKey)}>
                                                            {btcShown ? keys.privKey : '*'.repeat(64)}
                                                        </p>
                                                        <span className="pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
                                                            {copy}
                                                        </span>
                                                    </div>
                                                }
                                                {
                                                    btcShown ?
                                                        <AiFillEye className='cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700' onClick={() => setBtcShown(false)} />
                                                        : <AiFillEyeInvisible className='cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700' onClick={() => setBtcShown(true)} />
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="flex items-center space-x-2 w-full">
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                                    <img src={rskLogo} alt="" className="w-10 h-10 object-contain" />
                                </div>
                                {
                                    keys !== null &&
                                    <div className='flex flex-col w-full'>
                                        <div className='relative flex items-center justify-between w-full'>
                                            <div className='group flex items-center'>
                                                <p className="rounded-lg cursor-pointer px-2 py-0.5 text-left font-semibold group-hover:bg-gray-200"
                                                    onClick={() => copyText(keys.addressRsk)}
                                                >
                                                    {keys.addressRsk}</p>
                                                <span className="pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
                                                    {copy}
                                                </span>
                                            </div>
                                            {
                                                rskExpanded ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setRskExpanded(false); setRskShown(false) }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>

                                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right cursor-pointer text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { setRskExpanded(true); setRskShown(false) }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                            }
                                        </div>
                                        {
                                            rskExpanded &&
                                            <div className='flex items-center justify-between'>
                                                {
                                                    rskExpanded &&
                                                    <div className='group flex items-center'>
                                                        <p className="hover:bg-gray-200 px-2 py-0.5 rounded-lg cursor-pointer text-xs text-gray-500"
                                                            onClick={() => copyText(keys.privKey)}>
                                                            {rskShown ? keys.privKey : '*'.repeat(64)}
                                                        </p>
                                                        <span className="pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 bg-opacity-0 group-hover:bg-gray-900 text-white ml-2 rounded-lg px-2 text-sm py-0.5">
                                                            {copy}
                                                        </span>
                                                    </div>
                                                }
                                                {
                                                    rskShown ?
                                                        <AiFillEye className='cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700' onClick={() => setRskShown(false)} />
                                                        : <AiFillEyeInvisible className='cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700' onClick={() => setRskShown(true)} />
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mt-10 space-y-2 text-gray-600 text-center sm:-mb-8">
                            <p className="text-xs">Your Bitcoin and RootStock keys which is associated with this account is shown up here.</p>
                            <p className="text-xs">
                                <span className='font-bold'>
                                    Protect your private keys
                                </span>{' '}
                                by all means if you don't want to lose the NFTs.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setAdvancedPopup(false)}></div>
        </div>
    )
}

export default Advanced
