import { Observable } from "rxjs";

export interface P2PService {
  // utils function
  checkWallet(input: CheckWalletRequest): Observable<CheckWalletResponse>;
  broadcastAssignKey(input: BroadcastAssignKeyRequest): Observable<BroadcastAssignKeyResponse>;
  initSecret(input: InitSecretRequest): Observable<InitSecretResponse>;
  addReceivedShare(input: AddReceivedShareRequest): Observable<AddReceivedShareResponse>;
  generateShares(input: GenerateSharesRequest): Observable<GenerateSharesResponse>;
  deriveSharedSecret(input: DeriveSharedSecretRequest): Observable<DeriveSharedSecretResponse>;
  storeWalletInfo(input: StoreWalletInfoRequest): Observable<StoreWalletInfoResponse>;
}

export type BroadcastAssignKeyRequest = {
  id: number;
};

export type BroadcastAssignKeyResponse = {
  id: number;
  name: string;
};

export type CheckWalletRequest = {
  email: string;
};

export type CheckWalletResponse = {
  publicKey: string;
  address: string;
};

export type InitSecretRequest = {
  owner: string;
};

export type InitSecretResponse = {
  publicKey: string;
};

export type AddReceivedShareRequest = {
  owner: string;
  receivedShare: string;
};

export type AddReceivedShareResponse = { status: boolean };

export type GenerateSharesRequest = {
  owner: string;
};

export type GenerateSharesResponse = { status: boolean };

export type DeriveSharedSecretRequest = {
  owner: string;
};

export type DeriveSharedSecretResponse = {
  status: boolean;
};

export type StoreWalletInfoRequest = {
  owner: string;
  publicKey: string;
  address: string;
};

export type StoreWalletInfoResponse = {
  status: boolean;
}