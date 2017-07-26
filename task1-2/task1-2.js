'use strict'
//task1-2
//1
function pow() {
    let number = +prompt("what number?");
    let n = +prompt("what n?");
    if(n < 0) {
        alert("n must be greater or equal to 0");
        return pow();
    }
    return function powInner(number, n) {
       return !(n === 0) ? powInner(number,n-1) * number : 1; 
    }(number, n);
}
console.log(pow());

//2
function userCheck() {
    let names = [];
    for(let i = 0; i < 5; i++) {
        let name = prompt(`enter the name number ${i+1}`);
        names.push(name);
    }

    let userName = prompt(`enter user name`);
    for(let i = 0; i < names.length; i++) {
        if (userName === names[i]) {
            alert(`${userName} logged in`);
            break;
        };
        if( i === names.length-1 ) {
            alert('error no user with such name found');
        };
    };

};

userCheck();