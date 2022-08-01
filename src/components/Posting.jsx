// Main.js (modal component를 사용함)
import React, { useState } from "react";
import Modal from "../components/posting/Modal";
import PostingDetail from "../components/posting/PostingDetail";
import PostingMain from "./PostingMain";
 
function Posting(props) {
  const [modalUp, setModalUp] = useState(false);
 
  return (
    <div className="Main">
      <PostingMain />
      // 회원가입 버튼을 누르면 회원가입 modal이 생성된다
      <input type="button" value="회원가입" className="blueBtn" onClick={() => setModalUp(!modalUp)}/>
      {modalUp && (
        <Modal closeModal={() => setModalUp(!modalUp)}>
          <PostingDetail />
        </Modal>
      )}
    </div>
  );
}
 
export default Posting;
