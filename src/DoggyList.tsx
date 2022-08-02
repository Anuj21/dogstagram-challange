import { Refresh } from '@mui/icons-material';
import { Stack, Pagination, Button } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  deleteFavorite,
  fetchDoggyList,
  fetchFavorites,
  postFavorite,
} from './api-request';
import DoggyComponent from './DoggyComponent';
import useDoggyFilter from './DoggyFilter';
import { IDoggies, ListOrder, ListType } from './IDoggyTypes';

function DoggyList() {
  let doggyListParams = {
    limit: '12',
    order: ListOrder.Random,
    mime_types: '',
  };

  const [page, setPage] = useState(1);
  const [animate, setAnimate] = useState(false);

  const { render, order, type, breed } = useDoggyFilter();

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isError, isLoading } = useQuery(
    ['doggy-list', order, type, breed, page],
    async () => {
      return breed === ''
        ? await fetchDoggyList({
            ...doggyListParams,
            order,
            mime_types: getListType(type),
            page: (page - 1).toString(),
          })
        : await fetchDoggyList({
            ...doggyListParams,
            order,
            mime_types: getListType(type),
            breed_id: breed,
            page: (page - 1).toString(),
          });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const favList: Array<{ favId: number; imageId: string }> =
    useQuery(
      ['favorite-list', animate],
      async () => {
        return await fetchFavorites({
          page: '0',
          limit: '999',
        });
      },
      {
        refetchOnWindowFocus: false,
      }
    ).data?.data.map((fav: any) => {
      return { favId: fav.id, imageId: fav.image_id };
    }) || [];

  const dogImageList: Array<IDoggies> =
    data?.data.map((dogData: IDoggies) => {
      return {
        ...dogData,
        isFavorite: favList.map((fav) => fav.imageId).includes(dogData.id),
      };
    }) || [];

  const updateFavorite = (like: boolean, imageId: string) => {
    const elem = favList.filter((item) => item.imageId === imageId);
    setAnimate(!animate);
    if (like) {
      postFavorite(imageId);
    } else {
      deleteFavorite(elem[0].favId.toString());
    }
  };

  const getListType = (type: string) => {
    switch (type) {
      case ListType.Static:
        return 'png,jpg';
      case ListType.Animated:
        return 'gif';
      case ListType.All:
      default:
        return '';
    }
  };

  if (isError) {
    return (
      <div className='flex justify-center items-center h-100v'>
        <h2>Error Fetching data from api !</h2>
      </div>
    );
  }

  return (
    <div>
      {render}
      {isLoading ? (
        <div className='flex justify-center items-center h-100v'>
          <h2>Loading ....</h2>
        </div>
      ) : (
        <div className='p-4 grid gap-4 md:grid-cols-4 grid-cols-auto-fit overflow-y-auto h-78v bg-slate-100'>
          {dogImageList.map((item: IDoggies) => {
            return (
              <DoggyComponent
                key={item.id}
                doggy={item}
                updateFavorite={updateFavorite}
              ></DoggyComponent>
            );
          })}
        </div>
      )}
      <div className='px-1 py-1 flex justify-center bg-white shadow-inner fixed bottom-0 w-full'>
        {order !== ListOrder.Random ? (
          <Stack spacing={2}>
            <Pagination
              count={data ? Math.round(data.count / 12) : 1}
              page={page}
              onChange={handleChange}
              shape='rounded'
            />
          </Stack>
        ) : (
          <Button
            variant='text'
            className='p-0 m-0 !text-black'
            startIcon={<Refresh />}
            onClick={loadMore}
          >
            More
          </Button>
        )}
      </div>
    </div>
  );
}

export default DoggyList;
