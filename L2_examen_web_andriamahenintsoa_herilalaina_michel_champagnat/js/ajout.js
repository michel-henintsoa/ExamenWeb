let text = document.getElementById("title")
console.log(text)
text.addEventListener('input', (e)=>{
    let regex = /[a-zA-Z1-9,.\s]/g
    // console.log(e)
    console.log(e.target.value)
    if(!regex.test(e.target.value)){

    }
})