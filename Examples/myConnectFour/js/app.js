const game = new CanvasGame("theCanvas");

const uno = game.image(123,123,100,100,"res/flower.jpg");
const bgDefault = game.rect(0,0,game.canvas.width,game.canvas.height,"black");
const megaman = game.spriteAnimation(250,250,50,50,33,43,"res/spritesheet-demo.png",3);
const sampleText = game.textString("heyyyyyyy","24px Tahoma",400,400);
sampleText.color = "white";
const counterX = game.counterObject(5, 360);
console.log(sampleText.width);

const update = () => {
	uno.x += 1;
	counterX.run();
	uno.deg = counterX.frame;
	sampleText.deg = counterX.frame;
	if(counterX.tick){
		megaman.nextFrame();
	}
	game.worldRectCol(uno,"loop");
}

const render = () => {
	update();
	bgDefault.draw();
	megaman.draw();
	sampleText.rotate();
	uno.rotate();

}

game.run(render,60);

//old
//$ var bob = rectMngr(x,y,width,height,color)
//$ drawNormalRect(bob);
//current
//$ game.rect(x,y,width,height,color).draw();