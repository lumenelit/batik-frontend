/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Popup } from 'reactjs-popup';
import { useTranslation } from 'react-i18next';
import SubjectItem from '../../components/SubjectItem';
import api from '../../config/api';
import notfound from '../../img/searching-error.svg';
import tooMuchSKS from '../../img/too-much-sks.svg';

export default function SubjectContainer({ activeTab, search }) {
  // const { user, isSummer, runningSession } = useContext(AuthContext);
  const user = {
    details: {
      curriculum: 'S1',
      major: 'IF',
      noreg: 'S11710017'
    }
  };
  const isSummer = false;
  const runningSession = {
    academicYear: '2021/2022',
    semesterType: 'GENAP'
  };
  const { t, i18n } = useTranslation();
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const days = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat'
  };
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState([]);

  // Filter subjects based on day
  const dayFilter = (day) => {
    return subjects.filter((subject) => {
      return subject.schedule.day.includes(day);
    });
  };

  // Fetch subjects data from API
  useEffect(() => {
    try {
      api.get('/match-schedule?noreg=' + user.details.noreg).then((res) => {
        setSubjects(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user.details.noreg]);

  // Filter subjects based on search input
  useEffect(() => {
    if (search === '') {
      setFilteredSubjects(dayFilter(days[activeTab]));
      return;
    }

    setFilteredSubjects(
      subjects.filter((subject) => {
        let subjectName =
          i18n.language === 'en'
            ? subject.subjectName.en
            : subject.subjectName.id;

        return subjectName.toLowerCase().includes(search.toLowerCase()) ||
          subject.code.toLowerCase().includes(search.toLowerCase())
          ? subject
          : null;
      })
    );
  }, [search]);

  // Filter subjects based on active tab
  useEffect(() => {
    setFilteredSubjects(dayFilter(days[activeTab]));
  }, [activeTab, subjects]);

  console.log('filtered subjects', filteredSubjects);

  // Filter
  // 1 day subjects
  const filteredSubjectsWith1Day = filteredSubjects.filter((subject) => {
    return subject.schedule.day.length === 1;
  });

  // 2 days subjects
  const filteredSubjectWith2Days = filteredSubjects.filter((subject) => {
    return subject.schedule.day.length === 2;
  });

  return (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className='flex items-center justify-center h-96'>
          <div className='flex flex-col items-center gap-4'>
            <i className='text-5xl fa-solid fa-circle-notch animate-spin text-preregis-blue' />
            <h2 className='text-2xl font-semibold'>
              {t('subjectContainer.loading')}
            </h2>
          </div>
        </div>
      )}

      {!loading && choice.length > 0 && (
        <div className='mb-5 shadow-2xl bg-preregis-back outline outline-8 rounded-xl outline-preregis-back'>
          <h2 className='mb-2 ml-2 text-sm font-bold'>
            {t('subjectContainer.choice')}
          </h2>
          <div className='flex flex-col gap-[5px]'>
            {choice.map((subject) => (
              <SubjectItem
                key={subject.id}
                item={subject}
                selected={true}
                isSchedule={false}
                isSubmit={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subject with 1 day */}
      {!loading && filteredSubjects.length > 0 && (
        <div className='mb-5'>
          <h2 className='mb-2 text-sm font-bold'>
            {activeTab === 1 && t('subjectContainer.day1')}
            {activeTab === 2 && t('subjectContainer.day2')}
            {activeTab === 3 && t('subjectContainer.day3')}
            {activeTab === 4 && t('subjectContainer.day4')}
            {activeTab === 5 && t('subjectContainer.day5')}
          </h2>
          <div className='flex flex-col gap-[5px]'>
            {filteredSubjectsWith1Day.map((subject) => (
              <SubjectItem
                key={subject.id}
                item={subject}
                selected={false}
                isSchedule={false}
                isSubmit={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subject with 2 days */}
      {!loading && filteredSubjects.length > 0 && (
        <div className='mb-5'>
          <h2 className='mb-2 text-sm font-bold'>
            {(activeTab === 1 && t('subjectContainer.twoDay1')) ||
              (activeTab === 3 && t('subjectContainer.twoDay1'))}
            {(activeTab === 2 && t('subjectContainer.twoDay2')) ||
              (activeTab === 4 && t('subjectContainer.twoDay2'))}
          </h2>
          <div className='flex flex-col gap-[5px]'>
            {filteredSubjectWith2Days.map((subject) => (
              <SubjectItem
                key={subject.id}
                item={subject}
                selected={false}
                isSchedule={false}
                isSubmit={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subject summer */}
      {!loading && filteredSubjects.length > 0 && isSummer && (
        <div className='mb-5'>
          <h2 className='mb-2 text-sm font-bold'>Summer Class</h2>
          <div className='flex flex-col gap-[5px]'>
            {filteredSubjects.map((subject) => (
              <SubjectItem
                key={subject.id}
                item={subject}
                selected={false}
                isSchedule={false}
                isSubmit={false}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
