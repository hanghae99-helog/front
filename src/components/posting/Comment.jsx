import React from "react";
import styled from 'styled-components';

const Comment = () => {

    return (
        <CommentWrapper>
                <CommentWritingarea>
                    <CommentWritingDetail>
                        <textarea></textarea>댓글을 작성하세요<br />
                    </CommentWritingDetail>
                        <button className="commentbutton">댓글 작성</button>
                </CommentWritingarea>

                <CommentView>
                    <CommentUserarea>
                        <CommentUserDetail>
                                <Imgarea>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII=" alt="comment-user-thumbnail" />
                                </Imgarea>
                            <CommentUserFropileDetail>
                                <h5>아이디</h5>
                                <h5>작성시간</h5>
                            </CommentUserFropileDetail>
                        </CommentUserDetail>
                        <CommentWritingButtons>
                            <button>수정</button>
                            <button>삭제</button>
                        </CommentWritingButtons>
                    </CommentUserarea>
                    <CommentContent>
                    <h3>댓글 긁어오기</h3>
                    </CommentContent>
                </CommentView>
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
        // box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
        background: #FFFFFF;
        color: var(--text1);
        line-height: 1.5;
        font-size: 0.875rem;
        height: 7.375rem;
        padding: 0.75rem 1rem;
        // margin-top: 0.5rem;
        box-sizing : border-box;
    }

    button {
        background: #12b886;
        color : white;
        width : 112px;
        border : none;
        padding : 0.5rem;
        border-radius: 4px;
    }


`

const CommentWritingDetail = styled.div`
text-align: left;

`


const CommentView =styled.div`

    // display : flex;

`



const CommentUserarea =styled.div`

    display : flex;
    justify-content: space-between;

    img {
        width : 50px;
        height : 50px;
    }

    margin : 15px 0;


`

const CommentUserDetail =styled.div`
    display : flex;
    // flex-direction: column;
`

const Imgarea = styled.div`

`

const CommentUserFropileDetail =styled.div`
    display : flex;
    flex-direction: column;
    h5 {
        margin : 0;
    }

`

const CommentWritingButtons = styled.div `
//    justify-content: flex-end;


`

const CommentContent =styled.div`
    text-align: left;

`