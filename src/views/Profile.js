import { useEffect, useState } from 'react'
import NFT from '../components/NFT';
import { getNFTs, emailToId } from '../helpers'
import { MdOutlineLanguage } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
	const regionNames = new Intl.DisplayNames(['en'], {
		type: 'language'
	});

	const [nfts, setNFTs] = useState([])
	const [onQuery, setOnQuery] = useState(true)
	const [email, setEmail] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		setOnQuery(true)
		getNFTs({ userId: user.id }).then(res => setNFTs(res))
		setOnQuery(false)
	}, [user])

	const search = async () => {
		const id = await emailToId(email)
		navigate(`/profile/${id}`)
	}

	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-wrap mb-32 -mt-14 relative">
				<div className="w-full justify-center flex place-items-center place-content-center absolute left-0 top-5 flex-col">
					<img src={user.picture} className=" shadow-xl rounded-full xl:w-1/12 lg:w-1/6 md:w-1/5 w-1/4" alt="..." />
					<div className="text-center">
						<h3 className="text-4xl font-semibold leading-normal my-2 text-gray-700">
							{user.name}
						</h3>
						<div className="mt-0 mb-2 text-gray-500 font-bold flex justify-center items-center gap-5">
							<div className="gap-2 flex items-center">
								<MdOutlineLanguage className="font-bold text-xl text-gray-500" />
								{regionNames.of(user.locale)}
							</div>
							<div className="gap-2 flex items-center">
								<HiOutlineMail className="font-bold text-xl text-gray-500" />
								{user.email}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex text-center justify-between items-center top-0 h-40 z-20 ">
					<div className="w-min flex text-center justify-between items-center lg:gap-x-10 sm:gap-x-5 gap-x-2">
						<div className="">
							<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
								{onQuery ? "..." : nfts.length}
							</h3>
							<span className="text-base text-gray-200">NFTs</span>
						</div>
						<div className="">
							<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
								{onQuery ? "..." : nfts.filter(nft => !nft.isRootStock).length}
							</h3>
							<span className="text-base text-gray-200">Ordinals</span>
						</div>
						<div className="">
							<h3 className="text-3xl font-bold block uppercase tracking-wide text-white">
								{onQuery ? "..." : nfts.filter(nft => nft.listing).length}
							</h3>
							<span className="text-base text-gray-200">Listings</span>
						</div>
					</div>
					<div className="z-20 bg-white border border-gray-300 flex p-1 rounded-full">
						<input className="appearance-none rounded-full flex-1 outline-none px-4 py-1 text-gray-600 w-full" placeholder="Find user by email address" type="text" required="" onChange={(e) => setEmail(e.target.value)} />
						<button onClick={() => search()}
							type="submit" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block p-2 rounded-full text-white to-primary-400" aria-label="search">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em">
								<g>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
								</g>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-y-6 justify-center">
				{
					onQuery ?
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
						: nfts.length === 0 ?
							<div className="text-center">
								<p className="text-2xl font-semibold leading-normal mb-2 text-gray-500">
									This user has no NFTs
								</p>
							</div>
							:
							nfts.map((nft) => (
								<NFT {...nft} />
							))
				}
			</div>
		</div>
	)
}

export default Profile
