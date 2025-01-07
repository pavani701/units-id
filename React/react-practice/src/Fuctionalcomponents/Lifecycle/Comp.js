import React,{useState} from 'react';

export default function FuncLifeCycle(){
    const [text,setText] = useState(0)//it is initialise state
    const handleButton=()=>{
        setText(text +1)
    }
    const handleButtons=()=>{
        setText(text-1)
    }
    


    return(

        <div>
            <h1>{text}</h1>
            <button onClick={handleButton}>increment</button>
            <button onClick={handleButtons}>decrement</button>
            <h1>Welcomee</h1>
        </div>
    )
}