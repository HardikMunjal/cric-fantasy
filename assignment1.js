function factorial(n){
    if(n == 0 || n == 1){
        return 1;
    }else{
        return n * factorial(n-1);
    }
}
let n = 10 ;
answer = factorial(n)
console.log(answer);
