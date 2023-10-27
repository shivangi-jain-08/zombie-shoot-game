// Iteration 1: Declare variables required for this game
    var gameArena = document.getElementById("game-body");
    var time = document.getElementById("timer").textContent;
    
    let zombieImage; 
    var randomIndex;
    

// Iteration 1.2: Add shotgun sound
    var shotgunSound = new Audio("./assets/shotgun.wav");
    gameArena.onclick = () => {
        shotgunSound.currentTime = 0;
        shotgunSound.play();
    };

// Iteration 1.3: Add background sound
    var backgroundSound = new Audio("./assets/bgm.mp3");
    backgroundSound.play();
    backgroundSound.loop = true;

// Iteration 1.4: Add lives
    var lives = 4;

// Iteration 2: Write a function to make a zombie
// var random
    var id=0;
    function makeZombie(){
        zombieImage = [
            "./assets/zombie-1.png", 
            "./assets/zombie-2.png", 
            "./assets/zombie-3.png", 
            "./assets/zombie-4.png", 
            "./assets/zombie-5.png", 
            "./assets/zombie-6.png"
        ]
        randomIndex = getInteger(0,zombieImage.length);
        gameArena.innerHTML += `<img src="${zombieImage[randomIndex]}" alt="" class="zombie-image" id="zombie${id}">`
        var zombie = document.getElementById("zombie"+id)
        zombie.style.transform = `translateX(${getInteger(15,85)}vw)`
        zombie.style.animationDuration = `${getInteger(3,5s)}s`
        zombie.addEventListener("click", ()=>{
            destroyZombie(zombie)
        })
    }
    


// Iteration 3: Write a function to check if the player missed a zombie
    
    function checkMiss(zombie){
        if(zombie.getBoundingClientRect().top<=0){
            lives--;
            return true;
        }
        return false;
    }

    function showLives(){
        var liveImage = document.getElementById(`live-${lives+1}`);
        liveImage.style.display = "none";
    }




// Iteration 4: Write a function to destroy a zombie when it is shot or missed
    function destroyZombie(zombie) {
        zombie.style.display = "none";
        id++;
        makeZombie();
    }

// Iteration 5: Creating timer
    var timer = setInterval(function () {
        time--;
        document.getElementById("timer").textContent = time;
        var zombie = document.getElementById("zombie" + id);
        if(checkMiss(zombie) == true) {
            destroyZombie(zombie);
            showLives()
            if (lives == 0) {
            clearInterval(timer);
            location.href = "./game-over.html";
            }
        }
        if(time == 0) {
            clearInterval(timer);
            location.href = "./win.html";
        }
    }, 1000);


// Iteration 6: Write a code to start the game by calling the first zombie
    makeZombie()

// Iteration 7: Write the helper function to get random integer
    function getInteger(min, max){
        let randomInt = Math.floor(Math.random()*(max-min)) + min
        return randomInt;
    }
