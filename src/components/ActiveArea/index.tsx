import React from "react";
// import { useDrop } from "react-dnd";

export default function ActiveArea({ children }) {

    // const [, drop] = useDrop({
    //     accept: "pokemon",
    //     drop: () => {
    //         return {};
    //     }
    // });
    return (
        <div className="activeArea">
            {children}
        </div>
    );
}