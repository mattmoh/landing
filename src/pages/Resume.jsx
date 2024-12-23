import MarkdownRenderer from '../components/MarkdownRenderer';
import './Resume.css';

export default function Resume() {
  return (
    <main className='resume'>
      <MarkdownRenderer markdownPath="/markdown/resume.md" />
    </main>
  );
}