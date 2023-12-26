//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () =>{
     if (regExp.test(phoneInput.value)) {
         phoneResult.innerHTML = 'OK'
         phoneResult.style.color = 'green'
     }else {
         phoneResult.innerHTML = 'NOT OK'
         phoneResult.style.color = 'red'
     }
}


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let num = 0

const hideTabContent = () => {
    tabContentBlocks.forEach( tabContentBlock => {
        tabContentBlock.style.display = 'none'
    })
    tabs.forEach( tab =>{
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex=0) => {
    tabContentBlocks[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab,tabIndex) => {
            if(event.target === tab) {
                hideTabContent()
                showTabContent(tabIndex)
                num = tabIndex
            }
        })
    }
}
//HW 1

const autoTabSlider = () => {
    setInterval( () => {
        num++
        if (num > tabContentBlocks.length - 1) {
            num = 0
        }
        hideTabContent()
        showTabContent(num)
    }, 3000)
}
autoTabSlider()

//converter
const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')

const converter = (element, targetElement, targetElement2, current) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json')
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)

            switch (current) {
                case 'som' :
                    targetElement.value = (element.value * data.som.usd).toFixed(2)
                    targetElement2.value = (element.value * data.som.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd.som).toFixed(2)
                    targetElement2.value = (element.value * data.usd.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur.usd).toFixed(2)
                    targetElement2.value = (element.value * data.eur.som).toFixed(2)
                    break
                default:
                    break
            }

            element.value === "" ? targetElement.value = targetElement2.value = "" : null
        }
    }
}
converter(som, usd, eur,"som")
converter(usd, som, eur,"usd")
converter(eur, usd, som,"eur")

//DRY do not repeat yourself
//HW 1

const card = document.querySelector('.card'),
    btnNext = document.querySelector('#btn-next'),
    btnPrev = document.querySelector('#btn-prev')

let count = 1

const fetchInfo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
            <p>${data.title}</p>
            <p style ="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
            `
        })
}

fetchInfo(count)

btnNext.addEventListener('click',() => {
    count++
    if (count > 200){
        count = 1
    }
    fetchInfo(count)
})

btnPrev.addEventListener('click', () => {
    count--
    if (count < 1){
    count = 200
    }
    fetchInfo(count)
})

//HW 2

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then((data) => console.log(data))
