import React from 'react'
import Navbar from '../components/Navbar'
import { google, nftData } from '../data'
import NFT from '../components/NFT';

function Profile() {
	const regionNames = new Intl.DisplayNames(['en'], {
		type: 'language'
	});

	return (
		<section className="bg-secondary-500 poster pt-4 relative text-opacity-60 text-white sm:px-4">
			<Navbar />
			<div className="container mx-auto pb-44 pt-16 px-4 relative py-8">
				<main className="mt-80">
					<div className="container mx-auto px-4">
						<div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="flex flex-wrap justify-center">
								<div className="w-full px-4 flex justify-center">
									<img src={google.picture} className="shadow-xl rounded-full w-1/12 align-middle border-none absolute -translate-y-16" />
								</div>
								<div className="w-full flex justify-between">
									<div className="py-6 mt-32 sm:mt-0">
										<p className="text-lg text-gray-600 font-medium">User ID: {google.id}</p>
										<div className="w-full">
											<div className="flex justify-center py-4 lg:pt-4 pt-8">
												<div className="mr-4 p-3 text-center">
													<span className="text-xl font-bold block uppercase tracking-wide text-gray-600">22</span><span className="text-sm text-gray-400">Friends</span>
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
								</div>
							</div>
							<div className="text-center">
								<h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700 mb-2">
									{google.name}
								</h3>
								<div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
									<i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
									{regionNames.of(google.locale)}
								</div>
							</div>
							<div className="-mx-3 flex flex-wrap gap-y-6 justify-center mb-12 z-50">
								{
									nftData.map((nft) => (
										<NFT {...nft} />
									))
								}
							</div>
						</div>
					</div>
				</main >
			</div>
		</section>
	)
}

export default Profile
