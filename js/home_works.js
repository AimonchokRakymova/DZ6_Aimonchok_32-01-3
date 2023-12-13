const gmail_input = document.querySelector("#gmail_input")
const gmail_button = document.querySelector("#gmail_button")
const gmail_result = document.querySelector("#gmail_result")

//homework 1 part 1

const regularExp = /^\w+@[A-Za-z]+\.[A-Za-z]+$/

gmail_button.onclick = () => {
    if (regularExp.test(gmail_input.value)) {
        gmail_result.innerHTML = "Правильно!"
    } else {
        gmail_result.innerHTML = "Неправильно!"
    }
}

//HW2 part 2

const child = document.querySelector(".child_block")
let positionX = 0
let positionY = 0
const move = () => {
    setTimeout(() => {
        if (positionX < 449 && positionY === 0) {
            positionX ++
            child.style.left = `${positionX}px`
            move()
        }else if (positionX >=449 && positionY < 449){
            positionY ++
            child.style.top = `${positionY}px`
            move()
        }else if(positionX > 0 && positionY >= 449) {
            positionX--
            child.style.left = `${positionX}px`
            move()
        } else if (positionX === 0 && positionY > 0) {
            positionY--
            child.style.top = `${positionY}px`
            move()
        }
    }, 1)
}

move()

//HW 3

const startBth = document.querySelector("#start")
const stopBth = document.querySelector("#stop")
const resetBth = document.querySelector("#reset")
let secondsS = document.querySelector("#secondsS")
let count = 0
let int;


startBth.onclick = () => {
    clearInterval(int)
    int = setInterval(()=>{
        count++;
        secondsS.innerText = count;
    }, 500)
}

stopBth.onclick = () => {
    clearInterval(int)
}

resetBth.onclick = () => {
    count = 0
    secondsS.innerText = count;
    clearInterval(int)
}
