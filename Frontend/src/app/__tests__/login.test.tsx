// LoginForm.test.tsx
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../components/login-form/page";
import { useAuthActions } from "../../providers/auth-provider";
import { useCheckuserActions } from "../../providers/check-user-provider";
import { useUserActions } from "../../providers/users-provider";

import React from "react";

// Mock the necessary providers and their hooks
vi.mock("@/providers/auth-provider", () => ({
  useAuthActions: vi.fn(),
}));

vi.mock("@/providers/check-user-provider", () => ({
  useCheckuserActions: vi.fn(),
}));

vi.mock("@/providers/users-provider", () => ({
  useUserActions: vi.fn(),
}));

// Mock the lodash.debounce to execute immediately
vi.mock("lodash.debounce", () => ({
  default: (fn) => fn,
}));

// Mock the next/navigation router
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock antd components
vi.mock("antd", () => {
  const actual = vi.importActual("antd");
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

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

describe("LoginForm", () => {
  const mockSignIn = vi.fn();
  const mockUserExists = vi.fn();
  const mockGetCurrentUser = vi.fn();
  const mockOnBeforeSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Correctly mock the hook return values with the right interfaces
    (useAuthActions as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        signIn: mockSignIn,
      })
    );

    (
      useCheckuserActions as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => ({
      userExists: mockUserExists,
    }));

    (useUserActions as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        getCurrentUser: mockGetCurrentUser,
        getUsers: vi.fn(),
        getUser: vi.fn(),
        createUser: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
      })
    );

    // Default behavior for userExists check
    mockUserExists.mockResolvedValue({
      result: { emailExists: true },
    });

    // Default behavior for signIn
    mockSignIn.mockResolvedValue(true);

    // Set up sessionStorage mock
    sessionStorageMock.setItem("jwt", "mock-jwt-token");
  });

  it("renders login form with all fields", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("validates email field is required", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Please input your email!")).toBeInTheDocument();
    });
  });

  it("validates if user exists when email is entered", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "test@example.com");
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(mockUserExists).toHaveBeenCalledWith({
        emailAddress: "test@example.com",
        userName: "",
      });
    });
  });

  it("displays error when user does not exist", async () => {
    mockUserExists.mockResolvedValue({
      result: { emailExists: false },
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "nonexistent@example.com");
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("User does not exist")).toBeInTheDocument();
    });
  });

  it("calls onBeforeSubmit when form is submitted", async () => {
    render(<LoginForm onBeforeSubmit={mockOnBeforeSubmit} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnBeforeSubmit).toHaveBeenCalled();
    });
  });

  it("calls signIn with entered credentials", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        userNameOrEmailAddress: "test@example.com",
        password: "password123",
      });
    });
  });

  it("calls getCurrentUser after successful login", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockGetCurrentUser).toHaveBeenCalledWith("mock-jwt-token");
    });
  });

  it("handles login error", async () => {
    const errorMessage = "Invalid credentials";
    mockSignIn.mockRejectedValue({
      response: { data: { errorMessage } },
    });

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);
  });
});
