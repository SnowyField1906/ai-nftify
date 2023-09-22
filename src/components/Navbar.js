import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { logo } from "../data";

export default function Navbar() {
	let [login, setLogin] = useState(false);
	let [loginPopup, setLoginPopup] = useState(false);

	return (
		<>
			{loginPopup && <Login setLoginPopup={setLoginPopup} />}
			<div className="absolute bg-secondary-500 h-full inset-0 w-6/12 md:w-5/12 lg:w-4/12"></div>
			<div className="container mx-auto relative">
				<nav className="flex flex-wrap items-center px-4 py-2">
					<Link to="/" className="font-bold gap-2 hover:text-gray-300 inline-flex items-center leading-none mr-4 text-3xl text-white">
						<img src={logo} className="h-8 w-8" alt="tailus logo" />
						<span className="uppercase z-20 hover:cursor-pointer">NFT Origin</span>
					</Link>
					<div className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto" data-name="nav-menu">
						<div className="flex flex-col ml-auto lg:flex-row">
							<Link to="/generate" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Generate</Link>
							<Link to="/drops" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Drops</Link>
							<Link to="/discover" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Discover</Link>
						</div>
						{
							login ? (
								<div className="flex flex-col ml-auto lg:flex-row">
									<Link to="/profile" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Profile</Link>
									<Link to="/logout" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Logout</Link>
								</div>
							) : (
								<div className="flex flex-col ml-auto lg:flex-row">
									<button onClick={() => setLoginPopup(true)} className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">Join Now</button>
								</div>
							)
						}
					</div>
				</nav>
			</div>
		</>
	);
}