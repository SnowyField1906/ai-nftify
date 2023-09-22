import {
    Body, Controller, Post,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";


@Controller("/oauth")
export class OauthController {
    oAuth2Client: OAuth2Client
    constructor(private configService: ConfigService) {
        this.oAuth2Client = new OAuth2Client(
            this.configService.get<string>("ggClientId"),
            this.configService.get<string>("ggClientSecret"),
            "postmessage"
        );
    }

    @Post("/google")
    async getOauth(@Body("code") code: string): Promise<GetTokenResponse["tokens"]> {
        const { tokens } = await this.oAuth2Client.getToken(code);
        return tokens;
    }

}