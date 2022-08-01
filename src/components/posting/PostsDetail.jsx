import React from "react";
import styled from 'styled-components';
// import { useRef, useCallback } from "react";

const PostsDetail = () => {


    return (
        <PostingWarrap>
            <Titlearea>
                <h1>제목 긁어오기</h1>
                <TitleBody>

                    <WritingButtons>
                        <button>수정</button>
                        <button>삭제</button>
                    </WritingButtons>

                    <Userarea>
                        <h4>아이디</h4>
                        <h4>작성시간</h4> 
                    </Userarea>


                </TitleBody>
            </Titlearea>
            <Content>
                <h3>글 불러오기</h3>
                <Profilearea>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII=" alt="profile" />
                    <ProfileDetail>
                        <h2>닉네임 불러오기</h2>
                        <h3>아이디 불러오자</h3>
                    </ProfileDetail>
                </Profilearea>
            </Content>
        </PostingWarrap>

    )
}

export default PostsDetail;

const PostingWarrap =styled.div`

    text-align: left;
    margin-bottom : 30px;
`

const Titlearea =styled.div`
    margin-bottom : 30px;
`


const Content =styled.div`
    // padding-bottom : 30px;

    h3 {
        padding-bottom : 80px;
    }

    margin-bottom : 40px;
`

const TitleBody =styled.div`
    padding-bottom : 30px;
`
const WritingButtons =styled.div`
    text-align: right;
`

const Userarea =styled.div`
    display : flex;



    h4 {
        padding : 5px;
    }


`
const Profilearea =styled.div`
    display : flex;
    img {
        width : 125px;
        height : 125px;
    }

`
const ProfileDetail = styled.div`
    display : flex;
    flex-direction: column;

    

`
