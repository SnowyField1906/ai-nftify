import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<div className="absolute bg-secondary-500 h-full inset-0 w-6/12 z-0 md:w-5/12 lg:w-4/12"></div>
			<div className="container mx-auto relative">
				<nav className="flex flex-wrap items-center px-4 py-2">
					<a href="#" className="font-bold gap-2 hover:text-gray-300 inline-flex items-center leading-none mr-4 text-3xl text-white">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.142 40" width="1.5em" height="1.5em" fill="currentColor">
							<path data-name="Path 7167" d="M20 40a20.005 20.005 0 0 1-7.785-38.428 19.983 19.983 0 0 1 21.927 4.286L29.895 10.1a14 14 0 1 0 0 19.79l4.247 4.247A19.937 19.937 0 0 1 20 40Z" />
							<path data-name="Path 7168" d="M20 14a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z" />
						</svg>
						<span className="uppercase">NFT Origin</span>
					</a>
					<button className="hover:bg-primary-500 hover:text-white ml-auto px-3 py-2 rounded text-white lg:hidden" data-name="nav-toggler" data-pg-ia='{"l":[{"name":"NabMenuToggler","trg":"click","a":{"l":[{"t":"^nav|[data-name=nav-menu]","l":[{"t":"set","p":0,"d":0,"l":{"class.remove":"hidden"}}]},{"t":"#gt# span:nth-of-type(1)","l":[{"t":"tween","p":0,"d":0.2,"l":{"rotationZ":45,"yPercent":300}}]},{"t":"#gt# span:nth-of-type(2)","l":[{"t":"tween","p":0,"d":0.2,"l":{"autoAlpha":0}}]},{"t":"#gt# span:nth-of-type(3)","l":[{"t":"tween","p":0,"d":0.2,"l":{"rotationZ":-45,"yPercent":-300}}]}]},"pdef":"true","trev":"true"}]}' data-pg-ia-apply="$nav [data-name=nav-toggler]">
						<span className="block border-b-2 border-current my-1 w-6"></span>
						<span className="block border-b-2 border-current my-1 w-6">

						</span>
						<span className="block border-b-2 border-current my-1 w-6"></span>
					</button>
					<div className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto" data-name="nav-menu">
						<div className="flex flex-col ml-auto lg:flex-row">
							<Link to="/generate" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Generate</Link>
							<Link to="/drops" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Drops</Link>
							<Link to="/marketplace" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Marketplace</Link>
						</div>
						<a href="#" className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">Join Now</a>
					</div>
				</nav>
			</div>
		</>
	);
}