import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "../utils.tsx";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}


// this is an main accordian wrapper which wraps all accordian items  with AccordianContext
export const Accordion: React.FC<AccordionProps> = ({ children, defaultOpen }) => {

    const [activeItems, setActiveItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            return prev.includes(id) ? [] : [id];
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
            <div className="space-y-2" >{children}</div>
        </AccordionContext.Provider>
    );
};

interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
    return (
        <div className={`overflow-hidden border-b border-gray-200`}>
            {children}
        </div>
    );
};

interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({ itemId, children, }) => {
    const { toggleItem, isItemActive } = useAccordion();

    const isActive = isItemActive(itemId);

    const arrowIcon = (
        <svg
            className={cn("w-5 h-5 transition-transform duration-200", {
                "rotate-180": isActive,
            })}
            fill="none"
            stroke="#98A2B3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button onClick={handleClick} className={`w-full px-4 py-3 text-left focus:outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer `}>
            <div className="flex items-center space-x-3">
                <div className="flex-1">{children}</div>
            </div>
            {arrowIcon}
        </button>
    );
};

interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ itemId, children }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={`
        overflow-hidden transition-all duration-300 ease-in-out 
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}`}
        >
            <div className="px-4 py-3 ">{children}</div>
        </div>
    );
};