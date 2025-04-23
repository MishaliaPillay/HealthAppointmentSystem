import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginSignup from "../../app/login/page";
import { useAuthState } from "../../providers/auth-provider";
import { getRole } from "../../utils/decoder";
import React from "react";

// Mock the components
vi.mock("../../components/login-form/page", () => ({
  default: vi.fn(() => <div data-testid="login-form">Login Form</div>),
}));

vi.mock("../../components/sign-up-form/page", () => ({
  default: vi.fn(() => <div data-testid="signup-form">Signup Form</div>),
}));

// Mock the auth provider
vi.mock("@/providers/auth-provider", () => ({
  useAuthState: vi.fn(),
}));

// Mock the router
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock the decoder utility
vi.mock("@/utils/decoder", () => ({
  getRole: vi.fn(),
}));

// Mock toast notifications
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

describe("LoginSignup", () => {
  const mockRouterPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Reset default auth state - use proper casting for the mock
    (useAuthState as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isSuccess: false,
      isError: false,
      isPending: false,
    });

    // Mock router
    require("next/navigation").useRouter.mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("renders login tab by default", () => {
    render(<LoginSignup />);

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("allows switching to signup tab", async () => {
    render(<LoginSignup />);

    // Find and click the signup tab button
    const signupTab = screen.getByText("Sign Up");
    await userEvent.click(signupTab);

    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  });

  it("shows loading state when authentication is pending", () => {
    (useAuthState as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isSuccess: false,
      isError: false,
      isPending: true,
    });

    render(<LoginSignup />);

    expect(screen.getByText("Please hold on...")).toBeInTheDocument();
  });

  it("shows error toast when authentication fails", () => {
    (useAuthState as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isSuccess: false,
      isError: true,
      isPending: false,
    });

    render(<LoginSignup />);

    expect(require("react-toastify").toast.error).toHaveBeenCalledWith(
      "Your authentication was unsuccessful!"
    );
  });

  it("redirects to provider dashboard after successful provider login", async () => {
    (useAuthState as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isSuccess: true,
      isError: false,
      isPending: false,
    });
    vi.mock("@/utils/decoder", () => ({
      getRole: vi.fn(),
    }));
    (getRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      "provider"
    );
    sessionStorageMock.setItem("jwt", "provider-token");


    render(<LoginSignup />);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/provider-dashboard");
    });
  });

  it("redirects to patient dashboard after successful patient login", async () => {
    (useAuthState as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isSuccess: true,
      isError: false,
      isPending: false,
    });

    sessionStorageMock.setItem("jwt", "patient-token");
    
    (getRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue('patient');
    render(<LoginSignup />);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/patient-dashboard");
    });
  });
});
