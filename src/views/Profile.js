import React from 'react'
import Navbar from '../components/Navbar'
import { getAllRootStockNFTs } from '../data'
import NFT from '../components/NFT';

function Profile({ user }) {
	const regionNames = new Intl.DisplayNames(['en'], {
		type: 'language'
	});

	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-wrap justify-center">
				<div className="w-full px-4 flex justify-center">
					<img src={user.picture} className="shadow-xl rounded-full w-1/12 align-middle border-none absolute" />
				</div>
				<div className="w-full flex justify-between items-center">
					<div className="flex justify-center">
						<div className="mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-gray-600">22</span><span className="text-sm text-gray-400">NFTs</span>
						</div>
						<div className="mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-gray-600">10</span><span className="text-sm text-gray-400">Photos</span>
						</div>
						<div className="lg:mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-gray-600">89</span><span className="text-sm text-gray-400">Comments</span>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center">
				<h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
					{user.name}
				</h3>
				<div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
					<i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
					{regionNames.of(user.locale)}
				</div>
			</div>
			<div className="flex flex-wrap gap-y-6 justify-center mb-12">
				{
					getAllRootStockNFTs().map((nft) => (
						<NFT {...nft} />
					))
				}
			</div>
		</div>
	)
}

export default Profile
