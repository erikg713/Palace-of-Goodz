import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PublicRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
  restricted?: boolean; // restricts access if authenticated
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
