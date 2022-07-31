import axios from "../../node_modules/axios/index";

// axios 객체 만들기
export const instance = axios.create({
  baseURL: "www.naver.com",
  timeout: 5000,
});

// 유저 인증 과정
export const authApi = {
  // 회원가입
  signup(userData) {
    instance.post("api/user", userData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    });
  },
};

// request 시에 인터셉터 이용해서 헤더에 토큰 추가하기
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("TOKEN");
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

// response 시 status가 400 이상일 때 처리하기
// instance.interceptors.response.use((config)=>{

// })

export default instance;
