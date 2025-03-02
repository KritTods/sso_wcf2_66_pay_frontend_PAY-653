'use client';
import { ArrowRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { CardDataType } from '@/modules/readytopay';

const CardMenu: React.FC<CardDataType> = ({ iconName, title, description, path }): JSX.Element => {
  return (
    <div className='flex items-start'>
      <div
        className='group flex flex-col justify-between items-start w-80 h-full rounded-[16px] border border-gray-200 bg-white
      shadow-md p-6 gap-4 cursor-pointer hover:bg-[#7CB4C3]'
        onClick={path}
      >
        <div className='p-3 -ml-1 bg-[#E7F3F5] rounded-full'>{iconName}</div>

        <div className='gap-1'>
          <p className='header-card text-wrap h-20 !leading-8 group-hover:text-white'>{title}</p>
          <p className='deception text-[#779097] group-hover:text-white'>{description}</p>
        </div>

        <div className='w-full flex flex-col justify-center items-start gap-4 '>
          {
            <div className='flex justify-center items-center w-12 h-12 bg-[#E7F3F5] rounded-full'>
              <ArrowRight className='text-[#1C4651]' />
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default CardMenu;
