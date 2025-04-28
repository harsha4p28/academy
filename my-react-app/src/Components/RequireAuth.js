import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;


// import React from 'react'
// import { useLocation,Outlet,Navigate } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'

// const RequireAuth = ({allowedRoles}) => {
//     const {auth}=useAuth();
//     const location = useLocation();

//   return (
//     auth?.roles?.find(role => allowedRoles?.includes(role))
//         ?<Outlet />
//         : auth?.user
//             ?<Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />
//   );
// }

// export default RequireAuth


