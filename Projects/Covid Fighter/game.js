
function load_images() {
    enemy= new Image;
    enemy.src="corona.png";
    player_im= new Image;
    player_im.src="char.png";
    goal_im=new Image;
    goal_im.src ="sanitiser.png";
    
}
function init(){
    canvas=document.getElementById("mycanvas");
        console.log(canvas);
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    
    pen=canvas.getContext('2d');
    console.log(pen);
    game_over=false;
    game_lost=false;
    box = {
        x : 100,
        y : 50,
        w : 75,
        h : 75,
        speed : 25
    };
    box2 ={
        x : 275,
        y : H-163,
        w : 75,
        h : 75,
        speed :-25
    };
    box3 ={
        x : 450,
        y : 50,
        w : 75,
        h : 75,
        speed :25
    }
        corona =[box,box2,box3];
    player = {
        x : 0,
        y : H/2-60,
        w : 60,
        h : 120,
        speed : 20,
        moving : false
    }
    goal = {
        x : W - 75,
        y : H/2-50,
        w : 60,
        h : 100
    }
    
    canvas.addEventListener('mousedown',function(){
        console.log("mouse pressed");
        player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("mouse released");
        player.moving=false;
    })
    document.addEventListener('keydown',function(e){
        if(e.keyCode==32){
            player.moving=true;
        }
    })
    document.addEventListener('keyup',function(e){
        if(e.keyCode==32){
            player.moving=false;
        }
    })
}

function colliding (rect1,rect2){
    if(rect1.x < rect2.x + rect2.w && rect1.x + rect1.w -25> rect2.x
      && rect1.y < rect2.y + rect2.h -50 && rect1.y + rect1.h -50 >rect2.y){
        return true;
    }
    return false;
}

function draw() {
    pen.clearRect(0,0,W,H);
    //pen.fillStyle="red";
    //pen.fillRect(box.x,box.y,box.w,box.h);    
    //pen.drawImage(enemy,box.x,box.y,box.w,box.h);
    
     pen.drawImage(player_im,player.x,player.y,player.w,player.h);
     pen.drawImage(goal_im,goal.x,goal.y,goal.w,goal.h);
    
    
    for(let i=0; i<corona.length; i++){
        pen.drawImage(enemy,corona[i].x,corona[i].y,corona[i].w,corona[i].h);
    }
   
    
}

function update() {
    if(player.moving==true){
        player.x += player.speed;
    }
        
        
    for(let i=0; i<corona.length;i++){
    corona[i].y += corona[i].speed;
    if(corona[i].y>H-corona[i].h+20){
        corona[i].speed *= -1;
    }
    if(corona[i].y<=-20){
        corona[i].speed *= -1;
    }
    }
    for(let i=0; i<corona.length; i++){
        if(colliding(player,corona[i])){
            console.log("GAME LOST");
            alert("GAME LOST!");
            game_lost=true;
            return;
        }
        
    }
    if(colliding(player,goal)){
        console.log("GAME WON");
        alert("GAME WON!");
        game_over=true;
        return;
    }
    
    
}
function gameloop() {
    if(game_over==true){
        clearInterval(f);
    }
    if(game_lost==true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}
load_images();
init();
var f = setInterval(gameloop,100);

    
