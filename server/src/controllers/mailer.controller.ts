import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { MailerService } from "./../services";
import { SendRecoveryPhraseDto } from "src/dtos/mailer.dto";

@Controller("mailer")
export class MailerController {
  constructor(private readonly mailerService: MailerService) { }


  @Post('/phrase')
  async createMetadata(@Body() body: SendRecoveryPhraseDto): Promise<boolean> {
    const response = await this.mailerService.sendMail({
      to: body.email, subject: 'Backup phrase', text: 'Backup',
      html: `<b>${body.phrase}</b>`
    });
    if (!response) {
      throw new BadRequestException('Send mail failed');
    }
    return response;
  }


}
