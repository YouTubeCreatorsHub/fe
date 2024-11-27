import { AxiosError } from 'axios';

type ApiErrorResponse = {
  message: string;
  status: number;
};

export const handleApiError = (error: AxiosError<ApiErrorResponse>): string => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '인증이 필요합니다.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '리소스를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다.';
      default:
        return `서버 오류가 발생했습니다. (${error.response.status})`;
    }
  }

  if (error.request) {
    return '서버에 연결할 수 없습니다.';
  }

  return '알 수 없는 에러가 발생했습니다.';
};
