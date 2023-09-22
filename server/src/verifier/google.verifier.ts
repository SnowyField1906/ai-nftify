import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { TOKEN_INFO_GOOGLE_API } from "src/common/google-api";

@Injectable()
export class GoogleVerifier {
  constructor(private readonly httpService: HttpService) {}

  async verify(idToken: string, verifierId: string): Promise<boolean>{
    try {
        const response = await this.httpService.axiosRef.get(TOKEN_INFO_GOOGLE_API, {
          params: {
            id_token: idToken,
          },
        });
        const { email } = response.data;
        if(email !== verifierId) {
            return false;
        }
    } catch (error) {
        return false
    }
    return true;
  }
}
