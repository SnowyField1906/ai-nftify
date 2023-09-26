import { useEffect, useState } from 'react'
import { getNFTs } from '../helpers'

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
		}
	}

	useEffect(() => {
		setSelected(Array(nfts.length).fill(false))
	}, [nfts])

	return (
		<div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="rounded-xl bg-white shadow-xl w-full px-16 py-5">
					<h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Manage NFTs</h3>
					<div className="container mx-auto">
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
											<span className="text-xs text-gray-600 font-bold">Listing</span>
										</span>
										<span className="text-center w-1/5">
											<span className="text-xs text-gray-600 font-bold">Chain</span>
										</span>
										<span className="text-center w-1/5">
											<span className="text-xs text-gray-600 font-bold">Metadata</span>
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
													<span className="text-gray-600 text-sm">{nft.price}</span>
												</div>
												<div className="text-center w-1/5">
													<span className="text-gray-600 text-sm">{nft.listing ? "On Sale" : "Not sale"}</span>
												</div>
												<div className="text-center w-1/5">
													<span className="text-gray-600 text-sm">{nft.isRootStock ? "RootStock" : "Ordinals"}</span>
												</div>
												<div className="text-center w-1/5">
													<span className="text-gray-600 text-sm">{nft.privateMeta ? "Private" : "Public"}</span>
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
