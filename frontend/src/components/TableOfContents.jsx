import { Link } from 'react-router-dom';

export default function TableOfContents({ files }) {
  return (
    <div className="toc">
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <Link to={`/style-guide/${file}`}>{file}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}