export type Asset = {
  issuer: string
  name: string
}

export type AssetOrder = {
  entityId: string
  price: number
  numberOfShares: number
}

export type EntityOrder = {
  issuerId: string
  assetName: string
  price: number
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

export type Transfer = {
  tickTime: string
  hash: string
  source: string
  amount: number
  tick: number
  extraData: TransferExtraData
  moneyFlew: boolean
}

export type TransferExtraData = {
  issuer: string
  name: string
  newOwner: string
  numberOfShares: number
}

// export type Order = {
//   tickTime: string
//   hash: string
//   source: string
//   amount: number
//   tick: number
//   inputType: number
//   extraData: OrderExtraData
//   moneyFlew: boolean
// }

// export type OrderExtraData = {
//   issuer: string
//   name: string
//   price: number
//   numberOfShares: number
// }

export type IssuedAsset = {
  tickTime: string
  hash: string
  source: string
  amount: number
  tick: number
  extraData: IssuedAssetExtraData
  moneyFlew: boolean
}

export type IssuedAssetExtraData = {
  name: string
  numberOfShares: number
  numberOfDecimalPlaces: number
}

export type AveragePrice = {
  time: string
  averagePrice: number
  totalAmount: number
}
