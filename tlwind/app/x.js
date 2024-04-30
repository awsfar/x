import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([428, 926]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the dimensions of the image
  // Adding text
  page.drawText('Ikram Market', {
    x: 31,
    y: page.getHeight() - 27 - 64, // Adjust for the font size
    size: 64,
    font,
    color: rgb(0, 0, 0),
  });

  // Drawing the first line
  page.drawLine({
    start: { x: 4, y: page.getHeight() - 202.5 },
    end: { x: 424, y: page.getHeight() - 202.5 },
    color: rgb(0, 0, 0),
    thickness: 1,
  });

  // Adding "Proudouit"
  page.drawText('Proudouit', {
    x: 6,
    y: page.getHeight() - 173 - 24, // Adjust y position
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Adding "Qty"
  page.drawText('Qty', {
    x: 263,
    y: page.getHeight() - 173 - 24,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Adding "Price"
  page.drawText('Price', {
    x: 363,
    y: page.getHeight() - 173 - 24,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Adding "Total:"
  page.drawText('Total :', {
    x: 8,
    y: page.getHeight() - 711 - 40, // Adjust y position
    size: 40,
    font,
    color: rgb(0, 0, 0),
  });

  // Adding the total value
  page.drawText('10.000.0000', {
    x: 210,
    y: page.getHeight() - 715 - 48, // Adjust y position
    size: 48,
    font,
    color: rgb(0, 0, 0),
  });

  // Drawing the second line
  page.drawLine({
    start: { x: 4, y: page.getHeight() - 693.5 },
    end: { x: 424, y: page.getHeight() - 693.5 },
    color: rgb(0, 0, 0),
    thickness: 1,
  });

  // Adding "Date"
  page.drawText('in : 2024/05/03 12:03:07', {
    x: 67,
    y: page.getHeight() - 119 - 24, // Adjust y position
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText('id : 00000000000001', {
    x: 31,
    y: page.getHeight() - 759 - 131, // Adjust y position
    width: 282,
    height: 131,
  });
  // Continue adding other elements similarly...

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Convert the bytes to a Blob and create a download link
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'IkramMarket.pdf';
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import React from 'react';

function App() {
  return (
    <div>
      <button onClick={createPDF}>Download PDF</button>
    </div>
  );
}

export default App;
