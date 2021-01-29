class Bird{
	
	constructor()
	{
		this.yVel = 0;
		this.isAlive = true;
		
		this.width = canvas.height / 30 * 2.8;
		this.height = canvas.height / 30 * 1.98;
		
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height/4 + this.height/2;
		
		this.img = new Image();
		this.img.src = "Images/bird.png";
		
		this.onGround = false;
	}
	
	drawRotated(degreesIn)
	{
		let degrees = 0;
		
		if(degreesIn < -25)
			degrees = -25;
		else if(degreesIn > 90 && (!qinv || !inv))
			degrees = 90;
		else
			degrees = degreesIn;
		
		ctx.save();
		ctx.translate(canvas.width / 2, this.y + this.height / 2);
		ctx.rotate(degrees*Math.PI/180);
		ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
		ctx.restore();
	}
	
	collides(pipe)
	{	
		if(this.x + this.width < pipe.x || this.x > pipe.x + PIPE_WIDTH 
		|| this.y + this.height < pipe.y || this.y > pipe.y + PIPE_HEIGHT)
			return false;
		else
			return true;
	}
	
	end()
	{
		if(!inv || !qinv)
		{
			this.onGround = true;
			hit.play();
			music.pause();
			this.y = groundY - this.height;
			this.isAlive = false;
			stateMachine.current = "score";
			scrolling = false;
			gravity = 0;
		}
		
	}

	update()
	{
		if(!this.onGround)
		{
			this.yVel += gravity;
			this.y += this.yVel;
		}
	
		if(this.y + this.height > groundY)
		{
			this.y = groundY - this.height;	
			this.end();
		}
		
		if(this.y < 0)
			this.y = 0;
		
		// if(this.yVel < 0)
			// this.img.src = "Images/birdUp.png";
		// else
			// this.img.src = "Images/bird.png";
		
		this.drawRotated(this.yVel * 7 - 80);
		
		//ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		
	}
}