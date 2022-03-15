module.exports= validatePassword = (password)=>{
    const pasrRegEx=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/
    if(password.match(pasrRegEx)) return true
    else return false
}