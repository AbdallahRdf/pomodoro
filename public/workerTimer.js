let startTime = 0;
let timeReached;
let timerStyle;
let currentTimerStyle;
let isRunning = false;
let timerId;

self.addEventListener("message", (e) => {
  if (e.data.message === "start") {
    startTime = new Date();
    console.log("start time: ", startTime);
    timeReached = e.data.state.timeRemaining;
    timerStyle = e.data.timerStyle;
    isRunning = true;
    switch (e.data.state.isPomodoro) {
      case timerStyle.pomodoro.title:
        currentTimerStyle = timerStyle.pomodoro;
        break;
      case timerStyle.shortBreak.title:
        currentTimerStyle = timerStyle.shortBreak;
        break;
      case timerStyle.longBreak.title:
        currentTimerStyle = timerStyle.longBreak;
        break;
    }
    checkIfTimerIsUp();
  } else if (e.data === "stop") {
    isRunning = false;
    const elapsedTime = parseInt((new Date() - startTime) / 1000);
    console.log(elapsedTime);
    clearTimeout(timerId);
    self.postMessage(elapsedTime);
  }
});

const checkIfTimerIsUp = () => {
  if(isRunning){
    const elapsedTime = parseInt((new Date() - startTime) / 1000);
    console.log(elapsedTime, timeReached);
    if (elapsedTime >= timeReached) {
      self.postMessage("time's up");
    } else {
      timerId = setTimeout(checkIfTimerIsUp, 1000);
    }
  }
}
