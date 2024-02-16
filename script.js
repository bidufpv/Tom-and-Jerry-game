       
score = 0;
cross = true;

audio = new Audio('theme.mp3');
audiogo = new Audio('gameoverone.mp3');
setTimeout(() => {
    audio.play()
}, 100);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        tom = document.querySelector('.tom');
        tom.classList.add('animatetom');
        setTimeout(() => {
            tom.classList.remove('animatetom')
        }, 700);
    }
    if (e.keyCode == 39) {
        tom = document.querySelector('.tom');
        tomX = parseInt(window.getComputedStyle(tom, null).getPropertyValue('left'));
        tom.style.left = tomX + 112 + "px";
    }
    if (e.keyCode == 37) {
        tom = document.querySelector('.tom');
        tomX = parseInt(window.getComputedStyle(tom, null).getPropertyValue('left'));
        tom.style.left = (tomX - 112) + "px";
    }
}

setInterval(() => {
    tom = document.querySelector('.tom');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(tom, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(tom, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}