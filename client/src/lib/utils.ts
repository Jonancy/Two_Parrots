import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//!Its used for merging classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
