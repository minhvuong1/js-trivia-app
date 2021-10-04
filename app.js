const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const genres = [
    { name: 'General Knowledge', id: 9 },
    { name: 'Films', id: 11 },
    { name: 'Music', id: 12 },
    { name: 'Computer Science', id: 18 }
]

const levels = ['easy', 'medium', 'hard']

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
            card.setAttribute('data-value', 100)
        } 
        if (level === 'medium') {
            card.innerHTML = 200
            card.setAttribute('data-value', 200)
        }
        if (level === 'hard') {
            card.innerHTML = 300
            card.setAttribute('data-value', 300)
        }

        fetch(`https://opentdb.com/api.php?amount=10&category=${genre.id}&difficulty=easy&type=boolean`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            card.setAttribute('data-question', data.results[0].question)
            card.setAttribute('data-answer', data.results[0].correct_answer)
        })
        .then(done => card.addEventListener('click', flipCard))
    })
}

genres.forEach(genre => addGenre(genre))

function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = '15px';
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')

    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'
    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')
    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))

}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButtonClicked = this.parentElement
    if (cardOfButtonClicked.getAttribute('data-answer') === this.innerHTML) {
        score = score + parseInt(cardOfButtonClicked.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButtonClicked.classList.add('correct-answer')
        setTimeout(() => {
            while(cardOfButtonClicked.firstChild) {
                cardOfButtonClicked.removeChild(cardOfButtonClicked.firstChild)
            }
            cardOfButtonClicked.innerHTML = cardOfButtonClicked.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButtonClicked.classList.add('wrong-answer')
        setTimeout(() => {
            while(cardOfButtonClicked.firstChild) {
                cardOfButtonClicked.removeChild(cardOfButtonClicked.firstChild)
            }
            cardOfButtonClicked.innerHTML = 0;
        }, 100)
    }
    cardOfButtonClicked.removeEventListener('click', flipCard)
}