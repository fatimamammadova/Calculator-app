const calculatorInput = document.querySelector('.calculator-input input')
const calculatorKeys = document.querySelector('.calculator-keys')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equalSign = document.querySelector('.equal-sign')
const deleteButton = document.querySelector('.delete')
const decimalButton = document.querySelector('.decimal')


let displayValue = "0"
let firstValue = null
let operator = null
let waitingForSecondValue = false


function updateInputValue() {
    calculatorInput.value = displayValue
    let valueArr = calculatorInput.value.split('')
    if(valueArr.length > 14) {
        alert('Maximum 14 values can be entered!')
        DeleteNumber()
        console.log(displayValue)
    }
}
updateInputValue()

calculatorKeys.addEventListener('click',(e)=> {

    const key = e.target
    const keyValue = e.target.value


    if(key.matches('button')) {
        switch (keyValue) {
            case '+':
            case '/':
            case '-':
            case '*':
            case '=':
                Operator(keyValue)
                break;
            case '.':
                inputDecimal()
                break;
            case 'reset':
                displayValue = '0'
                reset()
                break;
            case 'delete':
                DeleteNumber()
                break;
            default:
                inputNumber(keyValue)
        }
        updateInputValue()
    }

})

window.addEventListener('keydown',(event)=> {

    const numbers = document.querySelectorAll('.number')

    const key = event.key

    if(key==='Enter') {
        Operator('=')
        hoverButtons(equalSign,'equal-hover')
    } else if(key=='Backspace') {
        DeleteNumber()
        hoverButtons(deleteButton,'delete-hover')
    } else if(key=='.') {
        inputDecimal()
        hoverButtons(decimalButton,'button-hover')
    } else if(key=='+'||key=='-'||key=='/'||key=='*') {
        Operator(key)
        operators.forEach(operator => {
            if(operator.value==key) {
                hoverButtons(operator,'button-hover')
            }
        })
    } else {    
        numbers.forEach(num => {
            if(event.key==num.value) {
                inputNumber(event.key)
                hoverButtons(num,'button-hover')
            }
        })
    }
    updateInputValue()

})

function hoverButtons(element,className) {
    element.classList.add(`${className}`)
    setTimeout(()=> {
        element.classList.remove(`${className}`)
    },200)

}


function isFloat(number){
    return Number.isInteger(number)===false
}

function DeleteNumber() {
    let inputValueArr = displayValue.split('')
    inputValueArr.pop()
    displayValue = inputValueArr.join('')
    if(displayValue=='') {
        displayValue = '0'
    }
    operator = null
    firstValue=null
}

function reset() {
    firstValue = null
    operator = null
    waitingForSecondValue = false
}

function Operator(nextOperator) {
    let number = parseFloat(displayValue)
      
    if(operator && waitingForSecondValue) {
        operator=nextOperator;
        return;
    }
    
    if(firstValue==null) {
        firstValue=number
    } else if(operator && operator != '=') {
        const result = calculate(firstValue,number,operator)

        if(isFloat(result)) {
            displayValue = `${parseFloat(result).toFixed(7)}`;
            for(let i=0;i<7;i++) {
                if(displayValue.split('').pop()=='0') {
                    let displayValueArr = displayValue.split('')
                    displayValueArr.pop()
                    displayValue = displayValueArr.join('')
                }
            }
        } else {
            displayValue = `${result}`;
        } 
        firstValue = result
    } else {
        reset()
        firstValue = number
    }

    console.log('firstValue',firstValue,'operator',operator)

    waitingForSecondValue = true
    operator = nextOperator
}

function calculate(firstNum,secondNum,operation) {
    switch(operation) {
        case '+':
            return firstNum + secondNum
        case '-':
            return firstNum - secondNum
        case '*':
            return firstNum * secondNum
        case '/':
            return firstNum / secondNum
    }
}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false
    } else {
        displayValue == '0' ? displayValue = num : displayValue += num
    }
}

function inputDecimal() {
    displayValue.includes('.') ? displayValue : displayValue += '.'
    if(waitingForSecondValue) {
        reset()
        displayValue = '0'
        displayValue.includes('.') ? displayValue : displayValue += '.'
    }
}



//THEME
const themeBtn = document.querySelector('.circle')
const themeContainer = document.querySelector('.theme-input') 

function addTheme(themeClass,translate,themeName) {
    themeBtn.style.transform = `translateX(${translate}px)`
    document.documentElement.classList.add(`${themeClass}`)
    localStorage.setItem("theme",`${themeName}`)
}

function removeTheme(prevThemeClass) {
    document.documentElement.classList.remove(`${prevThemeClass}`)
    localStorage.setItem("theme","")
}


const themeTwo = 'themeTwo'
const themeThree = 'themeThree'

const themeOneBtn = document.querySelector('.theme1')
const themeTwoBtn = document.querySelector('.theme2')
const themeThreeBtn = document.querySelector('.theme3')

themeOneBtn.addEventListener('click',()=> {
    themeBtn.style.transform = `translateX(5px)`
    localStorage.setItem("theme","")
    document.documentElement.classList.remove(`themeTwo`)
    document.documentElement.classList.remove(`themeThree`)
})

themeTwoBtn.addEventListener('click',()=> {
    themeBtn.style.transform = `translateX(27px)`
    localStorage.setItem("theme","themeTwo")
    document.documentElement.classList.remove(`themeThree`)
    document.documentElement.classList.add(`themeTwo`)
})

themeThreeBtn.addEventListener('click',()=> {
    themeBtn.style.transform = `translateX(49px)`
    localStorage.setItem("theme","themeThree")
    document.documentElement.classList.remove(`themeTwo`)
    document.documentElement.classList.add(`themeThree`)
})

if(localStorage.getItem('theme')=='themeThree') {
    addTheme(themeThree,50,themeThree)
} else if(localStorage.getItem("theme")=='themeTwo') {
    addTheme(themeTwo,25,themeTwo)
} else {
    removeTheme(themeThree)
    themeBtn.style.transform = `translateX(5px)`
}
