import { useState, useEffect } from 'react';
import '../App.css';
import Navbar from './Navbar';
import ReactMarkdown from 'react-markdown';
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

function Resume() {
  const [markdown, setMarkdown] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    fetch("/resume.md")
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
        initializeExpandedSections(text);
      })
      .catch((error) => {
        console.error("Error fetching the markdown file:", error);
      });
  }, []);

  const initializeExpandedSections = (markdownText) => {
    const lines = markdownText.split("\n");
    const initialExpandedSections = {};
    let currentIndex = 0;

    lines.forEach((line) => {
      if (line.startsWith("#")) {  // This identifies a markdown header
        initialExpandedSections[currentIndex] = true;
        currentIndex++;
      }
    });

    setExpandedSections(initialExpandedSections);
  };

  const toggleExpand = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const generateComponents = () => {
    let currentIndex = 0;
    return {
      h1: ({ node, ...props }) => {
        const index = currentIndex++;
        const isExpanded = expandedSections[index];

        return (
          <div className="header-container">
            <h1 {...props} className="expandable-header" />
            <span
              className="expand-collapse-arrow"
              onClick={() => toggleExpand(index)}
            >
              {isExpanded ? <SlArrowDown /> : <SlArrowRight />}
            </span>
          </div>
        );
      },
      p: ({ node, ...props }) => {
        const parentIndex = currentIndex - 1;
        return expandedSections[parentIndex] ? <p {...props} /> : null;
      },
      h2: ({ node, ...props }) => {
        const parentIndex = currentIndex - 1;
        return expandedSections[parentIndex] ? <h2 {...props} /> : null;
      },
      h3: ({ node, ...props }) => {
        const parentIndex = currentIndex - 1;
        return expandedSections[parentIndex] ? <h2 {...props} /> : null;
      },
      ul: ({ node, ...props }) => {
        const parentIndex = currentIndex - 1;
        return expandedSections[parentIndex] ? <ul {...props} /> : null;
      },
    };
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <ReactMarkdown components={generateComponents()}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Resume;
