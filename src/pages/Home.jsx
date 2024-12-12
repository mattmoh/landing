import MarkdownRenderer from '../components/MarkdownRenderer';
import './Home.css';

export default function Home() {
  return (
    <main className='home'>
      <MarkdownRenderer markdownPath="/markdown/mattmoh.md" />
    </main>
  );
}