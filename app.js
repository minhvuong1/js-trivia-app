const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const genres = [
    // { name: 'Books', id: 10 },
    { name: 'Films', id: 11 },
    { name: 'Music', id: 12 },
    { name: 'Computer Science', id: 18 }
]

const levels = ['easy', 'easy', 'easy']

function addGenre(genre) {
    const column = document.createElement('div')
    column.classList.add('genre-column');
    column.innerHTML = genre.name
    game.append(column)

    levels.forEach(level => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (level === 'easy') {
            card.innerHTML = 100
        } 
        if (level === 'medium') {
            card.innerHTML = 200
        }
        if (level === 'hard') {
            card.innerHTML = 300
        }

        fetch(`https://opentdb.com/api.php?amount=10&category=${genre.id}&difficulty=${level}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            card.setAttribute('data-question', data.results[0].question)
            card.setAttribute('data-answer', data.results[0].correct_answer)
        })
        card.addEventListener('click', flipCard)
    })
}

genres.forEach(genre => addGenre(genre))

function flipCard() {
    console.log('clicked');
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')

    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'
    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))

}

function getResult() {
    const cardOfButtonClicked = this.parentElement
    if (cardOfButtonClicked.getAttribute('data-answer') === this.innerHTML) {
        console.log('Its a match')
    }
}