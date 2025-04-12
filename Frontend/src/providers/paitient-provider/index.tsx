import {getAxiosInstace}from "../../app/utils/axiosInstance";
import { IPatient } from "./models";
import { INITIAL_STATE, PatientActionContext, PatientStateContext } from "./context";
import { PatientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {registerPatientPending, registerPatientError, registerPatientSuccess} from "./actions";

    export const PatientProvider=({children}:{children: React.ReactNode})=>{
        const [state, dispatch] = useReducer(PatientReducer, INITIAL_STATE);
        const instance = getAxiosInstace();
        const registerPatient = async(Patient: IPatient) => {
            dispatch(registerPatientPending());
            const endpoint = `/Patients`;
            await instance.post(endpoint,Patient)
            .then((response) => {
                dispatch(registerPatientSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(registerPatientError());
            })
            .finally(()=>{
                console.log("Operaation complete")
            })
        }
        const getPatients= () => {}
        const getPatient= () => {}
        const updatePatient=(Patient:IPatient)=>{}
        const deletePatientbyId=(PatientId:string)=>{}
        return(
            <PatientStateContext.Provider value={state}>
                <PatientActionContext.Provider value={{registerPatient,getPatients,getPatient,updatePatient,deletePatientbyId}}>
                    {children}
                </PatientActionContext.Provider>
            </PatientStateContext.Provider>
        )
    };
export const usePatientState = () => {
  const context = useContext(PatientStateContext);
  if (!context) {
    throw new Error(
      "usePatientState must be used within a PatientProvider"
    );
  }
  return context;
};

export const usePatientActions = () => {
  const context = useContext(PatientActionContext);
  if (!context) {
    throw new Error(
      "PatientActionContext must be used within a PatientProvider"
    );
  }
  return context;
};