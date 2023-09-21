import { nftData } from "./data"

export const getAllCreators = () => {
    return nftData.map((nft) => nft.userName)
}