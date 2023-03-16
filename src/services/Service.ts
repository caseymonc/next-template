import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UseMutationOptions, UseQueryOptions, UseQueryResult } from 'react-query';
import axios from 'src/libs/axios';

import { TypedAxiosDataMutationResult, useTypedAxiosDataMutation, useServiceQuery } from 'src/hooks/useAxiosQuery';

export type GetConfigWithType<ReturnType> = AxiosRequestConfig & {
  a?: ReturnType;
  queryKey: UseQueryOptions['queryKey'];
};

export type PostConfigWithType<PostData, ReturnType> = AxiosRequestConfig & {
  a?: PostData;
  b?: ReturnType;
};

export async function POST<PostData, ReturnType>(
  requestConfig: PostConfigWithType<PostData, ReturnType>,
  data: PostData
): Promise<AxiosResponse<ReturnType>> {
  if (!requestConfig.url) throw new Error('Invalid Request, missing URL');
  return axios<ReturnType>({ ...requestConfig, data });
}

export async function PUT<PostData, ReturnType>(
  requestConfig: PostConfigWithType<PostData, ReturnType>,
  data: PostData
): Promise<AxiosResponse<ReturnType>> {
  if (!requestConfig.url) throw new Error('Invalid Request, missing URL');
  return axios<ReturnType>({ ...requestConfig, data });
}

export async function GET<ReturnType>(
  requestConfig: GetConfigWithType<ReturnType>
): Promise<AxiosResponse<ReturnType>> {
  if (!requestConfig.url) throw new Error('Invalid Request, missing URL');
  return axios<ReturnType>(requestConfig);
}

export function useGET<ReturnType>(
  requestConfig: GetConfigWithType<ReturnType>,
  config?: UseQueryOptions<AxiosResponse<ReturnType>, AxiosError>
): UseQueryResult<AxiosResponse<ReturnType>, AxiosError> {
  return useServiceQuery(requestConfig.queryKey, () => GET(requestConfig), config);
}

export function usePOST<PostData, ReturnType>(
  requestConfig: PostConfigWithType<PostData, ReturnType>,
  config?: UseMutationOptions<AxiosResponse<ReturnType>, AxiosError, PostData>
): TypedAxiosDataMutationResult<PostData, ReturnType> {
  return useTypedAxiosDataMutation(requestConfig, config);
}

export function usePUT<PostData, ReturnType>(
  requestConfig: PostConfigWithType<PostData, ReturnType>,
  config?: UseMutationOptions<AxiosResponse<ReturnType>, AxiosError, PostData>
): TypedAxiosDataMutationResult<PostData, ReturnType> {
  return useTypedAxiosDataMutation(requestConfig, config);
}
