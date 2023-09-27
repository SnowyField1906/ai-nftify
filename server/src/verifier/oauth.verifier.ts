import axios from "axios";
import { User } from "src/schemas";
export async function verifyAccessToken(accessToken: string) {
    const userinfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
    const response = await axios.get(userinfoUrl, {
        headers: {
            Authorization: accessToken,
        },
    });
    const res: User = await response.data as User;
    return res;
}