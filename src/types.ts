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

export type Transaction = {
  hash: string,
  amount: number,
  tick: number,
  inputType: number,
  extraData: ExtraData,
  moneyFlew: boolean,
}

export type ExtraData = {
  "@class": string,
  name: string,
  issuer: string,
  price: number, // orders only
  numberOfShares: number,
  newOwner: string, // asset transfer only
  unitOfMeasurement: string, // asset issuance only
  numberOfDecimalPlaces: number // asset issuance only
}
