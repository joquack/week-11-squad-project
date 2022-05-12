const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const searchBarObject = document.getElementsByClassName('search-bar')
const questionTitles = document.querySelectorAll('.question-title')
// const allQuestions = document.querySelectorAll('.question-list-card')
const allQuestions1 = document.getElementsByClassName('question-list-card')
const noQuestionsFound = document.getElementsByClassName('no-questions-found')
// searchBtn.addEventListener('click', e => {
//     for (let i = 0; i < allQuestions1.length; i++){
//         if (!(questionTitles[i].innerHTML.includes(searchBarObject[0].value))) {
//             allQuestions1[i].classList.add('hidden')
//         }
//         if (questionTitles[i].innerHTML.includes(searchBarObject[0].value)) {
//             allQuestions1[i].classList.remove('hidden')
//         }
//     }
// })
searchBar.addEventListener('input', e => {
    for (let i = 0; i < allQuestions1.length; i++){
        if (!(questionTitles[i].innerHTML.includes(searchBarObject[0].value))) {
            allQuestions1[i].classList.add('hidden')
        }
        if (questionTitles[i].innerHTML.includes(searchBarObject[0].value)) {
            allQuestions1[i].classList.remove('hidden')
        }
    }
    if (document.getElementsByClassName('hidden').length-1 == allQuestions1.length) {
        noQuestionsFound.classList.remove('hidden')
    }
})
