import { useEffect, useState } from "react";
import './DefinitionButton.css';

const DefinitionButton = ({termkey, column, btnStyles, clickEvent, term})=> {
    
    const [color, setColor] = useState('btn-default');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{
        btnStyles.styles.forEach(item=>{
            if(item.column === column && item.termkey === termkey) {
                setColor(item.color);
                setIsDisabled(item.isDisabled);
            }
        })
    });
    
    return (
        <>
            <button className={'common-btn ' + color} value={termkey} onClick={clickEvent} disabled={isDisabled}>{term}</button>
        </>
    )
}

export default DefinitionButton;