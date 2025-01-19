import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import './Resume.css';

const Resume = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('/resume.md')
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    return (
        <main>
            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
            <button onClick={() => window.open('/MOHRENWEISER_2409.PDF', '_blank')}>Get the real thing!</button>
        </main>
    );
};

export default Resume;