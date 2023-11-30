import { useEffect, useState } from 'react'
import './App.css'

const WORD_LIST_URL: string = 'https://rhdzmota.com/files/wordle.json';
const ROWS: number = 6;
const WORD_LENGTH: number = 5;

type RowProps = {
  guess: string,
  solution: string,
  isSubmitted: boolean
}

type tileFormat = {char: string, color: 'green' | 'yellow' | 'gray' | 'none'};
type charFormat = (string|null)[];


const Wordle = () => {
  const [solution, setSolution] = useState<string>('puppy');
  // useEffect(() => {
  //   const fetchSolution = async () => {
  //     try {
  //       const response = await fetch(WORD_LIST_URL);

  //       if (!response.ok) {
  //         throw new Error('Response was not OK');
  //       }
  //       const wordList = await response.json();
  //       setSolution(wordList[Math.floor(Math.random() * wordList.length)]);
  //     }
  //     catch (error) {
  //       console.log('Fetch Error: ', error);
  //       setSolution('apple');
  //     }
  //   }
  //   fetchSolution();

  // }, [])
  return (
    <div className='board'>
      {solution}
       <Row
          // key={`row-${idx}`}
          guess={'uppap'}
          solution={solution}
          isSubmitted={false}
       />
    </div>
  )
}

const Row = ({guess, solution, isSubmitted}: RowProps) => {
  
  const formatGuess = () => {
    const solutionArray: charFormat = [...solution];
    const formattedGuess: tileFormat[] = [...guess].map(char => {
      return {char, color: 'none'};
    })

    if (!isSubmitted) {
      return formattedGuess;
    }

    // set tiles with correct letters in the correct positions to green; otherwise, set tiles to gray
    formattedGuess.forEach((tile, i) => {
      if (solution[i] === tile.char) {
        tile.color = 'green';
        solutionArray[i] = null;
      }
      else {
        tile.color = 'gray';
      }
    })

    // set tiles with correct letters in incorrect positions to yellow
    formattedGuess.forEach(tile => {
      if (solutionArray.includes(tile.char) && tile.color != 'green') {
        tile.color = 'yellow';
        solutionArray[solutionArray.indexOf(tile.char)] = null;
      }
    })

    return formattedGuess;
  }

  return (
    <>
      {
        formatGuess().map(tile => 
            <div className={`tile ${tile.color}`}>{tile.char} {tile.color}</div>
        ) 
      }
    </>
  )
}

export default Wordle;
