import React from "react";
import { classNames } from "./Utils";

export function Button({ children, className, ...rest }) {
    return (
        <button
            type="button"
            className={classNames(
                "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:text-slate-200 dark:bg-slate-800 hover:bg-gray-50",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}

export function PageButton({ children, className, ...rest }) {
    return (
        <button
            type="button"
            className={classNames(
                "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-slate-200 hover:bg-gray-50",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
