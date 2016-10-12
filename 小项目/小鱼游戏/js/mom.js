var momObj = function(){
	 this.x;
	 this.y;
	 this.angle;
	 // this.bigEye = new Image();
	 // this.bigBody = new Image();
	 // this.bigTail = new Image();
	 this.momTailTimer = 0;
	 this.momTailCount = 0;

	 this.momEyeTimer = 0;
	 this.momEyeCount = 0;
	 this.momInterval =1000;

	 this.momBodyCount = 0;
}
momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	// this.bigEye.src="./src/bigEye0.png";
	// this.bigBody.src="./src/bigSwim0.png";
	// this.bigTail.src="./src/bigTail0.png";

}
momObj.prototype.draw = function(){
	// 调一个函数来使鼠标有缓冲的控制大鱼
	this.x = lerpDistance(mx,this.x,0.9);
	this.y = lerpDistance(my,this.y,0.9);
	// 鼠标控制大鱼的角度
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) +Math.PI;

	this.angle = lerpAngle(beta,this.angle,0.8);

	this.momTailTimer +=deltaTime;
	if (this.momTailTimer>80) {
		this.momTailCount = (this.momTailCount+1)%8;
		this.momTailTimer%80;
	};

	this.momEyeTimer  += deltaTime;

	if (this.momEyeTimer>this.momInterval) {
		this.momEyeCount = (this.momEyeCount+1)%2;
		this.momEyeTimer %=this.momInterval;
		if (this.momEyeCount == 0) {
			this.momInterval = Math.random()*1500+2000;//随机时间睁开眼镜
		}else {
			this.momInterval = 200;
		}
	};

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width* 0.5+30,-momTail[momTailCount].height* 0.5);
	var momBodyCount  = this.momBodyCount
	if (data.double ==1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width* 0.5,-momBodyOra[momBodyCount].height* 0.5);
	} else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width* 0.5,-momBodyBlue[momBodyCount].height* 0.5);
	}
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width* 0.5,-momEye[momEyeCount].height* 0.5);
	ctx1.restore();
}