import React from "react";
import styled from 'styled-components';
import { useRef, useCallback, useState, useEffect } from "react";
import Modal from "../components/posting/Modal";
import PostingDetail from "../components/posting/PostingDetail";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";
import { instance } from '../shared/axiosConfig';
import { useLocation } from 'react-router-dom';

// 작성 페이지
const Posting = () => {
    //상세 페이지에서 navigate에 담겨서 넘어온 정보!
    const location = useLocation();
    const postData =location.state;
    console.log(postData);

    //사용자 입력값 가져오기
    const editorRef = React.useRef(null);

    const [postingData,setPostingData] = useState({});
    const [modifyPostData,setModigyPostData] = useState({});

    const [data, setData] = useState(null);
    // props 로 받아옴
    // 게시글 수정 요청
    const modifyPost = async () => {
        try {
            const modifyRes = await instance.put(`/api/posting/${data.postId}`)
            console.log(modifyRes);
            setData(modifyRes.data);
        }
        catch(err) {
            return console.log(err)
        }
    }

    useEffect(()=>{
        modifyPost();
    },[])

    //제목 미리보기
    const [ titleState, setTitleState ] = React.useState();
    const onChange = (event) => {
        setTitleState(event.target.value);
    };

    //input 입력 글자 수만큼 size 늘어나게!
    const titleRef = useRef();
    const handleResizeHeight = useCallback(() => {
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }, []);

    //모달창 상태 관리
    const [modalUp, setModalUp] = useState(false);

    const ModalUp = () => {
        setModalUp(true);        
        document.body.style.overflow = "hidden";

        // 입력창에 입력한 내용을 MarkDown 형태로 취득(뷰)
        const editorGetMarkdown = editorRef.current?.getInstance().getMarkdown();
        // console.log(editorRef.current?.getInstance().getMarkdown());

        // 입력창에 입력한 내용을 HTML 형태로 취득(글 수정시 필요)
        const editorGetHtml = editorRef.current?.getInstance().getHTML();
        // console.log(editorRef.current?.getInstance().getHTML());
        

        const postingData = {
            title : titleState,
            viewcontent : editorGetMarkdown,
            writingcontent : editorGetHtml,
        };

        setPostingData(postingData);
        
        const modifyPostData = {
            title : titleState,
            viewcontent : editorGetMarkdown,
            writingcontent : editorGetHtml,
            subTitle : postData.subTitle,
            id : postData.url,
            thumbnail : postData.thumbnail,
        }
        
        setModigyPostData(modifyPostData);
    }; 

    return (
        <>
            {postData ?
                (
                    <>
                <PostingWrapper>
                <WriteWrapper>
                    <Titlearea>
                        <TiHr>
                        <TitleEditor
                            ref={titleRef}
                            onInput={handleResizeHeight}
                            placeholder="제목을 입력하세요"
                            name="title"
                            onChange={onChange}
                            value={titleState}
                            defaultValue={postData.title}
                        />
                        <hr />
                        </TiHr>
                        <ViewTitleEditor
                            disabled
                            value={titleState}
                        />
                    </Titlearea>
                    <Editor
                        initialValue={postData.writingContent}
                        placeholder="당신의 이야기를 적어보세요..."
                        previewStyle="vertical"
                        width="100%"
                        height="401px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        usageStatistics={false}
                        ref={editorRef}
                        toolbarItems={[
                        // 툴바 옵션 설정
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['image', 'link'],
                        ['code']]}
                        previewHighlight={false}/>
                    <PostingFooter>
                        <Buttonarea>
                            <ExitButton>← 나가기</ExitButton>
                            <PostingButton onClick={ModalUp}>수정하기</PostingButton>
                            {modalUp && (
                                <Modal>
                                    <PostingDetail setModalUp={setModalUp} modifyPostData={modifyPostData}/>
                                </Modal>
                            )}
                        </Buttonarea>
                    </PostingFooter>
                </WriteWrapper>
            </PostingWrapper>
            
            </>
            ) : 
            (
                <>
                    <PostingWrapper>
                    <WriteWrapper>
                        <Titlearea>
                            <TiHr>
                            <TitleEditor
                                ref={titleRef}
                                onInput={handleResizeHeight}
                                placeholder="제목을 입력하세요"
                                name="title"
                                onChange={onChange}
                                value={titleState}
                            />
                            <hr />
                            </TiHr>
                            <ViewTitleEditor
                                disabled
                                value={titleState}
                            />
                        </Titlearea>
                        <Editor
                            placeholder="당신의 이야기를 적어보세요..."
                            previewStyle="vertical"
                            width="100%"
                            height="401px"
                            initialEditType="markdown"
                            useCommandShortcut={true}
                            usageStatistics={false}
                            ref={editorRef}
                            toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['image', 'link'],
                            ['code']]}
                            previewHighlight={false}/>
                        <PostingFooter>
                            <Buttonarea>
                                <ExitButton>← 나가기</ExitButton>
                                <PostingButton onClick={ModalUp}>출간하기</PostingButton>
                                {modalUp && (
                                    <Modal>
                                        <PostingDetail setModalUp={setModalUp} postingData={postingData}/>
                                    </Modal>
                                )}
                            </Buttonarea>
                        </PostingFooter>
                    </WriteWrapper>
                </PostingWrapper>
                
                </>

            )
                                }
        </>
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