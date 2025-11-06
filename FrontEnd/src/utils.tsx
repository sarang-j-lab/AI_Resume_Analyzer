import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

// this function is use to merge css in tailwind dynamically based on condition
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateUUID = () => crypto.randomUUID();
