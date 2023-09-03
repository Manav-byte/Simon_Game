
//button press glowing effect
function addButtonPressEffect(selector) {
  var buttons = document.querySelectorAll(selector);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 100);
    });
  });
}
function highlightNextButton(patternIndex, selector) {
  const buttons = document.querySelectorAll(selector);
  const buttonToClick = buttons[patternIndex];

  // Apply the button press effect to the specific button
  buttonToClick.classList.add("pressed");
  setTimeout(() => {
    buttonToClick.classList.remove("pressed");
  }, 100);
}
// Usage
addButtonPressEffect(".btn");

// assigning color to number to each color and storing them
//random color generator
let randomNumber=Math.floor(Math.random()*4);
let colorArray=["red","blue","green","yellow"];
let gamePattern=[];

function generateRandomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  return colorArray[randomNumber];
}
//Audio function
let clickSound=(userChosenColour)=>{
  const audio=new Audio("./sounds/"+userChosenColour+".mp3")
  audio.play();
  
}   
//THis part is storing the clickd button colors and managing sounds also

let userClickedPattern=[];
let userChosenColour;
let userArray=()=>{
  userClickedPattern.push(userChosenColour)
  clickSound(userChosenColour)
  console.log(userClickedPattern)
}

document.querySelectorAll(".btn").forEach(button=>{         //we can name the button variable anything that's inside of foreach loop
    button.addEventListener("click",(event)=>{
      userChosenColour=event.target.id;
      userArray();
    })
}
);

//giving the user what color should he select next and in what sequence
let level=0;
let nextColor;
let nextSequence=()=>{
  let randomNumber = Math.floor(Math.random() * 4);
  nextColor=colorArray[randomNumber];
  gamePattern.push(nextColor);
  let nextIndex=gamePattern.length-1;
  highlightNextButton(nextIndex, ".btn");
  level++;

}
//start game

document.querySelector("body").addEventListener('keypress', (event) => {
  if (event.key=="a"&& level==0) {
    nextSequence();
    document.querySelector("h1").innerHTML=("level "+level);
  }
 
})





