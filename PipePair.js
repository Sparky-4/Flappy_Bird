class PipePair{
	
	constructor(y)
	{
		this.gapHeight = canvas.height / 4;
		this.scored = false;
		
		this.x = canvas.width;
		this.y = y;
		
		this.pipes = [
			new Pipe("top", this.y),
			new Pipe("bottom", this.y + PIPE_HEIGHT + this.gapHeight)
		]
		
		this.remove = false;
		
	}
	
	update()
	{
		
		if(this.x > -PIPE_WIDTH)
		{
			this.x -= GROUND_SCROLL_SPEED;
			this.pipes[0].x = this.x;
			this.pipes[1].x = this.x;
		}
		else
			this.remove = true;
			
		
		this.render()
	}
	
	render()
	{
		this.pipes[0].render();
		this.pipes[1].render();
	}
	
}