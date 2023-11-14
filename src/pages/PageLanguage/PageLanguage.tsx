import Container from '../../components/layouts/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import illustration from '../../assets/images/introduction-illustration2.svg';
import indonesia from '../../assets/images/indonesia.svg';
import english from '../../assets/images/english.svg';

export default function PageLanguage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  const lngs = {
    id: { nativeName: 'Bahasa Indonesia' },
    en: { nativeName: 'English' }
  };

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 100);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div className='bg-angular-white h-screen'>
      <Container>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className='flex flex-col justify-between h-screen'>
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className=' pt-16 opacity-0 flex flex-col justify-between'>
            <LazyLoadImage
              src={illustration}
              alt='Choose your class'
              className='mx-auto select-none'
              height={345}
              effect='blur'
            />
            <div className='text-center mt-4'>
              <h1 className='font-black text-primary-500 text-2xl mb-4'>
                {t('languagePage.title')}
              </h1>
              <div className='flex flex-col gap-2 w-full'>
                {Object.keys(lngs).map((lng) => (
                  <button
                    type='submit'
                    key={lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    className={`flex justify-between items-center gap-5 w-full rounded-md p-3 font-poppins bg-white text-[#2D2D2D] border  hover:bg-gray-100 focus:outline-none focus:shadow-outline ${
                      i18n.language === lng
                        ? 'border-2 border-primary-500'
                        : 'border-stroke'
                    }`}>
                    <span className='flex justify-center items-center gap-3'>
                      <LazyLoadImage
                        src={lng === 'id' ? indonesia : english}
                        alt='indonesia'
                        width={40}
                        effect='blur'
                      />
                      {lngs[lng].nativeName}
                    </span>
                    <i
                      className={`fa-solid fa-check text-primary-500 ${
                        i18n.language === lng ? '' : 'hidden'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          <div className='flex items-center flex-col gap-2 mb-5'>
            <div className='flex gap-2'>
              <div
                className={`h-2 rounded-full transition-all ${
                  animationComplete ? 'bg-disabled w-2' : 'bg-primary-500 w-8'
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  animationComplete ? 'bg-primary-500 w-8' : 'bg-disabled w-2'
                }`}
              />
              <div className='w-2 h-2 rounded-full transition-all bg-disabled' />
            </div>
            <button
              type='button'
              className='bg-button-gradient w-full py-3 text-white rounded-xl font-bold '
              onClick={() => navigate('/login')}>
              {t('button.next')}
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
