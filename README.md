# Wordle Clone

## Instructions to Run the App
Visit https://elainedev.github.io/wordle-clone/ to see the project in action on GitHub Pages!

Alternatively:

1. git clone into project directory
2. `cd` into project directory (main branch)
3. run `npm i`
4. run `npm run dev`
5. copy and paste the localhost url displayed in the terminal into your browser (the url should be http://localhost:5173).

## Implementation Notes
- Implemented with React + TypeScript + Vite
- Uses API endpoint https://rhdzmota.com/files/wordle.json to fetch list of possible words
  - if the API fails to fetch, the default word is "puppy" (I chose this word because it has 3 Ps, which is a great way to test the logic of the yellow tiles)
- Messages:
  - Shows congratulatory message if user successfully solves the game
  - Shows solution if user fails to solve the game after 6 tries
  - Show "Not enough letters" if the entered guess contains insufficient number of letters


## Additional Features To Implement Given More Time
- Add keyboard UI to show which letters have already been used
- Add "Hard" Mode:
    - tiles shake if the guess does not contain correct letters from previous guesses
- Styling:
    - add a darker border around the currently active tile
- Additional messages that can be added:
    - Show "Not in word list" if user enters word that is not in word list
    - Show "Genius" if user solves the game on first try
- After the game is finished, show statistics of the user's performance

