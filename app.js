const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const film = 11
const music = 12
const computerScience = 18
const levels = ['easy', 'medium', 'hard']

function addGenre() {
    const column = document.createElement('div')
    column.classList.add('genre-column');
    column.innerHTML = "This is a genre"
    game.append(column)

    levels.forEach(level => {
        fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${level}&type=boolean`)
        .then(response => response.json())
        .then(data => console.log(data))
    })
}

addGenre()