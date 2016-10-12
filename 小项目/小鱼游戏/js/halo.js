var haloObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
};

haloObj.prototype.num = 5;

haloObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.r[i] = 0;
	}
};
haloObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 4;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="rgba(203,91,0,1)";
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += deltaTime * 0.04; 
			if (this.r[i] > 60) {
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 60;
			ctx1.beginPath();
			// debugger;
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			// console.log(this.x[i]);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";
			ctx1.stroke();
			// console.log("draw");
		}
	}
	ctx1.restore();
};

haloObj.prototype.born = function(x,y) {
	for (var i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
};