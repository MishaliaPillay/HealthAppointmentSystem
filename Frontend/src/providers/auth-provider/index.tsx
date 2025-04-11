// "use client";

// import {
//   INITIAL_STATE,
//   IUser,
//   UserActionContext,
//   UserStateContext,
//   ILoginResponse,
// } from "./context";
// import { UserReducer } from "./reducer";
// import { useContext, useReducer } from "react";
// import {
//   getUserError,
//   getUserPending,
//   getUserSuccess,
//   verifyUserPending,
//   verifyUserError,
//   verifyUserSuccess,
// } from "./action";
// import axios from "axios";

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
//   // const instance = getAxiosInstance();

//   const getUser = async () => {
//     dispatch(getUserPending());
//     const endpoint =
//       "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/user/current";

//     try {
//       const token = sessionStorage.getItem("jwt")?.trim();

//       console.log("gettingusers");

//       if (!token) {
//         dispatch(getUserError());
//         return null; // Return null instead of nothing
//       }

//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });

//       dispatch(getUserSuccess(response.data.data));
//       return response;
//     } catch (error) {
//       console.error(
//         " Error fetching user details:",
//         error.response?.data?.message || error
//       );
//       dispatch(getUserError());
//       return null; // Return null instead of nothing
//     }
//   };

//   const verifyUser = async (user: IUser) => {
//     dispatch(verifyUserPending());
//     const endpoint =
//       "https://body-vault-server-b9ede5286d4c.herokuapp.com/api/users/login";
//     try {
//       console.log("getting User data", user);
//       const response = await axios.post<ILoginResponse>(endpoint, user);
//       // console.log("Response", response.data);
//       const token = response.data.data.token;
//       if (token) {
//         console.log("session This where token stored");
//         sessionStorage.setItem("jwt", token);
//       } else {
//         console.error("token not received");
//       }
//       //dispatch(getUserSuccess(response.data.data));
//       dispatch(verifyUserSuccess(response.data));
//       console.log(response);
//     } catch (error) {
//       console.error(
//         "Error during login:",
//         error.response?.data?.message || error
//       );
//       dispatch(verifyUserError());
//       throw error;
//     }
//   };

//   return (
//     <UserStateContext.Provider value={state}>
//       <UserActionContext.Provider
//         value={{
//           getUser,
//           verifyUser,
//         }}
//       >
//         {children}
//       </UserActionContext.Provider>
//     </UserStateContext.Provider>
//   );
// };

// export const useUserState = () => {
//   const context = useContext(UserStateContext);
//   if (!context) {
//     throw new Error("useUserState must be used within a UserProvider");
//   }
//   return context;
// };

// export const useUserActions = () => {
//   const context = useContext(UserActionContext);
//   if (!context) {
//     throw new Error("useUserActions must be used within a UserProvider");
//   }
//   return context;
// };
