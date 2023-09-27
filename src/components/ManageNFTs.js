import { useEffect, useState } from 'react'
import { getNFTs } from '../helpers'
import EditNFTPrice from './EditNFTPrice'
import EditNFTDataPrice from './EditNFTDataPrice'
import Bridge from './Bridge'
import Withdraw from './Withdraw'

function ManageNFTs({ userId, setManageNFTsPopup }) {
	const [nfts, setNFTs] = useState([])
	const [selected, setSelected] = useState([])
	const [onQuery, setOnQuery] = useState(true)

	useEffect(() => {
		setOnQuery(true)
		getNFTs({ userId }).then(nfts => setNFTs(nfts))
		setOnQuery(false)
	}, [userId])

	const toggleSelect = (index) => {
		if (index === -1) {
			setSelected(Array(nfts.length).fill(!selected.includes(true)))
		} else {
			let newSelected = [...selected]
			newSelected[index] = !newSelected[index]
			setSelected(newSelected)

			// const filteredNFTs = nfts.filter((_, index) => newSelected[index])

			// setBridgePopup()
			// setWithdrawPopup(filteredNFTs.every(nft => nft.isRootStock === filteredNFTs[0].isRootStock))
		}
	}

	const [editNftPricePopup, setEditPricePopup] = useState(false)
	const [editDataPricePopup, setEditDataPricePopup] = useState(false)
	const [bridgePopup, setBridgePopup] = useState(false)
	const [withdrawPopup, setWithdrawPopup] = useState(false)

	// useEffect(() => {
	// 	cons
	// }, [selected])

	useEffect(() => {
		setSelected(Array(nfts.length).fill(false))
	}, [nfts])

	return (
		<div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
			{editNftPricePopup && <EditNFTPrice ids={nfts.filter((_, index) => selected[index]).map(nft => nft.nftId)} setEditPricePopup={setEditPricePopup} />}
			{editDataPricePopup && <EditNFTDataPrice ids={nfts.filter((_, index) => selected[index]).map(nft => nft.nftId)} setEditPricePopup={setEditDataPricePopup} />}
			{bridgePopup && <Bridge ids={nfts.filter((_, index) => selected[index]).map(nft => nft.nftId)} setBridgePopup={setBridgePopup} />}
			{withdrawPopup && <Withdraw ids={nfts.filter((_, index) => selected[index]).map(nft => nft.nftId)} setWithdrawPopup={setWithdrawPopup} />}
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="rounded-xl bg-white shadow-xl w-full px-16 py-5 relative">
					<h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Manage NFTs</h3>
					<div className='flex absolute top-24 right-16 gap-x-3'>
						<button className='rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50' onClick={() => setEditPricePopup(true)} disabled={!selected.includes(true)}>
							<p className='text-white text-sm font-semibold'>Edit NFT Price</p>
						</button>
						<button className='rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50' onClick={() => setEditDataPricePopup(true)} disabled={!selected.includes(true)}>
							<p className='text-white text-sm font-semibold'>Edit Data Price</p>
						</button>
						<button className='rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50' onClick={() => setBridgePopup(true)} disabled={!selected.includes(true)}>
							<p className='text-white text-sm font-semibold'>Bridge NFT</p>
						</button>
						<button className='rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 cursor-pointer px-5 py-2 disabled:pointer-events-none disabled:bg-opacity-50' onClick={() => setWithdrawPopup(true)} disabled={!selected.includes(true)}>
							<p className='text-white text-sm font-semibold'>Withdraw NFT</p>
						</button>
					</div>
					<div className="mt-20 container mx-auto">
						{onQuery ?
							<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
							: nfts.length === 0 ?
								<div className="text-center">
									<p className="text-2xl font-semibold leading-normal mb-2 text-gray-500">
										You don't own any NFTs yet.
									</p>
								</div>
								:
								<div className="">
									<div className="flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg shadow-md mt-5">
										<div className="w-1/12">
											<div className='mx-auto w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center checked:bg-primary-500 cursor-pointer' onClick={() => toggleSelect(-1)} checked={selected.includes(true)}>
												{selected.includes(true) && <div className='check w-3 h-3 rounded-full bg-primary-500'></div>}
											</div>
										</div>
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
											<div className="cursor-pointer h-16 hover:bg-gray-200 bg-white shadow flex p-5 items-center mt-5 rounded-lg" onClick={() => toggleSelect(index)}>
												<div className="w-1/12">
													<div className='mx-auto w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center checked:bg-primary-500' onClick={() => toggleSelect(index)} checked={selected[index]}>
														{selected[index] && <div className='w-3 h-3 rounded-full bg-primary-500'></div>}
													</div>
												</div>
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
													<span className="text-gray-600 text-sm">{nft.listing === false ? "Not for sale" : nft.price / 1e8}</span>
												</div>
												<div className="text-center w-1/5">
													<span className="text-gray-600 text-sm">{nft.privateMeta ? nft.promptPrice / 1e8 : "Public data"}</span>
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
			<div className='h-screen w-screen absolute -z-10' onClick={() => setManageNFTsPopup(false)}></div>
		</div >
	)
}

export default ManageNFTs
