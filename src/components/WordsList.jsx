import { useCallback, useEffect, useState } from 'react';
import DefinitionButton from './DefinitionButton';
import {SUCCESS, FAILED, DEFAULT, ACTIVE} from '../utils/Constanse';

const WordsList = ({content, resultProcessed})=> {
    const [count, setCount] = useState(0);
    const [btnStyles, setBtnStyles] = useState({styles: []});
    const [wrongAnswers, setWrongAnswers] = useState({wrongAnswers: []});


    const firstCol = 'first-col',
          secondCol = 'second-col';

    let rememberedFirst, rememberedSecond;

    const resetActiveStyle = (stylesArray)=> {
        stylesArray.forEach((item)=> {
            if(item.color === ACTIVE) {
                item.color = DEFAULT;
            } 
        })
        return stylesArray;
    }

    useEffect(()=> {
        //Проверяем достигнут ли конец игры, результат обрабатывает клиент вызывающий компонент
        if(count === content.length) {
            resultProcessed(wrongAnswers);
        }
    });

    const getBtnDataObject = (column, termkey, color, isDisabled)=> {
        return {
            column: column,
            termkey: termkey,
            color: color,
            isDisabled: isDisabled
        }
    }
    
    // Получаем значения колонок и слов, сравниваем их значения. Возвращаем результат проверки
    const checkValuesAndSetNewStyles = useCallback((e) => {
        
        let column = e.currentTarget.parentNode.getAttribute('value');
        let btnData = getBtnDataObject(column, +e.currentTarget.value, DEFAULT, false);

        if(column === firstCol) rememberedFirst = +e.currentTarget.value;
        else rememberedSecond = +e.currentTarget.value;
        
        let secondBtnData;
        
        if(rememberedSecond != null && rememberedFirst != null) {
            // Проверка слов
            let result = rememberedSecond === rememberedFirst;

            if(result) {
                secondBtnData = getBtnDataObject(
                    btnData.column === firstCol ? secondCol : firstCol,
                    btnData.column === firstCol ? +rememberedFirst : +rememberedSecond,
                    SUCCESS,
                    true
                )
                btnData.color = SUCCESS;
                btnData.isDisabled = true;
                setCount((count) => count + 1);
            } else {
                secondBtnData = getBtnDataObject(
                    btnData.column === firstCol ? secondCol : firstCol,
                    btnData.column === firstCol ? +rememberedSecond : +rememberedFirst,
                    FAILED,
                    false
                )
                btnData.color = FAILED;
                btnData.isDisabled = false;
                setWrongAnswers((state)=> {
                    state.wrongAnswers.push(content[btnData.termkey].term);
                    state.wrongAnswers.push(content[secondBtnData.termkey].term);
                    return {wrongAnswers: state.wrongAnswers}
                })
            }
            rememberedFirst = null;
            rememberedSecond = null;
        } else {
            btnData.color = ACTIVE;
        }
        
        setBtnStyles((state)=>{
            resetActiveStyle(state.styles);
            state.styles.push(btnData);
            if(secondBtnData) {
                state.styles.push(secondBtnData);
            }
            return {styles: state.styles};
        });

    }, [rememberedFirst, rememberedSecond])

    // Перебор массива для отрисовки и передача компонента с кнопкой
    const words = content.map((item, id)=>(
        <tr key={id}>
            <td value={firstCol} termkey={item.termkey} className={'first-col'}>
                <DefinitionButton 
                    termkey={item.termkey} 
                    column={firstCol} 
                    btnStyles={btnStyles}
                    clickEvent={checkValuesAndSetNewStyles} 
                    term={item.term} 
                />
            </td>
            <td value={secondCol} termkey={item.definitionKey} className='second-col'>
                <DefinitionButton 
                    termkey={item.definitionKey} 
                    column={secondCol} 
                    btnStyles={btnStyles}
                    clickEvent={checkValuesAndSetNewStyles} 
                    term={item.definition} 
                />
            </td>
        </tr>
    ));

    return(
        <div className="words-container">
            <h2 className='words-title'>Вы правильно ответили на: {count} слов</h2>
            <table>
                <tbody>
                    {words}
                </tbody>
            </table>
        </div>
    )
}

export default WordsList;