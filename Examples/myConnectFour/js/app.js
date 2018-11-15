const game = new Game("theCanvas");

const uno = game.image(123,123,100,100,"res/flower.jpg");
const bgDefault = game.rect(0,0,game.canvas.width,game.canvas.height,"black");
const megaman = game.spriteAnimation(250,250,50,50,33,43,"res/spritesheet-demo.png",3);
let tick = 0;

const update = () => {
	uno.x += 1;
	tick++;
	if(tick % 10 == 0){
		// megaman.nextFrame();
	}
}

const render = () => {
	update();
	bgDefault.draw();
	uno.draw();
	megaman.draw();
}

game.run(render,60);

//old
//$ var bob = rectMngr(x,y,width,height,color)
//$ drawNormalRect(bob);
//current
//$ game.rect(x,y,width,height,color).draw();