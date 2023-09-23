import React from 'react'

function NFTPreview({ nftName, userName, price, view, thumbnail }) {
    return (
        <div className="-ml-4 bg-secondary-500 p-4 rounded-2xl w-10/12 sm:-ml-6 sm:p-6 md:w-7/12 lg:w-full transform transition duration-150 ease-in-out">
            <a href="#" className="block group overflow-hidden relative rounded-xl">
                <img src={thumbnail} className="w-full" alt="..." width="600" height="600" /><div className="absolute bg-opacity-10 bg-black bottom-0 flex group-hover:bg-opacity-40 inset-x-0 items-center justify-between p-4 text-white sm:px-6">
                    <h2 className="font-bold">{nftName}</h2>
                    <span className="italic opacity-50">by {userName}</span>
                </div>
            </a>
        </div>
    )
}

export default NFTPreview
