import { handleActions } from "redux-actions";
import { INITIAL_STATE, IPaitientStateContext } from "./context";
import { PaitientActionEnums } from "./actions";

export const PaitientReducer = handleActions<IPaitientStateContext, IPaitientStateContext>({
    [PaitientActionEnums.getPaitientsPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.getPaitientsSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.getPaitientsError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.getPaitientPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.getPaitientSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.getPaitientError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.registerPaitientPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.registerPaitientSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.registerPaitientError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.updatePaitientPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.updatePaitientSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.updatePaitientError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.deletePaitientPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.deletePaitientSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PaitientActionEnums.deletePaitientError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, INITIAL_STATE );