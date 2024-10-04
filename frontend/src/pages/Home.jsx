import MarkdownRenderer from '../components/MarkdownRenderer';
import './Home.css';

export default function Home() {
  return (
    <div className='home'>
      <MarkdownRenderer markdownPath="/markdown/mattmoh.md" />
    </div>
  );
} 
  