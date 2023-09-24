export const logo = "https://tailus.io/sources/blocks/social/preview/images/icon.svg";

export const getWallet = () => {
    return wallet.data
}
export const getAllNFTs = (userName) => {
    return allRootStockNFTs.filter(nft => nft.userName === userName)
}
export const getAllOrdinalsNFTs = () => {
    return allRootStockNFTs[0]
}
export const getAllRootStockNFTs = () => {
    return allRootStockNFTs
}
export const getAllUsers = () => {
    return allUsers
}
export const getAllNFTsByUserId = (userId) => {
    return allRootStockNFTs.filter(nft => nft.userId === userId)
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

const allRootStockNFTs = [
    {
        nftName: "Space and Gone",
        userId: "107107815598415229539",
        price: "245",
        thumbnail: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDI5M3x8M2QlMjByZW5kZXJ8ZW58MHx8fHwxNjM4OTE4NDE3&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=400&h=400&fit=crop",
        listing: true,
        isRootStock: true,
    },
    {
        nftName: "An Apple You Can't Eat",
        userId: "107107815598415229539",
        price: "3425",
        thumbnail: "https://images.unsplash.com/photo-1630313877297-8773445184b9?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: true,
        isRootStock: true,
    },
    {
        nftName: "A nightmare",
        userId: "107108710111255201784",
        price: "5320",
        thumbnail: "https://images.unsplash.com/photo-1634832413517-7f48f67e3da4?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDkwfHxkaWdpdGFsJTIwcGFpbnRpbmd8ZW58MHx8fHwxNjM4OTE4NTUx&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: false,
        isRootStock: true,
    },
    {
        nftName: "Mushrooms",
        userId: "107108710111255201784",
        price: "1200",
        thumbnail: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDU2fHxkaWdpdGFsJTIwYXJ0JTIwcmVuZGVyfGVufDB8fHx8MTYzODkxODA2Nw&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: true,
        isRootStock: true,
    },
    {
        nftName: "Broken Hand",
        userId: "107107815598415229539",
        price: "90",
        thumbnail: "https://images.unsplash.com/photo-1636975262325-a0c611796b4a?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDV8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8fHwxNjM4ODI2MzM4&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=600&h=600&fit=crop",
        listing: false,
        isRootStock: false,
    },
]