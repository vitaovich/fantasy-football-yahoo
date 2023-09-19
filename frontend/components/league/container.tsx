import React from "react";

const Container: React.FC<{ title?: string, headerTags?: React.ReactNode, children?: React.ReactNode, className?: string }> = (props) => {
    return (
        <div className={`m-2 border border-2 border-gray-300 p-4 rounded-md ${props.className}`}>
            <div className="flex flex-row justify-center items-center border-b border-gray-400 space-x-2 py-2 mb-4">
                {props.title && (
                    <h1 className='text-xl'>{props.title}</h1>
                )}
                {props.headerTags}
            </div>

            {props.children}
        </div>
    );
}

export default Container;