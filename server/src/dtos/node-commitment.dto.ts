export class NodeCommitmentDto {
  data: string;

  signature: string;

  pubNode: string;

  constructor(data: string, signature: string, pubNode: string) {
    this.data = data;
    this.signature = signature;
    this.pubNode = pubNode;
  }
}
