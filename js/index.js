import data from '../data/data.json' assert { type: "json" }
const input = document.querySelector('#word')
const button = document.querySelector('#submit')
const rightAnswer = document.querySelector('#right-answer')
const wrongAnswer = document.querySelector('#wrong-answer')
const word = document.querySelector('#title')
const start = document.querySelector('#start')
const box = document.querySelector('#box')
let createdIndex = []
let index = true

start.addEventListener('onclick', () => {
    location.reload()
})

const generateRandomNumber = () => {
    const index = Math.floor(Math.random() * data.length) 
    if(createdIndex !== []) {
        if(createdIndex.includes(index)) {
            if(createdIndex.length === data.length) {
                createdIndex = []
            } else {
                return generateRandomNumber()
            }
        } else {
            createdIndex.push(index)
            return index
        }
    } else {
        createdIndex.push(index)
    }
    //oyun bitirme veya baştan başlatma
    return -1
}

//js ilk yüklendiğinde bu çalışır
index = generateRandomNumber()
word.innerHTML = `${data[index].word}`

button.addEventListener('click', (e) => {
    e.preventDefault()
    game(index)
    index = generateRandomNumber()
    if(index !== -1) {
        word.innerHTML = `${data[index].word}`
    } else {
        //bitirme işlemi
        console.log('game finished')
        box.style.visibility = 'hidden'
        start.style.visibility = 'visible'
        
    }
})

const game = (index) => {
    const answer = input.value
    input.value = ''
    
    if(index === -1) {
        console.log('game finished')
       
    } else {
        if(data[index].turkish === answer.toLowerCase()) {
            rightAnswer.innerHTML += ` <div><span class="right-answer-span">${data[index].word}</span> = <span class="answer">${answer}</span></div>`
        } else {
            wrongAnswer.innerHTML += `<div><span class="wrong-answer-span">${data[index].word}</span> = <span class="answer">${answer} / <span class="right">(${data[index].turkish})</span></span></div>`
        }
    }
}