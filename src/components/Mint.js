import { useEffect, useState } from 'react'
import { mintNFT } from '../helpers';
import { getInfoUser } from '../storage/local';

function Mint({ response, setMintPopup }) {
	const [onSummit, setOnSummit] = useState(false)
	const [onSuccess, setOnSuccess] = useState(null)

	const summit = async () => {
		setOnSummit(true)

		const res = await mintNFT({
			...mintParams,
			nftId: mintParams.nftId.toString(),
			price: (mintParams.price * 1e8).toString(),
		}, response.metadata)

		setOnSuccess(res)
		setOnSummit(false)
	}


	const { data: user } = getInfoUser()

	const [mintParams, setMintParams] = useState({
		userId: user.id,
		nftId: response.id,
		nftName: "",
		price: null,
		thumbnail: response.output[0],
		listing: true,
		isRootStock: true,
		privateMeta: false,
		allowedUsers: [user.id],
	});

	useEffect(() => {
		if (mintParams.price === "") {
			setMintParams({ ...mintParams, price: null })
		}
	}, [mintParams.price])

	const inputClass = {
		false: "bg-white border-primary-500 text-primary-500",
		true: "bg-gray-200 text-gray-500 border-gray-300",
	}

	const valid = () => mintParams.nftName !== "" && (mintParams.listing ? (mintParams.price !== null) : true) && onSuccess !== false

	return (
		<div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
				<div className="rounded-xl bg-white shadow-xl w-full px-16 py-5">
					<h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Mint the NFT</h3>
					<div class="container mx-auto">
						<div className="grid space-y-5">
							<input type="text" placeholder="Name" className={`${inputClass[mintParams.nftName === ""]} w-full h-12 p-3 rounded-full border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} onChange={(e) => setMintParams({ ...mintParams, nftName: e.target.value })} />
							<div className='flex justify-between items-center'>
								<input type="number" placeholder="Price" className={`${inputClass[mintParams.price === null]} w-full h-12 p-3 rounded-full border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} onChange={(e) => setMintParams({ ...mintParams, price: e.target.value })} value={mintParams.price} disabled={!mintParams.listing} />
								<p className='text-xl mx-6 text-yellow-600 font-semibold'>BTC</p>
							</div>
							<div className='flex justify-between items-center'>
								<button className={`${inputClass[!mintParams.listing]} rounded-full border-2 cursor-pointer rounded-r-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, listing: true })} defaultValue={mintParams.listing}>
									Available for sale
								</button>
								<button className={`${inputClass[mintParams.listing]} rounded-full border-2 cursor-pointer rounded-l-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, price: "", listing: false })} defaultValue={mintParams.listing}>
									Not for sale
								</button>
							</div>
							<div className='flex justify-between items-center'>
								<button className={`${inputClass[mintParams.privateMeta]} rounded-full border-2 cursor-pointer rounded-r-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, privateMeta: false })} defaultValue={!mintParams.privateMeta}>
									Public prompt data
								</button>
								<button className={`${inputClass[!mintParams.privateMeta]} rounded-full border-2 cursor-pointer rounded-l-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, privateMeta: true })} defaultValue={!mintParams.privateMeta}>
									Private prompt data
								</button>
							</div>
							<div className='flex justify-between items-center'>
								<button className={`${inputClass[!mintParams.isRootStock]} rounded-full border-2 cursor-pointer rounded-r-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, isRootStock: true })} defaultValue={!mintParams.isRootStock}>
									Mint at RootStock
								</button>
								<button className={`${inputClass[mintParams.isRootStock]} rounded-full border-2 cursor-pointer rounded-l-none h-12 font-semibold w-1/2 flex items-center justify-center`} onClick={() => setMintParams({ ...mintParams, isRootStock: false })} defaultValue={!mintParams.isRootStock}>
									Mint at Ordinals
								</button>
							</div>
						</div>
						<div className='flex'>
							<button className={`${onSummit || onSuccess ? "border-primary-500 cursor-default" : "hover:border-primary-500"} group h-12 px-6 mt-10 mx-auto border-2 border-gray-200 rounded-full transition duration-300 w-1/3 disabled:cursor-default disabled:pointer-events-none`} onClick={() => summit()} disabled={!valid()}>
								<div className="relative flex items-center space-x-4 justify-center">
									<span className="block font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-500 sm:text-base">
										{
											!onSummit && !onSuccess ?
												<p>{onSuccess === null ? "Mint" : "Failed!"}</p>
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
						<p className="text-xs">Your charge will be only for gas fee calculated by the Bitcoin network.</p>
						<p className="text-xs">We do not take any fees from your minting process.</p>
					</div>
				</div>
			</div>
			<div className='h-screen w-screen absolute -z-10' onClick={() => !onSummit && setMintPopup(false)}></div>
		</div>
	)
}

export default Mint
