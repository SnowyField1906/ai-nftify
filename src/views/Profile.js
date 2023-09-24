import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NFT from '../components/NFT';
import { getNFTs } from '../helpers';

function Profile({ user }) {
	const regionNames = new Intl.DisplayNames(['en'], {
		type: 'language'
	});

	const [nfts, setNFTs] = useState([])
	const [onQuery, setOnQuery] = useState(true)

	useEffect(() => {
		setOnQuery(true)
		getNFTs({ userId: user.id }).then(nfts => setNFTs(nfts))
		setOnQuery(false)
	}, [])


	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-wrap h-52">
				<div className="w-full justify-center flex place-items-center place-content-center absolute left-0 top-5 flex-col">
					<img src={user.picture} className=" shadow-xl rounded-full xl:w-1/12 lg:w-1/6 md:w-1/5 w-1/4" alt="..." />
					<div className="text-center">
						<h3 className="text-4xl font-semibold leading-normal my-2 text-gray-700">
							{user.name}
						</h3>
						<div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
							<i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
							{regionNames.of(user.locale)}
						</div>
					</div>
				</div>
				<div className="w-min flex text-center justify-between items-center absolute top-0 h-40 z-20 lg:gap-x-10 sm:gap-x-5 gap-x-2">
					<div className="">
						<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
							{onQuery ? "..." : nfts.length}
						</h3>
						<span className="text-base text-gray-200">NFTs</span>
					</div>
					<div className="">
						<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
							{onQuery ? "..." : nfts.filter(nft => nft.isRootStock).length}
						</h3>
						<span className="text-base text-gray-200">Ordinals</span>
					</div>
					<div className="">
						<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
							{onQuery ? "..." : nfts.filter(nft => nft.listing).length}
						</h3>
						<span className="text-base text-gray-200">Listings</span>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-y-6 justify-center">
				{
					onQuery ?
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
						: nfts.length === 0 ?
							<div className="text-center">
								<p className="text-2xl font-semibold leading-normal mb-2 text-gray-500">
									This user has no NFTs
								</p>
							</div>
							:
							nfts.map((nft) => (
								<NFT {...nft} />
							))
				}
			</div>
		</div>
	)
}

export default Profile
