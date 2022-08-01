import React, {useState} from "react";
import styled from 'styled-components';
import {ReactComponent as ThumbnailIcon} from '../../images/Thumbnailcon.svg'
import {ReactComponent as PublicIcon} from '../../images/PublicIcon.svg'
import {ReactComponent as RockIcon} from '../../images/RockIcon.svg'
import {ReactComponent as MenuIcon} from '../../images/MenuIcon.svg'
import Modal from "../posting/Modal";

const PostingDetail = ({setModalUp}) => {
    

    return (
        <PostingDetailWarrap>
            <ContentWarrp>
                <Previewarea>
                    <Imagearea>
                        <h3>포스트 미리보기</h3>
                        <Thumbnail>
                            <ThumbnailIcon fill = "#868e96" width = "118px"/>
                            <button>썸네일 업로드</button>
                        </Thumbnail>
                    </Imagearea>
                    <Postarea>
                        <h4>제목 긁어오기</h4>
                        <textarea>글 내용 긁어오기</textarea>
                        <h>글자 수 세기</h>
                    </Postarea>
                
                </Previewarea>
                <hr />
                <UserChoicearea>
                    <PublicSettingsarea>
                        <PublicSettings>
                            <h2>공개 설정</h2>
                            <PublicSettingsButtons>
                                <button><PublicIcon />전체 공개</button>
                                <button><RockIcon />비공개</button>
                            </PublicSettingsButtons>
                        </PublicSettings>

                        <UrlSettings>
                            <h2>URL 설정</h2>
                            <input placeholder="/@유저아이디/"></input>    
                        </UrlSettings>

                        <SeriesSettings>
                            <h2>시리즈 설정</h2>
                            <button><MenuIcon />&nbsp;&nbsp;시리즈에 추가하기</button>
                        </SeriesSettings>
                    </PublicSettingsarea>
                    
                    <Buttons>
                        <button onClick={() => setModalUp(false)} className="fail">취소</button>
                        <button className="Success">출간하기</button>
                    </Buttons>
            
                </UserChoicearea>
            </ContentWarrp>
        </PostingDetailWarrap>
    )

}

export default PostingDetail;

const PostingDetailWarrap = styled.div`
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: #f8f9fa;
    // flex-direction: column;
    text-align: left;
    hr {
        height:70vh;
        width:1px;
        border-width:0;
        color:gray;
        background-color:#000;
        margin-left: 2rem;
        margin-right: 2rem;
       }

    h2 {
        font-size : 22px;
        margin-top : 2rem;
        margin-bottom : 0.5rem;
    }

    button {
        color: #12b886;

    }
`

const ContentWarrp = styled.div`
    // width: 60%;
    width : 768px;
    display : flex;
    align-items: center;
    justify-content: center;
    margin : 0 auto;
    padding-top : 5.6rem;
    box-sizing : border-box;
    
`

const Previewarea = styled.div`

    background: var(--bg-element3);
    // width: 100%;
    height: 80%;

    display: flex;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;

    button {
        margin-top: 0.1rem;
        padding: 0.25rem 2rem;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
        font-size: 1rem;
        line-height: 1.5;
        color: #12b886;
        outline: none;
        border: none;
        cursor: pointer;
        font-weight: bold;
    }

`

const Imagearea = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    h3 {
        margin : 0;
        margin-bottom: 0.5rem;
    }

`


const Thumbnail = styled.div`
    display: flex;
    box-sizing : border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #e9ecef;
    padding : 1rem 6rem;
    padding-bottom : 1.6rem


`


const Postarea = styled.div`

    width: 100%;
    text-align: right;

    h4 {
        margin-top : 2rem;
        margin-bottom : 0.8rem;
        text-align: left;
    }
    textarea {
        resize: none;
        width: 100%;
        border: none;
        outline: none;
        box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
        background: #FFFFFF;
        color: var(--text1);
        line-height: 1.5;
        font-size: 0.875rem;
        height: 7.375rem;
        padding: 0.75rem 1rem;
        // margin-top: 0.5rem;
        box-sizing : border-box;
    }

    h {
        
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--text3);

    }
`

const UserChoicearea = styled.div`
    flex: 1 1 0%;
    // display: flex;
    // justify-content : space-between;
    // flex-direction: column;
    margin-top: 0;

}


`

const PublicSettingsarea = styled.div`

    width : 100%;
    
    button {
        outline: none;
        flex: 1 1 0%;
        height: 3rem;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;
        background: #FFFFFF;
        font-size: 1.125rem;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;
        border-radius: 4px;
        cursor: pointer;
        border: solid 1px var(--primary2);
        // padding : 0 2px;

    }


`

const PublicSettings = styled.div`
   h2 {
    margin-top : 0;

   }

`

const PublicSettingsButtons = styled.div`
    display : flex;

    // box-sizing : border-box;

    button {

        box-sizing : border-box;
        display : flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding : 0 20px;
        margin-right : 20px;
    }

`

const UrlSettings = styled.div`
    width: 100%;
    input {
        resize: none;
        width: 100%;
        border: none;
        outline: none;
        box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
        background: #FFFFFF;
        color: var(--text1);
        line-height: 1.5;
        // font-size: 0.875rem;
        // height: 7.375rem;
        padding: 0.5rem 0.875rem;
        // margin-top: 0.5rem;
        box-sizing : border-box;
    }

`

const SeriesSettings = styled.div`


    button {
        background: #ffffff;
        height: 3rem;
        width: 100%;
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        font-weight: bold;
        cursor: pointer;

    }


`

const Buttons = styled.div`

display: flex;
// align-items: center;
    justify-content: flex-end;
    button {

    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 0px 1.2rem;
    height: 2.5rem;
    font-size: 1.125rem;
    margin-top : 5rem;
    margin-left : 10px;
    }

    .fail {
        background-color: transparent;
    }

    .Success {
        background-color: #12b886;;
        color : white;
    }

`
