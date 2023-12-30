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

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
};

const convertCurrency = async (element, targetElement, targetElement2, current) => {
    element.oninput = async () => {
        try {
            const data = await fetchData();
            switch (current) {
                case 'som':
                    targetElement.value = (element.value * data.som.usd).toFixed(2);
                    targetElement2.value = (element.value * data.som.eur).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd.som).toFixed(2);
                    targetElement2.value = (element.value * data.usd.eur).toFixed(2);
                    break;
                case 'eur':
                    targetElement.value = (element.value * data.eur.usd).toFixed(2);
                    targetElement2.value = (element.value * data.eur.som).toFixed(2);
                    break;
                default:
                    break;
            }

            element.value === "" ? targetElement.value = targetElement2.value = "" : null;
        } catch (error) {
            console.error(error.message);
        }
    };
};

convertCurrency(som, usd, eur, "som");
convertCurrency(usd, som, eur, "usd");
convertCurrency(eur, usd, som, "eur");


//DRY do not repeat yourself
//HW 1

const card = document.querySelector('.card'),
    btnNext = document.querySelector('#btn-next'),
    btnPrev = document.querySelector('#btn-prev')

let count = 1

//переписать

const fetchInfo = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error(error.message);
    }
};
fetchInfo(count);

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

// fetch(`https://jsonplaceholder.typicode.com/posts`)
//     .then(response => response.json())
//     .then((data) => console.log(data))

//weather

//query params

const cityNameInput = document.querySelector('.cityName')
const city= document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

cityNameInput.addEventListener('input',async (event) => {
    try{
        const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()
        city.innerHTML = data.name ? data.name : 'Город не найден...'
        temp.innerHTML = data?.main?.temp ?  Math.round(data.main.temp - 273.15) + "&deg; C" : '...'
    } catch (e) {
        console.log(e.message)
    }
})

