import React, { useEffect, useRef, useState } from 'react';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  url: string;
}

interface PdfTextItem {
  str: string;
  transform: number[];
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const renderTextContent = async () => {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const viewer = viewerRef.current;

      if (viewer) {
        viewer.innerHTML = '';
        for (let num = 1; num <= pdf.numPages; num++) {
          const page = await pdf.getPage(num);
          const textContent = await page.getTextContent();

          const textDiv = document.createElement('div');
          textDiv.classList.add('textLayer', 'relative', 'whitespace-pre-wrap');

          let lastY: number | null = null;
          const spans: HTMLElement[] = [];
          textContent.items.forEach((item: PdfTextItem) => {
            const span = document.createElement('span');
            span.textContent = item.str + ' ';

            if (lastY !== null && item.transform[5] !== lastY) {
              spans.push(document.createElement('br'));
            }
            lastY = item.transform[5];

            spans.push(span);
          });

          spans.forEach(span => textDiv.appendChild(span));
          viewer.appendChild(textDiv);
        }
      }
    };

    renderTextContent();
  }, [url]);

  useEffect(() => {
    const highlightSearchTerm = () => {
      const viewer = viewerRef.current;
      if (!viewer) return;

      const textLayers = viewer.querySelectorAll('.textLayer span');

      textLayers.forEach(span => {
        const text = span.textContent?.toLowerCase() || '';
        const startIndex = text.indexOf(searchTerm.toLowerCase());

        if (startIndex !== -1) {
          const endIndex = startIndex + searchTerm.length;
          const originalText = span.textContent || '';

          span.innerHTML =
            originalText.substring(0, startIndex) +
            `<span class="highlight bg-yellow-300">${originalText.substring(startIndex, endIndex)}</span>` +
            originalText.substring(endIndex);
        } else {
          span.innerHTML = span.textContent || '';
        }
      });
    };

    highlightSearchTerm();
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div ref={viewerRef} className="viewer h-96 border border-gray-300 overflow-auto relative"></div>
    </div>
  );
};

export default PdfViewer;