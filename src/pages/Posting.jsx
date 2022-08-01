import React from "react";
import styled from 'styled-components';
import { useRef, useCallback, useState } from "react";
import Markdown from "../components/posting/Markdown";
import Modal from "../components/posting/Modal";
import PostingDetail from "../components/posting/PostingDetail";


const Posting = (props) => {

    //제목 미리보기
    const [ title, setTitle ] = React.useState();
    const onChange = (event) => {
        setTitle(event.target.value);
    };

    //input 입력 글자 수만큼 size 늘어나게!
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    //모달창 상태 관리
    const [modalUp, setModalUp] = useState(false);

    const ModalUp = () => {
        setModalUp(true);
    }; 

 


    return (
        <PostingWrapper>
            <WriteWrapper>
                <Titlearea>
                    <TiHr>
                    <TitleEditor
                        ref={textRef}
                        onInput={handleResizeHeight}
                        placeholder="제목을 입력하세요"
                        name="title"
                        onChange={onChange}
                        value={title}
                    />
                    <hr />
                    </TiHr>
                    <ViewTitleEditor
                        disabled
                        // placeholder="제목을 입력해주세요"
                        value={title}
                    />
                </Titlearea>
                <Markdown />
                <PostingFooter>
                    <Buttonarea>
                        <ExitButton>← 나가기</ExitButton>
                        <PostingButton onClick={ModalUp}>출간하기</PostingButton>
                        {modalUp && (
                            <Modal>
                                <PostingDetail setModalUp={setModalUp}/>
                            </Modal>
                        )}
                    </Buttonarea>
                </PostingFooter>
            </WriteWrapper>
        </PostingWrapper>
    )

}

export default Posting;


const PostingWrapper =styled.div`
    // width : 100vw;
    height : 100vh;
    // display : flex;

    .Modal {
        position:absolute;
        bottom:0;
        left:0;

    }

`


const WriteWrapper =styled.div`

    display: inline;
    height : 80vh;

    @media (min-width: 500px) {
        width : 50vw;
    }

    @media (max-width: 1000px) {
         width : 100vw;
    }


`

const TitleEditor = styled.textarea`
    // display : flex;
    // flex-direction: row;
    // justify-content: center;
    // align-items: center;

    // height: auto;
    font-size : 44px;
    // padding: 0;
    border: none;
    font-weight : 700;
    resize: none;
    
    &:focus {
        outline: none;
    }
    box-sizing: border-box;
    // word-wrap: break-word;
    // height : 3.5rem;

`;

const Titlearea = styled.div`
    display : flex;
    padding : 20px;
    padding-left : 40px;
`

const TiHr = styled.div `
    width: 50%;
    display : flex;
    flex-direction: column;

    hr {
        margin : 0;
        padding : 0;
        height: 6px;
        background-color : black;
        width: 4rem;
        height : 6px;
            // margin-bottom : 10.56px;
            margin-top : 0px;

    }
`

const ViewTitleEditor = styled.textarea`
    placeholder-color : black;
    // display : flex;
    flex-direction: row;
    // justify-content: center;
    // align-items: center;
    background-color : transparent;
    width: 50%;
    height: 10vh;
    font-size : 40px;
    padding: 0;
    border: none;
    font-weight : 700;
    resize: none;
    height : 150px;
    
    &:focus {
        outline: none;
    }
    box-sizing: border-box;
    // word-wrap: break-word;
    // height : 3.5rem;

`;


const PostingFooter =styled.div`
    background-color : white;
    box-sizing : border-box;
    display : flex;
    width : 100vw;


    position : fixed;
    bottom : 0;
    left : 0;


`

const Buttonarea = styled.div `
    display : flex;
    justify-content: space-between;
    // justify-content: center;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
    align-items: center;
    height : 65px;
    padding-right : 16px;
    padding-left : 16px;
    box-sizing : border-box;

    @media (min-width: 500px) {
        width : 50%;
    }

    @media (max-width: 1000px) {
         width : 100%;
    }

    button {
        font-size : 18px;
        height : 40px;
        padding : 0px 1.25rem;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 4px;
        
    }
`

const ExitButton = styled.button`
    background-color :  transparent;
    color : black;
`

const PostingButton = styled.button`
    background: #12b886;
    color : white;
    width : 112px;
`