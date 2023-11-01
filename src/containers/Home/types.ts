// location type 
export type LocationType = {
  id: string;
  address: string
}

// BnnersType 
export type BannersType = Array<{
  id: string;
  imgUrl: string
}>

// CategoriesType 
export type CategoriesType = Array<{
  id: string;
  name: string;
  imgUrl: string;
}>

// FreshesType
export type CardListType = Array<{
  id: string;
  name: string;
  imgUrl: string;
  price: string;
}>

// return types
export type ResponseType = {
  success: boolean;
  data: {
    location: LocationType;
    banners: BannersType;
    categories: CategoriesType;
    freshes: CardListType
  }
}