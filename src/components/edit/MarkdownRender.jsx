import { markdownState } from "../../store/atom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownWrapper = styled.section`
  width: 48%;
  padding: 0 1.2rem 1.2rem 0;
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.6rem;
    font-family: "Roboto Mono", monospace;
  }
  border-radius: 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
  border: 0.1rem solid ${(props) => props.theme.color.grey50};

  p {
    word-wrap: break-word;
  }
`;

const MarkdownRender = () => {
  const markdownValue = useRecoilValue(markdownState);
  return (
    <MarkdownWrapper>
      <ReactMarkdownWrapper
        children={markdownValue}
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

export default MarkdownRender;
