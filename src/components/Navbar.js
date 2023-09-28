import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { btcLogo, logo, rskLogo } from "../data";
import { getInfoUser, storeInfoUser } from "../storage/local";
import Advanced from "./Advanced";
import ManageNFTs from "./ManageNFTs";
import PurchasedData from "./PurchasedData";
import { getBalance } from "../scripts";

export default function Navbar() {
	let [loginPopup, setLoginPopup] = useState(false);
	let [googleData, setGoogleData] = useState(null);
	let [success, setSuccess] = useState(false);

	const [rskBalance, setRskBalance] = useState(0)
	const [btcBalance, setBtcBalance] = useState(0)

	useEffect(() => {
		const info = getInfoUser();
		setGoogleData(info?.data);
		if (info?.data) {
			getBalance(info.key.data.ethAddress).then(res => {
				setBtcBalance(res); setRskBalance(res)
			})
		}
		setSuccess(true);
	}, [loginPopup, success]);

	const logout = () => {
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
		storeInfoUser(null);
		setGoogleData(null);
		setSuccess(false);
		// navigate("/");
	};

	const [advancedPopup, setAdvancedPopup] = useState(false);
	const advanced = () => {
		setAdvancedPopup(true);
		setManageNFTsPopup(false);
		setPurchasedDataPopup(false);
	};

	const [manageNFTsPopup, setManageNFTsPopup] = useState(false);
	const manageNFTs = () => {
		setManageNFTsPopup(true);
		setAdvancedPopup(false);
		setPurchasedDataPopup(false);
	};

	const [purchasedDataPopup, setPurchasedDataPopup] = useState(false);
	const purchasedData = () => {
		setPurchasedDataPopup(true);
		setAdvancedPopup(false);
		setManageNFTsPopup(false);
	};



	return (
		<>
			<div className="absolute bg-secondary-500 h-full inset-0 w-6/12 md:w-5/12 lg:w-4/12 select-none"></div>
			{(loginPopup ||
				(!googleData && !success && window.location.pathname !== "/")) && (
					<Login setSuccess={setSuccess} setLoginPopup={setLoginPopup} />
				)}
			{advancedPopup && <Advanced userId={googleData.id} setAdvancedPopup={setAdvancedPopup} />}
			{manageNFTsPopup && <ManageNFTs userId={googleData.id} setManageNFTsPopup={setManageNFTsPopup} />}
			{purchasedDataPopup && <PurchasedData userId={googleData.id} setPurchasedDataPopup={setPurchasedDataPopup} />}
			<div className="container mx-auto relative z-50">
				<nav className="flex flex-wrap items-center px-4 py-2">
					<Link
						to="/"
						className="font-bold gap-2 hover:text-primary-200 inline-flex items-center leading-none mr-4 text-3xl text-white"
					>
						<img src={logo} className="h-8 w-8" alt="logo" />
						<span className="uppercase hover:cursor-pointer">NFT Origin</span>
					</Link>
					<div
						className="flex-1 hidden space-y-2 w-full lg:flex lg:items-center lg:space-x-4 lg:space-y-0 lg:w-auto"
						data-name="nav-menu"
					>
						<div className="flex flex-col ml-auto lg:flex-row mr-10">
							<Link
								to="/generate"
								className="font-semibold text-lg hover:text-primary-200 py-2 text-white lg:p-4 xl:px-6"
							>
								Generate
							</Link>
							<Link
								to="/discover"
								className="font-semibold text-lg hover:text-primary-200 py-2 text-white lg:p-4 xl:px-6"
							>
								Discover
							</Link>
							<Link
								to="/leaderboard"
								className="font-semibold text-lg hover:text-primary-200 py-2 text-white lg:p-4 xl:px-6"
							>
								Leaderboard
							</Link>
						</div>
						<div className="w-1/5 flex place-content-end">
							{typeof googleData === "object" &&
								googleData !== null &&
								Object.keys(googleData).length !== 0 ? (
								<div className="group relative inline-block ml-auto lg:flex-row">
									<Link
										to={"/profile/" + googleData.id}
										className="flex items-center justify-center"
									>
										<img
											src={googleData.picture}
											className="h-8 w-8 rounded-full mr-2"
											alt="profile"
										/>
										<span className="font-semibold text-lg group-hover:text-primary-200 py-2 text-white">
											{googleData.name}
										</span>
									</Link>
									<ul className="absolute hidden group-hover:block  text-gray-700 w-max  right-0">
										<div className="h-3 invisible"></div>
										<div className=" bg-gray-100 drop-shadow-2xl p-2 rounded-lg">
											<li className="flex select-none px-4 items-center">
												<img src={btcLogo} className="h-6 w-6 rounded-full mr-2" alt="profile" />
												<span className="font-bold text-amber-600 text-sm py-2">
													{parseFloat(btcBalance).toFixed(6)} BTC
												</span>
											</li>
											<li className="flex select-none px-4 items-center">
												<img src={rskLogo} className="h-6 w-6 rounded-full mr-2" alt="profile" />
												<span className="font-bold text-amber-600 text-sm py-2">
													{parseFloat(rskBalance).toFixed(6)} BTC
												</span>
											</li>
											<div className="h-[1px] bg-gray-400 my-2"></div>
											<li className="">
												<button
													onClick={() => manageNFTs()}
													className="rounded hover:bg-primary-600 hover:text-white py-2 px-4 block whitespace-no-wrap font-semibold w-full text-left"
												>
													Manage NFTs
												</button>
											</li>
											<li className="">
												<button
													onClick={() => purchasedData()}
													className="rounded hover:bg-primary-600 hover:text-white py-2 px-4 block whitespace-no-wrap font-semibold w-full text-left"
												>
													Purchased Data
												</button>
											</li>
											<li className="">
												<button
													onClick={() => advanced()}
													className="rounded hover:bg-primary-600 hover:text-white py-2 px-4 block whitespace-no-wrap font-semibold w-full text-left"
												>
													Advanced
												</button>
											</li>
											<div className="h-[1px] bg-gray-400 my-2"></div>
											<li className="">
												<button
													onClick={() => logout()}
													className=" font-semibold text-left rounded hover:bg-red-700 py-2 px-4 block whitespace-no-wrap w-full text-red-700 hover:text-white"
												>
													Logout
												</button>
											</li>
										</div>
									</ul>
								</div>
							) : (
								<div className="flex flex-col ml-auto lg:flex-row">
									<button
										onClick={() => setLoginPopup(true)}
										className="h-12 w-40 text-lg text-center flex items-center justify-center font-bold rounded-full bg-gradient-to-r from-blue-500 to-primary-500 hover:from-blue-600 hover:to-primary-600 focus:outline-none text-white shadow-md p-5"
									>
										Join Now
									</button>
								</div>
							)}
						</div>
					</div>
				</nav >
			</div >
		</>
	);
}
