// div(id=`edit-form-div-${answer.id}`)
//                     form(class='hidden' id=`edit-form-${answer.id}`)
//                                 label Body:
//                                 input(type="textarea" col="40" row="40" name="body" value=answer.body id=`${answer.id}-edit-body`)
//                                 button(class="edit-submit" id=`edit-submit-${answer.id}`) Submit Edit

// button(class="edit-submit hidden" id=`edit-submit-${answer.id}`) Submit Edit


const answerEditBtns = document.querySelectorAll('.answer-edit-btn')

for (let i = 0; i < answerEditBtns.length; i++) {
    const btn = answerEditBtns[i];
    btn.addEventListener('click', (e) => {
        const answerId = e.target.id.split('-')[2]
        const form = document.getElementById(`edit-form-${answerId}`)
        const bodyEle = document.getElementById(`${answerId}-body`)
        const submitBtn = document.getElementById(`edit-submit-${answerId}`)

        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
            submitBtn.classList.remove('hidden')
            bodyEle.classList.add('hidden')
        } else {
            form.classList.add('hidden')
            submitBtn.classList.add('hidden')
            bodyEle.classList.remove('hidden')
        }

        submitBtn.addEventListener('click', async (submitEvent) => {
            submitEvent.preventDefault()
            const body = document.getElementById(`${answerId }-edit-body`).value



            const res = await fetch(`/answers/${answerId }`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body
                })
            })

            const data = await res.json()
            if (data.message === 'Success') {
                // console.log(data)
                bodyEle.innerHTML = data.answer.body
                form.classList.add('hidden')
                submitBtn.classList.add('hidden')
                bodyEle.classList.remove('hidden')
            } else {
                // create elements with error message
            }
        })

    })
}