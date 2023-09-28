import { useEffect, useState } from 'react'
import { formatNFTs, getAllMyPrompts } from '../helpers'
import GenerationData from './GenerationData'

function PurchasedData({ userId, setPurchasedDataPopup }) {
    const [nfts, setNFTs] = useState([])
    const [onQuery, setOnQuery] = useState(true)
    const [metaPopup, setMetaPopup] = useState(false)

    useEffect(() => {
        setOnQuery(true)

        getAllMyPrompts().then(res => {
            formatNFTs(res).then(formattedNFTs => setNFTs(formattedNFTs))
        })

        setOnQuery(false)
    }, [userId])

    const [selectedId, setSelectedId] = useState(null)

    const toggleSelect = (id) => {
        setSelectedId(id)
        setMetaPopup(true)
    }

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            {metaPopup && <GenerationData id={selectedId} setMetaPopup={setMetaPopup} />}
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
                <div className="rounded-xl bg-white shadow-xl w-full px-16 py-5 relative">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Manage NFTs</h3>
                    <div className="mt-20 container mx-auto">
                        {onQuery ?
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                            : nfts.length === 0 ?
                                <div className="text-center">
                                    <p className="-mt-5 text-2xl font-semibold leading-normal mb-2 text-gray-500">
                                        You don't own any Prompts yet.
                                    </p>
                                </div>
                                :
                                <div className="overflow-y-scroll mt-5 max-h-[26rem]">
                                    <div className="flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-md">
                                        <span className="text-center w-1/4">
                                            <span className="text-xs text-gray-600 font-bold">Thumbnail</span>
                                        </span>
                                        <span className="text-center w-1/5">
                                            <span className="text-xs text-gray-600 font-bold">ID</span>
                                        </span>
                                        <span className="text-center w-1/2">
                                            <span className="text-xs text-gray-600 font-bold">Name</span>
                                        </span>
                                        <span className="text-center w-1/5">
                                            <span className="text-xs text-gray-600 font-bold">Price</span>
                                        </span>
                                        <span className="text-center w-1/5">
                                            <span className="text-xs text-gray-600 font-bold">Data Price</span>
                                        </span>
                                        <span className="text-center w-1/5">
                                            <span className="text-xs text-gray-600 font-bold">Chain</span>
                                        </span>
                                    </div>
                                    {
                                        nfts.map((nft, index) => (
                                            <div className="cursor-pointer h-16 hover:bg-gray-200 bg-white shadow flex p-5 items-center mt-5 rounded-lg" onClick={() => toggleSelect(nft.nftId)}>
                                                <div className="text-center w-1/4">
                                                    <img src={nft.thumbnail} className="mx-auto h-12 w-12 rounded-full" />
                                                </div>
                                                <div className="text-center w-1/5">
                                                    <span className="text-sm text-gray-800">{nft.nftId}</span>
                                                </div>
                                                <div className="text-center w-1/2">
                                                    <span className="text-sm text-gray-600">{nft.nftName}</span>
                                                </div>
                                                <div className="text-center w-1/5">
                                                    <span className="text-gray-600 text-sm">{nft.price == 0 ? "Not for sale" : nft.price}</span>
                                                </div>
                                                <div className="text-center w-1/5">
                                                    <span className="text-gray-600 text-sm">{nft.promptPrice == 0 ? "Public data" : nft.promptPrice}</span>
                                                </div>
                                                <div className="text-center w-1/5">
                                                    <span className="text-gray-600 text-sm">{nft.isRootStock ? "RootStock" : "Ordinals"}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                    <div className="py-10 space-y-2 text-gray-600 text-center sm:-mb-8">
                        <p className="text-xs">Actions to your owned NFTs is accessed from here.</p>
                        <p className="text-xs">Any action will all need to send a transaction to the blockchain.</p>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setPurchasedDataPopup(false)}></div>
        </div >
    )
}

export default PurchasedData
