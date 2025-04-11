// "use client";
// import { handleActions } from "redux-actions";
// import { INITIAL_STATE, IUserStateContext } from "./context";
// import { UserActionEnums } from "./action";

// export const UserReducer = handleActions<IUserStateContext, IUserStateContext>(
//   {
//     [UserActionEnums.getUsersPending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.getUsersSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.getUsersError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.getUserPending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.getUserSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.getUserError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.verifyUserPending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.verifyUserSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [UserActionEnums.verifyUserError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//   },
//   INITIAL_STATE
// );
