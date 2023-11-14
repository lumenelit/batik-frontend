import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Popup from 'reactjs-popup';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
// import ChoiceContext from '../../contexts/ChoiceContext';

import 'react-tooltip/dist/react-tooltip.css';

import tooMuchSKS from '../../assets/images/too-much-sks.svg';

export default function SubmitClass() {
  // const { totalCredit, saveChoice } = useContext(ChoiceContext);
  const totalCredit = 0;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(true);
  const [openConflict, setOpenConflict] = useState(false);
  // show tooltip until the user click on screen
  useEffect(() => {
    const handleMouseClick = () => {
      setShowTooltip(false);
    };
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  const handleClick = async () => {
    if (totalCredit === 0) {
      setOpenConflict(true);
    } else {
      try {
        // const success = await saveChoice(false);
        const success = false;
        if (success) {
          navigate('/schedule');
        } else {
          throw new Error('Failed to save choice.');
        }
      } catch (error) {
        alert('Failed to save your schedule. Please try again.');
      }
    }
  };

  return (
    <div className='fixed bottom-14 right-8 '>
      <Popup
        open={openConflict}
        closeOnDocumentClick
        onClose={() => setOpenConflict(false)}
        overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
        modal>
        <div className='flex flex-col items-center justify-center p-3 mx-3 transition-all bg-white rounded-xl'>
          <LazyLoadImage src={tooMuchSKS} alt='' height={180} effect='blur' />
          <h2 className='text-2xl font-bold text-center'>
            {t('submitClass.modalNoClassSelectedTitle')}
          </h2>
          <p className='text-center text-sm font-semibold max-w-[356px] mb-8'>
            {t('submitClass.modalNoClassSelectedDescription')}
          </p>

          <div className='flex gap-3'>
            <button
              type='button'
              onClick={() => setOpenConflict(false)}
              className='px-12 py-2 font-bold transition-all rounded-lg text-white bg-button-gradient hover:opacity-75'>
              OK
            </button>
          </div>
        </div>
      </Popup>
      <div className='flex justify-between h-16 pl-4 overflow-hidden rounded-full submit-button-bg w-36'>
        <div className='w-1/2 p-1 text-center'>
          <h4 className='text-3xl font-bold'>{totalCredit}</h4>
          <span className='text-sm font-semibold'>
            {t('submitClass.credit')}
          </span>
        </div>
        <div className='flex items-center justify-center w-16 h-16 rounded-full bg-button-gradient'>
          <Tooltip
            anchorSelect='#submit'
            content={t('submitClass.tooltip')}
            className='font-semibold bg-white text-primary-500'
            isOpen={showTooltip}
          />
          <button
            id='submit'
            type='button'
            onClick={handleClick}
            className='flex items-center justify-center w-full h-full'>
            <i className='text-4xl fa-solid fa-arrow-right text-white' />
          </button>
        </div>
      </div>
    </div>
  );
}
