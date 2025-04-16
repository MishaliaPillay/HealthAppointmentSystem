import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../page";
import { beforeAll, describe, expect, test, vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, priority }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-priority={priority}
    />
  ),
}));

vi.mock("../../providers/auth-provider", () => ({
  useAuthActions: () => ({
    signIn: vi.fn(),
    signUp: vi.fn(),
  }),
  useAuthState: () => ({
    isSuccess: false,
    isError: false,
    isPending: false,
  }),
}));

vi.mock("../../providers/users-provider", () => ({
  useUserActions: () => ({
    getCurrentUser: vi.fn(),
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}));

describe("Home component", () => {
  test("renders the image with correct src, alt, width, and height", () => {
    render(<Home />);

    const image = screen.getByAltText("Next.js logo");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/logo.jpg");
    expect(image).toHaveAttribute("alt", "Next.js logo");
    expect(image).toHaveAttribute("width", "480");
    expect(image).toHaveAttribute("height", "420");
  });
});
