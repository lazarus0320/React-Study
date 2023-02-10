import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Menubar = () => {
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
    </div>
  );
};

export default Menubar;
