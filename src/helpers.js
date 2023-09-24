import axios from "axios";

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

export const mintNFT = async (data, metadata) => {
    // return true after 3s
    const tx = new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 3000)
    })

    if (tx) {
        console.log(data)
        await axios.post(`${process.env.REACT_APP_NODE1_ENDPOINT}/storages`, { data })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return tx
}

export const getNFTs = async ({ userId, listing, isRootStock, privateMeta }) => {
    let nfts
    await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/storages`)
        .then(res => { nfts = res.data })
        .catch(error => console.log(error));


    let res
    if (userId) {
        res = nfts.filter(nft => nft.data.userId === userId)
    }
    if (listing) {
        res = res.filter(nft => nft.data.listing === listing)
    }
    if (isRootStock) {
        res = res.filter(nft => nft.data.isRootStock === isRootStock)
    }
    if (privateMeta) {
        res = res.filter(nft => nft.data.privateMeta === privateMeta)
    }

    return res
}

export const getUsers = async () => {
    let users
    await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/wallets`)
        .then(res => { users = res.data })
        .catch(error => console.log(error));

    return users
}