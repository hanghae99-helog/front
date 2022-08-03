import React from "react";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';


const Markdown = () => {

        //사용자 입력값 가져오기
        const editorRef = React.useRef(null);

        const editorData = editorRef.current;
        console.log(editorData);

    return (

        <div>
            <Editor
                initialValue="당신의 이야기를 적어보세요..."
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
                previewHighlight={false}                
            />
        </div>

    )

}

export default Markdown;