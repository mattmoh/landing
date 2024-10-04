import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';

export default function StyleGuidePage() {
  const { fileName } = useParams();
  const [files, setFiles] = useState([]);

  // Fetch the markdown files from the backend API
  useEffect(() => {
    fetch('/api/markdown-files')
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error('Error fetching markdown files:', error));
  }, []);

  return (
    <div className="style-guide">
      <div className="toc-container">
        <TableOfContents files={files} />
      </div>
      <div className="content-container">
        {fileName ? (
          <MarkdownRenderer markdownPath={`/markdown/${fileName}`} />
        ) : (
          <p>Select a file from the table of contents.</p>
        )}
      </div>
    </div>
  );
}