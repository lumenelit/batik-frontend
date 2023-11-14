import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LazyLoadImage,
  LazyLoadComponent
} from 'react-lazy-load-image-component';
import { Popup } from 'reactjs-popup';
import { useTranslation } from 'react-i18next';
// import ChoiceContext from '../../contexts/ChoiceContext';
// import kursi from '../../assets/icons/kursi.svg';
import deleteClass from '../assets/images/delete-class.svg';
type Props = {
  item: any;
  selected: boolean;
  isSchedule: boolean;
  isSubmit: boolean;
};

export default function SubjectItem({
  item,
  selected,
  isSchedule,
  isSubmit
}: Props) {
  // const { addToChoice, removeFromChoice } = useContext(ChoiceContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const closeModal = () => setOpen(false);

  const handleButton = () => {
    if (selected && !isSubmit) {
      return 'bg-danger-gradient';
    }
    if (isSubmit) {
      return 'bg-button-gradient';
    }
    // if (item.isFull) {
    //   return 'bg-disabled';
    // }
    return 'bg-button-gradient';
  };

  const handleButtonClick = () => {
    if (selected && !isSubmit) {
      setOpen(true);
    } else if (isSubmit) {
      // // navigate with state
      // navigate('/seating', {
      //   state: { subject: item },
      // });
    } else {
      setExpanded(!expanded);
    }
  };

  // convert schedule time to this format 08:00 - 09:30
  const convertTime = (time) => {
    const startHour = time.schedule.startHour.toString().padStart(2, '0');
    const startMinute = time.schedule.startMinute.toString().padStart(2, '0');
    const endHour = time.schedule.endHour.toString().padStart(2, '0');
    const endMinute = time.schedule.endMinute.toString().padStart(2, '0');
    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  };

  const translateDay = (day) => {
    if (day === 'Monday' || day === 'Senin') {
      return t('header.tab1');
    }
    if (day === 'Tuesday' || day === 'Selasa') {
      return t('header.tab2');
    }
    if (day === 'Wednesday' || day === 'Rabu') {
      return t('header.tab3');
    }
    if (day === 'Thursday' || day === 'Kamis') {
      return t('header.tab4');
    }
    if (day === 'Friday' || day === 'Jumat') {
      return t('header.tab5');
    }
    return '';
  };

  const displayDay = (schedule) => {
    if (schedule.day.length === 0) {
      return t('subjectItem.noSchedule');
    }
    if (schedule.day.length === 1) {
      return i18n.language === 'en'
        ? `${translateDay(schedule.day[0])} ${t('subjectItem.only')}`
        : `${t('subjectItem.only')} ${translateDay(schedule.day[0])}`;
    }
    if (schedule.day.length === 2) {
      return `${translateDay(schedule.day[0])} & ${translateDay(
        schedule.day[1]
      )}`;
    }
    if (schedule.day.length === 3) {
      return `${translateDay(schedule.day[0])}, ${translateDay(
        schedule.day[1]
      )}, ${translateDay(schedule.day[2])}`;
    }
    if (schedule.day.length === 4) {
      return `${translateDay(schedule.day[0])}, ${translateDay(
        schedule.day[1]
      )}, ${translateDay(schedule.day[2])}, ${translateDay(schedule.day[3])}`;
    }
    if (schedule.day.length === 5) {
      return t('subjectItem.everyday');
    }
    return t('subjectItem.everyday');
  };

  const handleIcon = () => {
    if (selected && !isSubmit) {
      return <i className='w-6 text-xl text-white fa-solid fa-xmark' />;
    }
    if (isSubmit) {
      return;
      // return <img src={kursi} alt="" className="w-5 text-white" />;
    }
    return (
      <i
        className={`fa-solid fa-chevron-down text-xl text-white w-6 transition-all duration-300 ${
          expanded ? 'rotate-180' : ''
        }`}
      />
    );
  };

  // selected ? (
  //   <i className="w-6 text-xl text-white fa-solid fa-xmark" />
  // ) : (
  //   <i
  //     className={`fa-solid fa-chevron-down text-xl text-white w-6 transition-all duration-300 ${
  //       expanded ? 'rotate-180' : ''
  //     }`}
  //   />
  // )

  return (
    <LazyLoadComponent
      delayMethod='debounce'
      placeholder={
        <div className='w-full h-20 bg-disabled rounded-xl animate-pulse' />
      }>
      <motion.div
        layout='size'
        transition={{ layout: { duration: 0.3, type: 'spring' } }}
        className='flex flex-col w-full'>
        {/*
        ${
            item.isFull ? 'bg-class-full bg-no-repeat bg-center opacity-75' : ''
          }
        */}
        <motion.div
          layout='preserve-aspect'
          className={`flex justify-between flex-nowrap border bg-white z-0 ${
            expanded ? 'rounded-t-xl' : 'rounded-xl'
          } overflow-hidden 
          
          ${
            selected && !isSchedule
              ? 'border-primary-500'
              : 'border-primary-100'
          }
          ${selected && isSchedule ? 'border-primary-100' : ''}`}>
          <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
            modal>
            <div className='flex flex-col items-center justify-center p-3 mx-3 transition-all bg-white rounded-xl'>
              <LazyLoadImage
                src={deleteClass}
                alt=''
                height={180}
                effect='blur'
              />
              <h2 className='text-2xl font-bold text-center'>
                {t('subjectItem.modalDeleteTitle')}
              </h2>
              <p className='mb-3 font-semibold text-center'>
                {t('subjectItem.modalDeleteDescription')}
              </p>
              <p className='mb-8 text-center'>
                {t('subjectItem.modalDeleteSubject')}
                <span className='font-bold'>{` ${item.subjectName}`}</span>
              </p>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='px-12 py-2 font-bold transition-all border rounded-lg text-primary-500 border-primary-500 hover:bg-disabled'>
                  {t('button.cancel')}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    // removeFromChoice(item);
                    closeModal();
                  }}
                  className='px-12 py-2 font-bold text-white transition-all rounded-lg bg-button-gradient hover:opacity-75'>
                  {t('button.delete')}
                </button>
              </div>
            </div>
          </Popup>
          <div
            // onClick={
            //   // selected || item.isFull ? () => {} : () => addToChoice(item)
            //   selected ? () => {} : () => addToChoice(item)
            // }
            onKeyDown={() => {}}
            role='button'
            tabIndex={0}
            className='relative flex justify-between flex-1 py-2 pl-2 flex-nowrap'>
            <div className='flex flex-col flex-1 '>
              <div className='flex items-center justify-start gap-1'>
                <span className='font-medium leading-none text-[13px]'>
                  {item.code}
                </span>
                <span>
                  {item.isCertified && (
                    <i className='fa-solid fa-award text-danger text-xs absolute top-[8px]' />
                  )}
                </span>
                <span
                  className={`${
                    item.isCertified ? 'ml-[10px]' : ''
                  } py-[1px] px-[7px] text-[10px] font-semibold text-white rounded-full bg-primary-500`}>
                  {displayDay(item.schedule)}
                </span>
              </div>
              <h3 className='leading-tight max-w-[75%] font-bold text-sm'>
                {`(${item.parallel}) ${
                  i18n.language === 'en'
                    ? item.subjectName.en
                    : item.subjectName.id
                }`}
              </h3>
              <span className='font-medium leading-none text-[11px]'>
                {item.lecturerName}
              </span>
            </div>
            <div className='absolute right-0 flex flex-col items-end pr-2 transition-all fade-end'>
              <span className='font-bold text-[15px] leading-none'>
                {`${item.credit} `}
                {t('submitClass.credit')}
              </span>
              <span className='text-[11px]'>{item.roomDetail.roomName}</span>
              <span className='text-primary-500 text-[10px] leading-none '>
                {convertTime(item)}
              </span>
            </div>
          </div>
          <button
            type='button'
            className={`p-2 ${handleButton()}`}
            onClick={handleButtonClick}>
            {handleIcon()}
          </button>
        </motion.div>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col p-2 transition-all border border-t-0 rounded-b-xl border-primary-100 -z-10'>
            <h3 className='text-sm font-semibold'>
              {t('subjectItem.description')}
            </h3>
            <p className='text-xs'>
              <span className='font-bold'>
                {i18n.language === 'en'
                  ? item.subjectName.en
                  : item.subjectName.id}
              </span>
              {` ${item.description}`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </LazyLoadComponent>
  );
}
