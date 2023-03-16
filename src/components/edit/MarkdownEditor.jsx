import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useCallback, useState } from "react";

const MarkdownEditorWrapper = styled.section`
  padding: 3.52rem 2rem;
  height: fit-content;
  width: 50%;
  outline: none !important;
  font-family: Cascadia-code !important;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }

  .cm-line {
    font-size: 1.5rem;
    .ͼ11,
    .ͼ13 {
      color: #686869;
    }
  }

  .ͼo .cm-gutters {
    background-color: #121212;
  }

  .cm-gutterElement .cm-activeLineGutter {
    background-color: yellow !important;
  }

  .cm-activeLine {
    font-size: 1.5rem;
  }
  span {
    font-size: 1.5rem;
  }
  .cm-content {
    font-size: 1.5rem;
  }
  .ͼo {
    .cm-activeLine {
      background-color: transparent;
    }
  }
  .ͼ1 {
    .cm-scroller {
      background-color: #121212;
    }
    .cm-selectionMatch {
      background-color: #303031;
    }
  }
`;

const MarkdownEditor = () => {
  const [markdownState, setMarkdownState] = useState(``);
  const onChange = useCallback((value) => {
    setMarkdownState(value);
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
        value={markdownState}
        theme={"dark"}
        onChange={onChange}
      />
    </MarkdownEditorWrapper>
  );
};

export default MarkdownEditor;
