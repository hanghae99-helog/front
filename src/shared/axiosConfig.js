import axios from "../../node_modules/axios/index";

// 토큰이 필요한 aixos 객체
export const instance = axios.create({
  // mockAPI설정
  baseURL: "https://389fe977-f9ba-4e5e-8ea9-a9d6874fbd1c.mock.pstmn.io",
  timeout: 5000,
});

// instance 2개를 만들어서 특정 request일 때만 토큰을 붙게 하자
// 유저 인증 과정에서 사용할 axios 객체 만들기
export const loginInstance = axios.create({
  // ngrok 설정
  // baseURL: "https://113e-218-49-250-197.jp.ngrok.io",
  // mockAPI설정
  baseURL: "https://389fe977-f9ba-4e5e-8ea9-a9d6874fbd1c.mock.pstmn.io",
  timeout: 5000,
});

// 게시글 관련 axios 객체 만들기
export const postInstance = axios.create({
  baseURL: "https://389fe977-f9ba-4e5e-8ea9-a9d6874fbd1c.mock.pstmn.io",
  timeout: 5000,
});

// 유저 인증 과정
// instance를 두 개 만들어서 특정 경우에서만 token을 헤더에 담을 수 있도록 하자
export const authApi = {
  // 회원가입
  signup(userData) {
    return loginInstance.post("/api/signup", userData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
  // 회원가입 시 아이디 중복체크
  checkedDuplication(userId) {
    return loginInstance.post(`/api/signup/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
  signin(userData) {
    // return loginInstance.post("/api/signin", userData, {
    return loginInstance.post("/api/signin", userData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
};

// post관련된 axios 요청 객체
export const postAuth = {
  mainLoading(pageNum) {
    return postInstance.get(
      `/api/list?page=${pageNum}&size=15&sort=createdAt,desc`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
  },
};

// request 시에 인터셉터 이용해서 헤더에 토큰 추가하기
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

// response 시 status가 400 이상일 때 처리하기
// instance.interceptors.response.use((config)=>{

// })

export default instance;
