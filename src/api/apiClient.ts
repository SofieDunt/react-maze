import { GameDto, GetGameDto } from './dto';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface PromiseRejectReason {
  message: string;
}

const handleAxiosResponse = async <T>(
  execute: () => Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await execute();
    return Promise.resolve(res.data);
  } catch (err: any) {
    if (!!err.response) {
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject({ message: 'Network error' });
    }
  }
};

class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api/v1/',
    });
  }

  async getGame(req: GetGameDto): Promise<GameDto> {
    const pathWithParams =
      'game/' +
      req.xDim +
      '/' +
      req.yDim +
      '/' +
      req.bias +
      '/' +
      req.source +
      '/' +
      req.target;
    return handleAxiosResponse(() => this.axiosInstance.get(pathWithParams));
  }
}

export default new ApiClient();
