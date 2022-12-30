import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
// import { parse } from 'query-string';

import samplePDF from './sample.pdf';

// const fs = require('fs');

export default function ShowPDF() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // setting 1 to show fisrt page
//  const [pdf] = useState(parse(window.location.search).did);

//  function onLoadPDF() {
//    console.log('here');
//    try {
//        const data = fs.readFileSync(pdf, 'utf8');
//        console.log(data);
//        return samplePDF;
//      } catch (err) {
//        console.error(err);
//      }
//      return samplePDF;
//  }

  function onDocumentLoadSuccess({ numPages1 }) {
    setNumPages(numPages1);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document
        file={samplePDF}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page
          {pageNumber || (numPages ? 1 : '--')}
          of
          {numPages || '--'}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
