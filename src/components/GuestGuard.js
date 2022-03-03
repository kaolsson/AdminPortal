import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
//    return <Navigate to="/dashboard/account" />;
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
