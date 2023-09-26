import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiBitcoinsv } from 'react-icons/si'
import { AiOutlineVerticalAlignBottom, AiOutlineSmile, AiOutlineCheck } from 'react-icons/ai'
import { getUsers } from '../helpers'
import GenerationData from './GenerationData'
import { getInfoUser } from '../storage/local'
import DataPurchase from './DataPurchase'

function NFT({ userId, nftId, nftName, price, thumbnail, listing, isRootStock, privateMeta, allowedUsers }) {
    const [user, setUser] = useState({})
    const [metaPopup, setMetaPopup] = useState(false)
    const [datapurchasePopup, setDatapurchasePopup] = useState(false)
    const [account, setAccount] = useState({})

    useEffect(() => {
        getUsers(userId).then(res => setUser(res))
        setAccount(getInfoUser().data)
    }, [userId])

    return (
        <>
            {metaPopup && <GenerationData id={nftId} setMetaPopup={setMetaPopup} />}
            {datapurchasePopup && <DataPurchase id={nftId} price={price} nftName={nftName} userName={user.name} setDatapurchasePopup={setDatapurchasePopup} />}
            <div className="m-3 w-[23rem] h-[30rem]">
                <div className="bg-white overflow-hidden rounded-xl text-gray-500">
                    <a className="block relative object-cover w-[23rem] h-[23rem]">
                        <img
                            src={thumbnail}
                            className="hover:opacity-90 h-full w-full object-cover"
                            alt="..."
                            style={{ objectFit: 'cover', backgroundSize: 'cover', backgroundClip: 'cover' }}
                        />
                        {!privateMeta ?
                            <div className="group absolute bg-green-700 bottom-4 right-4 gap-2 inline-flex items-center opacity-80 rounded-full text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setMetaPopup(true)}>
                                <span className="group-hover:block hidden text-base">Generation data is shown publicly</span>
                                <AiOutlineSmile />
                            </div>
                            : allowedUsers.includes(account?.id) ?
                                <div className="group absolute bg-primary-700 bottom-4 right-4 gap-2 inline-flex items-center opacity-80 rounded-full text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setMetaPopup(true)}>
                                    <span className="group-hover:block hidden text-base">You have access to this generation data</span>
                                    <AiOutlineCheck />
                                </div>
                                : <div className="group absolute bg-red-700 bottom-4 right-4 gap-2 inline-flex items-center opacity-80 rounded-full text-white px-3 h-12 text-2xl cursor-pointer" onClick={() => setDatapurchasePopup(true)}>
                                    <span className="group-hover:block hidden text-base">Purchase this generation data</span>
                                    <AiOutlineVerticalAlignBottom />
                                </div>
                        }
                    </a>

                    <div className="px-4 my-auto sm:px-6 h-[8rem] grid">
                        <div className="flex items-center justify-between self-center h-[3.5rem]">
                            <h3 className="font-bold text-xl">
                                <a className="text-gray-900">{nftName}</a>
                            </h3>
                            <a className="inline-block rounded-full text-gray-900" >
                                {
                                    isRootStock ?
                                        <img src='https://www.nicepng.com/png/full/193-1937174_bitcoin-smart-contact-developer-rsk-releases-mainnet-rsk.png' alt="..." width="42" height="42" />
                                        : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png' alt="..." width="36" height="36" />
                                }
                            </a>
                        </div>
                        <hr className="border-gray-200 h-[0.5rem]" />
                        <div className="flex flex-col items-center h-[4rem] place-content-center ">
                            <div className='flex items-center justify-between w-full'>
                                <div className='group'>
                                    <Link to={"/profile/" + user.id} className="group-hover:text-primary-500 inline-flex italic items-center space-x-2 text-sm">
                                        <img src={user.picture} className="border-2 group-hover:border-primary-500 border-white rounded-full" alt="..." width="36" height="36" />
                                        <span>{user.name}</span>
                                    </Link>
                                </div>
                                {
                                    listing && <div className="group cursor-pointer">
                                        <p className="group-hover:text-primary-500 mb-1 text-gray-500 text-sm text-right">Buy with</p>
                                        <span className="group-hover:text-primary-500 font-bold font-serif text-lg text-right flex items-center gap-1">{(price / 1e8)}
                                            <SiBitcoinsv />
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NFT
