import { markdownState } from "../../store/atom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const MarkdownWrapper = styled.section`
  width: 48%;
  margin-top: 3.5rem;
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    word-wrap: break-word;
    font-size: 1.4rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  .language-js,
  .language-html,
  .language-tsx,
  .language-jsx,
  .language-ts,
  .language-c,
  .language-cs,
  .language-cpp,
  .language-rst,
  .language-java,
  .language-css {
    width: 100%;
    font-size: 1.4rem;
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
