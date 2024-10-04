// src/components/MarkdownRenderer.jsx
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ markdownPath }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch(markdownPath)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error(error));
  }, [markdownPath]);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}