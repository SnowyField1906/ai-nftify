import { BadRequestException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { secp256k1 } from "src/common/secp256k1";
import { LookupSharedSecretDto } from "src/dtos/lookup-shared-secret.dto";
import { CommitmentService, SharedKeyService, WalletService } from "src/services";
import * as eccrypto from "eccrypto";
import { VerifyGuard } from "src/verifier/verify.guard";
import { NodeSharedSecretDto } from "src/dtos/node-shared-secret.dto";
import { createKeccak256 } from "src/utils/wallet";

@Controller("shared-keys")
export class SharedKeyController {
  constructor(
    private readonly sharedKeyService: SharedKeyService,
    private readonly commitmentService: CommitmentService,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(VerifyGuard)
  async lookupSharedSecret(
    @Body() lookupSharedSecretDto: LookupSharedSecretDto,
  ): Promise<NodeSharedSecretDto> {
    const { idToken, tempPub, nodeSignatures, owner } = lookupSharedSecretDto;

    const hashIdToken = createKeccak256(idToken);
    const existedCommitment = await this.commitmentService.findCommitment(hashIdToken);
    if (!existedCommitment) {
      throw new BadRequestException("Commitment of Id Token doesn't exist.");
    }
    const wallet = await this.walletService.findWallet(owner);
    if (!wallet) {
      throw new BadRequestException("Wallet have not init yet.");
    }

    const nodePrivateKey = this.configService.get("private_key") as string;
    const keyPair = secp256k1.keyFromPrivate(nodePrivateKey);
    const pubNode = keyPair.getPublic("hex");

    const nodeSignature = nodeSignatures.find((node) => node.pubNode === pubNode);
    if (!nodeSignature) {
      throw new BadRequestException("Node signatures does not contain this node");
    }

    const share = await this.sharedKeyService.findSharedKeyByOwner(owner);
    if(!share) {
      throw new BadRequestException("Not found share by owner");
    }
    const { sharedSecret } = share;
    const { mac, ciphertext, iv, ephemPublicKey } = await eccrypto.encrypt(
      Buffer.from(tempPub, "hex"),
      Buffer.from(sharedSecret),
    );

    return {
      publicKey: wallet.publicKey,
      threshold: 1,
      share: ciphertext.toString("hex"),
      metadata: {
        mac: mac.toString("hex"),
        iv: iv.toString("hex"),
        ephemPublicKey: ephemPublicKey.toString("hex"),
      },
    };
  }
}
