import { Inject, Injectable, OnModuleInit, InternalServerErrorException } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { P2PService } from "./types";
import { lastValueFrom } from "rxjs";
import { SharedKeyService } from "src/services";
import P2PList from "src/config/node-info/p2p-list";
import * as BN from "bn.js";
import { Wallet } from "src/schemas";
import { getAddress } from "src/utils/wallet";
import { nSecp256k1, secp256k1 } from "src/common/secp256k1";
import { interpolate } from "src/utils/interpolate";
import { THRESHOLD } from "src/common/nodes";

@Injectable()
export class GRPCService implements OnModuleInit {
  private node1: P2PService;
  private node2: P2PService;
  private node3: P2PService;
  private nodeName: string;

  constructor(
    @Inject("P2P_NODE1") private client1: ClientGrpc,
    @Inject("P2P_NODE2") private client2: ClientGrpc,
    @Inject("P2P_NODE3") private client3: ClientGrpc,
    private configService: ConfigService,
    private sharedKeyService: SharedKeyService,
  ) {}

  onModuleInit() {
    this.node1 = this.client1.getService("P2PService");
    this.node2 = this.client2.getService("P2PService");
    this.node3 = this.client3.getService("P2PService");
    this.nodeName = this.configService.get<string>("node_name").trim();
  }

  broadcastAll() {
    Object.keys(P2PList).map(async (nodeName) => {
      if (this.nodeName !== nodeName) {
        const p2p = this[nodeName] as P2PService;
        const call = await lastValueFrom(p2p.broadcastAssignKey({ id: 1 }));
      }
    });
  }

  async generateSharedSecret(owner: string): Promise<Wallet> {
    const nodeNames = Object.keys(P2PList);
    const groupPublicKeys: string[] = [];

    // step 1: init secret
    for (const nodeName of nodeNames) {
      const p2p = this[nodeName] as P2PService;
      try {
        const { publicKey } = await lastValueFrom(p2p.initSecret({ owner }));
        groupPublicKeys.push(publicKey);
      } catch (error) {
        console.error(error.message);
        throw new InternalServerErrorException(`Error when initSecret in ${nodeName}`);
      }
    }

    // step 2: get shares
    for (const nodeName of nodeNames) {
      const p2p = this[nodeName] as P2PService;
      try {
        await lastValueFrom(p2p.generateShares({ owner }));
      } catch (error) {
        console.error(error.message);
        throw new InternalServerErrorException(`Error when generateShares in ${nodeName}`);
      }
    }

    // step 3: derive shared secret key
    for (const nodeName of nodeNames) {
      const p2p = this[nodeName] as P2PService;
      try {
        await lastValueFrom(p2p.deriveSharedSecret({ owner }));
      } catch (error) {
        console.error(error.message);
        throw new InternalServerErrorException(`Error when deriveSharedSecret in ${nodeName}`);
      }
    }

    // Get temporarily private instead of public
    // TODO: should not calculate private key here. Try to research aPSS
    // groupPublicKeys = groupPrivateKeys ( Trick )
    const masterPrivateKey = groupPublicKeys.reduce((pre, current) => {
      const prevFormat = new BN(pre, "hex");
      const currentFormat = new BN(current, "hex");

      return prevFormat.add(currentFormat).umod(nSecp256k1).toString("hex");
    }, "0");
    const masterPublicKey = secp256k1.keyFromPrivate(masterPrivateKey!, "hex").getPublic("hex");
    const address = getAddress(masterPublicKey);

    // step 4: store wallet info
    for (const nodeName of nodeNames) {
      const p2p = this[nodeName] as P2PService;
      try {
        await lastValueFrom(p2p.storeWalletInfo({ address, owner, publicKey: masterPublicKey }));
      } catch (error) {
        console.error(error.message);
        throw new InternalServerErrorException(`Error when deriveSharedSecret in ${nodeName}`);
      }
    }

    return { address, owner, publicKey: masterPublicKey };
  }

  async generateShares(owner: string): Promise<boolean> {
    const nodes = Object.keys(P2PList).map((node) => this[node] as P2PService);

    const sharedKey = await this.sharedKeyService.findSharedKeyByOwner(owner);
    const secret = sharedKey.secret;
    const shares = [new BN(secret, "hex")];

    const indices: number[] = [0];

    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      if (shares.length < THRESHOLD) {
        let randomShare: BN = secp256k1.genKeyPair().getPrivate();
        let receivedShare = randomShare.toString("hex");

        await lastValueFrom(nodes[nodeIndex].addReceivedShare({ owner, receivedShare }));

        shares.push(randomShare);
        indices.push(nodeIndex + 1);
      } else {
        let point = interpolate(shares, indices, nodeIndex + 1);
        let receivedShare = point.toString("hex");
        await lastValueFrom(nodes[nodeIndex].addReceivedShare({ owner, receivedShare }));
      }
    }

    return true;
  }
}
