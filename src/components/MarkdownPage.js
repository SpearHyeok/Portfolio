import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Katex 스타일링을 위한 CSS
import './MarkdownPage.css';

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
      />
    </div>
  );
}

export default MarkdownPage;