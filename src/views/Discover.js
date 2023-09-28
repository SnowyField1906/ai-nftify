import { useEffect, useState } from "react";

import NFT from "../components/NFT";
import { formatNFTs, getNFTs } from "../helpers";
import { getAllNFTs } from "../scripts";

export default function Discover() {
	const [queryParams, setQueryParams] = useState({
		userId: null,
		listing: null,
		isRootStock: null,
		privateMeta: null,
	})
	const [nfts, setNFTs] = useState([])
	const [onQuery, setOnQuery] = useState(true)
	const [search, setSearch] = useState("")


	useEffect(() => {
		const fetchData = async () => {
			setOnQuery(true);
			try {
				const res = await getAllNFTs();
				const formattedNFTs = await formatNFTs(res);

				if (search !== "") {
					const newNFTs = res.filter(nft => nft.nftName.toLowerCase().includes(search.toLowerCase()));
					setNFTs(newNFTs);
				} else {
					setNFTs(formattedNFTs);
				}
			} catch (error) {
				console.error('Error fetching and formatting NFTs:', error);
			} finally {
				setOnQuery(false);
			}
		};

		fetchData();
	}, [queryParams, search]);



	return (
		<>
			<div className="flex flex-wrap gap-2 items-center mb-6">
				<div className="w-full z-10 flex justify-between items-center">
					<h1 className="font-extrabold text-4xl text-white mix-blend-lighten">Explore our exhibition</h1>
					<div className="bg-white border border-gray-300 flex p-1 rounded-full">
						<input className="appearance-none rounded-full flex-1 outline-none px-5 py-1 text-gray-600 w-full" placeholder="Find your next NFTs" type="text" required="" onChange={(e) => setSearch(e.target.value)} />
						<button type="submit" className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block p-2 rounded-full text-white to-primary-400" aria-label="search">
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
			<div className="flex flex-wrap gap-y-6 justify-center my-12">
				{
					onQuery ?
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
						: nfts.length === 0 ?
							<div className="text-center">
								<p className="text-2xl font-semibold leading-normal my-2 text-gray-500">
									No NFTs found
								</p>
							</div>
							:
							nfts.map((nft) => (
								<NFT {...nft} />
							))
				}
			</div>
		</>
	);
}