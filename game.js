var gamePattern = [];
var gameChosenPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})




$(".btn").click(function(){
    var gameChosenColor = $(this).attr("id");
    gameChosenPattern.push(gameChosenColor);

    makeSound0(gameChosenColor);
    animatePress(gameChosenColor);

    checkAnswer(gameChosenPattern.length-1);
     
});



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === gameChosenPattern[currentLevel]) {

      console.log("success");

      if (gameChosenPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      makeSound0("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Retart");
      startOver();
    }
}

 function nextSequence(){
    gameChosenPattern = [];
    level ++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   makeSound0(randomChosenColor);


}
function animatePress(animate){
    $("#" + animate).addClass("pressed");
     setTimeout(function(){
      $("#" + animate).removeClass("pressed");
     },100)
 }
 function makeSound0(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }