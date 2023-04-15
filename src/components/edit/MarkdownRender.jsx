import { editorState } from "../../store/atom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilValue } from "recoil";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getLocalStorage } from "../../utils/infos/localStorage";
import Tag from "../global/Tag";
import StarTag from "../global/StarTag";

const MarkdownRender = () => {
  const userName = JSON.parse(getLocalStorage("userInfo")).nickname;
  const date = new Date();
  const editorInfo = useRecoilValue(editorState);
  return (
    <MarkdownWrapper>
      {/* <TitleRenderContent>
        <h1>{editInfo.title}</h1>
        <span>{userName}</span>
        <span>|</span>
        <span>{date.toLocaleDateString()}</span>
      </TitleRenderContent> */}
      <InfoWrapper>
        <div className="tags">
          <Tag dtype={editorInfo.category} />
          <StarTag important={editorInfo.important} />
        </div>
        <div className="title">
          <h1>{editorInfo.title}</h1>
          <p>{editorInfo.hashtagList}</p>
        </div>
        <div className="bottom">
          <p className="subtitle">{editorInfo.subtitle}</p>

          <div className="writer">
            {userName} | {date.toLocaleDateString()}
          </div>
        </div>
      </InfoWrapper>
      <ReactMarkdownWrapper
        children={editorInfo.content}
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
  border: 1px solid #c0c0c0;
  border-radius: 2rem;
  padding: 1.5rem;
  height: 70rem;
`;

const InfoWrapper = styled.section`
  width: 98%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 0.05rem solid #d9d9d9;
  padding-bottom: 1rem;

  .tags {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .title {
    display: flex;
    gap: 1rem;
    align-items: center;
    h1 {
      font-size: 1.85rem;
    }
    p {
      font-weight: 500;
      align-self: flex-end;
      font-size: 1.15rem;
      color: #9795b5;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #878787;
    font-weight: 500;
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .writer {
      color: #a0a0a0;
      font-size: 1.05rem;
      font-weight: 500;
    }
  }
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.4rem;
    font-family: Pretendard !important;
  }
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 56rem;
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
