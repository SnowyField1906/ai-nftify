import React, { useEffect, useState } from "react";

import NFTPreview from "../components/NFTPreview";
import { Link } from "react-router-dom";
import { getNFTs } from "../helpers";

export default function Landing() {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [nfts, setNFTs] = useState([])

	useEffect(() => {
		getNFTs({}).then(res => setNFTs(res))
	}, [])

	useEffect(() => {
		const intervalId = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * nfts.length);
			setCurrentSlideIndex(randomIndex);
		}, 3000);

		return () => clearInterval(intervalId);
	}, [nfts]);

	return (
		<div className="flex flex-wrap items-center space-y-6 lg:space-y-0">
			<div className="px-4 w-full lg:w-6/12 xl:w-5/12">
				<NFTPreview {...nfts[currentSlideIndex]} />
			</div>
			<div className="mx-auto px-4 w-full lg:w-6/12">
				<h1 className="font-bold leading-tight mb-2 text-4xl text-white md:leading-tight md:text-5xl lg:leading-tight lg:text-6xl 2xl:leading-tight 2xl:text-7xl">Create your own digital arts with AI</h1>
				<p className="text-white font-light mb-12 text-xl">Bitcoin's first NFT generator and marketplace.</p>
				<div className="flex flex-wrap gap-4 items-center">
					<Link to="/generate" className="h-12 w-40 text-lg text-center flex items-center justify-center font-bold rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none text-white shadow-md p-5">CREATE</Link>
					<Link to="/discover" className="h-12 w-40 text-lg text-center flex items-center justify-center font-bold bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none text-white shadow-md rounded-full p-5">EXPLORE</Link>
				</div>
			</div>
		</div>
	);
}