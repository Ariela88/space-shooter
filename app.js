let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;
let player = new Player((canvasWidth / 2), (canvasHeight / 2), 50, 50);

let allEnemies = [];
let enemyCooldown = 120;

let miniBosCoolDown = 1200;

let playerProjectiles = player.projectiles

let gameOver = document.getElementById('game-over');
let retryButton = document.getElementById('retry-button')

const hpText = document.getElementById('hp-text')
const scoreText = document.getElementById('score-text')

const hpBar = document.getElementById('hp-bar')

let hpWidth = 100 / player.healtPoints


let state = 'Play';


let backround = new Image();

backround.src = './assets/space.png';

let backround_y = 0;


let miniBossProjectiles = []


retryButton.addEventListener('click', () => {
    player.healtPoints = 3;
    player.projectiles = [];
    allEnemies = [];
    gameOver.style.display = 'none';
    player.score = 0;
    player.x = canvasWidth / 2;
    player.y = canvasHeight / 2;
    

})






function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameStates(

    )

    animate = requestAnimationFrame(animation);


    if (state === 'Play') {

        if (player) {
            loopBackground()


            player.draw(ctx);
            player.control(canvasWidth, canvasHeight);
            playerProjectiles = player.projectiles

        }

        enemyCooldown--;
        if (enemyCooldown <= 0) {
            enemySpawn();
            enemyCooldown = 120;
        }

        miniBossSpawn();


        miniBossProjectiles = []

        allEnemies = allEnemies.filter(e => e.isAlive);

        for (let i = 0; i < allEnemies.length; i++) {
            const enemy = allEnemies[i];
            enemy.draw(ctx)
            enemy.move(canvasHeight)
            if (enemy.projectiles) {

                miniBossProjectiles.push(...enemy.projectiles)



            }

        }
        enemyCollision()
        hpText.innerText = 'Vita:' + player.healtPoints;
        scoreText.innerText = 'Score:' + player.score;

        hpBar.style.width = hpWidth * player.healtPoints + '%';

        


    } else if (state === 'GameOver') {
        gameOver.style.display = 'flex';

    }


}

function enemySpawn() {


    const randomX = Math.random() * (canvasWidth - 50);
    let enemy = new BaseEnemy(randomX, -50, 50, 50);
    allEnemies.push(enemy);


}

function miniBossSpawn() {

    miniBosCoolDown--;
    if (miniBosCoolDown <= 0) {
        let xPos = Math.random() < 0.5 ? 0 - 128 : canvasWidth;
        let miniBoss = new MiniBoss(xPos, 120, 128, 84);
        miniBoss.score = 1000;
        miniBoss.speed = xPos < 0.5 ? 2 : -2;
        allEnemies.push(miniBoss)
        miniBosCoolDown = 1200;

    }

}


function enemyCollision() {
    let playerAssets = [player, ...playerProjectiles];
   let enemyAssets = [...allEnemies,...miniBossProjectiles]

    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
      
        for (let j = 0; j < enemyAssets.length; j++) {
            const enemy = enemyAssets[j];
            
            if (
                enemy.x < pA.x + pA.width &&
                enemy.x + enemy.width > pA.x &&
                enemy.y < pA.y + pA.height &&
                enemy.y + enemy.height > pA.y
            ) {


                enemy.healtPoints--;

                pA.healtPoints--;

                enemy.death();

                if (!enemy.isAlive && enemy.score && !pA.isPlayer) {

                    player.score += enemy.score;


                }

            }

        }

    }
}

function gameStates() {
    switch (state) {
        case 'Play':
            if (player.healtPoints <= 0) {

                state = 'GameOver';

            }

            break;
        case 'GameOver':
            if (player.healtPoints > 0) {
                state = 'Play';

            }


        default:
            break;
    }

 
}

function loopBackground() {

    ctx.drawImage(backround,0,backround_y,canvasWidth,canvasHeight);
    ctx.drawImage(backround,0,backround_y-canvasHeight,canvasWidth,canvasHeight);
    backround_y++;

    if (backround_y >= canvasHeight) {

        backround_y=0;

    
        
    }
    
}

animation();