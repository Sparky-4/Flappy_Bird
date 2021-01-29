class Pipe{
	
	constructor(orientation, y)
	{
		this.x = canvas.width;
		this.y = y;
		
		this.width = PIPE_WIDTH;
		this.height = PIPE_HEIGHT;
		
		this.img = new Image();
		if(orientation == "top")
			this.img.src = "Images/topPipe.png";
		else 
			this.img.src = "Images/pipe.png";
		
	}
	
	render()
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
	
}