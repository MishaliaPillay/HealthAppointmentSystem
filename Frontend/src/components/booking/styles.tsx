// styles.ts
import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => ({
  bookingButton: {
    background: token.colorPrimary,
    color: token.colorWhite,
    padding: `${token.paddingSM}px ${token.paddingMD}px`,
    borderRadius: token.borderRadiusLG,
    fontWeight: 500,
    boxShadow: token.boxShadowTertiary,
    "&:hover": {
      background: token.colorPrimaryHover,
    },
  },
  modalContent: {
    maxHeight: "90vh",
    overflow: "auto",
    padding: token.paddingMD,
    "& .responsive-steps": css`
      margin-bottom: 24px;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 10px;

      @media (max-width: 768px) {
        .ant-steps-item-title {
          font-size: 12px;
        }
      }
    `,
  },
  stepContent: {
    padding: token.paddingLG,
  },
  stepCard: {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusSM, // smaller radius
    padding: "4px 8px", // minimal padding
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px", // lock height
    textAlign: "center",
    lineHeight: 1, // remove vertical spacing
    boxShadow: "none", // if card adds extra space
    "&:hover": {
      background: token.colorBgTextHover,
    },
  },

  // Add these new styles for date cards
  dateCard: {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    padding: token.paddingMD,
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      borderColor: token.colorPrimary,
      background: token.colorBgTextHover,
      transform: "translateY(-2px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    },
    "&.selected": {
      borderColor: token.colorPrimary,
      background: `${token.colorPrimary}10`,
    },
  },
  dateDay: {
    fontSize: 16,
    fontWeight: 600,
    color: token.colorTextHeading,
    marginBottom: token.marginXS,
  },
  dateNumber: {
    fontSize: 28,
    fontWeight: 700,
    color: token.colorPrimary,
    lineHeight: 1.2,
    margin: `${token.marginXS}px 0`,
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    marginBottom: token.marginMD,
    color: token.colorPrimary,
    cursor: "pointer",
  },
  locationCard: {
    marginBottom: token.marginSM,
  },
  doctorCard: {
    marginBottom: token.marginSM,
  },
  doctorInfo: {
    display: "flex",
    alignItems: "center",
  },
  doctorImage: {
    borderRadius: "50%",
    marginRight: token.marginSM,
  },
  doctorActions: {
    display: "flex",
    gap: token.marginXS,
  },
  summaryCard: {
    background: token.colorBgLayout,
    padding: token.paddingMD,
    borderRadius: token.borderRadiusLG,
    marginBottom: token.marginLG,
  },
  timeSlotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: token.marginXS,
  },
  timeSlot: {
    textAlign: "center",
    padding: token.paddingSM,
  },
  footerActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: token.paddingSM,
    marginTop: token.marginMD,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
}));
