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

  // Create a custom renderer for marked
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  // Use the custom renderer
  const htmlContent = marked(markdownContent, { renderer });

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}