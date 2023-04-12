import { editorState } from "../../store/atom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getLocalStorage } from "../../utils/infos/localStorage";

const MarkdownRender = () => {
  const userName = JSON.parse(getLocalStorage("userInfo")).nickname;
  const date = new Date();
  const editInfo = useRecoilValue(editorState);
  return (
    <MarkdownWrapper>
      <TitleRenderContent>
        <h1>{editInfo.title}</h1>
        <span>{userName}</span>
        <span>|</span>
        <span>{date.toLocaleDateString()}</span>
      </TitleRenderContent>
      <ReactMarkdownWrapper
        children={editInfo.content}
        remarkPlugins={[remarkGfm]}
        style={a11yDark}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                style={a11yDark}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </MarkdownWrapper>
  );
};

const MarkdownWrapper = styled.section`
  width: 50%;
  height: 100%;
  border: 0.1rem solid #9795b5;
  border-radius: 2rem;
  padding: 1.5rem;
  height: 865px;
`;

const TitleRenderContent = styled.section`
  padding: 5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  h1 {
    width: 29rem;
    font-size: 2.1rem;
    line-height: 1.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    align-self: flex-cent;
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.grey40};
  }
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.4rem;
    font-family: "Roboto Mono", monospace;
  }
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  p {
    word-wrap: break-word;
  }
  h1 {
    padding: 2rem 0;
    font-size: 2.1rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h2 {
    padding: 2rem 0;
    font-size: 1.9rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }
  h3 {
    padding: 2rem 0;
    font-size: 1.7rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.45;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  blockquote {
    width: 100%;
    padding-left: 1.25rem;
    border-left: 5px solid rgba(0, 0, 0, 0.1);
    p {
      line-height: 1.4;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      line-height: 1.2;
    }
  }
`;

export default MarkdownRender;
