'use strict';
let pageVisible = true;
let stopWatch = function() {
    this.miliseconds = 0;
    this.seconds = 0;
    this.mins = 0;
    this.hours = 0;
    this._timerId = null;
    this.startTime = null;
    this.interval = 8;

    this.timerStopPoints = document.querySelector(".stop-times");
    this.timeDisplayMilisecs = document.querySelector(".timer-display-milisecs");
    this.timeDisplaySecs = document.querySelector(".timer-display-secs");
    this.timeDisplayMins = document.querySelector(".timer-display-mins");
    this.timeDisplayHours = document.querySelector(".timer-display-hours");
    this.timerButton = document.querySelector(".start");
    this.timerClear = document.querySelector(".clear");
    this.timerSplit = document.querySelector(".split");
};

stopWatch.prototype.start = function() {
    let self = this;
    if(!this.startTime) {
       this.startTime = new Date(); 
    }
    this._timerId = setInterval(function() {
        if (pageVisible) {
            let now = new Date();
            let milisecsShift = now - self.startTime;
            self.miliseconds +=  milisecsShift;
            if(self.miliseconds >= 1000) {
            self.miliseconds = 0;
            self.seconds += 1; 
            if(self.seconds === 60) {
                    self.seconds = 0;
                    self.mins += 1;
                    if(self.mins === 60) {
                        self.mins = 0;
                        self.hours += 1;
                    }
                }
            }
            self.startTime = now;
        } else {
            console.log("kek");
            self.seconds+=1; 
        }
    }, this.interval);  
};

stopWatch.prototype.pause = function() {
    let self = this;
    if(this._timerId) clearInterval(this._timerId);
    this.startTime = new Date();   
};

stopWatch.prototype.createStopPoint = function(buttonClicked) {
    let childNumber = this.timerStopPoints.children.length + 1;
    this.timerStopPoints.insertAdjacentHTML("beforeend", 
    `<p>${childNumber} ${buttonClicked} ${timer.formatInput(timer.hours)}:${timer.formatInput(timer.mins)}:${timer.formatInput(timer.seconds)}:${timer.miliseconds}</p>`
    )
};

stopWatch.prototype.clear = function() {
    if(this._timerId) this.pause();
    this.timerStopPoints.innerHTML = "";
    this.startTime = null;
    this.miliseconds = 0;
    this.seconds = 0;
    this.mins = 0;
    this.hours = 0;
};

stopWatch.prototype.formatInput = function(input) {
    if(input < 10) {
        let output = "0" + input;
        return output;
    }
    return input;
};

let timer = new stopWatch();

timer.timerButton.addEventListener('click', function() {
    if(timer.timerButton.classList.contains('start')) {
        if(timer._timerId) timer.pause();
        timer.start();
        timer.timerButton.classList.remove('start');
        timer.timerButton.classList.add('pause');
        timer.timerButton.textContent = timer.timerButton.classList;
        var displayTime = setInterval(function() {
            timer.timeDisplayMilisecs.innerHTML = `<p> ${timer.miliseconds} </p>`;
            timer.timeDisplaySecs.innerHTML = `<p> ${timer.formatInput(timer.seconds)} </p>`;  
            timer.timeDisplayMins.innerHTML = `<p> ${timer.formatInput(timer.mins)} </p>`; 
            timer.timeDisplayHours.innerHTML = `<p> ${timer.formatInput(timer.hours)} </p>`;   
        }, 50);
    } else {
       timer.pause();
       clearInterval(displayTime);
       timer.timerButton.classList.remove('pause'); 
       timer.timerButton.classList.add('start'); 
       timer.timerButton.textContent = timer.timerButton.classList;
       timer.createStopPoint('pause');
    }
});

timer.timerClear.addEventListener('click', function() {
    timer.clear();
});

timer.timerSplit.addEventListener('click', function() {
    timer.createStopPoint('split');
});

window.addEventListener('focus', function() {
    pageVisible = true;
    timer.interval = 1000;
});
window.addEventListener('blur', function() {
    pageVisible = false;
    timer.interval = 8;
})
