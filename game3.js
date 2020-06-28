function init(){
    var canvas= document.getElementById('mycanvas');
    W = H = canvas.width=canvas.height=600;
    cs=30;
    score=0;
   
    food_image= new Image();
    food_image.src="ap.png";
    
    trophy_image=new Image();
    trophy_image.src="trophy.png";
     food = getfood();
    
    pen=canvas.getContext('2d');
    
    GAME_OVER=false;
    
    snake = {
        init_length :5,
        color : "blue",
        cells: [],
        direction:"right",
      
        
    
    create_snake:function(){
        for(var i= this.init_length; i>=1; i--){
            this.cells.push({x:i,y:1});
            
        }
    },
    draw_snake : function(){
        pen.clearRect(0,0,W,H);
        
        for(var i=0; i<this.cells.length; i++){
            pen.fillStyle="green";
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs, cs-2,cs-2);
            
        }
         pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
        
        pen.drawImage(trophy_image,0,0,cs,cs);
         
        pen.fillStyle="blue";
        pen.font="20 px Roboto";
        pen.fillText(score,10,10);
    },
    update_snake : function(){

        
        var HeadX= this.cells[0].x;
        var HeadY= this.cells[0].y;
        
        if(HeadX == food.x && HeadY ==food.y){
            console.log("food eaten");
            food=getfood();
            score++;
        }
        else{
                    this.cells.pop();
        }
        
        if(this.direction=="right"){ 
            
        NextX= HeadX+1;
        NextY= HeadY;
        }
        
        else if(this.direction=="left"){
            NextX=HeadX-1;
            NextY=HeadY;
        }
        
        else if(this.direction=="down"){
            NextX= HeadX;
            NextY= HeadY+1;
        }
        
        else if(this.direction=="up"){
            NextX=HeadX;
            NextY=HeadY-1;
        }
        this.cells.unshift({x:NextX, y:NextY});
        
        if(NextX*cs>=W || NextX*cs <0 || NextY*cs>=H || NextY*cs<0){
            GAME_OVER=true;
        
            clearInterval(f);
            return;
            
        }
        
    },    
    };
    
    function getfood(){
        var foodX= Math.round(Math.random()*(W-cs)/cs);
        var foodY= Math.round(Math.random()*(H-cs)/cs);
        
        var food={
            x:foodX,
            y:foodY,
        }
        return food

        
    }
  
    function presskey(e){
        console.log("yes");
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        if(e.key=="ArrowUp"){
            snake.direction="up";
        }
    }
document.addEventListener('keydown',presskey);
    
}
init();

snake.create_snake();
function gameloop(){
    snake.draw_snake();
    snake.update_snake();

}
f=setInterval(gameloop,100);
if(GAME_OVER==true){
    alert("GameOver");
}