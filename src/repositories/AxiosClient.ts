import axios from 'axios';
import type { AxiosProgressEvent, Method } from 'axios';
import qs from 'qs';
import SessionService from '../services/SessionService';
import { isNil, isEqual, get } from 'lodash-es';

type Data = Record<string, unknown>;
type Param = Data | Array<unknown>;
type ResponseData<T> = { data: T };

export const register = async () => {
  axios.defaults.baseURL = 'http://localhost:8080/';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};

export const setUserSessionToken = (token?: string | null) => {
  if (!isNil(token)) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getHttpClient = <T>(
  path: string,
  method: Method,
  data: Data | null = null,
  params: Param | null = null,
): Promise<T> => {
  const query = !isNil(params)
    ? '?' + qs.stringify(params, { allowDots: true })
    : '';
  const urlPath = path + query;

  return asyncOperation(
    axios({
      method: method,
      url: urlPath,
      data: data,
    }),
  );
};

export const postMultiPart = <T>(
  path: string,
  method: string,
  data: Data | null,
  params: Param | null = null,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<T> => {
  const query =
    params !== null ? '?' + qs.stringify(params, { allowDots: true }) : '';

  const url = axios.defaults.baseURL + path + query;
  return asyncOperation(
    axios({
      method: method,
      url: url,
      data: data,
      onUploadProgress,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  );
};

const asyncOperation = async <T>(request: Promise<T>) => {
  try {
    const response = await request;
    return (response as ResponseData<T>).data;
  } catch (err: unknown) {
    const error = err as Record<string, Data>;
    const data = get(error, 'response.data');

    const message = get(data, 'message', get(data, 'error')) as string;
    const status = get(data, 'status', error?.response?.status) as number;
    if (isEqual(status, 401)) {
      SessionService.unAuthenticated();
      throw new ServerException(message, status, data);
    } else if (!isNil(message)) {
      throw new ServerException(message, status, data);
    } else {
      throw error;
    }
  }
};

class ServerException extends Error {
  status: number;
  response: Param | null;
  constructor(
    message: string | undefined,
    status: number,
    response: Data | null,
  ) {
    super(message);
    this.name = 'ServerException';
    this.status = status;
    this.response = response;
  }
}

export { ServerException };
