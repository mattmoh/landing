import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import './StyleGuidePage.css'; // Import the CSS file

export default function StyleGuidePage() {
  const { fileName } = useParams();
  const [files, setFiles] = useState([]);

  // Manually set the markdown files
  useEffect(() => {
    const manualFiles = ['intro', 'condition-rules'];
    setFiles(manualFiles);
  }, []);

  return (
    <main className="style-guide">
      <div className="toc-container">
        <TableOfContents files={files} />
      </div>
      <div className="content-container">
        {fileName ? (
          <MarkdownRenderer markdownPath={`../markdown/style-guide/${fileName}.md`} />
        ) : (
          <p>Please select a file from the table of contents.</p>
        )}
      </div>
    </main>
  );
}