import { markdownState } from "../../store/atom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const MarkdownWrapper = styled.section`
  width: 48%;
  margin-top: 3.25rem;
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.5rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const MarkdownRender = () => {
  const markdownValue = useRecoilValue(markdownState);
  return (
    <MarkdownWrapper>
      <ReactMarkdownWrapper
        children={markdownValue}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={atomDark}
                PreTag="div"
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