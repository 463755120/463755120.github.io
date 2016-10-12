var dustObj = function(){
	this.x = [];
	this.y = [];
	this.alpha ;
	this.amp = [];//摇摆幅度;
	this.No = [];//随机生成背景漂浮物
}
dustObj.prototype.num = 30;
dustObj.prototype.init =function(){
	for (var i = 0; i <this.num; i++) {
		this.x[i] = Math.random()*canWidth;
		this.y[i] = Math.random()*canHeight;
		this.No[i] = Math.floor(Math.random() * 7);
		this.amp[i] = 25 + Math.random() * 15;
	};
	this.alpha = 0;
}
dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008; 
	var l = Math.sin(this.alpha);//[-1,1];
	for (var i = 0; i < this.num; i++) {
		var no = this.No[i];
		ctx1.drawImage(dustPic[no],this.x[i] + this.amp[i] * l,this.y[i]);
	};
}