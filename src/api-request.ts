import { IBreed, IDoggies, IFaviroteDogs, IFavirotesParams, ISearchDoggiesParams } from "./IDoggyTypes";

export async function fetchDoggyList(searchQueryParams: ISearchDoggiesParams): Promise<{count: number, data: Array<IDoggies>}> {
    const queryParams = new URLSearchParams({
        ...searchQueryParams,
    }).toString();
  
    const result = await fetch(
      `https://api.thedogapi.com/v1/images/search?${queryParams}`,{ headers: {
        'x-api-key': '0227e1c1-2f90-44da-899c-05b827774121',
    },}
    );

    return  Promise.resolve({
        count: parseInt(result.headers.get('Pagination-Count') || '0'),
        data: await result.json()
    });
}

export async function fetchDogBreeds(): Promise<Array<IBreed>> {
    const result = await fetch(
      `https://api.thedogapi.com/v1/breeds`
    );
  
    return await result.json();
}

export async function postFavorite(imageId: string): Promise<void> {
    const result = await fetch(
      `https://api.thedogapi.com/v1/favourites`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': '0227e1c1-2f90-44da-899c-05b827774121',
        },
        body: JSON.stringify({image_id: imageId})
    }
    );
  
    return await result.json();
}


export async function deleteFavorite(favourite_id: string): Promise<void> {
    const result = await fetch(
      `https://api.thedogapi.com/v1/favourites/${favourite_id}`, {
        method: 'Delete',
        headers: {
            'x-api-key': '0227e1c1-2f90-44da-899c-05b827774121',
        },
    }
    );
  
    return await result.json();
}

export async function fetchFavorites(searchQueryParams: IFavirotesParams): Promise<{count: number, data:Array<IFaviroteDogs>}> {
    const queryParams = new URLSearchParams({
        ...searchQueryParams,
    }).toString();

    const result = await fetch(
      `https://api.thedogapi.com/v1/favourites?${queryParams}`, {
        headers: {
            'x-api-key': '0227e1c1-2f90-44da-899c-05b827774121',
        },
    }
    );
  
    return  Promise.resolve({
        count: parseInt(result.headers.get('Pagination-Count') || '0'),
        data: await result.json()
    });
}

