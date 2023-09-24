import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import { logo } from "../data";
import { getInfoUser, storeInfoUser } from "../storage/session";

export default function Navbar() {
	let [loginPopup, setLoginPopup] = useState(false);
	let [googleData, setGoogleData] = useState(null);
	let [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setGoogleData(getInfoUser());
	}, [loginPopup, success]);

	const logout = () => {
		storeInfoUser(null);
		setGoogleData(null);
		setSuccess(false);
		navigate("/")
	}

	const setting = () => {

	}

	const manageNFT = () => {

	}

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
						<div className="flex flex-col ml-auto lg:flex-row mr-10">
							<Link to="/generate" className="font-semibold text-lg hover:text-white py-2 text-opacity-60 text-gray-300 lg:p-4 xl:px-6">Generate</Link>
							<Link to="/drops" className="font-semibold text-lg hover:text-white py-2 text-opacity-60 text-gray-300 lg:p-4 xl:px-6">Drops</Link>
							<Link to="/discover" className="font-semibold text-lg hover:text-white py-2 text-opacity-60 text-gray-300 lg:p-4 xl:px-6">Discover</Link>
						</div>
						{
							googleData ? (
								<div className="group relative inline-block ml-auto lg:flex-row items-center">
									<Link to="/profile" className="flex items-center justify-center">
										<img src={googleData.picture} className="h-8 w-8 rounded-full mr-2" alt="profile" />
										<span className="font-semibold text-lg hover:text-white py-2 text-opacity-60 text-gray-300">{googleData.name}</span>
									</Link>
									<ul className="absolute hidden text-gray-700 group-hover:block w-full bg-gray-200 p-2 rounded-lg">
										<li className="">
											<button onClick={() => manageNFT()} className="x-2 rounded hover:bg-primary-700 hover:text-white py-2 px-4 block whitespace-no-wrap font-semibold w-full text-left">Manage NFTs</button>
										</li>
										<li className="">
											<button onClick={() => setting()} className="x-2 rounded hover:bg-primary-700 hover:text-white py-2 px-4 block whitespace-no-wrap font-semibold w-full text-left">Settings</button>
										</li>
										<div className="h-[1px] bg-gray-400 my-2" ></div>
										<li className="">
											<button onClick={() => logout()} className=" font-semibold text-left rounded hover:bg-red-800 py-2 px-4 block whitespace-no-wrap w-full text-red-800 hover:text-white">Logout</button>
										</li>
									</ul>
								</div>
							) : (
								<div className="flex flex-col ml-auto lg:flex-row">
									<button onClick={() => setLoginPopup(true)} className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-800 hover:from-primary-600 hover:to-primary-500 inline-block px-6 py-2 rounded text-white to-primary-400">Join Now</button>
								</div>
							)
						}
					</div>
				</nav>
			</div>
		</>
	);
}