import {
    Body, Controller, Post,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { UserService, RankingService } from "src/services";
import { User, Ranking } from "src/schemas";
import { verifyAccessToken } from "src/verifier/oauth.verifier";
@Controller("/oauth")
export class OauthController {
    oAuth2Client: OAuth2Client
    constructor(private configService: ConfigService, private readonly userService: UserService, private readonly rankingService: RankingService) {
        this.oAuth2Client = new OAuth2Client(
            this.configService.get<string>("ggClientId"),
            this.configService.get<string>("ggClientSecret"),
            "postmessage"
        );
    }

    @Post("/google")
    async getOauth(@Body("code") code: string): Promise<GetTokenResponse["tokens"]> {
        const { tokens } = await this.oAuth2Client.getToken(code);
        const { access_token } = tokens;
        const user: User = await verifyAccessToken(`Bearer ${access_token}`);
        const existedUser = await this.userService.findUserById(user.id);
        if (!existedUser) {
            await this.userService.createUser(user);
            const newRanking: Ranking = {
                id: user.id,
                numSold: 0,
                numPurchased: 0,
                numPromptPurchased: 0,
                numPromptSold: 0
            }
            await this.rankingService.createRanking(newRanking);
        }
        else {
            if (existedUser.picture !== user.picture || existedUser.name !== user.name ||
                existedUser.locale !== user.locale || existedUser.verified_email !== user.verified_email ||
                existedUser.family_name !== user.family_name || existedUser.given_name !== user.given_name
            )
                await this.userService.updateUser(user);
            else return tokens;
        }
        return tokens;
    }
}