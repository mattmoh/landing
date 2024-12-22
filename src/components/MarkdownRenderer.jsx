import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function MarkdownRenderer({ markdownPath }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch(markdownPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${markdownPath}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error(error));
  }, [markdownPath]);

  const htmlContent = marked(markdownContent);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}