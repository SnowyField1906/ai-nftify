import React, { useEffect, useState } from "react";

import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import NFT from "../components/NFT";
import { nftData } from "../data";
import NFTPreview from "../components/NFTPreview";

export default function Landing() {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * nftData.length);
			setCurrentSlideIndex(randomIndex);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<section className="bg-secondary-500 poster pt-4 relative text-opacity-60 text-white sm:px-4">
				<Navbar transparent />
				<div className="container mx-auto pb-36 pt-16 px-4 relative my-8">
					<div className="-mx-4 flex flex-wrap items-center space-y-6 lg:space-y-0">
						<div className="px-4 w-full lg:w-6/12 xl:w-5/12">
							<NFTPreview {...nftData[currentSlideIndex]} />
						</div>
						<div className="mx-auto px-4 w-full lg:w-6/12">
							<h1 className="font-bold leading-tight mb-2 text-4xl text-white md:leading-tight md:text-5xl lg:leading-tight lg:text-6xl 2xl:leading-tight 2xl:text-7xl">Create your own digital arts with AI</h1>
							<p className="font-light mb-12 text-xl">Bitcoin's first NFT generator and marketplace.</p>
							<div className="flex flex-wrap gap-4 items-center">
								<a href="#" className="bg-gradient-to-t bg-gray-800 font-bold from-gray-800 hover:bg-gray-900 hover:from-gray-900 hover:to-gray-800 inline-block px-12 py-2 rounded text-white to-gray-700">Explore</a>
								<a href="#" className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-12 py-2 rounded text-white to-primary-400">Create</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-opacity-10 bg-primary-500 py-24 sm:px-4">
				<div className="container mx-auto px-4">
					<div className="-mx-4 flex flex-wrap gap-2 items-center mb-6">
						<div className="px-4 w-full md:flex-1">
							<h2 className="capitalize font-bold text-3xl text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="inline-block mb-2 mr-2 text-primary-500">
								<path d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z"></path>
							</svg><span>Hot Collectibles</span></h2>
						</div>
						<div className="px-4 w-full md:w-auto">
							<form>
								<div className="bg-white border border-gray-300 flex overflow-hidden p-1 rounded-full">
									<input className="appearance-none flex-1 outline-none px-4 py-1 text-gray-600 w-full" placeholder="Find your next NFTs" type="text" required="" />
									<button type="submit" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block p-2 rounded-full text-white to-primary-400" aria-label="search">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em">
											<g>
												<path fill="none" d="M0 0h24v24H0z"></path>
												<path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
											</g>
										</svg>
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="-mx-3 flex flex-wrap gap-y-6 justify-center mb-12">
						{
							nftData.map((nft) => (
								<NFT {...nft} />
							))
						}
					</div>
					<div className="text-center"><a href="#" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">View More</a>
					</div>
				</div>
			</section>
			<section className="bg-opacity-25 bg-primary-500 py-24 sm:px-4">
				<div className="container mx-auto px-4">
					<div className="-mx-4 flex flex-wrap gap-2 items-center mb-6">
						<div className="px-4 w-full md:flex-1">
							<h2 className="font-bold text-3xl text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="inline-block mb-2 mr-2 text-primary-500">
								<path d="M17 13a4 4 0 1 1 0 8c-2.142 0-4-1.79-4-4h-2a4 4 0 1 1-.535-2h3.07A3.998 3.998 0 0 1 17 13zM2 12v-2h2V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3h2v2H2z"></path>
							</svg><span>Creators of the Month</span></h2>
						</div>
						<div className="px-4 w-full md:w-auto"> <a href="#" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">View More Creators</a>
						</div>
					</div>
					<div className="-mx-3 flex flex-wrap gap-y-6 justify-center mb-12">
						<div className="px-3 w-full md:w-6/12"> <a href="#" className="block group overflow-hidden relative rounded-xl"><img src="https://images.unsplash.com/photo-1628359355624-855775b5c9c4?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE0fHxhcnRpc3R8ZW58MHx8fHwxNjM4OTQzNDMx&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=750&h=450&fit=crop" className="group-hover:opacity-90 w-full" alt="..." width="750" height="450" /><div className="absolute bg-gray-900 bg-opacity-75 bottom-0 flex group-hover:bg-opacity-60 inset-x-0 items-center justify-between p-4 text-white sm:px-6">
							<h3 className="font-bold">Automex</h3><span className="italic opacity-75">$100,000+</span>
						</div></a>
						</div>
						<div className="px-3 w-full md:w-6/12"> <a href="#" className="block group overflow-hidden relative rounded-xl"><img src="https://images.unsplash.com/photo-1572266042716-8d696acf2f6f?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDMyM3x8c3V2fGVufDB8fHx8MTYzMTY4Njc4Nw&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=750&h=450&fit=crop" className="group-hover:opacity-90 w-full" alt="..." width="750" height="450" /><div className="absolute bg-gray-900 bg-opacity-75 bottom-0 flex inset-x-0 items-center justify-between p-4 text-white sm:px-6">
							<h3 className="font-bold">Automex</h3><span className="italic opacity-75">$100,000+</span>
						</div></a>
						</div>
					</div>
					<div className="-mx-3 flex flex-wrap gap-y-6 justify-center mb-12">
						<div className="px-3 w-full sm:w-6/12">
							<h2 className="font-bold mb-6 text-2xl text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="inline-block mb-2 mr-2 text-primary-500">
								<path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" />
							</svg><span>Top Sellers</span></h2>
							<div className="-mx-3 flex flex-wrap gap-y-2">
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1594136976553-38699ae9047c?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Kaawesome</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1637717256696-a0204d03a8fe?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Maxina</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1632570695117-633536e178ff?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">StoneWs</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1501023956373-055b874f2929?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDMyMnx8ZGlnaXRhbCUyMGFydGlzdHxlbnwwfHx8fDE2Mzg5NDQyMTM&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Noonving</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
							</div>
						</div>
						<div className="px-3 w-full sm:w-6/12">
							<h2 className="font-bold mb-6 text-2xl text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="inline-block mb-2 mr-2 text-primary-500">
								<path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" />
							</svg><span>Top Buyers</span></h2>
							<div className="-mx-3 flex flex-wrap gap-y-2">
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1635244621620-ccadff2eb29d?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE2ODZ8fGRpZ2l0YWwlMjBhcnRpc3R8ZW58MHx8fHwxNjM4OTQ0NjY1&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">TinkerRed</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1637234852730-677079a9d718?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDV8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8fHwxNjM4ODI2MzM4&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Sixtemsat</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1613483811459-1c4bb7a234f6?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDU5fHxhcnRpc3R8ZW58MHx8fHwxNjM4OTQzNDkz&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Automex</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
								<div className="px-3 w-full xl:w-6/12"> <a className="gap-4 group inline-flex items-center text-gray-900" href="#"> <img src="https://images.unsplash.com/photo-1634114382698-00e5e4693b37?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDEwNzB8fGRpZ2l0YWwlMjBhcnRpc3R8ZW58MHx8fHwxNjM4OTQ0NDk1&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=100&h=100&fit=crop" className="border border-4 border-primary-500 group-hover:border-primary-700 rounded-lg" height="64" alt="Author image" width="64" /> <div>
									<h3 className="font-bold text-xl">Ballogen</h3>
									<p className="mb-0 opacity-50 text-black-50">$ 100,000+</p>
								</div></a>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center"><a href="#" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">View Leaderboard</a>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}