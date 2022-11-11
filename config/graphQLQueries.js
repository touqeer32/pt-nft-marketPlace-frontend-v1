import { gql } from "@apollo/client";
export const GET_MIN_OFFER = gql`
  query GetMinBidOffer($tokenId: String!, $collection: String!) {
    offerCreatedEntities(
      first: 1
      orderBy: ts
      orderDirection: asc
      where: { tokenId: $tokenId, collection: $collection }
    ) {
      offerPrice
      tokenId
      ts
    }
  }
`;
export const GET_MAX_OFFER = gql`
  query GetMaxBidOffer($tokenId: String!, $collection: String!) {
    offerCreatedEntities(
      first: 1
      orderBy: ts
      orderDirection: desc
      where: { tokenId: $tokenId, collection: $collection }
    ) {
      offerPrice
      tokenId
      ts
    }
  }
`;

export const GET_ACTIVE_ITEMS = gql`
  query GetAllRecordOfUser(
    $tokenId: String!
    $collection: String!
    $limit: Int
  ) {
    offerCreatedEntities(
      first: $limit
      orderBy: ts
      orderDirection: desc
      where: { tokenId: $tokenId, collection: $collection }
    ) {
      id
      isVoucher
      collection
      offerPrice
      tokenId
      ts
      status
      buyer
    }
  }
`;
export const GET_LISTED_ITEMS = gql`
  query GetListedItem($collectionAddress: String!, $tokenId: String!) {
    itemListedEntities(
      first: 100
      orderBy: id
      where: { collection: $collectionAddress, tokenId: $tokenId }
    ) {
      id
      minPrice
      currency
      expiry
      isFixedPrice
      tokenId
      ts
      status
      seller {
        id
      }
    }
  }
`;

export const GET_LISTED_ITEMS_STATUS = gql`
  query GetListedItemWithStatus(
    $status: Boolean!
    $limit: Int
    $userAddress: String
  ) {
    itemListedEntities(
      first: $limit
      orderBy: id
      where: { status: $status, seller_not: $userAddress }
    ) {
      id
      minPrice
      currency
      collection
      expiry
      isFixedPrice
      tokenId
      ts
      status
      seller {
        id
      }
    }
  }
`;

/**
 * 
 export const GET_ALL_LISTED_ITEMS_STATUS = gql`
 query GetListedItemWithStatus($status: Boolean!, $limit: Int) {
  itemListedEntities(
    first: $limit
    orderBy: id
    where: {status: $status}
  ) {
    id
    minPrice
    currency
    collection
    expiry
    isFixedPrice
    tokenId
    ts
    status
    seller {
      id
    }
  }
}
`;
export const GET_NFT_BOUGHT_ACTION = gql`
query GetNFTBoughtAction($tokenId: String!, $collection: String!, $limit: Int) {
  itemBoughtEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection}
    
  ) {
     id
    collection
    buyer
    status
    isVoucher
    tokenId
    ts
  }
}`:
export const GET_BOUGHT_NFT = gql`
query GetBoughtNFT( $userAddress: String, $limit: Int) {
  itemBoughtEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { buyer: $userAddress}
    
  ) {
     id
    collection
    buyer
    status
    isVoucher
    tokenId
    ts
  }
}
`;
export const GET_NFT_OFFER_ACCEPTED_ACTION = gql`
query GetNFTOfferAcceptAction($tokenId: String!, $collection: String!, $limit: Int) {
  offerAcceptedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection}
    
  ) {
    buyer
    collection
    id
    tokenId
    ts
  }
}`;
export const GET_NFT_OFFER_ACCEPTED_BY_ME = gql`
query GetOfferAcceptedByMe( $userAddress: String, $limit: Int) {
  offerAcceptedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { buyer: $userAddress}
    
  ) {
    buyer
    collection
    id
    tokenId
    ts
  }
}`:
export const GET_NFT_OFFER_REJECTED_ACTION = gql`

query GetNFTOfferRejectAction($tokenId: String!, $collection: String!, $limit: Int) {
  offerRejectedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection}
    
  ) {
     buyer
    collection
    id
    status
    tokenId
    ts
  }
}`;
export const GET_NFT_OFFER_REJECTED_BY_ME = gql`

query GetOfferRejectByMe( $userAddress: String, $limit: Int) {
  offerRejectedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { buyer: $userAddress}
    
  ) {
     buyer
    collection
    id
    status
    tokenId
    ts
  }
}`;
export const GET_NFT_CREATED_OFFER = gql`

query GetNFTCreatedOffer($tokenId: String!, $collection: String!,$limit: Int) {
  offerCreatedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection}
    
  ) {
    id
    isVoucher
    collection
    offerPrice
    tokenId
    ts
    status
    buyer 
  }
}`;
export const GET_CREATED_OFFER_BY_ME = gql`

query GetOfferCreatedByMe( $userAddress: String, $limit: Int) {
  offerCreatedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { buyer: $userAddress}
    
  ) {
     buyer
    collection
    id
    status
    tokenId
    ts
  }
}`;

export const GET_LISTED_NFT = gql`
query GetListedNFT($tokenId: String!, $collection: String!,$limit: Int) {
  itemListedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection}
    
  ) {
    id
    ts
    collection
    tokenId
    currency
    expiry
    isFixedPrice
    minPrice
    seller
    status
  }
}`;
export const GET_LISTED_BY_ME = gql`
query GetListedNFTByMe( $userAddress: String, $limit: Int) {
  itemListedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { seller: $userAddress}
    
  ) {
    id
    ts
    collection
    tokenId
    currency
    expiry
    isFixedPrice
    minPrice
    seller
    status
  }
}
`;
export const GET_UN_LISTED_NFT = gql`

query GetunListedNFT($tokenId: String!, $collection: String!,$limit: Int) {
  itemListedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: {tokenId: $tokenId, collection: $collection,status:false}
    
  ) {
    id
    ts
    collection
    tokenId
    currency
    expiry
    isFixedPrice
    minPrice
    seller
    status
  }
}`;
export const GET_UN_LISTED_BY_ME = gql`

query GetunListedNFTByMe( $userAddress: String, $limit: Int) {
  itemListedEntities(
    first: $limit
    orderBy: ts
    orderDirection: desc
    where: { seller: $userAddress,status:false}
    
  ) {
    id
    ts
    collection
    tokenId
    currency
    expiry
    isFixedPrice
    minPrice
    seller
    status
  }
}`;
export const GET_ALL_LISTED_CURRENCY = gql`
query GetAllListedCurrenct($status: Boolean!) {
  currencyWhitelistedEntities(
    orderBy: ts
    orderDirection: desc
    where: {addOrRemove: $status}
    
  ) {
     addOrRemove
    id
    ts
  }
}`;
 */
