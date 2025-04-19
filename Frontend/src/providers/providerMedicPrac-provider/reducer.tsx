import { handleActions } from "redux-actions";
import { INITIAL_STATE, IProviderStateContext } from "./context";
import { ProviderActionEnums } from "./actions";

export const ProviderReducer = handleActions<
  IProviderStateContext,
  IProviderStateContext
>(
  {
    [ProviderActionEnums.getCurrentProviderPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getCurrentProviderSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getCurrentProviderError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProvidersPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProvidersSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProvidersError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProviderPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProviderSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.getProviderError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.registerProviderPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.registerProviderSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.registerProviderError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.updateProviderPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.updateProviderSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.updateProviderError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.deleteProviderPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.deleteProviderSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderActionEnums.deleteProviderError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
