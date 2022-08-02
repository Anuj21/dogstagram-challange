import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { IDoggies } from './IDoggyTypes';
import classNames from 'classnames';
import './App.css';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DoggyComponent = (props: { doggy: IDoggies; updateFavorite: any }) => {
  const { doggy, updateFavorite } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const showDoggyDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hideDoggyDetails = () => {
    setAnchorEl(null);
  };

  return (
    <div className='p-6 bg-white rounded-md shadoow-sm hover:shadow-md flex flex-col items-cente relative'>
      <div
        onClick={() => updateFavorite(!doggy.isFavorite, doggy.id)}
        className={classNames(
          'absolute -right-7 -top-7',
          'animate-heart',
          doggy.isFavorite && 'animate'
        )}
      ></div>

      <button onClick={showDoggyDetails}>
        <img
          src={doggy.url}
          alt={doggy.id}
          className='mb-4 mt-4 w-full h-30v object-cover '
        />
      </button>
      <Button
        variant='contained'
        onClick={showDoggyDetails}
        className='!transition !delay-150 !duration-300 !ease-in-out'
      >
        Show More
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <img src={doggy.url} alt={doggy.id} className='w-full h-40v ' />
        {doggy.breeds.length ? (
          <>
            <DialogTitle className='text-center'>
              <b>{doggy.breeds[0]?.name}</b>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                className='text-center'
                id='alert-dialog-slide-description'
              >
                <>
                  <li className='list-none p-1'>
                    <b>Temperment</b>
                    <br /> {doggy.breeds[0].temperament}
                  </li>
                  <Divider variant='middle' />
                  <li className='list-none p-1'>
                    <b>Weight</b>
                    <br /> {doggy.breeds[0].weight.metric} kg
                  </li>
                  <Divider variant='middle' />
                  <li className='list-none p-1'>
                    <b>Height</b>
                    <br /> {doggy.breeds[0].height.metric} cm
                  </li>
                  <Divider variant='middle' />
                  <li className='list-none p-1'>
                    <b>Life span</b>
                    <br /> {doggy.breeds[0].life_span}
                  </li>
                  <Divider variant='middle' />
                </>
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          'No information about this breed !'
        )}
        <DialogActions>
          <Button onClick={hideDoggyDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoggyComponent;
