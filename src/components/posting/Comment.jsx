import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {commentAxios, noneTokenInstance} from "../../shared/axiosConfig";
import { async } from "@firebase/util";
import WroteComment from "./WroteComment";
import { useDispatch, useSelector } from "react-redux";


const Comment = () => {
    const [commentState, setCommentState] = useState([]);
    const commentsList = useSelector(state=> {
        setCommentState(state.comments);
        console.log(commentState);
        console.log(state);
        return state
    })

    return (
        <CommentWrapper>
                <CommentWritingarea>
                    <CommentWritingDetail>
                        <textarea placeholder="댓글을 작성하세요"></textarea><br />
                    </CommentWritingDetail>
                        <button className="commentbutton">댓글 작성</button>
                </CommentWritingarea>
                {commentState.map(el=>{
                    return (
                        <WroteComment commentData={el} key={el.commentId} />
                    )
                })}
        </CommentWrapper>

    )
    
}

export default Comment;


const CommentWrapper =styled.div`
    text-align: right;
`

const CommentWritingarea =styled.div`

    textarea {
        resize: none;
        width: 100%;
        border: 1px solid #f1f3f5;
        outline: none;
        background: #FFFFFF;
        color: #dee2e6;
        line-height: 1.75;
        font-size: 1rem;
        height: 7.375rem;
        padding: 1rem 1rem 1.5rem;
        box-sizing : border-box;
        margin-bottom: 1.5rem;
        border-radius: 4px;
        min-height: 6.125rem;
    }

    button {
        background: #12b886;
        color : white;
        width : 112px;
        border : none;
        padding : 0.4rem;
        border-radius: 4px;
        font-weight: bolder;
        font-size: 1rem;
    }

`

const CommentWritingDetail = styled.div`
text-align: left;

`
