import React, { useEffect, useState } from "react";

import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import NFT from "../components/NFT";
import { getAllRootStockNFTs } from "../data";
import NFTPreview from "../components/NFTPreview";

export default function Drops() {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * getAllRootStockNFTs().length);
			setCurrentSlideIndex(randomIndex);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="-mx-4 flex flex-wrap items-center space-y-6 lg:space-y-0">
			<div className="px-4 w-full lg:w-6/12 xl:w-5/12">
				<NFTPreview {...getAllRootStockNFTs()[currentSlideIndex]} />
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
	);
}