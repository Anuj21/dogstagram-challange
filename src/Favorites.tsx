import { Stack, Pagination } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { deleteFavorite, fetchFavorites } from './api-request';
import { IFaviroteDogs } from './IDoggyTypes';

function Favorites() {
  const [page, setPage] = useState(1);
  const [animate, setAnimate] = useState(true);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onUnLike = (imageId: string) => {
    deleteFavorite(imageId);
    setAnimate(!animate);
  };

  const { data, isError, isLoading } = useQuery(
    ['favorite-doggy-list', page, animate],
    async () => {
      return await fetchFavorites({
        page: (page - 1).toString(),
        limit: '12',
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-100v'>
        <h2>Loading ....</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center h-100v'>
        <h2>Error Fetching data from api !</h2>
      </div>
    );
  }

  return (
    <div className='h-95v bg-slate-100'>
      <div className='p-4 grid gap-4 md:grid-cols-4 grid-cols-auto-fit overflow-y-auto overflow-x-hidden h-85v'>
        {data?.data.map((item: IFaviroteDogs) => {
          return (
            <div className='p-6 bg-white rounded-md shadoow-sm hover:shadow-md flex flex-col items-cente h-40v relative'>
              <div
                onClick={() => onUnLike(item.id.toString())}
                className={classNames(
                  'absolute -right-7 -top-7',
                  'animate-heart',
                  'animate'
                )}
              ></div>
              <img
                src={item.image.url}
                alt={item.image.id}
                className='mb-4 mt-4 w-full h-30v object-cover'
              />
            </div>
          );
        })}
      </div>
      <div className='px-1 py-1 flex justify-center bg-white'>
        <Stack spacing={2}>
          <Pagination
            count={
              data
                ? Math.round(data.count / 12) === 0
                  ? 1
                  : Math.round(data.count / 12)
                : 1
            }
            page={page}
            onChange={handleChange}
            shape='rounded'
          />
        </Stack>
      </div>
    </div>
  );
}

export default Favorites;
