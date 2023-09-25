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
    let success = new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 3000)
    })

    if (success) {
        await axios.post(
            `${process.env.REACT_APP_NODE1_ENDPOINT}/storages`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
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

    // if (id) {
    //     users = users.filter(user => user.id === id)
    // }

    // await _getUsers(id).then(res => users = res)

    return users
}