import React from 'react';
import DarkModeButton from '../darkModeButton';
import { Separator } from '../ui/separator';
const Navbar = () => {

  return (
    <div className='flex flex-col w-full '>
      <div className='flex w-full justify-between p-4'>

        <h1 className='font-bold text-3xl items-center'>Cliente CS3</h1>
        <DarkModeButton />

      </div>
      <Separator orientation='horizontal' />
    </div>


  );
};

export default Navbar;