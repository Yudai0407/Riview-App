import { Home } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../index.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <header className="app-header">
      <div className='header-container'>
        <div className="header-left">
          <span className="app-logo">理view</span>
        </div>
        <div className="header-right">
          <Link to="/" className="home-icon" title="ホーム">
            <Home size={30} />
          </Link>
          {user && (
            <>
              <img
                src={user.photoURL}
                alt="User Icon"
                className="user-icon"
                referrerPolicy="no-referrer"
              />
              <button onClick={handleLogout} className="logout-button">
                ログアウト
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
  
  export default Header;
