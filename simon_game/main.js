document.addEventListener("DOMContentLoaded", () => {
  var buttonColours = ["red", "blue", "green", "yellow"];

  var gamePattern = [];
  var userClickedPattern = [];

  var started = false;
  var level = 0;
  //start of game
  document.addEventListener("keypress", function (event) {
    if (!started && level == 0) {
      document.querySelector("#level-title").textContent = "Level " + level;
      nextSequence();
      started = true;
    }
  });
  //user chosen button or color
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var userChosenColour = this.getAttribute("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    });
  });
  // check both arrays are same or not(game over also included)
  function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      setTimeout(() => {
        playSound("wrong");
      }, 200);
      document.querySelector("body").classList.add("wrong-sel");
      setTimeout(() => {
        document.querySelector("body").classList.remove("wrong-sel");
      }, 300)
      document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
      // document.addEventListener("keypress",()=>{
      //   location.reload();                                   //shortcut way to do it
      // })
      startOver();

    }
  }


  function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    document.querySelector("#" + randomChosenColour).classList.add("pressed");
    setTimeout(function () {
      document.querySelector("#" + randomChosenColour).classList.remove("pressed");
    }, 100);
    console.log(randomChosenColour);
    //animatePress(randomChosenColour);
    playSound(randomChosenColour);
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
    document.querySelector("#" + currentColor).classList.add("pressed");
    setTimeout(function () {
      document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100);
  }
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
})