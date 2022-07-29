import axios from '../../node_modules/axios/index';

export const instance = axios.create({
  baseURL: 'www.naver.com',
  timeout: 5000,
});

// 기능별 그룹화 예시
export const authApi = {
  // 회원가입
  signup(userData) {
    instance.post('api/user', userData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        accept: 'application/json',
      },
    });
  },
};

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});

export default instance;
