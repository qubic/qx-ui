export type Asset = {
  issuer: string,
  name: string
}

export type AssetOrder = {
  entityId: string,
  price: number,
  numberOfShares: number
}

export type EntityOrder = {
  issuerId: string,
  assetName: string,
  price: number,
  numberOfShares: number
}

export type Trade = {
  tickTime: string
  transactionHash: string
  taker: string
  maker: string
  issuer: string
  assetName: number
  bid: boolean
  price: number
  numberOfShares: number
}
