import { useContext } from "react"
import DisableContext from "./DisableContext"




const useDisableContext = ()=>{
    const context = useContext(DisableContext);
    if(!context){
        throw new Error("Disable context doest have any value")
    }
    return context;
}

export default useDisableContext;