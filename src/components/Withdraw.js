import { useEffect, useState } from 'react'
import { transferToAddress } from '../helpers'
import Web3 from 'web3'

function Withdraw({ nfts, setWithdrawPopup }) {
    const [onSummit, setOnSummit] = useState(false)
    const [onSuccess, setOnSuccess] = useState(null)
    const [address, setAddress] = useState("")
    const [valid, setValid] = useState(false)

    const isRootStock = nfts[0].isRootStock

    const summit = async () => {
        setOnSummit(true)

        const res = await transferToAddress(nfts.map(nft => nft.nftId), address)

        setOnSuccess(res)
        setOnSummit(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            let addr
            try {
                addr = await Web3.utils.toChecksumAddress(address)
            } catch (error) {
                addr = null
            }
            setValid(addr !== null)
        };
        fetchData()
    }, [address])

    const inputClass = {
        false: "bg-white border-primary-500 text-primary-500",
        true: "bg-gray-200 text-gray-500 border-gray-300",
    }

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
                <div className="rounded-xl bg-white shadow-xl w-full px-16 py-5">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Withdraw NFTs</h3>
                    <div class="container mx-auto">
                        <div className="grid space-y-5">
                            <div className='flex justify-between items-center'>
                                <input type="text" placeholder="Address" className={`${inputClass[address === "" || !valid]} w-full h-12 p-3 rounded-full border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className='flex justify-between items-center'>
                                <button className={`${inputClass[!isRootStock]} rounded-full border-2 cursor-pointer rounded-r-none h-12 font-semibold w-1/2 flex items-center justify-center`} defaultValue={!isRootStock}>
                                    Withdraw at RootStock
                                </button>
                                <button className={`${inputClass[isRootStock]} rounded-full border-2 cursor-pointer rounded-l-none h-12 font-semibold w-1/2 flex items-center justify-center`} defaultValue={!isRootStock}>
                                    Withdraw at Ordinals
                                </button>
                            </div>
                        </div>
                        <div className='flex'>
                            <button className={`${onSummit ? "border-primary-500 cursor-default" : "hover:border-primary-500"} group h-12 px-6 mt-10 mx-auto border-2 border-gray-200 rounded-full transition duration-300 w-1/3 disabled:cursor-default disabled:pointer-events-none`} onClick={() => summit()} disabled={address === "" || !valid || onSummit === onSuccess}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block font-semibold tracking-wide">
                                        {
                                            !onSummit && !onSuccess ?
                                                <button className='text-gray-700 text-sm transition duration-300 group-hover:text-primary-500 sm:text-base disabled:pointer-events-none'
                                                    disabled={onSuccess === null ? "Summit" : "Failed!"}
                                                >{onSuccess === null ? "Summit" : "Failed!"}</button>
                                                :
                                                !onSuccess ?
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                                                    :
                                                    <svg className="h-6 w-6 fill-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                        <path d="M 41.957031 8.9765625 A 2.0002 2.0002 0 0 0 40.333984 9.8945312 L 21.503906 38.279297 L 9.3261719 27.501953 A 2.0007191 2.0007191 0 1 0 6.6738281 30.498047 L 20.574219 42.796875 A 2.0002 2.0002 0 0 0 23.566406 42.40625 L 43.666016 12.105469 A 2.0002 2.0002 0 0 0 41.957031 8.9765625 z"></path>
                                                    </svg>

                                        }
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="py-10 space-y-2 text-gray-600 text-center sm:-mb-8">
                        <p className="text-xs">All NFTs will be {' '}
                            <span className='font-bold'>
                                transferred to
                            </span>
                            {' '}
                            the wallet as you filled in.
                        </p>
                        <p className="text-xs">They must have same chain unless you will have to bridge them.</p>
                    </div>
                </div>
            </div >
            <div className='h-screen w-screen absolute -z-10' onClick={() => !onSummit && setWithdrawPopup(false)}></div>
        </div >
    )
}

export default Withdraw
