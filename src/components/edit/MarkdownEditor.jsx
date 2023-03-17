import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { markdownState } from "../../store/atom";

const MarkdownEditorWrapper = styled.section`
  * {
    font-size: 1.5rem;
  }
  padding: 3.1rem 1rem;
  width: 52%;
  font-family: Pretendard !important;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
`;

const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useRecoilState(markdownState);
  const onChange = useCallback((value) => {
    setMarkdownValue(value);
  }, []);
  return (
    <MarkdownEditorWrapper>
      <ReactCodeMirror
        placeholder={"게시글을 입력해주세요."}
        basicSetup={{
          lineNumbers: false,
        }}
        autoFocus={true}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        value={markdownValue}
        theme={"dark"}
        onChange={onChange}
        height={"80vh"}
      />
    </MarkdownEditorWrapper>
  );
};

export default MarkdownEditor;
