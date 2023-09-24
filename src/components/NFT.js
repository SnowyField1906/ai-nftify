import React from 'react'
import { getUserDataByUserId } from '../data'
import { Link } from 'react-router-dom'
import { FaRegFaceSmileWink } from 'react-icons/fa6'

function NFT({ userId, nftId, nftName, price, thumbnail, listing, isRootStock, privateMeta, allowedUsers }) {
    const userData = getUserDataByUserId(userId)
    console.log(userData)

    return (
        <div className="px-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="bg-white overflow-hidden rounded-xl text-gray-500">
                <a href="#" className="block group relative">
                    <img src={thumbnail} className="group-hover:opacity-90 w-full" alt="..." width="600" height="600" />
                    {listing && <div className="absolute bg-gray-900 bottom-4 gap-2 inline-flex items-center opacity-75 right-6 rounded-full text-white px-3 h-10 text-lg">

                        <span className="group-hover:block hidden">Available for sale</span>
                        <FaRegFaceSmileWink className='block' />
                    </div>
                    }
                </a>
                <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl">
                            <a href="#" className="hover:text-primary-500 text-gray-900">{nftName}</a>
                        </h3>
                        <a className="hover:text-primary-500 inline-block rounded-full text-gray-900" href="#" aria-label="add to favorite">
                            {
                                isRootStock ?
                                    <img src='./assets/rootstock_logo.png' alt="..." width="42" height="42" />
                                    : <img src='./assets/ordinals_logo.png' alt="..." width="36" height="36" />
                            }
                        </a>
                    </div>
                    <hr className="border-gray-200 my-4" />
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to={"/profile/" + userData.id} className="hover:text-gray-400 inline-flex italic items-center space-x-2 text-sm">
                                <img src={userData.picture} className="border-4 border-secondary-500 rounded-full" alt="..." width="36" height="36" />
                                <span>{userData.name}</span>
                            </Link>
                        </div>
                        <div>
                            <a href="#" className="group inline-block text-secondary-500">
                                <p className="group-hover:text-primary-500 mb-1 text-gray-500 text-sm">Buy Now</p> <span className="group-hover:text-primary-500 font-bold font-serif text-xl">{price} BTC</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFT
