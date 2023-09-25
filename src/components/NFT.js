import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegFaceSmileWink } from 'react-icons/fa6'
import { SiBitcoinsv } from 'react-icons/si'
import { getUsers } from '../helpers'

function NFT({ userId, nftId, nftName, price, thumbnail, listing, isRootStock, privateMeta, allowedUsers }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        getUsers(userId).then(res => setUser(res))
    }, [userId])

    return (
        <div className="px-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="bg-white overflow-hidden rounded-xl text-gray-500">
                <a href="#" className="block relative">
                    <img src={thumbnail} className="hover:opacity-90 w-full" alt="..." width="600" height="600" />
                    {!privateMeta &&
                        <div className="group absolute bg-gray-900 bottom-4 gap-2 inline-flex items-center opacity-75 right-6 rounded-full text-white px-3 h-10 text-lg">
                            <span className="group-hover:block hidden text-sm">Prompt is available</span>
                            <FaRegFaceSmileWink />
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
                    <div className="flex flex-col">
                        <div className='flex items-center justify-between'>
                            <div className='group items-start'>
                                <Link to={"/profile/" + user.id} className="group-hover:text-primary-500 inline-flex italic items-center space-x-2 text-sm">
                                    <img src={user.picture} className="border-2 group-hover:border-primary-500 border-white rounded-full" alt="..." width="36" height="36" />
                                    <span>{user.name}</span>
                                </Link>
                            </div>
                            {
                                listing && <div className="group cursor-pointer">
                                    <p className="group-hover:text-primary-500 mb-1 text-gray-500 text-sm text-right">Buy with</p>
                                    <span className="group-hover:text-primary-500 font-bold font-serif text-lg text-right flex items-center gap-1">{price}
                                        <SiBitcoinsv />
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFT
