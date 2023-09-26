export const logo = "https://tailus.io/sources/blocks/social/preview/images/icon.svg";
export const rskLogo = "https://www.nicepng.com/png/full/193-1937174_bitcoin-smart-contact-developer-rsk-releases-mainnet-rsk.png"
export const btcLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"

export const _getNFTMeta = async (id) => {
    return allNFTsMeta[0]
}
export const _getNFTs = async (queryParams) => {
    let nfts = allNFTs

    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] !== null) {
            nfts = nfts.filter(nft => nft[key] === queryParams[key])
        }
    })

    return nfts
}
export const _getUsers = async (id) => {
    let users = allUsers

    if (id) {
        users = users.filter(user => user.id === id)
    }

    return users
}


const wallet = {
    "ordinals": {
        "address": "0x343d8e66BC743077e167927fa65d6c5006E1CD69",
        "privKey": "8f9e8f7c887de61397026509aed01e0fd4645abce19c34bf0285c2079fcc3f08"
    },
    "rootStock": {
        "address": "0x343d8e66BC743077e167927fa65d6c5006E1CD69",
        "privKey": "8f9e8f7c887de61397026509aed01e0fd4645abce19c34bf0285c2079fcc3f08"
    }
}
const allUsers = [
    {
        "id": "107107815598415229539",
        "email": "aswdqe1x@gmail.com",
        "verified_email": true,
        "name": "Hữu Thuận Nguyễn",
        "given_name": "Hữu Thuận",
        "family_name": "Nguyễn",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocL3VMXnk2HtNO0W5GzgOd0060Q0dYUlyZ45_EivKiI_7zE=s96-c",
        "locale": "vi"
    },
    {
        "id": "107108710111255201784",
        "email": "nguyenhuuthuan25112003@gmail.com",
        "verified_email": true,
        "name": "Hữu Thuận Nguyễn",
        "given_name": "Hữu Thuận",
        "family_name": "Nguyễn",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocK720qhR5B7SCBLly1PYakrNwDRI62C2epchJiveRNlVJg=s96-c",
        "locale": "vi"
    }
]

const allNFTsMeta = [
    {
        id: "44139885",
        meta: {
            H: 768,
            W: 512,
            enable_attention_slicing: "true",
            file_prefix: "cc63a9e3-f11b-47e7-a85c-ceb24cc855c5",
            guidance_scale: 7.5,
            instant_response: "no",
            model: "runwayml/stable-diffusion-v1-5",
            n_samples: 1,
            negative_prompt: "(child:1.5), ((((underage)))), ((((child)))), (((kid))), (((preteen))), (teen:1.5) ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy",
            outdir: "out",
            prompt: "a sexy girl hyperrealistic, full body, detailed clothing, highly detailed, cinematic lighting, stunningly beautiful, intricate, sharp focus, f/1. 8, 85mm, (centered image composition), (professionally color graded), ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, HDR 4K, 8K",
            revision: "fp16",
            safety_checker: "no",
            seed: 3693478389,
            steps: 20,
            vae: "stabilityai/sd-vae-ft-mse"
        }
    }
]

const allNFTs = [
    {
        userId: "107107815598415229539",
        nftId: "44139885",
        nftName: "Space and Gone",
        price: "21335",
        thumbnail: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDI5M3x8M2QlMjByZW5kZXJ8ZW58MHx8fHwxNjM4OTE4NDE3&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=400&h=400&fit=crop",
        listing: true,
        isRootStock: true,
        metaPrice: "123",
        allowedUsers: ["107107815598415229539", "107108710111255201784"],
    },
    {
        nftName: "An Apple You Can't Eat",
        nftId: "44139886",
        userId: "107107815598415229539",
        price: "3425",
        thumbnail: "https://images.unsplash.com/photo-1630313877297-8773445184b9?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: false,
        isRootStock: false,
        privateMeta: true,
        allowedUsers: ["107107815598415229539", "107108710111255201784"],
    },
    {
        nftName: "A nightmare",
        nftId: "44139887",
        userId: "107108710111255201784",
        price: "5320",
        thumbnail: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDU2fHxkaWdpdGFsJTIwYXJ0JTIwcmVuZGVyfGVufDB8fHx8MTYzODkxODA2Nw&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: false,
        isRootStock: true,
        privateMeta: true,
        allowedUsers: ["107107815598415229539", "107108710111255201784"],
    },
    {
        nftName: "Mushrooms",
        nftId: "44139888",
        userId: "107108710111255201784",
        price: "1200",
        thumbnail: "https://images.unsplash.com/photo-1634832413517-7f48f67e3da4?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDkwfHxkaWdpdGFsJTIwcGFpbnRpbmd8ZW58MHx8fHwxNjM4OTE4NTUx&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: true,
        isRootStock: true,
        privateMeta: true,
        allowedUsers: ["107107815598415229539", "107108710111255201784"],
    },
    {
        nftName: "Broken Hand",
        nftId: "44139889",
        userId: "107107815598415229539",
        price: "90",
        thumbnail: "https://images.unsplash.com/photo-1636975262325-a0c611796b4a?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDV8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8fHwxNjM4ODI2MzM4&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: false,
        isRootStock: false,
        privateMeta: true,
        allowedUsers: ["107107815598415229539", "107108710111255201784"],
    },
]