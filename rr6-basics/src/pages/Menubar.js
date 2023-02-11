import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const Menubar = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>

      <Outlet />

      <button onClick={goHome}>홈으로 돌아가기</button>
    </div>
  );
};

export default Menubar;
