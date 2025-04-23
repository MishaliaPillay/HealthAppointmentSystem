

export const generatePDF = (summary: string) => {
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(16);
  doc.text("Conversation Summary", 10, y);
  y += 10;
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(summary, 180);
  doc.text(lines, 10, y);
  y += lines.length * 10;
  doc.save(`summary-${new Date().toISOString().slice(0, 10)}.pdf`);
};
