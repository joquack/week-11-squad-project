const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const searchBarObject = document.getElementsByClassName('search-bar')
const questionTitles = document.querySelectorAll('.question-title')
const allQuestions = document.querySelectorAll('.question-list-card')
searchBtn.addEventListener('click', e => {
    for (let i = 0; i < allQuestions.length; i++){
        if (!(questionTitles[i].innerHTML.includes(searchBarObject[0].value))) {
            allQuestions[i].style.display = 'none'
        }
        if (questionTitles[i].innerHTML.includes(searchBarObject[0].value)) {
            allQuestions[i].style.display = ''
        }
    }
})
searchBar.addEventListener('input', e => {
    for (let i = 0; i < allQuestions.length; i++){
        if (!(questionTitles[i].innerHTML.includes(searchBarObject[0].value))) {
            allQuestions[i].style.display = 'none'
        }
        if (questionTitles[i].innerHTML.includes(searchBarObject[0].value)) {
            allQuestions[i].style.display = ''
        }
    }
})
