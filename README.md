# Wordle Clone

## Implementation Notes
- implemented with React + TypeScript + Vite
- uses API endpoint https://rhdzmota.com/files/wordle.json to fetch list of possible words
  - if the API fails to fetch, the default word is "puppy" (I chose this word because it has 3 Ps, which is a great way to test the logic of the yellow tiles)


## Additional Features To Implement Given More Time
- Add keyboard UI to show which letters have already been used
- Add "Hard" Mode
 - tiles shake if the guess does not contain correct letters from previous guesses
- Styling:
 - add a darker border around the active tile
- Messages:
 - Add congratulatory message if user successfully solves the game
 - Show solution if user fails to solve the game
 - Show "Not in word list" if user enters word that is not in word list
 - Show "Not enough letters" if the entered guess contains insufficient number of letters
 - Show "Genius" if user solves the game on first try

