import axios from "../../node_modules/axios/index";

// 토큰이 필요한 aixos 객체
export const instance = axios.create({
  // mockAPI설정
  // baseURL: "https://84d1-218-49-250-197.jp.ngrok.io",
  baseURL: "https://a49d6045-7baf-43e7-a435-1865c37559a2.mock.pstmn.io",
  timeout: 5000,
});

// 토큰이 필요없는 axios 객체
export const noneTokenInstance = axios.create({
  baseURL: "https://a49d6045-7baf-43e7-a435-1865c37559a2.mock.pstmn.io",
  timeout: 5000,
});

// 유저 인증 과정
export const authApi = {
  // 회원가입
  signup(userData) {
    return noneTokenInstance.post("/api/signup", userData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
  // 회원가입 시 아이디 중복체크
  checkedDuplication(userId) {
    return noneTokenInstance.get(`/api/signup/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
  signin(userData) {
    return noneTokenInstance.post("/api/signin", userData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
};

// post관련된 axios 요청 객체
// `/api/list?page=${pageNum}&size=15&sort=createdAt,desc`,
export const loadingMain = {
  infiniteScroll(pageNum) {
    return noneTokenInstance.get(`/api/list?page=${pageNum}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  },
  detailPage(pageUrl) {
    return noneTokenInstance.get(`/api/posting?url=${pageUrl}`,{
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  }
};

// 댓글 관련 객체
export const commentAxios = {
  postComment({comment, postId}){
    const reqComment = {
      "comment" : comment,
    }
    return instance.post(`/api/comments/${postId}`, reqComment)
  },
  deleteComment(commentId){
    return instance.delete(`api/comments/${commentId}`);
  },
  editComment({commendId, comment}){
    const modifiedComment = {
      "comment" : comment
    }
    return instance.put(`api/comment/${commendId}`, modifiedComment)
  }
}

// request 시에 인터셉터 이용해서 헤더에 토큰 추가하기
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  console.log(config);
  return config;
});

// response 시 status가 400 이상일 때 처리하기
// instance.interceptors.response.use((config)=>{

// })




export default instance;
