import axios from "axios";
import { createToken } from "./scripts";
import { getInfoUser } from "./storage/local";
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
export const getMetadata = async (ntfId) => {
    let success = true;
    const accessToken = getInfoUser().tokens.accessToken;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    if (success) {
        await axios.get(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas/${ntfId}`,
            {
                headers
            }
        )
            .then(res => { console.log(res) })
            .catch(() => { success = false })
    }
}
export const mintNFT = async (data, metadata) => {
    // return true after 3s
    let success = true

    let a = createToken(data.thumbnail, data.price, data.promptPrice)

    console.log(a)

    if (success) {
        await axios.post(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/storages`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => { console.log(res) })
            .catch(() => { success = false })

        console.log({ id: data.nftId.toString(), meta: metadata })

        await axios.post(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/metadatas`,
            { id: data.nftId.toString(), meta: metadata },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => { console.log(res) })
            .catch(() => { success = false })
    }

    return success
}

export const handleUserExists = async (data) => {
    let oldUser

    await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/users/${data.id ?? ''}`)
        .then(res => { oldUser = res.data })
        .catch(error => { });

    let conflict = false
    if (oldUser) {
        Object.keys(data).forEach(key => {
            if (data[key] !== oldUser[key]) {
                conflict = true
            }
        })
        console.log(oldUser, conflict)
    } else {
        await postUser(data)
        return true
    }

    if (conflict) {
        await putUser(data)
    }
}

export const postUser = async (data) => {
    await axios.post(
        `${process.env.REACT_APP_NODE1_ENDPOINT}/users`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
    ).then(res => { console.log(res) })
        .catch(error => console.log(error));
}
export const putUser = async (data) => {
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

    // await _getNFTs(queryParams).then(res => nfts = res)

    return nfts
}
export const getUsers = async (id) => {
    let users

    await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/users/${id ?? ''}`)
        .then(res => { users = res.data })
        .catch(error => console.log(error));

    return users
}

export const emailToId = async (email) => {
    let users

    // await axios.get(`${process.env.REACT_APP_NODE1_ENDPOINT}/users/${email}`)
    //     .then(res => { users = res.data })
    //     .catch(error => console.log(error));

    await getUsers().then(res => users = res)
    return users.find(user => user.email === email).id
}