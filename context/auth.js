import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { authenticateAPI, unauthenticateAPI } from '@/services/api';
import { getUser } from '@/services/authApi';

const AuthContext = React.createContext({
  user: null,
  authenticate: (newToken) => Promise,
  logout: ({ redirectLocation }) => {},
  isLoading: null,
  isAuthenticated: null,
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  const logout = ({ redirectLocation }) => {
    Cookies.remove('token');
    Cookies.remove('user');
    unauthenticateAPI();
    setUser(null);
    setIsLoading(false);
    console.log('Redirecting');
    router.push(redirectLocation || '/login');
  };

  const authenticate = async (token, user) => {
    setIsLoading(true);
    authenticateAPI(token);
    try {
      const { data } = await getUser(user);
      const { id, username, profileName } = data;
      setUser({ id, username, profileName });
      Cookies.set('token', token);
      Cookies.set('user', username);
    } catch (error) {
      console.log({ error });
      unauthenticateAPI();
      setUser(null);
      Cookies.remove('token');
      Cookies.remove('user');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const user = Cookies.get('user');

    if (!token) return;
    authenticate(token, user);
  }, []);

  useEffect(() => {
    const Component = children.type;

    if (!Component.requiresAuth) return;

    if (isAuthenticated) return;

    const token = Cookies.get('token');
    const user = Cookies.get('user');

    if (!token) {
      return logout({ redirectLocation: Component.redirectUnauthenticatedTo });
    }

    if (!isLoading) {
      authenticate(token, user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, children.type.requiresAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        logout,
        isLoading,
        isAuthenticated: !!user,
        token: Cookies.get('token'),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
