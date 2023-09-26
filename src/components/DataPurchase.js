import { useState } from 'react'

function DataPurchase({ id, nftName, price, userName, setDatapurchasePopup }) {
    const [onSummit, setOnSummit] = useState(false)
    const [onSuccess, setOnSuccess] = useState(null)
    const summit = async () => {
        setOnSummit(true)

        const res = true

        setOnSuccess(res)
        setOnSummit(false)
    }

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
                <div className="rounded-xl bg-white shadow-xl w-full px-16 py-5">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Purchase confirmation</h3>
                    <div class="container mx-auto">
                        <p className='text-lg text-center text-gray-600'>You are about to purchase the
                            <span className='text-primary-500'> {nftName}</span>
                            's <span className='font-semibold'>generation data</span>.
                        </p>
                        <div className='grid grid-cols-3 gap-4 mt-10 w-3/4 mx-auto'>
                            <p className='text-lg text-gray-700 font-semibold'>ID</p>
                            <p className='col-span-2 text-lg font-semibold'>{id}</p>
                            <p className='text-lg text-gray-700 font-semibold'>Name</p>
                            <p className='col-span-2 text-lg font-semibold'>{nftName}</p>
                            <p className='text-lg text-gray-700 font-semibold'>Transfer to</p>
                            <p className='col-span-2 text-lg font-semibold'>{userName}</p>
                            <p className='text-lg text-gray-700 font-semibold'>Data price</p>
                            <p className='col-span-2 text-lg font-semibold'>{price / 1e8} BTC</p>
                        </div>
                        <div className='flex'>
                            <button className={`${onSummit || onSuccess ? "border-primary-500 cursor-default" : "hover:border-primary-500"} group h-12 px-6 mt-10 mx-auto border-2 border-gray-200 rounded-full transition duration-300 w-1/3 disabled:cursor-default disabled:pointer-events-none`} onClick={() => summit()} disabled={onSummit || onSuccess}>
                                <div className="relative flex items-center space-x-4 justify-center">
                                    <span className="block font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-500 sm:text-base">
                                        {
                                            !onSummit && !onSuccess ?
                                                <p>{onSuccess === null ? "Purchase" : "Failed!"}</p>
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
                        <p className="text-xs">Generation data purchase
                            {' '}<span className='font-bold'>does not</span> include the NFT.</p>
                        <p className="text-xs">Your charge will be
                            {' '}<span className='font-bold'>higher than</span> the price shown up due to the Bitcoin network fee.</p>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => !onSummit && setDatapurchasePopup(false)}></div>
        </div >
    )
}

export default DataPurchase
