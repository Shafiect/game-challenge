
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedpattern=[];

var started=false;

var level=0;

$(document).keydown(function(){
  if(!started){

    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function() {
  var userChoosencolor=$(this).attr("id");
  userClickedpattern.push(userChoosencolor);
  playsound(userChoosencolor);
  animatePress(userChoosencolor);
  checkAnswer(userClickedpattern.length-1);


});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedpattern[currentLevel]){
    console.log("success");
    if (userClickedpattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game-Over,Press any key to restart");
    startOver();

  }

}


function nextSequence(){
  userClickedpattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosencolor=buttonColors[randomNumber];
  gamePattern.push(randomChoosencolor);

  $("#"+randomChoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChoosencolor);

}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}



function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
