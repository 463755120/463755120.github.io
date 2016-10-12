var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];//速度
	this.spd = [];
	this.fruitType = [];//种子的种类
	this.orange = new Image();
	this.blue = new Image();
	this.ameNo = [];

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		//把所有的食物初始成死的
		//日!!!记得加[i]啊!!,被坑了两次了
		this.alive[i] = false;
		this.x[i] = [0];
		this.y[i] = [0];
		this.l[i] = [0];
		this.fruitType[i] = "";
		this.spd[i] = Math.random()*0.017+0.003//随机种子的速度
	};
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			if(this.fruitType[i] == "blue") {

				var pic = this.blue;
			} else{
				var pic = this.orange;
			}

			if (this.l[i]<=14) {
				this.l[i] += this.spd[i]*deltaTime
				var No = this.ameNo[i];
				this.x[i] = ane.headx[No];
				this.y[i] = ane.heady[No];
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			} else{
				this.y[i] -=this.spd[i]*5*deltaTime
			}
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

			if (this.y[i]<10) {
				this.alive[i] = false
			};
		};

	};
}
fruitObj.prototype.born = function(i){
	//随机决定在哪一个海葵上长出食物
	this.ameNo[i] = Math.floor(Math.random()*ane.num);
	 this.l[i] = 0;
	 this.alive[i]= true;
	 var ran = Math.random();
	 if(ran<0.3){
	 	this.fruitType[i] = "blue";
	 } else{
	 	this.fruitType[i] = "orange";
	 }

}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

//监视种子的数量并且决定种子是否出生
function fruitMonitor(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num++

		};
	};

	if (num<15) {
		sendFruit()
		return;
	};
}
function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i)
			return;
		};
	};
}