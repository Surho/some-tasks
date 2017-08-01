'use strict';
let pageVisible = true;
let stopWatch = function() {
    this.miliseconds = 0;
    this.seconds = 0;
    this.mins = 0;
    this.hours = 0;
    this.getElements();
};

stopWatch.prototype.getElements = function() {
    this.timerStopPoints = document.querySelector(".stop-times");
    this.timeDisplayMilisecs = document.querySelector(".timer-display-milisecs");
    this.timeDisplaySecs = document.querySelector(".timer-display-secs");
    this.timeDisplayMins = document.querySelector(".timer-display-mins");
    this.timeDisplayHours = document.querySelector(".timer-display-hours");
    this.timerButton = document.querySelector(".start");
    this.timerClear = document.querySelector(".clear");
    this.timerSplit = document.querySelector(".split");
}

stopWatch.prototype.start = function() {
    if(this._timerId === "wasPaused") {
        this.startTime = this.startTime - (this.pauseTime - new Date());
        this.updateTime();
        return this;
    }
    this.startTime = new Date();
    this.updateTime();
};

stopWatch.prototype.displayTime = function() {
    this.timeDisplayMilisecs.innerHTML = `<p> ${this.formatInput(this.miliseconds, 3)} </p>`;
    this.timeDisplaySecs.innerHTML = `<p> ${this.formatInput(this.seconds)} </p>`;  
    this.timeDisplayMins.innerHTML = `<p> ${this.formatInput(this.mins)} </p>`; 
    this.timeDisplayHours.innerHTML = `<p> ${this.formatInput(this.hours)} </p>`;
};

stopWatch.prototype.updateTime = function() {
    self = this;
    this._timerId = setInterval(function() {
        let timeUpdate = new Date(new Date() - this.startTime);
        
        this.hours = timeUpdate.getUTCHours();
        this.mins = timeUpdate.getUTCMinutes();
        this.seconds = timeUpdate.getUTCSeconds();
        this.miliseconds = timeUpdate.getUTCMilliseconds();

        this.displayTime(); 

    }.bind(this));
}

stopWatch.prototype.pause = function() {
    this.pauseTime = new Date();
    clearInterval(this._timerId);
    this._timerId = "wasPaused";
};

stopWatch.prototype.createStopPoint = function(buttonClicked) {
    let childNumber = this.timerStopPoints.children.length + 1;
    this.timerStopPoints.insertAdjacentHTML("beforeend", 
    `<p>${childNumber} ${buttonClicked} ${this.formatInput(this.hours)}:${this.formatInput(this.mins)}:${this.formatInput(this.seconds)}:${this.formatInput(this.miliseconds)}</p>`
    )
};

stopWatch.prototype.clear = function() {
    this.pause();
    this._timerId = null;
    this.pauseTime = 0;
    this.startTime = null;
    this.miliseconds = 0;
    this.seconds = 0;
    this.mins = 0;
    this.hours = 0;
    this.timerButton.classList = "start";
    this.timerButton.textContent = timer.timerButton.classList;
    this.displayTime();
    this.timerStopPoints.innerHTML = "";
};

stopWatch.prototype.formatInput = function(input, n) {
    n = n || 2;
    let output = ("000" + input).slice(-n);
    return output;
};

let timer = new stopWatch();

timer.timerButton.addEventListener('click', function() {
    if(timer.timerButton.classList.contains('start')) {
        timer.timerButton.classList.toggle('start');
        timer.timerButton.classList.toggle('pause');
        timer.start();
        timer.timerButton.textContent = timer.timerButton.classList;
    } else {
       timer.timerButton.classList.toggle('start');
       timer.timerButton.classList.toggle('pause');
       timer.pause();
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


