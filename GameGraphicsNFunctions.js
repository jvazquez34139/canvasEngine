//jsgfl V2.0
//required to run any canvas function
//use canvas Id
class Game{

	constructor(canvas){
		this.canvas = document.getElementById(canvas);
		this.ctx = this.canvas.getContext('2d');
	}
	run(render, fps){
		setInterval(render, 1000/fps);
	}

	//basic graphics/////////////////////////////////////////////////////
	/*VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
	//basic graphics/////////////////////////////////////////////////////
	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*/
	//basic graphics/////////////////////////////////////////////////////

	point(x,y){
		const point_ = {
			x: x,
			y: y,
			width: 0,
			height: 0,
			color: "black",
			visible: true,
			draw: () => {
				this.ctx.fillStyle = point_.color;
				this.ctx.fillRect(
					point_.x,
					point_.y,
					point_.width,
					point_.height
				);
			}
		}
		return point_;

	}
	line(initX,initY,finalX,finalY){
		const line_ = {
			xi: initX,
			xf: finalX,
			yi: initY,
			yf: finalY,
			visible: true,
			xDelta: line_.xf - line_.xi,
			yDelta: line_.yf - line_.yi,
			length: Math.sqrt(Math.pow(line_.xDelta,2) + Math.pow(line_.yDelta,2)),
			color: "black",
			thickness: 1,
			points: () => {
				pointArr = [];
				for(let i = 0; i < Math.floor(line_.length); i++){
					pointArr[i] = this.point((line_.xi + (line_.xDelta / line_.length * i)),(line_.yi + (line_.yDelta / line_.length * i)))
				}
				return pointArr;
			},
			draw: () => {
				this.ctx.strokeStyle = line_.color;
				this.ctx.lineWidth = line_.thickness;
				this.ctx.beginPath();
				this.ctx.moveTo(line_.xi,line_.yi);
				this.ctx.lineTo(line_.xf,line_.yf);
				this.ctx.stroke();
			}
		}
		return line_;
	}
	rect(x,y,width,height,color){
		const rect_ = {
			x: x,
			y: y,
			width: width,
			height: height,
			color: color,
			visible: true,
			draw: () => {
				this.ctx.fillStyle = rect_.color;
				this.ctx.fillRect(
					rect_.x,
					rect_.y,
					rect_.width,
					rect_.height
				);
			},
		}
		return rect_;
	}
	circ(x,y,radius,fill,stroke,drawtype){
		const circ_ = {
			x: x,
			y: y,
			radius: radius,
			fill: fill,
			stroke: stroke,
			drawtype: drawtype,
			visible: true,
			draw: () => {
				this.ctx.fillStyle = circ_.fill;
				this.ctx.strokeStyle = circ_.stroke;
				this.ctx.beginPath();
				this.arc(
					circ_.x,
					circ_.y,
					circ_.radius,
					0,
					2 * Math.PI
				);
				if(circ_.drawtype == 1){
					this.ctx.fill();
				}else if(circ_.drawtype == 2){
					this.ctx.fill();
					this.ctx.stroke();
				}else{
					this.ctx.stroke();
				}
			}
		}
		return circ_;
	}
	image(x,y,width,height,src){
		const image_ = {
			src: src,
			x: x,
			y: y,
			width: width,
			height: height,
			visible: true,
			sprite: () => {
				const imgSprite = new Image();
				imgSprite.src = image_.src;
				return imgSprite;
			},
			draw: () => {
				this.ctx.drawImage(
					image_.sprite(),
					image_.x,
					image_.y,
					image_.width,
					image_.height
				);
			}
		}
		return image_;
	}
	spriteAnimation(x,y,width,height,sW,sH,src,totalFrames){
		const animation_ = {
			src: src,
			x: x,
			y: y,
			width: width,
			height: height,
			visible: true,
			totalFrames: totalFrames,
			//where to start on sprite sheet
			ssStartX: 0,
			ssStartY: 0,
			spriteW: sW,
			spriteH: sH,
			//gap between sprite frames in sprite sheet given as src
			frameNum: 0,
			spriteGap: 1,
			ssStart: (newX, newY) => {
				animation_.ssStartX = newX;
				animation_.ssStartY = newY;
			},
			frames: () => {
				const frames_ = [];
				for(let i = 0; i < totalFrames; i++){
					frames_[i] = {
						clipStartX: (i * animation_.spriteGap) + (i * animation_.spriteW) + animation_.ssStartX,
						clipStartY: animation_.ssStartY,
					}
				}
				return frames_;
			},
			sprite: () => {
				const imgSprite = new Image();
				imgSprite.src = animation_.src;
				return imgSprite;
			},
			draw: () => {
				this.ctx.drawImage(
					animation_.sprite(),
					animation_.frames()[animation_.frameNum].clipStartX,
					animation_.frames()[animation_.frameNum].clipStartY,
					animation_.spriteW,
					animation_.spriteH,
					animation_.x,
					animation_.y,
					animation_.width,
					animation_.height
				);
			},
			nextFrame: () => {
				animation_.frameNum++;
				if(animation_.frameNum >= totalFrames){
					animation_.frameNum = 0;
				}
			}
		}
		return animation_;
	}
}
