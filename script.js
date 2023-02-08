import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
  
const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta =  time - lastTime
        // ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)

        if (isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

// Lose function, checks to see if ball is out of bounds
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

// Responsible for resetting the game in the case of a loss
function handleLose() {
    const rect = ball.rect()
    // checking to see if player won
    if (rect.right >= window.innerWidth) {
        // increments player score by parsing text inside and adding 1
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }
    // checking to see if computer won
    else {
        // increments player score by parsing text inside and adding 1
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)