import { useEffect, useReducer, useState } from 'react'
import './App.scss'

const WORD_LIST_URL: string = 'https://rhdzmota.com/files/wordle.json';
const NUM_ROWS: number = 6;
const WORD_LENGTH: number = 5;
const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

function reducer(state: GuessState, {key, solution}: ActionState) {
  const {guesses, currentGuess, message} = state;
  if (guesses.includes(solution)) {
    return state;
  }

  switch (key) {
    case 'Backspace':
      return {guesses, currentGuess: currentGuess.slice(0, -1), message};
    case 'Enter': {
      if (currentGuess.length < WORD_LENGTH) {
        return {guesses, currentGuess, message: 'Not enough letters'}
      }
      const currentGuessIndex = guesses.findIndex(guess => guess === null);
      const guessesCopy = [...guesses];
      guessesCopy[currentGuessIndex] = currentGuess;
      return {guesses: guessesCopy, currentGuess: '', message};
    }
    default: {
      const isLetter = key.length === 1 && ALPHABET.includes(key.toLowerCase());

      // add letter to currentGuess
      if (isLetter && currentGuess.length < WORD_LENGTH) {
        return {guesses, currentGuess: currentGuess + key.toLowerCase(), message};
      }
      return state;
    }
  }
}

function Wordle() {
  const [{guesses, currentGuess, message}, dispatch] = useReducer(reducer, {
    guesses: Array(NUM_ROWS).fill(null),
    currentGuess: '',
    message: null
  });
  const [solution, setSolution] = useState<string>('puppy');

  // fetch the word solution
  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await fetch(WORD_LIST_URL);

        if (!response.ok) {
          throw new Error('Response was not OK');
        }
        const wordList = await response.json();
        setSolution(wordList[Math.floor(Math.random() * wordList.length)]);
      }
      catch (error) {
        console.log('Fetch Error: ', error);
        setSolution('puppy');
      }
    }
    fetchSolution();

  }, [])

  // on keydown event, dispatch key code and solution to the reducer function
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      dispatch({key: event.key, solution});
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [solution])

  const currentGuessIndex = guesses.findIndex(guess => guess === null);

  return (
    <div className='page'>
      <h1>Wordle</h1>
      <div className='board'>
        {
          guesses.map((guess, i) => 
            <Row
              key={`row-${i}`}
              guess={(currentGuessIndex === i ? currentGuess : guess ?? '').padEnd(WORD_LENGTH)}
              solution={solution}
              isSubmitted={currentGuessIndex > i || currentGuessIndex === -1}
            />
            
          )}
      </div>
    </div>
  )
}

const Row = ({guess, solution, isSubmitted}: RowProps) => {
  
  const formatGuess = () => {
    const solutionArray: CharFormat = [...solution];
    const formattedGuess: TileFormat[] = [...guess].map(char => {
      return {char, color: 'none'};
    })
    console.log('formattedGuess1', formattedGuess)

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
    console.log(formattedGuess)
    return formattedGuess;
  }

  return (
    <div className='row'>
      {
        formatGuess().map((tile, i) => 
            <div className={`tile ${tile.color} ${isSubmitted ? 'submitted' : ''}`} key={`${tile.char}-${i}`}>{tile.char}</div>
        ) 
      }
    </div>
  )
}

type RowProps = {
  guess: string,
  solution: string,
  isSubmitted: boolean
}

type GuessState = {guesses: (string|null)[], currentGuess: string, message: null|string}
type ActionState = {key: string, solution: string};
type TileFormat = {char: string, color: 'green' | 'yellow' | 'gray' | 'none'};
type CharFormat = (string|null)[];

export default Wordle;


