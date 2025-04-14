import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  const faculties = [
    { id: 'rigaku', name: '理学部第一部' },
    { id: 'kougaku', name: '工学部' },
    { id: 'souiki', name: '創域理工学部' },
    { id: 'senshin', name: '先進理工学部' },
    { id: 'yakugaku', name: '薬学部' },
    { id: 'keiei', name: '経営学部' },
    { id: 'rigaku2', name: '理学部第二部' },
  ];

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className='fac-select'>学部を選択してください</h1>
        <div className="faculty-grid">
          {faculties.map((faculty) => (
            <button
              key={faculty.id}
              onClick={() => navigate(`/faculty/${faculty.id}`)}
              className='fac-button'
            >
              {faculty.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;