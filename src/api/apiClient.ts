import {
  GetMazeDto,
  GetMoveDto,
  GetPathDto,
  GetSearchDto,
  KeyValDto,
  MazeDto,
  SearchDto,
} from './dto';
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

  async getMaze(req: GetMazeDto): Promise<MazeDto> {
    return handleAxiosResponse(() => this.axiosInstance.post('maze', req));
  }

  async getMove(req: GetMoveDto): Promise<number> {
    return handleAxiosResponse(() =>
      this.axiosInstance.post('navigate/move', req),
    );
  }

  async getSearch(req: GetSearchDto): Promise<SearchDto> {
    return handleAxiosResponse(() => this.axiosInstance.post('search', req));
  }

  async getPath(req: GetPathDto): Promise<KeyValDto[]> {
    return handleAxiosResponse(() =>
      this.axiosInstance.post('search/reconstruct-path', req),
    );
  }
}

export default new ApiClient();
