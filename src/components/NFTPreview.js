import React from 'react'

function NFTPreview({ nftName, thumbnail }) {
    return (
        <div className="rounded-2xl xl:w-[30rem] lg:w-[20rem] xl:h-[30rem] lg:h-[20rem] w-64 h-64 overflow-hidden">
            <a href="#" className="block group overflow-hidden relative rounded-xl">
                <img src={thumbnail} className="w-full" alt="..." width="600" height="600" /><div className="absolute bg-opacity-10 bg-black bottom-0 flex group-hover:bg-opacity-40 inset-x-0 items-center justify-between p-4 text-white sm:px-6">
                    <h2 className="font-bold">{nftName}</h2>
                    {/* <span className="italic opacity-50">by {userName}</span> */}
                </div>
            </a>
        </div>
    )
}

export default NFTPreview
