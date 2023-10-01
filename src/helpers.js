import axios from "axios";
import { getInfoUser } from "./storage/local";
import { buyPrompt, createToken, executeSale, getAllNFTs, getCurrentToken, getMyNFTs, getMyPrompts, getNFTsFromAddress, transferNFTs, updatePromptPrices, updateTokenPrices, bridgeNFT, burnBridgedToken, withdrawNFTs } from "./scripts";
import { isArray } from "lodash";
import Web3 from 'web3'
const { Big } = require('bigdecimal.js');

export const generateImage = async (prompt) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({ key: process.env.REACT_APP_STABLE_DIFFUSION_API, ...prompt });

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	let response

	await fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
		.then(response => response.text())
		.then(result => response = JSON.parse(result))
		.catch(error => console.log('error', error));

	return response
}

export const fetchImage = async (id) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
		key: process.env.REACT_APP_STABLE_DIFFUSION_API_KEY,
		request_id: id
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	let response

	await fetch("https://stablediffusionapi.com/api/v4/dreambooth/fetch", requestOptions)
		.then(response => response.text())
		.then(result => response = JSON.parse(result))
		.catch(error => console.log('error', error));

	return response
}

export const postWallet = async (data, access_token) => {
	await axios.post(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/address`,
		data,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			}
		}
	)
}

export const buyNFT = async (id, price, idUserSold) => {
	let success

	await executeSale(id, price).then(res => success = res.status === 1)

	if (success) {
		const buyerId = getInfoUser().data.id;
		let buyerRanking = await getRanking(buyerId);
		buyerRanking.numPurchased += 1;

		await updateRanking(buyerRanking, idUserSold).catch(e => { success = false })
	}
	return success
}

export const buyNFTPrompt = async (id, promptPrice, idUserSold) => {
	let success

	await buyPrompt(id, promptPrice).then(res => success = res.status === 1)

	if (success) {
		const buyerId = getInfoUser().data.id;
		let buyerRanking = await getRanking(buyerId);
		buyerRanking.numPromptPurchased += 1;

		await updateRanking(buyerRanking, idUserSold).catch(e => { success = false })
	}
	return success
}

export const getRanking = async (id) => {
	let ranking

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/rankings/${id ?? ''}`)
		.then(res => { ranking = res.data })
		.catch(error => console.log(error));

	return ranking
}

export const updateRanking = async (data, idUserSold) => {
	const access_token = getInfoUser().tokens.access_token;

	axios.put(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/rankings`,
		{ ...data, idUserSold },
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			}
		}
	)
}

export const getAddressByUser = async (id) => {
	let address

	await axios.get(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/address/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			}
		}
	).then(res => { address = res.data })

	return address
}

export const getWalletByEmail = async (email) => {
	let wallet

	await axios.get(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/wallets/${email}`,
		{
			headers: {
				'Content-Type': 'application/json',
			}
		}
	).then(res => { wallet = res.data })

	return wallet
}

export const checkAddressExists = async (email) => {
	let exists

	await axios.get(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/address/${email}`,
		{
			headers: {
				'Content-Type': 'application/json',
			}
		}
	).then(res => { exists = res.data })
		.catch(error => { exists = null })

	return exists
}

export const mintNFT = async (data, metadata) => {
	let success

	if (data.isRootStock) {
		let nftId
		await getCurrentToken().then(res => nftId = (res + 1n).toString())

		await createToken(data.thumbnail, data.price, data.promptPrice).then(res => success = res.status === 1)

		if (success) {
			await axios.post(
				`${process.env.REACT_APP_NODE1_ENDPOINT}/storages`,
				{
					nftId: nftId,
					nftName: data.nftName,
					thumbnail: data.thumbnail,
				},
				{
					headers: { 'Content-Type': 'application/json' }
				}
			).catch((error) => { success = false; console.log(error) })

			await axios.post(
				`${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas`,
				{ id: nftId, meta: metadata },
				{
					headers: { 'Content-Type': 'application/json' }
				}
			).catch((error) => { success = false; console.log(error) })
		}
	} else {
		let address = getInfoUser().key.data.btcAddress
		let response

		await axios.post(
			`${process.env.REACT_APP_BTC_ENDPOINT}/inscribeOrd`,
			{
				address: address,
				imageLink: data.thumbnail,
			},
			{
				headers: {}
			}
		)
			.then(res => { response = res.data; success = true; console.log(res) })
			.catch(error => { success = false; console.log(error) })

		if (success) {
			let nftId = response.inscription

			await axios.post(
				`${process.env.REACT_APP_NODE1_ENDPOINT}/ordinals`,
				{
					nftId: nftId,
					owner: address,
					price: 0,
					promptPrice: 0,
					promptBuyer: [address],
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${getInfoUser().tokens.access_token}`,
					}
				}
			).catch(() => { success = false })

			if (success) {
				await axios.post(
					`${process.env.REACT_APP_NODE1_ENDPOINT}/storages`,
					{
						nftId: nftId,
						nftName: data.nftName,
						thumbnail: data.thumbnail,
					},
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).catch(() => { success = false })

				await axios.post(
					`${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas`,
					{ id: nftId, meta: metadata },
					{
						headers: { 'Content-Type': 'application/json' }
					}
				).catch(() => { success = false })
			}
		}
	}

	return success
}

export const getMyPromptsForBothChain = async () => {
	let rootStock = await getMyPrompts()
	let ordinals = await getOrdinalsNFTs(getInfoUser().key.data.btcAddress)

	return [...rootStock, ...ordinals]
}

export const getMyNFTsForBothChain = async () => {
	let rootStock = await getMyNFTs()
	let ordinals = await getOrdinalsNFTs(getInfoUser().key.data.btcAddress)

	return [...rootStock, ...ordinals]
}


export const getPromptById = async (id) => {
	let prompt
	const access_token = getInfoUser().tokens.access_token;
	await axios.get(
		`${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			}
		}
	).then(res => { prompt = res.data })
	return prompt
}

export const editPrices = async (ids, price) => {
	let success
	await updateTokenPrices(ids, price).then(res => success = res.status === 1)
	return success
}

export const editPromptPrices = async (ids, promptPrice) => {
	let success
	await updatePromptPrices(ids, promptPrice).then(res => success = res.status === 1)
	return success
}

export const getBridgedNFT = async (id) => {
	let fullId

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/bridges/${id}`)
		.then(res => { fullId = res.data })
		.catch(error => { fullId = null });

	return fullId
}

export const bridgeNFTs = async (ids, isRootStock) => {
	let success = true
	const access_token = getInfoUser().tokens.access_token;
	const address = getInfoUser().key.data.btcAddress

	if (isRootStock) { //claim
		let fullIds = []
		await Promise.all(ids.map(async (id) => {
			await getBridgedNFT(id).then(res => fullIds = [...fullIds, res])
		}))

		await Promise.all(fullIds.map(async (fullId) => {
			await burnBridgedToken(fullId.nftId).catch(() => { success = false })

			await axios.post(
				`${process.env.REACT_APP_BTC_ENDPOINT}/claimOrdFromBridge`,
				{
					ordId: fullId.ordId,
					address: address
				},
				{
					headers: {}
				}
			).catch(() => { success = false })

			console.log(`${process.env.REACT_APP_NODE1_ENDPOINT}/bridges/${fullId.ordId}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${access_token}`,
					}
				})

			await axios.delete(
				`${process.env.REACT_APP_NODE1_ENDPOINT}/bridges/${fullId.ordId}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${access_token}`,
					}
				}
			).catch(() => { success = false })
		}))
	} else {
		await Promise.all(ids.map(async (id) => {
			await axios.post(
				`${process.env.REACT_APP_BTC_ENDPOINT}/bridgeOrd`,
				{
					ordId: id,
					address: address
				},
				{
					headers: {}
				}
			).catch(() => { success = false })

			const thumbnail = await axios.get(
				`${process.env.REACT_APP_NODE1_ENDPOINT}/storages/${id}`,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			).then(res => res.data.thumbnail)

			if (success) {
				let tokenId = await getCurrentToken().then(res => (res + 1n).toString())
				await bridgeNFT(thumbnail).catch(() => { success = false })

				await axios.post(
					`${process.env.REACT_APP_NODE1_ENDPOINT}/bridges`,
					{
						nftId: tokenId,
						ordId: id
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${access_token}`,
						}
					}
				).catch(() => { success = false })
			}
		}))
	}

	return success
}

export const transferToAddress = async (ids, to, isRootStock, isWithdraw) => {
	let success = true
	if (isRootStock) {
		if (isWithdraw) {
			await withdrawNFTs(ids, to).catch(() => { success = false })
		} else {
			await transferNFTs(ids, to).catch(() => { success = false })
		}
	} else {
		const access_token = getInfoUser().tokens.access_token;

		await Promise.all(ids.map(async (id) => {
			await axios.post(
				`${process.env.REACT_APP_BTC_ENDPOINT}/transferOrd`,
				{
					ordId: id,
					address: to,
				},
				{
					headers: {}
				}
			).catch(() => { success = false })

			if (success) {
				await axios.put(
					`${process.env.REACT_APP_NODE1_ENDPOINT}/ordinals`,
					{
						nftId: id,
						owner: to
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${access_token}`,
						}
					}
				).catch(() => { success = false })

			}
		}))
	}
	return success
}

export const getNFTs = async (queryParams) => {
	let nfts

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/storages`)
		.then(res => { nfts = res.data })
		.catch(error => console.log(error));

	Object.keys(queryParams).forEach(key => {
		if (queryParams[key] !== null) {
			nfts = nfts.filter(nft => nft[key] === queryParams[key])
		}
	})

	return nfts
}
export const getWallet = async (id) => {
	let wallet

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/address/${id ?? ''}`)
		.then(res => { wallet = res.data })
		.catch(error => { wallet = null });

	return wallet
}

export const getUsers = async (id) => {
	let users

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/users/${id ?? ''}`)
		.then(res => { users = res.data })
		.catch(error => { users = null });

	return users
}

export const getUserByAddress = async (address) => {
	let wallet = await getWallet(address)

	let users = await getUsers(wallet.id)

	return users
}

export const emailToId = async (email) => {
	let users

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/address/${email}`)
		.then(res => { users = res.data })
		.catch(error => console.log(error));

	return users?.id
}

export const getOrdinalsNFTs = async (id) => {
	let nfts

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/ordinals/${id ?? ''}`)
		.then(res => { nfts = res.data })
		.catch(error => console.log(error));

	return nfts
}

export const getNFTsForBothChain = async () => {
	let rootStock = []
	try {
		rootStock = await getAllNFTs();
	} catch (e) { }
	let ordinals = []
	try {
		ordinals = await getOrdinalsNFTs();
	} catch (e) { }

	return [...rootStock, ...ordinals]
}

export const getNFTsFromAddressForBothChain = async (rskAddress, btcAddress) => {
	let rootStock = []
	try {
		rootStock = await getNFTsFromAddress(rskAddress);
	} catch (e) { }
	let ordinals = []
	try {
		ordinals = await getOrdinalsNFTs(btcAddress);
	} catch (e) { }

	return [...rootStock, ...ordinals]
}

export const getNFTBackEnd = async (id) => {
	let nft

	await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/storages/${id ?? ''}`)
		.then(res => { nft = res.data })
		.catch(error => console.log(error));

	return nft
}

export const formatNFT = async (nft) => {
	const isRootStock = isArray(nft)
	nft = isRootStock ? nft : Object.values(nft).splice(1)

	const nftBackend = await getNFTBackEnd(nft[0])

	return {
		thumbnail: nftBackend.thumbnail,
		nftName: nftBackend.nftName,
		nftId: nft[0].toString(),
		ownerAddress: nft[1],
		price: Big(nft[2]).divide(1e18).toString(),
		promptPrice: Big(nft[3]).divide(1e18).toString(),
		allowedUsers: nft[4],
		isRootStock: isRootStock,
	}
}

export const formatNFTs = async (nfts) => {
	let formattedNFTs = [];

	for (const nft of nfts) {
		const formattedNFT = await formatNFT(nft);
		formattedNFTs.push(formattedNFT);
	}

	return formattedNFTs;
};


export const checkAddress = async (address, isRootStock) => {
	if (isRootStock) {
		try {
			await Web3.utils.toChecksumAddress(address)
		}
		catch (e) {
			return false
		}
		finally {
			return true
		}
	} else {
		if (address.length !== 55) {
			return false;
		} if (!address.startsWith("bcrt1p")) {
			return false;
		}

		return true;
	}
}