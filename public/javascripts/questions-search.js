const searchBtn = document.querySelector('.search-btn')
const searchBarObject = document.getElementsByClassName('search-bar')
const questionTitle = document.querySelectorAll('.question-title')
const allQuestions = document.querySelectorAll('.question-list-card')
searchBtn.addEventListener('click', e => {
    if (!(questionTitle[1].innerHTML.includes(searchBarObject[0].value))) {
        allQuestions[1].style.display = 'none'
    }
    if (questionTitle[1].innerHTML.includes(searchBarObject[0].value)) {
        allQuestions[1].style.display = ''
    }
})

// console.log(questionTitle[1].innerHTML)

// allQuestions.forEach(question => {
//     question.style.display = 'none'
//     console.log(question)
// })
