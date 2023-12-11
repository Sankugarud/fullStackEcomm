import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, authenticated, fallbackPath, ...rest }) => {
  return (
    <Route
      {...rest}
      element={authenticated ? <Element /> : <Navigate to={fallbackPath} />}
    />
  );
};
export default PrivateRoute

