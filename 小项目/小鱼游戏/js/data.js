var dataObj = function (){
	this.fruit = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;
	ctx1.fillStyle = "white";
	ctx1.font = "30px Verdana";
	ctx1.textAlign ="center";
	ctx1.fillText("SCORE "+this.score,w*0.5,h-20);
	if (this.gameOver) {
		this.alpha += deltaTime*0.0005;
		if (this.alpha >1) {
			this.alpha = 1;
		};
		ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("肉肉你好灰",w*0.5,h*0.5);
	};

}
dataObj.prototype.addScore = function(){
	this.score += this.fruit*10*this.double;
	this.fruit = 0;
	this.double = 1;
}

