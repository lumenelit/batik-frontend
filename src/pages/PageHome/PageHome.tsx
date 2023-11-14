import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/layouts/Container';
import Navigation from '../../components/layouts/Navigation';
import Header from './DayNav';
import SubjectContainer from './SubjectContainer';
import SubmitClass from './SubmitClass';
import Search from './Search';

export default function PageHome() {
  // const { isSubmitted, isSummer } = useContext(AuthContext);
  const isSubmitted = false;
  const isSummer = false;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Container>
      <h1 className='text-5xl'>Homepage</h1>
      </Container>
    </>
  );
}
