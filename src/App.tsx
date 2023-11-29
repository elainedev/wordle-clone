import { useEffect, useState } from 'react'
import './App.css'

const WORD_LIST_URL: string = 'https://rhdzmota.com/files/wordle.json';
const ROWS: number = 6;
const WORD_LENGTH: number = 5;

type RowProps = {
  guess: string,
  solution: string
}

type tileFormat = {char: string, color: 'green' | 'yellow' | 'gray' | 'none'};
type charFormat = (string|null)[];

function Wordle() {

  const [solution, setSolution] = useState<string>('puppy');
  const [guess, setGuess] = useState<string[]>([]);

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
    <>
      {/* {rowEntries.map((rowEntry, idx) => 
        <Row
          key={`row-${idx}`}
          rowEntry={rowEntry}
          solution={solution}
        />
      )} */}
      {solution}
      <Row
          // key={`row-${idx}`}
          guess={'uppap'}
          solution={solution}
        />
    </>
  )
}

const Row = ({guess, solution, isSubmitted}: RowProps) => {
  
  const formatGuess = () => {
    const solutionArray: charFormat = [...solution];
    const formattedGuess: tileFormat[] = [...guess].map(char => {
      return {char, color: isSubmitted ? 'gray' : 'none'};
    })

    formattedGuess.forEach((tile, i) => {
      if (solution[i] === tile.char) {
        tile.color = 'green';
        solutionArray[i] = null;
      }
    })

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
