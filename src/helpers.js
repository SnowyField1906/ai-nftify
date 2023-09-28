import axios from "axios";
import { getInfoUser } from "./storage/local";
import { buyPrompt, createToken, executeSale, getMyPrompts, transferNFTs, updatePromptPrices, updateTokenPrices } from "./scripts";
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
    await createToken(data.thumbnail, data.price, data.promptPrice).then(res => success = res.status === 1)

    if (success) {
        await axios.post(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/storages`,
            {
                nftId: data.nftId,
                nftName: data.nftName,
                thumbnail: data.thumbnail,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).catch(() => { success = false })

        await axios.post(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas`,
            { id: data.nftId, meta: metadata },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).catch(() => { success = false })
    }

    return success
}

export const getAllMyPrompts = async () => {
    let nftIds = await getMyPrompts()

    return nftIds
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

export const transferToAddress = async (ids, to) => {
    let success
    await transferNFTs(ids, to).then(res => success = res.status === 1)
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



export const getNFTBackEnd = async (id) => {
    let nft

    await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/storages/${id}`)
        .then(res => { nft = res.data })
        .catch(error => console.log(error));

    return nft
}

export const formatNFT = async (nft) => {
    const nftBackend = await getNFTBackEnd(nft[0])

    return {
        thumbnail: nftBackend.thumbnail,
        nftName: nftBackend.nftName,
        nftId: nft[0].toString(),
        ownerAddress: nft[1],
        price: Big(nft[2]).divide(1e18).toString(),
        promptPrice: Big(nft[3]).divide(1e18).toString(),
        allowedUsers: nft[4],
        isRootStock: true,
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
