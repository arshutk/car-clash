//initialising
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const raceResultScreen = document.querySelector(".raceResult");
const endScreen = document.querySelector(".endScreen");

const gameAreaLeft = document.querySelector(".gameAreaLeft");
const gameAreaRight = document.querySelector(".gameAreaRight");
const playerStatsLeft = document.querySelector(".playerStatsLeft");
const playerStatsRight = document.querySelector(".playerStatsRight");

const scorePlayer1 = document.querySelector(".scorePlayer1");
const scorePlayer2 = document.querySelector(".scorePlayer2");

const carPlayer1Blue = document.querySelector(".carPlayer1Blue");
const carPlayer1Lightblue = document.querySelector(".carPlayer1Lightblue");
const carPlayer1Orange = document.querySelector(".carPlayer1Orange");
const carPlayer2Blue = document.querySelector(".carPlayer2Blue");
const carPlayer2Lightblue = document.querySelector(".carPlayer2Lightblue");
const carPlayer2Orange = document.querySelector(".carPlayer2Orange");

const raceStart = document.querySelector(".playerReady");
const restartRace = document.querySelector(".restart");

let result = document.querySelector(".result");

let startLineLeftPosition = 140;
let startLineRightPosition = 140;
let finishLineLeftPosition = -10000;
let finishLineRightPosition = -10000;

let lineScorePlayer1 = 0;
let fuelScorePlayer1 = 0;
let collisionCount1 = 0;

let lineScorePlayer2 = 0;
let fuelScorePlayer2 = 0;
let collisionCount2 = 0;

let player1CarChoice = "blue";
let player2CarChoice = "orange";

//player objects
let player1 = { speed: 10, score: 0 };
let player2 = { speed: 10, score: 0 };

//keys and their functions
let keys = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  d: false,
  W: false,
  A: false,
  D: false,
};

// EventListeners
raceStart.addEventListener("click", start);

carPlayer1Blue.addEventListener("click", function () {
  player1CarChoice = "blue";
  carPlayer1Blue.style.transform = "scale(1.3)";
  carPlayer1Lightblue.style.transform = "scale(0.9)";
  carPlayer1Orange.style.transform = "scale(0.9)";
});
carPlayer1Lightblue.addEventListener("click", function () {
  player1CarChoice = "lightblue";
  carPlayer1Blue.style.transform = "scale(0.9)";
  carPlayer1Lightblue.style.transform = "scale(1.3)";
  carPlayer1Orange.style.transform = "scale(0.9)";
});
carPlayer1Orange.addEventListener("click", function () {
  player1CarChoice = "orange";
  carPlayer1Blue.style.transform = "scale(0.9)";
  carPlayer1Lightblue.style.transform = "scale(0.9)";
  carPlayer1Orange.style.transform = "scale(1.3)";
});
carPlayer2Blue.addEventListener("click", function () {
  player2CarChoice = "blue";
  carPlayer2Blue.style.transform = "scale(1.3)";
  carPlayer2Lightblue.style.transform = "scale(0.9)";
  carPlayer2Orange.style.transform = "scale(0.9)";
});
carPlayer2Lightblue.addEventListener("click", function () {
  player2CarChoice = "lightblue";
  carPlayer2Blue.style.transform = "scale(0.9)";
  carPlayer2Lightblue.style.transform = "scale(1.3)";
  carPlayer2Orange.style.transform = "scale(0.9)";
});
carPlayer2Orange.addEventListener("click", function () {
  player2CarChoice = "orange";
  carPlayer2Blue.style.transform = "scale(0.9)";
  carPlayer2Lightblue.style.transform = "scale(0.9)";
  carPlayer2Orange.style.transform = "scale(1.3)";
});

document.addEventListener("keydown", keyDown);
function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}

document.addEventListener("keyup", keyUp);
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

raceResultScreen.addEventListener("click", function () {
  gameArea.classList.add("hide");
  raceResultScreen.classList.remove("hide");
  endScreen.classList.remove("hide");
  gameOver();
});

restartRace.addEventListener("click", function () {
  location.reload(true);
});

//functions to check
function player1RaceFinished(carPlayer1, finishLineLeft) {
  let carRect = carPlayer1.getBoundingClientRect();
  let finishLineRect = finishLineLeft.getBoundingClientRect();

  return carRect.top < finishLineRect.top;
}
function player2RaceFinished(carPlayer2, finishLineRight) {
  let carRect = carPlayer2.getBoundingClientRect();
  let finishLineRect = finishLineRight.getBoundingClientRect();

  return carRect.top < finishLineRect.top;
}
function isfuelcollect(car, fuel) {
  let carRect = car.getBoundingClientRect();
  let fuelRect = fuel.getBoundingClientRect();
  return !(
    carRect.left > fuelRect.right ||
    carRect.right < fuelRect.left ||
    carRect.bottom < fuelRect.top ||
    carRect.top > fuelRect.bottom
  );
}
function isEnemycollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top
  );
}

//functions to move
function moveLeftLines() {
  let roadLineLeft1 = document.querySelectorAll(".roadLineLeft1");
  let roadLineLeft2 = document.querySelectorAll(".roadLineLeft2");

  roadLineLeft1.forEach(function (item) {
    if (item.y >= 800) {
      item.y -= 750;
    }

    item.y += player1.speed;
    item.style.top = item.y + "px";
  });

  roadLineLeft2.forEach(function (item) {
    if (item.y >= 800) {
      item.y -= 750;
    }

    item.y += player1.speed;
    item.style.top = item.y + "px";
  });
}

function moveRightLines() {
  let roadLineRight1 = document.querySelectorAll(".roadLineRight1");
  let roadLineRight2 = document.querySelectorAll(".roadLineRight2");

  roadLineRight1.forEach(function (item) {
    if (item.y >= 800) {
      item.y -= 750;
    }

    item.y += player2.speed;
    item.style.top = item.y + "px";
  });

  roadLineRight2.forEach(function (item) {
    if (item.y >= 800) {
      item.y -= 750;
    }

    item.y += player2.speed;
    item.style.top = item.y + "px";
  });
}

function moveLeftStartLine() {
  let startLineLeft = document.querySelector(".startLineLeft");

  startLineLeftPosition -= player1.speed;
  startLineLeft.style.bottom = startLineLeftPosition + "px";
}

function moveRightStartLine() {
  let startLineRight = document.querySelector(".startLineRight");

  startLineRightPosition -= player2.speed;
  startLineRight.style.bottom = startLineRightPosition + "px";
}

function moveLeftFinishLine(carPlayer1) {
  let finishLineLeft = document.querySelector(".finishLineLeft");
  if (player1RaceFinished(carPlayer1, finishLineLeft)) {
    player1.ready = false; // gameOver();
    player2.ready = false;
    raceResultScreen.innerHTML =
      "Player 1 has finished the race<br /><br />Press anywhere to view Scorecard";

    player1.score += 200; //Bonus for finishing first
    player2.score += 1063 - lineScorePlayer1; // normalizing score of player 2

    raceResult();
    finsihLineCrossScore();
  }

  finishLineLeftPosition += player1.speed;
  finishLineLeft.style.top = finishLineLeftPosition + "px";

  let distanceLeft = document.querySelector(".distanceRemainingPlayer1");

  let carLeft = carPlayer1.getBoundingClientRect();
  let finishLeft = finishLineLeft.getBoundingClientRect();

  distanceRemainLeft = finishLeft.top - carLeft.top;

  distanceLeft.innerHTML =
    "Distance: " + (distanceRemainLeft / 1000) * -1 + "KM";
}
function moveRightFinishLine(carPlayer2) {
  let finishLineRight = document.querySelector(".finishLineRight");

  if (player2RaceFinished(carPlayer2, finishLineRight)) {
    player2.ready = false; // gameOver();
    player1.ready = false;
    raceResultScreen.innerHTML =
      "Player 2 has Finished the race<br />Press anywhere to view Scorecard";

    player2.score += 200; //Bonus for finishing first
    player1.score += 1063 - lineScorePlayer1; // normalizing score of player 1

    raceResult();
    finsihLineCrossScore();
  }

  finishLineRightPosition += player2.speed;
  finishLineRight.style.top = finishLineRightPosition + "px";

  let distanceRight = document.querySelector(".distanceRemainingPlayer2");

  let carRight = carPlayer2.getBoundingClientRect();
  let finishRight = finishLineRight.getBoundingClientRect();

  let distanceRemainRight = finishRight.top - carRight.top;

  distanceRight.innerHTML =
    "Distance: " + (distanceRemainRight / 1000) * -1 + "KM";
}

function moveLeftFuel(carPlayer1) {
  let fuelLeft = document.querySelectorAll(".fuelLeft");

  fuelLeft.forEach(function (item) {
    if (isfuelcollect(carPlayer1, item)) {
      item.style.visibility = "hidden";
      fuelLeftCollected();
    }

    item.y += player1.speed;
    item.style.top = item.y + "px";
  });
}

function moveRightFuel(carPlayer2) {
  let fuelRight = document.querySelectorAll(".fuelRight");

  fuelRight.forEach(function (item) {
    if (isfuelcollect(carPlayer2, item)) {
      item.style.visibility = "hidden";
      fuelRightCollected();
    }

    item.y += player2.speed;
    item.style.top = item.y + "px";
  });
}

function fuelLeftBar() {
  var val1 = document.querySelector(".fuelMeterLeft").value;
  if (!val1) {
    player1.ready = false;
    player2.ready = false; //gameOver();
    raceResultScreen.innerHTML =
      "Game Over<br />Player 1 ran out of Fuel<br />Hence, Player 1 disqualified<br />Press anywhere to view Scorecard";
    raceResult();
    result.innerHTML = "&#127942; Player 2 Won";
  }
  val1 -= 0.3;
  document.querySelector(".fuelMeterLeft").value = val1;
}

function fuelRightBar() {
  var val2 = document.querySelector(".fuelMeterRight").value;
  if (!val2) {
    player1.ready = false;
    player2.ready = false; // gameOver();
    raceResultScreen.innerHTML =
      "Game Over!<br />Player 2 ran out of Fuel<br />Hence, Player 2 disqualified<br />Press anywhere to view Scorecard";
    raceResult();
    result.innerHTML = "&#127942; Player 1 Won";
  }
  val2 -= 0.3;
  document.querySelector(".fuelMeterRight").value = val2;
}

function moveLeftEnemy(carPlayer1) {
  let enemyLeft = document.querySelectorAll(".enemyLeft");

  enemyLeft.forEach(function (item) {
    if (isEnemycollide(carPlayer1, item)) {
      collisionCount1++;
      player1.score -= 150;
      player1.ready = false;
      player2.ready = false; // gameOver();
      raceResultScreen.innerHTML =
        "Game Over!<br />Player 1's Car crashed<br />Hence, Player 1 disqualified<br />Press anywhere to view scorecard";
      raceResult();
      result.innerHTML = "&#127942; Player 2 Won";
    }
    if (item.y >= 700) {
      item.y = -50;
      item.style.left = Math.floor(Math.random() * 400) + "px";
      item.style.background =
        "url(./img/enemy" + Math.floor(Math.random() * 7) + ".png)";
      item.style.backgroundSize = "100% 100%";
    }

    item.y += player1.speed;
    item.style.top = item.y + "px";
  });
}

function moveRightEnemy(carPlayer2) {
  let enemyRight = document.querySelectorAll(".enemyRight");

  enemyRight.forEach(function (item) {
    if (isEnemycollide(carPlayer2, item)) {
      collisionCount2++;
      player2.score -= 150;
      player1.ready = false;
      player2.ready = false; // gameOver();
      raceResultScreen.innerHTML =
        "Game Over!<br />Player 2's Car crashed<br />Hence, Player 2 disqualified<br />Press anywhere to view scorecard";
      raceResult();
      result.innerHTML = "&#127942; Player 1 Won";
    }
    if (item.y >= 700) {
      item.y = -50;
      item.style.left = Math.floor(Math.random() * 400) + "px";
      item.style.background =
        "url(./img/enemy" + Math.floor(Math.random() * 7) + ".png)";
      item.style.backgroundSize = "100% 100%";
    }

    item.y += player2.speed;
    item.style.top = item.y + "px";
  });
}

function fuelLeftCollected() {
  var val = document.querySelector(".fuelMeterLeft").value;
  document.querySelector(".fuelMeterLeft").value = val + 4;
  fuelScorePlayer1 += 5;
  player1.score += 5;
}
function fuelRightCollected() {
  var val = document.querySelector(".fuelMeterRight").value;
  document.querySelector(".fuelMeterRight").value = val + 4;
  fuelScorePlayer2 += 5;
  player2.score += 5;
}

// functions for Game
function start() {
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");

  player1.ready = true;
  player2.ready = true;
  window.requestAnimationFrame(gamePlay);

  //stripes
  for (x = 0; x < 5; x++) {
    let roadLineLeft1 = document.createElement("div");
    roadLineLeft1.setAttribute("class", "roadLineLeft1");
    roadLineLeft1.y = x * 150;
    roadLineLeft1.style.top = roadLineLeft1.y + "px";
    gameAreaLeft.appendChild(roadLineLeft1);

    let roadLineLeft2 = document.createElement("div");
    roadLineLeft2.setAttribute("class", "roadLineLeft2");
    roadLineLeft2.y = x * 150;
    roadLineLeft2.style.top = roadLineLeft2.y + "px";
    gameAreaLeft.appendChild(roadLineLeft2);

    let roadLineRight1 = document.createElement("div");
    roadLineRight1.setAttribute("class", "roadLineRight1");
    roadLineRight1.y = x * 150;
    roadLineRight1.style.top = roadLineRight1.y + "px";
    gameAreaRight.appendChild(roadLineRight1);

    let roadLineRight2 = document.createElement("div");
    roadLineRight2.setAttribute("class", "roadLineRight2");
    roadLineRight2.y = x * 150;
    roadLineRight2.style.top = roadLineRight2.y + "px";
    gameAreaRight.appendChild(roadLineRight2);
  }

  //Starting and Finish line
  let startLineLeft = document.createElement("div");
  startLineLeft.setAttribute("class", "startLineLeft");
  gameAreaLeft.appendChild(startLineLeft);

  let finishLineLeft = document.createElement("div");
  finishLineLeft.setAttribute("class", "finishLineLeft");
  gameAreaLeft.appendChild(finishLineLeft);

  let startLineRight = document.createElement("div");
  startLineRight.setAttribute("class", "startLineRight");
  gameAreaRight.appendChild(startLineRight);

  let finishLineRight = document.createElement("div");
  finishLineRight.setAttribute("class", "finishLineRight");
  gameAreaRight.appendChild(finishLineRight);

  // Enemy cars
  for (x = 0; x < 3; x++) {
    let enemyLeft = document.createElement("div");
    enemyLeft.setAttribute("class", "enemyLeft");
    enemyLeft.y = (x + 1) * 200 * -1;
    enemyLeft.style.top = enemyLeft.y + "px";
    enemyLeft.style.left = Math.floor(Math.random() * 400) + "px";
    enemyLeft.style.background =
      "url(./img/enemy" + Math.floor(Math.random() * 7) + ".png)";
    enemyLeft.style.backgroundSize = "100% 100%";
    gameAreaLeft.appendChild(enemyLeft);

    let enemyRight = document.createElement("div");
    enemyRight.setAttribute("class", "enemyRight");
    enemyRight.y = (x + 1) * 200 * -1;
    enemyRight.style.top = enemyRight.y + "px";
    enemyRight.style.left = Math.floor(Math.random() * 400) + "px";
    enemyRight.style.background =
      "url(./img/enemy" + Math.floor(Math.random() * 7) + ".png)";
    enemyRight.style.backgroundSize = "100% 100%";
    gameAreaRight.appendChild(enemyRight);
  }

  //fuel
  for (x = 0; x < 20; x++) {
    let fuelLeft = document.createElement("div");
    fuelLeft.setAttribute("class", "fuelLeft");
    fuelLeft.y = (x + 1) * 1500 * -1;
    fuelLeft.style.top = fuelLeft.y + "px";
    fuelLeft.style.left = Math.floor(Math.random() * 400) + "px";
    gameAreaLeft.appendChild(fuelLeft);

    let fuelRight = document.createElement("div");
    fuelRight.setAttribute("class", "fuelRight");
    fuelRight.y = (x + 1) * 1500 * -1;
    fuelRight.style.top = fuelRight.y + "px";
    fuelRight.style.left = Math.floor(Math.random() * 400) + "px";
    gameAreaRight.appendChild(fuelRight);
  }

  //Player Cars
  let carPlayer1 = document.createElement("div");
  carPlayer1.setAttribute("class", "carPlayer1");
  carPlayer1.style.background =
    "url('./img/playercar-" + player1CarChoice + ".png')";
  carPlayer1.style.backgroundSize = "100% 100%";
  gameAreaLeft.appendChild(carPlayer1);

  let carPlayer2 = document.createElement("div");
  carPlayer2.setAttribute("class", "carPlayer2");
  carPlayer2.style.background =
    "url('./img/playercar-" + player2CarChoice + ".png')";
  carPlayer2.style.backgroundSize = "100% 100%";
  gameAreaRight.appendChild(carPlayer2);

  //Assigning positions for controlling movement
  player1.x = carPlayer1.offsetLeft;
  player1.y = carPlayer1.offsetTop;

  player2.x = carPlayer2.offsetLeft;
  player2.y = carPlayer2.offsetTop;
}

function gamePlay() {
  let areaLeft = gameAreaLeft.getBoundingClientRect();
  let carPlayer1 = document.querySelector(".carPlayer1");

  let areaRight = gameAreaRight.getBoundingClientRect();
  let carPlayer2 = document.querySelector(".carPlayer2");

  //Adding movement to the player cars:
  //Player1
  if (player1.ready) {
    if ((keys.w || keys.W) && player1.y > 70) {
      moveLeftLines();
      moveLeftEnemy(carPlayer1);
      moveLeftStartLine();
      moveLeftFinishLine(carPlayer1);
      moveLeftFuel(carPlayer1);
      fuelLeftBar();
      player1.score++;
      lineScorePlayer1++;
      scorePlayer1.innerText = "Score: " + player1.score;
    }
    if ((keys.a || keys.A) && player1.x > 0) player1.x -= player1.speed;
    if ((keys.d || keys.D) && player1.x < areaLeft.width - 60)
      player1.x += player1.speed;
  }

  //Player2
  if (player2.ready) {
    if (keys.ArrowUp && player2.y > 70) {
      moveRightLines();
      moveRightEnemy(carPlayer2);
      moveRightStartLine();
      moveRightFinishLine(carPlayer2);
      moveRightFuel(carPlayer2);
      fuelRightBar();
      player2.score++;
      lineScorePlayer2++;
      scorePlayer2.innerText = "Score: " + player2.score;
    }
    if (keys.ArrowLeft && player2.x > 0) player2.x -= player2.speed;
    if (keys.ArrowRight && player2.x < areaRight.width - 60)
      player2.x += player2.speed;
  }

  //Changing the position of cars
  carPlayer1.style.top = player1.y + "px";
  carPlayer1.style.left = player1.x + "px";

  carPlayer2.style.top = player2.y + "px";
  carPlayer2.style.left = player2.x + "px";

  window.requestAnimationFrame(gamePlay);
}

// funciton for ending race
function raceResult() {
  raceResultScreen.classList.remove("hide");
}

// function for displaying scorecard
function gameOver() {
  let lapTimePlayer1 = document.querySelector(".laptimePlayer1");
  let fuelCollectedPlayer1 = document.querySelector(".fuelcollectedPlayer1");
  let carCollisionPlayer1 = document.querySelector(".carCollisionPlayer1");
  let totalPlayer1 = document.querySelector(".totalPlayer1");

  let lapTimePlayer2 = document.querySelector(".laptimePlayer2");
  let fuelCollectedPlayer2 = document.querySelector(".fuelcollectedPlayer2");
  let carCollisionPlayer2 = document.querySelector(".carCollisionPlayer2");
  let totalPlayer2 = document.querySelector(".totalPlayer2");

  lapTimePlayer1.innerHTML = "Lap Time: " + lineScorePlayer1;
  fuelCollectedPlayer1.innerHTML =
    "Fuel Collected: " + fuelScorePlayer1 + " litre";
  carCollisionPlayer1.innerHTML = "Damage to Car: " + collisionCount1;

  lapTimePlayer2.innerHTML = "Lap Time: " + lineScorePlayer2;
  fuelCollectedPlayer2.innerHTML =
    "Fuel Collected: " + fuelScorePlayer2 + " litre";
  carCollisionPlayer2.innerHTML = "Damage to Car: " + collisionCount2;

  if (player1.score < 0) totalPlayer1.innerHTML = "&#127937; Score: 0";
  else totalPlayer1.innerHTML = "&#127937; Score: " + player1.score;
  if (player2.score < 0) totalPlayer2.innerHTML = "&#127937; Score: 0";
  else totalPlayer2.innerHTML = "&#127937; Score: " + player2.score;
}

function finsihLineCrossScore() {
  if (player1.score > player2.score)
    result.innerHTML = "&#127942; Player 1 Won";
  else result.innerHTML = "&#127942; Player 2 Won";
}
