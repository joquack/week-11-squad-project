const searchBar = document.querySelector('.search-bar')
const searchBarObject = document.getElementsByClassName('search-bar')
const answerBodies = document.querySelectorAll('.answer-body')
const allAnswers = document.getElementsByClassName('answer-card')
const noAnswersFound = document.getElementsByClassName('no-answers-found')

searchBar.addEventListener('input', e => {
    for (let i = 0; i < allAnswers.length; i++){
        if (!(answerBodies[i].innerHTML.includes(searchBarObject[0].value))) {
            allAnswers[i].classList.add('hidden')
        }
        if (answerBodies[i].innerHTML.includes(searchBarObject[0].value)) {
            allAnswers[i].classList.remove('hidden')
        }
    }
    if (document.getElementsByClassName('hidden answer-card').length == allAnswers.length) {
        noAnswersFound[0].classList.remove('hidden')
    }
})
