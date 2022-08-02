export interface IBreed {
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ISearchDoggiesParams {
  order: string;
  mime_types: string;
  limit: string;
  page: string;
  breed_id?: string;
}

export enum ListOrder {
  Random = 'Random',
  Asc = 'Asc',
  Desc = 'Desc',
}

export enum ListType {
  All = 'All',
  Static = 'Static',
  Animated = 'Animated',
}

export interface IDoggies {
  id: string;
  url: string;
  breeds: Array<IBreed>;
  categories: Array<ICategory>;
  isFavorite?: boolean;
}

export interface IFavirotesParams {
  limit: string;
  page: string;
  sub_id?: string;
}

export interface IFaviroteDogs {
  id: 833;
  user_id: '4';
  image_id: '1ud';
  sub_id: '';
  created_at: '2018-10-24T08:35:48.000Z';
  image: {
    id: '1ud';
    url: 'https://cdn2.thecatapi.com/images/1ud.jpg';
  };
}
