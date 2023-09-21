import React from "react";

export default function Footer() {
	return (
		<footer className="relative bg-gray-800 pt-8">
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
						<h2 className="capitalize font-bold mb-4 text-3xl text-white">Explore &bull; Create &bull; Trade</h2>
						<p className="font-light fw-light mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar faucibus neque, nec rhoncus nunc ultrices sit amet. Curabitur ac sagittis neque, vel egestas est.</p>
						<a href="#" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">Register Now</a>
					</div>
				</div>
			</section>
		</footer>
	);
}