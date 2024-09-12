import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Katex 스타일링을 위한 CSS
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // 코드 하이라이팅
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 테마 가져오기
import './MarkdownPage.css';

// 테마를 커스터마이징하여 배경색 변경
const customTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    background: '#2e3440',
  },
};

function MarkdownPage() {
  const { markdownFile, folder } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    import(`../markdown/${folder}/${markdownFile}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => response.text())
          .then((text) => setContent(text));
      })
      .catch((err) => setContent('Markdown file not found'));
  }, [markdownFile, folder]);

  return (
    <div className='Md_Containner'>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={customTheme}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}  // 라인 번호 표시
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
}

export default MarkdownPage;