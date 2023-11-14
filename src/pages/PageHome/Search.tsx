import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchAndFilterBar({ onSearch }) {
  const { t } = useTranslation();
  return (
    <div className='flex gap-3 mb-3'>
      <div className='flex-1 flex items-center justify-between p-2 rounded-lg border border-stroke'>
        <button type='button' className='text-gray-500 hover:text-white'>
          <i className='fa-solid fa-magnifying-glass text-dark text-2xl' />
        </button>
        <input
          className='rounded-lg p-2 w-full focus:outline-none focus:bg-white ml-2'
          type='search'
          placeholder={t('searchAndFilterBar.search')}
          onChange={onSearch}
        />
      </div>
    </div>
  );
}
