//jsgfl V2.0
//required to run any canvas function
//use canvas Id
class CanvasGame{

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
	textString(string, font, x, y){
		const string_ = {
			string: string,
			font: font,
			x: x,
			y: y,
			color: "black",
			visible: true,
			deg: 0,
			draw: () => {
				this.ctx.fillStyle = string_.color;
				this.ctx.font = string_.font;
				this.ctx.fillText(string_.string,string_.x,string_.y);
			},
			rotate: () => {
				this.rotateFunction(string_);
			}
		};
		string_.width = this.textSize(string_.string, string_.font).width;
		string_.height = this.textSize(string_.string, string_.font).width;
		return string_;
	}
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
			length: Math.floor(Math.sqrt(Math.pow(line_.xDelta,2) + Math.pow(line_.yDelta,2))),
			color: "black",
			thickness: 1,
			points: () => {
				const points_ = {
					x: [],
					y: []
				};
				for(let i = 0; i < line_.length; i++){
					points_.x[i] = (line_.xi + (line_.xDelta / line_.length * i));
					points_.y[i] = (line_.yi + (line_.yDelta / line_.length * i));
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
			deg: 0,
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
			rotate: () => {
				this.rotateFunction(rect_)
			}
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
			deg: 0,
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
			},
			rotate: () => {
				this.rotateFunction(image_);
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
			deg: 0,
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
			//assigns new spritesheet start
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
			rotate: () => {
				this.rotateFunction(animation_);
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


	//more than just drawing/////////////////////////////////////////////
	/*VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
	//more than just drawing/////////////////////////////////////////////
	vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*/
	//more than just drawing/////////////////////////////////////////////
	rotateFunction(object){
		//make it dry
		let rad = object.deg * Math.PI / 180;
		//gets center point of object
		const cx = object.x + object.width / 2;
		const cy = object.y + object.height / 2;

		//holds the original x,y for reference
		const tempX = object.x;
		const tempY = object.y;

		//pulls center of object to the top left of canvas
		object.x = -object.width/2;
		object.y = -object.height/2;

		//save current canvas state to restore later
		this.ctx.save()

		//places center of rotation over center of object
		this.ctx.translate(cx,cy);

		this.ctx.rotate(rad);

		//draw before restoring
		object.draw(object);

		//move canvas center back to normal and restore
		this.ctx.translate(-cx,-cy);
		this.ctx.restore();

		//move object back to original location
		if(object.x != tempX){
			object.x = tempX;
		}
		if(object.y != tempY){
			object.y = tempY;
		}
	}
	//collision checking
	collisionCheck(r1, r2){
		//checks if any corners of rect1 are in or touching rect2
		if(r1.x + r1.width >= r2.x && r1.x <= r2.x + r2.width &&
	        r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y){
	        return true;
	    }
	    else{
	        return false;
	    }
	}
	collisionUp(r1, r2){
		if(r1.y <= r2.y + r2.height && r1.y > r2.y + r2.height / 4 * 3){
            return true;
        }else{
            return false;
        }
	}
	collisionDown(r1, r2){
		if(r1.y + r1.height >= r2.y && r1.y + r1.height <= r2.y + r2.height / 4){
            return true;
        }else{
            return false;
        }
	}
	collisionLeft(r1, r2){
		if(r1.x <= r2.x + r2.width && r1.x >= r2.x + r2.height / 4 * 3){
            return true;
        }else{
            return false;
        }
	}
	collisionRight(r1, r2){
		if(r1.x + r1.width >= r2.x && r1.x + r1.width <= r2.x + r2.width / 4){
            return true;
        }else{
            false;
        }
	}
	collisionDiagnol(line, rect){
		//will need to look for more efficient checking method
		const pointChecker = this.point(line.points().x[0], line.points().y[0]);
		for(var i = 0; i < line.length; i++){
			pointChecker.x = line.points().x[i];
			pointChecker.y = line.points().y[i];
        	collisionCheck(pointChecker,rect);
	    }
	}
	//miscellaneous 
	textSize(string, font){
		this.ctx.font = font;
		this.ctx.measureText(string).width;
		const size = {
			width: this.ctx.measureText(string).width,
			height: this.ctx.measureText(string).height
		}
		return size;
	}
}
