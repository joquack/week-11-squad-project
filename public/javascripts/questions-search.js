const searchBtn = document.querySelector('.search-btn')
const searchBarObject = document.getElementsByClassName('search-bar')
searchBtn.addEventListener('click', e => {
    console.log(searchBarObject[0].value)
})
const allQuestions = document.querySelectorAll('.question-list-card')
allQuestions.forEach(question => {
    // console.log(question.innerHTML+'Hello')
});
