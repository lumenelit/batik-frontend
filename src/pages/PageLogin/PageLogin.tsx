import Container from '../../components/layouts/Container';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/images/introduction-illustration3.svg';
import google from '../../assets/images/google.png';

export default function PageLanguage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

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
                {t('loginPage.title')}
              </h1>
              <p className='font-sans font-medium'>
                {t('loginPage.description')}
              </p>
            </div>
          </motion.div>
          <div className='flex items-center flex-col gap-5 mb-5'>
            <div className='flex gap-2'>
              <div className='w-2 h-2 rounded-full transition-all bg-disabled' />
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
            </div>
            <button
              type='button'
              className={`border text-[#6C6C6C] border-primary-500 ${
                loginClicked ? 'cursor-not-allowed' : ''
              }
                w-full py-3  rounded-xl font-bold flex justify-center items-center gap-3 `}
              onClick={() => {
                navigate('/home');
                setLoginClicked(true);
              }}>
              {!loginClicked ?? <LazyLoadImage src={google} alt='google' />}
              {loginClicked ? (
                <span>
                  <i className='fa-solid fa-circle-notch animate-spin text-primary-500 mr-3' />
                  {t('loginPage.loading')}
                </span>
              ) : (
                <span>{t('button.loginGoogle')}</span>
              )}
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
