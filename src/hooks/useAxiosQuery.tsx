import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseMutationOptions,
  UseQueryResult,
  UseQueryOptions,
  QueryFunction,
} from 'react-query';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import axios from 'src/libs/axios';

export function useServiceQuery<T>(
  queryKey: UseQueryOptions['queryKey'],
  queryFn: QueryFunction<AxiosResponse<T>>,
  config?: UseQueryOptions<AxiosResponse<T>, AxiosError>
): UseQueryResult<AxiosResponse<T>, AxiosError> {
  const router = useRouter();
  return useQuery<AxiosResponse<T>, AxiosError>({
    ...config,
    queryKey,
    queryFn,
    onError: (error: AxiosError): void => {
      if (error?.response?.status === 401 && router.pathname !== '/signout' && router.pathname !== '/signin') {
        // TODO: Do something
      }
    },
  });
}

export function useAxiosQuery<T>(
  queryKey: UseQueryOptions['queryKey'],
  requestOptions: AxiosRequestConfig,
  config?: UseQueryOptions<AxiosResponse<T>, AxiosError>
): UseQueryResult<AxiosResponse<T>, AxiosError> {
  const router = useRouter();
  return useQuery<AxiosResponse<T>, AxiosError>({
    ...config,
    queryKey,
    queryFn: () => axios(requestOptions),
    onError: (error: AxiosError): void => {
      if (error?.response?.status === 401 && router.pathname !== '/signout' && router.pathname !== '/signin') {
        // TODO: Do something
      }
    },
  });
}

export function useAxiosMutation(
  originalRequestOptions: AxiosRequestConfig,
  mutationOptions?: UseMutationOptions<AxiosResponse, AxiosError, AxiosRequestConfig>
): UseMutationResult<AxiosResponse, AxiosError, AxiosRequestConfig> {
  return useMutation<AxiosResponse, AxiosError, AxiosRequestConfig>(
    (finalRequestOptions) =>
      axios({
        ...originalRequestOptions,
        ...finalRequestOptions,
      }),
    mutationOptions
  );
}

export type AxiosDataMutationResult<Data> = UseMutationResult<AxiosResponse, AxiosError, Data>;

export function useAxiosDataMutation<Variables>(
  requestOptions: AxiosRequestConfig,
  mutationOptions?: UseMutationOptions<AxiosResponse, AxiosError, Variables>
): AxiosDataMutationResult<Variables> {
  return useMutation<AxiosResponse, AxiosError, Variables>(
    (data) =>
      axios({
        ...requestOptions,
        data,
      }),
    mutationOptions
  );
}

export type TypedAxiosDataMutationResult<Data, ReturnType> = UseMutationResult<
  AxiosResponse<ReturnType>,
  AxiosError,
  Data
>;

export function useTypedAxiosDataMutation<Variables, ReturnType = any>(
  requestOptions: AxiosRequestConfig,
  mutationOptions?: UseMutationOptions<AxiosResponse<ReturnType>, AxiosError, Variables>
): TypedAxiosDataMutationResult<Variables, ReturnType> {
  return useMutation<AxiosResponse, AxiosError, Variables>(
    (data) =>
      axios({
        ...requestOptions,
        data,
      }),
    mutationOptions
  );
}
