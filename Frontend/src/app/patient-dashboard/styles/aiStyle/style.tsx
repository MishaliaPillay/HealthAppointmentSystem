import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  container: css`
    max-width: 56rem;
    margin: 1.5rem auto;
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #dbeafe;
  `,
  title: css`
    font-size: 1.875rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    color: #2563eb;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  label: css`
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #1d4ed8;
  `,
  fileInputContainer: css`
    display: flex;
    align-items: center;
  `,
  fileInputLabel: css`
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #1d4ed8;
    }
  `,
  fileInputText: css`
    margin-left: 0.75rem;
    color: #4b5563;
  `,
  fileInput: css`
    display: none;
  `,
  previewContainer: css`
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #1d4ed8;
  `,
  previewImage: css`
    max-height: 16rem;
    border-radius: 0.375rem;
    border: 1px solid #bfdbfe;
  `,
  textarea: css`
    width: 100%;
    border: 1px solid #bfdbfe;
    padding: 0.75rem;
    border-radius: 0.375rem;
    height: 8rem;
    background-color: #eff6ff;
    outline: none;
    &:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  `,
  button: css`
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    color: white;
    background-color: #2563eb;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    &:hover {
      background-color: #1d4ed8;
    }
    &:disabled {
      background-color: #93c5fd;
      cursor: not-allowed;
      box-shadow: none;
    }
  `,
  errorMessage: css`
    margin-top: 1rem;
    color: #dc2626;
    background-color: #fee2e2;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #fecaca;
  `,
  analysisContainer: css`
    margin-top: 1.5rem;
    padding: 1.25rem;
    border: 1px solid #bfdbfe;
    border-radius: 0.375rem;
    background-color: #eff6ff;
  `,
  analysisTitle: css`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2563eb;
  `,
  analysisText: css`
    color: #374151;
    white-space: pre-line;
  `,
  disclaimer: css`
    margin-top: 1rem;
    background-color: #dbeafe;
    padding: 1rem;
    border: 1px solid #bfdbfe;
    border-radius: 0.375rem;
  `,
  disclaimerText: css`
    font-size: 0.875rem;
    color: #1e40af;
  `,
});
