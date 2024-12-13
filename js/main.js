
let triesCont = document.querySelector(".tries")
let result = document.querySelector(".result")
let check = document.querySelector(".btns .check")
let hint = document.querySelector(".hint")

let NumberOfTries = 6
let NumberOfLetter = 6
let currentIndex = 1

let arr = ["create" ,"delete" , "update" , "select","school" ,"elzero"]

let randomWord = arr[Math.floor(Math.random() * arr.length)]


function generateinputs (){
    for(let i = 1 ; i <= NumberOfTries ; i++){

        let div = document.createElement("div")

        div.classList.add("try")
        div.classList.add(`try${i}`)

        let span = document.createElement("span")
        span.appendChild(document.createTextNode(`Try ${i}`))

        div.appendChild(span)

        triesCont.appendChild(div)

        if(i !== 1){
            div.classList.add("disable")
        }

        for(let j = 1 ; j <=NumberOfLetter ; j++){
            let input = document.createElement("input")

            input.type = "text"
            input.setAttribute("maxlength" , "1")

            input.id = `try${i}-letter${j}`
            div.appendChild(input)

        }
        
    }
    triesCont.children[currentIndex - 1].children[1].focus()

    document.querySelectorAll(".disable input").forEach(input =>{
        input.disabled = true
    })

    let inputs = document.querySelectorAll("input")

    inputs.forEach((input, index )=>{

        input.addEventListener("input" , () =>{
            input.value = input.value.toUpperCase()
            if(input.value.length == 1){
                
                if(inputs[index]) inputs[index + 1].focus()
            }

            
        })

        input.addEventListener("keyup" , (e) =>{
            if(e.key == "ArrowRight"){
              if(inputs[index + 1])  inputs[index + 1].focus()
            }
            if(e.key == "ArrowLeft"){
               if(inputs[index - 1]) inputs[index - 1].focus()
            }

            if(e.key == "Backspace"){
                if(inputs[index - 1]) inputs[index - 1].focus()
            }

            if(e.key == "Enter"){
                check.click()
            }
        })
    })
}

generateinputs()

check.addEventListener("click" , checkLetters)

function checkLetters() {
    let guessSuccess = true ;
    for(let i = 1 ; i <= NumberOfLetter ; i++){
        let change = document.getElementById(`try${currentIndex}-letter${i}`)

        let compare = document.getElementById(`try${currentIndex}-letter${i}`).value.toLowerCase()

        if(compare == randomWord.split("")[i - 1]){
            change.classList.add("rip")
        }else if(randomWord.includes(compare) && compare !== ""){
            change.classList.add("rnp")
            guessSuccess =false
        }else{
            change.classList.add("wnp")
            guessSuccess = false

        }
    }

    if(guessSuccess){
        let allTries = document.querySelectorAll(".tries .try")
        
        allTries.forEach(e =>{
            e.classList.add("disable")
        })
        check.disabled = true
        check.classList.add("disable")
        result.innerHTML = `You Are Success The Word Is <span>${randomWord.toUpperCase()}</span>`

        if(hint.children[0].innerHTML !== "0"){
            hint.classList.add("disable")
        }
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }else{
        // let inputs = document.querySelectorAll("input")
        
        document.querySelector(`.try${currentIndex}`).classList.add("disable")
        let inputNow = document.querySelectorAll(`.try${currentIndex} input`)
        inputNow.forEach(e => e.disabled = true)
        
        currentIndex++
        console.log(currentIndex)        
        let inputnew = document.querySelectorAll(`.try${currentIndex} input`)
        inputnew.forEach(e => e.disabled = false)

        let el = document.querySelectorAll(`.try${currentIndex}`)
        console.log(currentIndex)
        if(currentIndex <= 6){
            document.querySelector(`.try${currentIndex}`).classList.remove("disable")
        }else{
        result.innerHTML = `You Failed the Word Is <span class="fail">${randomWord.toUpperCase()}</span>`
        check.disabled = true
        check.classList.add("disable")
        if(hint.children[0].innerHTML !== "0"){
            hint.classList.add("disable")
        }
        setTimeout(() => {
            window.location.reload()
        }, 2000);
        }

    
    }

    let curIput = document.querySelector(`.tries div:not(.disable)`)

    
    if(curIput) curIput.children[1].focus() 
}
let hintCount = 2


document.querySelector(".hint span").innerHTML = hintCount
hint.addEventListener("click" , (e) =>{
    hintCount--
    document.querySelector(".hint span").innerHTML = hintCount

    if(hintCount == 0){
       hint.classList.add("disable")
    }

    let allTries =  document.querySelectorAll(`.try${currentIndex} input`)

    let empty = Array.from(allTries).filter((e) => e.value === "")

    let randomInput = empty[Math.floor(Math.random() * empty.length)]

    let indexFill = [...allTries].indexOf(randomInput)

    randomInput.value = randomWord[indexFill].toUpperCase() 


    // document.querySelector(".hint span").innerHTML = hintCount -= 1
    
    //  allTries[random].value = randomWord.split("")[random].toUpperCase() 

})


let post = {
    public:false ,
    isFriend:true
}

function canViewPost(posts){
    if(posts.public || (posts.public == false && posts.isFriend)){
        return true
    }else{
        return false
    }
}

console.log(canViewPost(post))