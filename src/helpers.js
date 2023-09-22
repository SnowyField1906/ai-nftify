import { nftData } from "./data"

export const getAllCreators = () => {
    return nftData.map((nft) => nft.userName)
}

export const getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
        redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT,
        client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: '/',
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};

export const generateImage = async (prompt) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(prompt);

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