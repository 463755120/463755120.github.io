var babyObj = function(){
	 this.x;
	 this.y;
	 this.angle;
	 // this.babyEye = new Image();
	 // this.babyBody = new Image();
	 // this.babyTail = new Image();
	 this.babyTailTimer = 0;
	 this.babyTailCount = 0;

	 this.babyEyeTimer = 0;
	 this.babyEyeCount = 0;
	 this.babyInterval =1000;

	 this.babyBodyTimer = 0;
	 this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth*0.5-50;
	this.y = canHeight*0.5+50;
	this.angle = 0;
	// this.babyEye.src="./src/babyEye0.png";
	// this.babyBody.src="./src/babyFade0.png";
	// this.babyTail.src="./src/babyTail0.png";

}
babyObj.prototype.draw = function(){
	// 调一个函数来使鼠标有缓冲的控制小鱼
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98);
	// 大鱼控制小鱼的角度
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) +Math.PI;

	this.angle = lerpAngle(beta,this.angle,0.8)
	//尾巴摇摆计数
	this.babyTailTimer +=deltaTime;
	if (this.babyTailTimer>50) {
		this.babyTailCount = (this.babyTailCount+1)%8;
		this.babyTailTimer %=50;
	};
// 小鱼眨眼睛
	this.babyEyeTimer +=deltaTime;
	if (this.babyEyeTimer>this.babyInterval) {
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %=this.babyInterval;
		if (this.babyEyeCount == 0) {
			this.babyInterval = Math.random()*1500+2000;//随机时间睁开眼镜
		}else {
			this.babyInterval = 200;
		}
	};
	// 身体变白
	this.babyBodyTimer +=deltaTime;
	if (this.babyBodyTimer>300) {
		this.babyBodyCount = this.babyBodyCount+1;
		this.babyBodyTimer %=300;
		if (this.babyBodyCount>19) {
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}; 
	};

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle)
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width* 0.5+23,-babyTail[babyTailCount].height* 0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width* 0.5,-babyBody[babyBodyCount].height* 0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width* 0.5,-babyEye[babyEyeCount].height* 0.5)
	ctx1.restore();
}