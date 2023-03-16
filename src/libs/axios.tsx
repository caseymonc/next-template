import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import Router from 'next/router';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

interface ServerRequestConfig extends AxiosRequestConfig {
  ctx?: NextPageContext | GetServerSidePropsContext;
}

/**
 * If an error is caused by a 401 response then redirect to /signout.
 *
 * Works for both client-side and server-side requests.
 *
 * TODO: Figure out how we want to handle 401s. For now, don't sign out
 * TODO: 401s are a sign that our token has expired in the middle of using the site.
 * TODO: But there are other reasons to get a 401, so we may need to do someething like
 * TODO: Blacklist some eendpoints that tell us that the 401 is because we need to log in again
 */
function responseErrorInterceptor(error: any): Promise<any> {
  return Promise.reject(error);
}

const refreshAuthLogic = (failedRequest: any) =>
  new Promise<void>(() => {
    Router.push('/auth/signout');
  });

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_CLIENT_LOCATION,
  withCredentials: true,
  validateStatus(status) {
    return status < 400;
  },
});

// Respond to 401s with a redirect to `/signout`
instance.interceptors.response.use(undefined, responseErrorInterceptor);

createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  statusCodes: [403],
});

const wrapper = <P,>(config: ServerRequestConfig): AxiosPromise<P> => instance(config);

export * from 'axios';
export default wrapper;
