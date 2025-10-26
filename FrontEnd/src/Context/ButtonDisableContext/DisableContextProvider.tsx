import { useState, type ReactNode } from "react";
import DisableContext from "./DisableContext.tsx"



const DisableContextProvider = ({ children }: { children: ReactNode }) => {

    const [disable, setDisable] = useState<boolean>(false);

    function disableButton() {
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
        }, 2000)
    }

    return (
        <DisableContext.Provider value={{ disable, setDisable, disableButton }} >
            {children}
        </DisableContext.Provider>
    )
}

export default DisableContextProvider;