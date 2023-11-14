import Container from '../../components/layouts/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import illustration from '../../assets/images/introduction-illustration1.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PageIntroduction() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

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
            className='pt-16 flex flex-col justify-between'>
            <LazyLoadImage
              src={illustration}
              alt='Choose your class'
              wrapperClassName='mx-auto select-none'
              height={345}
              effect='blur'
            />
            <div className='text-center mt-4'>
              <h1 className='font-black text-primary-500 text-2xl mb-4'>
                {t('welcomePage.title')}
              </h1>
              <p className='font-sans font-medium'>
                {t('welcomePage.description')}
              </p>
            </div>
          </motion.div>
          <div className='flex items-center flex-col gap-2 mb-5'>
            <div className='flex gap-2'>
              <div
                className={`h-2 rounded-full transition-all ${
                  animationComplete ? 'bg-primary-500 w-8' : 'bg-disabled w-2'
                }`}
              />
              <div className='w-2 h-2 rounded-full transition-all bg-disabled' />
              <div className='w-2 h-2 rounded-full transition-all bg-disabled' />
            </div>
            <button
              type='button'
              className='bg-button-gradient w-full py-3 text-white rounded-xl font-bold '
              onClick={() => navigate('/language')}>
              {t('button.next')}
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
