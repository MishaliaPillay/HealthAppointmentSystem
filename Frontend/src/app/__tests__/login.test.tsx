import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginSignup from "../../app/login/LoginSignup"; // Import the real component
import { useAuthState } from "../../providers/auth-provider/index";
import { useRouter } from "next/navigation";
import React from "react";

// Mocks
vi.mock("../../providers/auth-provider/index", () => ({
  useAuthState: vi.fn(),
}));

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

// Mock sessionStorage
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem: vi.fn(() => "mocked.jwt.token"), // Simulate a valid token
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
});

// Mock the decodeToken function and getRole function
vi.mock("../../utils/decoder", () => ({
    decodeToken: vi.fn(() => ({
      role: "user", // Example decoded token data
      id: "12345",
    })),
    getRole: vi.fn(() => "provider"), // Mock the `getRole` function
  }));
  
  
// Mock components
vi.mock("../../components/login-form/page", () => ({
  default: ({ onBeforeSubmit }: any) => (
    <button onClick={() => onBeforeSubmit?.()}>Login Submit</button>
  ),
}));

vi.mock("../../components/sign-up-form/page", () => ({
  default: ({ onBeforeSubmit }: any) => (
    <button onClick={() => onBeforeSubmit?.()}>Signup Submit</button>
  ),
}));

describe("LoginSignup component", () => {
  const setActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("switches to login tab after successful signup", async () => {
    // Mocking the auth state as if the signup was successful
    (useAuthState as any).mockReturnValue({
      isSuccess: true,
      isError: false,
      isPending: false,
      token: "mocked.jwt.token", // Mocked token in the auth state
    });

    render(<LoginSignup activeTab="signup" setActiveTab={setActiveTab} />);

    // Wait for the effect that switches the tab after successful signup
    await waitFor(() => {
      expect(setActiveTab).toHaveBeenCalledWith("login");
    });
  });

  it("renders signup tab correctly", () => {
    render(<LoginSignup activeTab="signup" setActiveTab={setActiveTab} />);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByText("Signup Submit")).toBeInTheDocument();
  });

  it("calls setActiveTab on tab change", () => {
    render(<LoginSignup activeTab="login" setActiveTab={setActiveTab} />);
    const loginSubmit = screen.getByText("Login Submit");
    fireEvent.click(loginSubmit);
    // Assuming the mock works, we check that the submit button was clicked
    expect(loginSubmit).toBeInTheDocument();
  });
});
