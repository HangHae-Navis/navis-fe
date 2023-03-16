import { markdownState } from "@/utils/atom/atoms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const MarkdownWrapper = styled.section`
  width: 48%;
  margin-top: 5rem;
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    word-wrap: break-word;
    font-size: 1.5rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .ͼ1 .cm-scroller {
    overflow-x: hidden !important;
  }
  code {
    font-size: 1.5rem;
    padding: 0.2rem 0.3rem;
    border-radius: 0.4rem;
    background-color: #7d7d7b;
  }
  pre {
    white-space: pre-wrap;
  }
  .language-js,
  .language-html,
  .language-tsx,
  .language-jsx,
  .language-ts,
  .language-css {
    width: 100%;
    font-size: 1.4rem;
    background-color: yellow;
  }
  p {
    font-size: 1.5rem;
    line-height: 1.5;
  }
  blockquote {
    position: relative;
    padding: 0.4rem 0.4rem 0.4rem 2rem;
    border-radius: 0.4rem;
    background-color: #464646;
    &::before {
      content: " ";
      min-height: 1.75rem;
      width: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      left: 0.7rem;
      background-color: #bfb8b8;
    }
    h1 {
      font-family: Pretendard !important;
      font-size: 2.5rem;
      font-weight: 900;
      code {
        font-family: Pretendard !important;
        font-size: 2.5rem;
      }
    }
    h2 {
      font-family: Pretendard !important;
      font-size: 2.2rem;
      font-weight: 700;
    }
    h3 {
      font-family: Pretendard !important;

      font-size: 1.9rem;
      font-weight: 500;
    }
    h4 {
      font-family: Pretendard !important;
      font-weight: 500;
      font-size: 1.7rem;
    }
  }
  h1 {
    font-family: Pretendard !important;
    font-size: 2.5rem;
    font-weight: 900;
    code {
      font-family: Pretendard !important;
      font-size: 2.5rem;
    }
  }
  h2 {
    font-family: Pretendard !important;
    font-size: 2.2rem;
    font-weight: 700;
  }
  h3 {
    font-family: Pretendard !important;

    font-size: 1.9rem;
    font-weight: 500;
  }
  h4 {
    font-family: Pretendard !important;
    font-weight: 500;
    font-size: 1.7rem;
  }
  ul {
    padding-left: 1.5rem;
    list-style: circle;
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 0;
      font-size: 1.4rem;
    }
  }
  a {
    font-size: 1.5rem;
  }
`;

const MarkdownRender = () => {
  const markdownValue = useRecoilValue(markdownState);

  return (
    <MarkdownWrapper>
      <ReactMarkdownWrapper remarkPlugins={[remarkGfm]}>
        {markdownValue}
      </ReactMarkdownWrapper>
    </MarkdownWrapper>
  );
};

export default MarkdownRender;
