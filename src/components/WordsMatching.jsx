import './WordsMatching.css';
import WordsList from './WordsList';

const WordsMatching = ({content, resultProcessed}) => {

    // Функция для перемешивания полученных данных
    const shuffle = (userData)=> {

        let termArray = [],
            definitionArray = [];

        userData.forEach((item, index)=>{
            termArray.push({term: item.term, termkey: index});
            definitionArray.push({definition: item.definition, definitionKey: index})
        })

        termArray.sort(() => Math.random() - 0.5);
        definitionArray.sort(() => Math.random() - 0.5);

        termArray.forEach((item, index)=>{
            item = Object.assign(item, definitionArray[index]);
        })

        return termArray;
    }

    const shuffledData = shuffle(content);
    
    return(
        <>
            <WordsList content={shuffledData} resultProcessed={resultProcessed}/>
        </>
    )


}


export default WordsMatching;