import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  container: css`
    max-width: 56rem;
    margin: 2rem auto;
    background-color: white;
    padding: 2.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #dbeafe;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `,
  title: css`
    font-size: 2.25rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2.5rem;
    color: #2563eb;
    position: relative;
    padding-bottom: 1rem;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 5rem;
      height: 0.25rem;
      background: linear-gradient(to right, #60a5fa, #2563eb);
      border-radius: 0.25rem;
    }
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  label: css`
    display: block;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1d4ed8;
    font-size: 1.1rem;
    letter-spacing: 0.025em;
  `,
  fileInputContainer: css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  `,
  fileInputLabel: css`
    background: linear-gradient(to right, #2563eb, #3b82f6);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    &:hover {
      background: linear-gradient(to right, #1d4ed8, #2563eb);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  `,
  fileInputText: css`
    margin-left: 0.75rem;
    color: #4b5563;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
  `,
  fileInput: css`
    display: none;
  `,
  previewContainer: css`
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1d4ed8;
    font-size: 1.1rem;
  `,
  previewImage: css`
    max-height: 20rem;
    max-width: 100%;
    border-radius: 0.5rem;
    border: 2px solid #bfdbfe;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    object-fit: contain;
    &:hover {
      transform: scale(1.02);
    }
  `,
  textarea: css`
    width: 100%;
    border: 2px solid #bfdbfe;
    padding: 1rem;
    border-radius: 0.5rem;
    height: 10rem;
    background-color: #f8fafc;
    outline: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    resize: vertical;
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      background-color: white;
    }
    &::placeholder {
      color: #94a3b8;
    }
  `,
  button: css`
    padding: 0.875rem 1.75rem;
    border-radius: 0.5rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(to right, #2563eb, #3b82f6);
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &:hover {
      background: linear-gradient(to right, #1d4ed8, #2563eb);
      transform: translateY(-2px);
      box-shadow: 0 6px 10px -1px rgba(37, 99, 235, 0.4);
    }
    &:active {
      transform: translateY(0);
    }
    &:disabled {
      background: linear-gradient(to right, #93c5fd, #bfdbfe);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
      opacity: 0.7;
    }
  `,
  errorContainer: css`
    margin-top: 1.5rem;
  `,
  errorMessage: css`
    margin-top: 1rem;
    color: #dc2626;
    background-color: #fee2e2;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #fecaca;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:before {
      content: "⚠️";
    }
  `,
  analysisContainer: css`
    margin-top: 2.5rem;
    padding: 2rem;
    border: 1px solid #bfdbfe;
    border-radius: 0.75rem;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }
  `,
  analysisTitle: css`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2563eb;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background: linear-gradient(to right, #60a5fa, #2563eb);
      border-radius: 0.25rem;
    }
  `,
  analysisContent: css`
    background-color: #f8fafc;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    margin: 1rem 0;
  `,
  analysisText: css`
    color: #1e293b;
    white-space: pre-line;
    font-size: 1.05rem;
    line-height: 1.7;
    letter-spacing: 0.01em;
  `,
  disclaimer: css`
    margin: 1.5rem 0;
    background-color: #f0f9ff;
    padding: 1.25rem;
    border-left: 4px solid #0ea5e9;
    border-radius: 0.5rem;
  `,
  disclaimerText: css`
    font-size: 0.95rem;
    color: #0c4a6e;
    line-height: 1.6;
  `,
  buttonContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-start;
  `,
  buttonAction: css`
    background: linear-gradient(to right, #10b981, #34d399);
    color: white;
    &:hover {
      background: linear-gradient(to right, #059669, #10b981);
    }
    &:active {
      background: #059669;
    }
  `,
  buttonActionPDF: css`
    background: linear-gradient(to right, #f43f5e, #fb7185);
    color: white;
    &:hover {
      background: linear-gradient(to right, #e11d48, #f43f5e);
    }
    &:active {
      background: #e11d48;
    }
  `,
  // Additional new styles
  divider: css`
    height: 1px;
    background: linear-gradient(to right, transparent, #bfdbfe, transparent);
    margin: 2rem 0;
    border: none;
  `,
  cardContent: css`
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `,
  loadingIndicator: css`
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid rgba(59, 130, 246, 0.2);
    border-radius: 50%;
    border-top-color: #3b82f6;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  infoBox: css`
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    &:before {
      content: "ℹ️";
      font-size: 1.25rem;
    }
  `,
  progressBar: css`
    width: 100%;
    height: 0.5rem;
    background-color: #e2e8f0;
    border-radius: 1rem;
    margin: 1rem 0;
    overflow: hidden;

    &:after {
      content: "";
      display: block;
      height: 100%;
      width: var(--progress, 0%);
      background: linear-gradient(to right, #3b82f6, #60a5fa);
      border-radius: 1rem;
      transition: width 0.5s ease;
    }
  `,
  tooltip: css`
    position: relative;
    display: inline-block;
    cursor: help;

    &:hover:after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #1e293b;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      white-space: nowrap;
      z-index: 10;
    }
  `,
  badge: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #dbeafe;
    color: #1e40af;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    margin-left: 0.5rem;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  `,
});
