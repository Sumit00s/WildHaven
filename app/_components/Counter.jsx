"use client"

import { useState } from "react";

export default function Counter({data}){
    let [count,setCount] = useState(0);

    function updateCount(){
        setCount(count+1);
    }

    return(
        <>
            <p>There are {data.length} Posts</p>
            <button onClick={updateCount}>{count}</button>
        </>
    )
}