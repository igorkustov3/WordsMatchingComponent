import { useCallback } from 'react';
import WordsMatching from './components/WordsMatching';

function App() {
  
  /* Иммитируем полученные данных с сервера */
 const words = [
    {term: 'арбуз', definition: 'watermelon'},
    {term: 'яблоко', definition: 'apple'},
    {term: 'кошка', definition: 'cat'},
    {term: 'собака', definition: 'dog'},
    {term: 'груша', definition: 'pear'}
  ]

  // Обработать результат согласно бизнес-логике приложения
  const resultProcessed = useCallback((failedAmount)=> {
    console.log(failedAmount.wrongAnswers);
    if(failedAmount.wrongAnswers.length === 0) {
      alert('Поздравляем! Все ответы верные')
    } else {
      alert('Конец игры, потренируйтесь еще')
    }
  }, []);


  return (            
    <>
      <WordsMatching content={words} resultProcessed={resultProcessed} />
    </>
  );
}

export default App;
