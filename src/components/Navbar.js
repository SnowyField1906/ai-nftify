import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { logo } from "../data";
import { getInfoUser, storeInfoUser } from "../storage/session";

export default function Navbar() {
	let [loginPopup, setLoginPopup] = useState(false);
	let [googleData, setGoogleData] = useState(null);
	let [success, setSuccess] = useState(false);

	useEffect(() => {
		setGoogleData(getInfoUser());
	}, [loginPopup, success]);

	const logout = () => {
		storeInfoUser(null);
		setGoogleData(null);
		setSuccess(false);
	}

	console.log(loginPopup, !googleData, window.location.pathname !== "/")

	return (
		<>
			<div className="absolute bg-secondary-500 h-full inset-0 w-6/12 md:w-5/12 lg:w-4/12"></div>
			{(loginPopup || (!googleData && !success && window.location.pathname !== "/")) && <Login setSuccess={setSuccess} setLoginPopup={setLoginPopup} />}
			<div className="container mx-auto relative  z-50">
				<nav className="flex flex-wrap items-center px-4 py-2">
					<Link to="/" className="font-bold gap-2 hover:text-gray-300 inline-flex items-center leading-none mr-4 text-3xl text-white">
						<img src={logo} className="h-8 w-8" alt="tailus logo" />
						<span className="uppercase hover:cursor-pointer">NFT Origin</span>
					</Link>
					<div className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto" data-name="nav-menu">
						<div className="flex flex-col ml-auto lg:flex-row">
							<Link to="/generate" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Generate</Link>
							<Link to="/drops" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Drops</Link>
							<Link to="/discover" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Discover</Link>
						</div>
						{
							googleData ? (
								<div className="flex flex-col ml-auto lg:flex-row">
									<Link to="/profile" className="font-medium hover:text-gray-300 py-2 text-opacity-60 text-white lg:p-4 xl:px-6">Profile</Link>
									<button onClick={() => logout()} className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">Logout</button>
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