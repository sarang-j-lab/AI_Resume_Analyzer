import { createContext }  from "react";

interface disableContextProps{
    disable:boolean,
    setDisable:  React.Dispatch<React.SetStateAction<boolean>>,
    disableButton:()=>void;
}

const DisableContext = createContext<disableContextProps | undefined>(undefined);

export default DisableContext;