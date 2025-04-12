import {getAxiosInstace}from "../../app/utils/axiosInstance";
import { IPaitient } from "./models";
import { INITIAL_STATE, PaitientActionContext, PaitientStateContext } from "./context";
import { PaitientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {registerPaitientPending, registerPaitientError, registerPaitientSuccess} from "./actions";

    export const PaitientProvider=({children}:{children: React.ReactNode})=>{
        const [state, dispatch] = useReducer(PaitientReducer, INITIAL_STATE);
        const instance = getAxiosInstace();
        const registerPaitient = async(paitient: IPaitient) => {
            dispatch(registerPaitientPending());
            const endpoint = `/paitients`;
            await instance.post(endpoint,paitient)
            .then((response) => {
                dispatch(registerPaitientSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(registerPaitientError());
            })
            .finally(()=>{
                console.log("Operaation complete")
            })
        }
        const getPaitients= () => {}
        const getPaitient= () => {}
        const updatePaitient=(paitient:IPaitient)=>{}
        const deletePaitientbyId=(paitientId:string)=>{}
        return(
            <PaitientStateContext.Provider value={state}>
                <PaitientActionContext.Provider value={{registerPaitient,getPaitients,getPaitient,updatePaitient,deletePaitientbyId}}>
                    {children}
                </PaitientActionContext.Provider>
            </PaitientStateContext.Provider>
        )
    };
export const usePaitientState = () => {
  const context = useContext(PaitientStateContext);
  if (!context) {
    throw new Error(
      "usePaitientState must be used within a PaitientProvider"
    );
  }
  return context;
};

export const usePaitientActions = () => {
  const context = useContext(PaitientActionContext);
  if (!context) {
    throw new Error(
      "PaitientActionContext must be used within a PaitientProvider"
    );
  }
  return context;
};