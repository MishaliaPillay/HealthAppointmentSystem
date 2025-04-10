import { CSSProperties } from "react";

// Define a custom type that includes all CSS properties plus the mobileBreakpoint
interface AppointmentStyles extends Record<string, CSSProperties | number> {
  container: CSSProperties;
  header: CSSProperties;
  headerControls: CSSProperties;
  searchFilter: CSSProperties;
  searchInput: CSSProperties;
  filterSelect: CSSProperties;
  responsiveTable: CSSProperties;
  actionButton: CSSProperties;
  statusTag: CSSProperties;
  titleText: CSSProperties;
  mobileBreakpoint: number;
}

export const styles: AppointmentStyles = {
  container: {
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "24px",
  },
  headerControls: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "16px",
  },
  searchFilter: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "300px",
  },
  filterSelect: {
    width: "150px",
  },
  responsiveTable: {
    overflowX: "auto",
  },
  actionButton: {
    margin: "4px",
  },
  statusTag: {
    textTransform: "uppercase" as const,
  },
  titleText: {
    marginBottom: "16px",
  },
  // Media query support via JavaScript - to handle in component logic
  mobileBreakpoint: 768,
};

export default styles;
