const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const searchBarObject = document.getElementsByClassName('search-bar')
const questionTitles = document.querySelectorAll('.question-title')
const allQuestions = document.getElementsByClassName('question-list-card')
const noQuestionsFound = document.getElementsByClassName('no-questions-found')

searchBar.addEventListener('input', e => {
    for (let i = 0; i < allQuestions.length; i++){
        if (!(questionTitles[i].innerHTML.includes(searchBarObject[0].value))) {
            allQuestions[i].classList.add('hidden')
        }
        if (questionTitles[i].innerHTML.includes(searchBarObject[0].value)) {
            allQuestions[i].classList.remove('hidden')
        }
    }
    if (document.getElementsByClassName('hidden question-list-card').length == allQuestions.length) {
        noQuestionsFound[0].classList.remove('hidden')
    }
    if (document.getElementsByClassName('hidden question-list-card').length !== allQuestions.length) {
        noQuestionsFound[0].classList.add('hidden')
    }
})
