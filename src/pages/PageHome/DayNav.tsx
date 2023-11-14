import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/layouts/Container';
import sun from '../../assets/icons/sun.svg';

export default function Header({ onTabChange, onSearch, summer }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    t('header.tab1'),
    t('header.tab2'),
    t('header.tab3'),
    t('header.tab4'),
    t('header.tab5')
  ];

  const handleTabChange = (index) => {
    setActiveTab(index + 1);
    onTabChange(index + 1);
  };

  return (
    <div className='w-full mb-3 border-b border-stroke pb-3'>
      <Container>
        <ul className='flex justify-between gap-3 mb-6'>
          {summer ? (
            <li className='bg-summer-gradient text-white font-semibold rounded-lg py-6 hover:bg-disabled border border-stroke shadow-shadow-dark flex-1 flex flex-col justify-center items-center relative select-none'>
              <img src={sun} alt='' className='w-[16px] h-[16px]' />
              Summer
            </li>
          ) : (
            tabs.map((tab, index) => {
              if (index === 5) {
                return (
                  <li
                    className={` rounded-lg py-12 hover:bg-disabled border border-stroke shadow-shadow-dark flex-1 flex justify-center relative select-nonehover:cursor-pointer ${
                      activeTab === index + 1
                        ? 'bg-summer-gradient text-white'
                        : 'active:text-dark'
                    }`}>
                    <button
                      type='button'
                      className='font-semibold select-none absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center'
                      onClick={() => handleTabChange(index)}>
                      <img
                        src={sun}
                        alt=''
                        className={`w-[16px] h-[16px] ${
                          activeTab === index + 1 ? '' : 'invert '
                        }`}
                      />
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={tab}
                  className={`${
                    activeTab === index + 1
                      ? 'bg-button-gradient  text-white'
                      : 'active:text-dark'
                  } rounded-lg py-12 hover:bg-disabled border border-stroke shadow-shadow-dark flex-1 flex justify-center relative select-none`}>
                  <button
                    type='button'
                    className='font-semibold select-none absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    onClick={() => handleTabChange(index)}>
                    {tab}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </Container>
    </div>
  );
}
