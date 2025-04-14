import { IAuth, ILoginResquest } from "@/providers/auth-provider/models";

interface MockResponse<T> {
  status: number;
  data: T;
}

// Mock Patient and Provider Data
const mockPatientData = {
  title: "Mr",
  name: "John",
  surname: "Doe",
  emailAddress: "johndoe@example.com",
  phoneNumber: "1234567890",
  UserName: "johndoe",
  password: "Password@123",
  role: "PATIENT",
};

const mockProviderData = {
  title: "Dr",
  name: "Jane",
  surname: "Smith",
  emailAddress: "janesmith@example.com",
  phoneNumber: "0987654321",
  UserName: "drjane",
  password: "Password@123",
  role: "PROVIDER",
};

export const mockAuthService = {
  // Mock signup functionality
  signUp: async (authData: IAuth): Promise<MockResponse<IAuth>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authData.role === "PATIENT") {
          resolve({
            status: 201,
            data: { ...mockPatientData, ...authData },
          });
        } else if (authData.role === "PROVIDER") {
          resolve({
            status: 201,
            data: { ...mockProviderData, ...authData },
          });
        } else {
          resolve({
            status: 400,
            data: { message: "Invalid role!" } as unknown as IAuth, // Ensures compatibility
          });
        }
      }, 1000); // Simulate network delay
    });
  },

  // Mock login functionality
  signIn: async (loginRequest: ILoginResquest): Promise<MockResponse<{ token: string }>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          (loginRequest.email === mockPatientData.emailAddress &&
            loginRequest.password === mockPatientData.password) ||
          (loginRequest.email === mockProviderData.emailAddress &&
            loginRequest.password === mockProviderData.password)
        ) {
          resolve({
            status: 200,
            data: { token: "mockJwtToken123" },
          });
        } else {
          resolve({
            status: 401,
            data: { token: "" },
          });
        }
      }, 1000); // Simulate network delay
    });
  },

  // Mock logout functionality
  signOut: async (): Promise<MockResponse<{ message: string }>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { message: "Successfully signed out!" },
        });
      }, 500); // Simulate network delay
    });
  },
};