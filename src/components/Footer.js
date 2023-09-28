import React from "react";

export default function Footer() {
	return (
		<footer className="relative bg-gray-800 pt-8 z-0">
			<div
				className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
				style={{ height: "80px" }}
			>
				<svg
					className="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon
						className="text-gray-800 fill-current"
						points="2560 0 2560 100 0 100"
					></polygon>
				</svg>
			</div>
			<section className="bg-gray-800 pb-8 text-center text-gray-400 sm:px-4">
				<div className="container mx-auto px-4 relative">
					<div className="mx-auto w-full lg:w-8/12 xl:w-6/12">
						<h2 className="capitalize font-bold mb-4 text-3xl text-white">Explore &bull; Create &bull; Trade &bull; Walletless</h2>
						<p className="font-light fw-light mb-6">Liberate your creativity with NFTs powered by AI. Create, collect, and trade digital items secured by blockchain technology. Fully decentralized marketplace, no wallet required.</p>
					</div>
				</div>
			</section>
		</footer >
	);
}