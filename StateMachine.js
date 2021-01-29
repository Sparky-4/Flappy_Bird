class StateMachine{

	constructor()
	{	
		this.current = "title";
		this.i = 0;
		this.j = 0;
		
	}
	
	change()
	{
		if(this.current == "title")
		{
			this.current = "play";
			bird.yVel = -Math.floor(canvas.width/120);
		}
			
		else if(this.current == "score")
		{
			location.reload();
		}
			
	}
	
	update()
	{
		if(this.current == "title")
		{
			ctx.drawImage(background, -backgroundScroll, -canvas.height / 15, background.width, background.height)
			ctx.drawImage(foreground, -groundScroll, groundY);
			
			ctx.font = "70px Electrolize";
			ctx.fillStyle = "white";	
			let str = "Flappy Bird";
			ctx.fillText(str, canvas.width / 2 - (str.length/2 * 35), canvas.height/4);
			
			ctx.font = "30px Electrolize";
			ctx.fillStyle = "white";	
			let a = "Press Enter";
			ctx.fillText(a, canvas.width / 2 - (str.length/2 * 15), canvas.height/4 + bird.height*2);
			
			ctx.drawImage(bird.img, canvas.width / 2 - bird.width/2, canvas.height/4 + bird.height/2, bird.width, bird.height);
		}
		
		else if(this.current == "play")
		{
			if(bird.isAlive)
			{
				ctx.drawImage(background, -backgroundScroll, -canvas.height / 15, background.width, background.height);
				
				spawnTimer++;	
				if(spawnTimer > 100)
				{
					let y = -PIPE_HEIGHT + Math.floor(Math.random() * (canvas.height/3) + (canvas.height/5));
					pipeList.push(new PipePair(y));
					spawnTimer = 0;			
				}
				
				for(this.i = 0; this.i < pipeList.length; this.i++)
				{
					pipeList[this.i].update();
					
					if(!pipeList[this.i].scored)
					{
						if(pipeList[this.i].x + PIPE_WIDTH < bird.x && !inv && scoreEnabled)
						{
							pipeList[this.i].scored = true;
							score++;
							point.play();
						}	
					}					
						
					for(this.j = 0; this.j < pipeList[this.i].pipes.length; this.j++)
					{
						
						if(bird.collides(pipeList[this.i].pipes[this.j]) && (!inv || !qinv))
						{
							this.current = "score";
							scrolling = false;
							bird.isAlive = false;
							hit.load();
							hit.play();
							music.pause();
						}
					
					}	
							
				}
				
				ctx.drawImage(foreground, -groundScroll, groundY);
				bird.update();
				ctx.font = "20px Electrolize";
				ctx.fillStyle = "white";	
				let str = "Score: " + score;
				ctx.fillText(str, 50, 50);
				
			}
			
		}
		
		else if(this.current == "score")
		{
			ctx.drawImage(background, -backgroundScroll, -canvas.height / 15, background.width, background.height);
			for(this.i = 0; this.i < pipeList.length; this.i++)
				pipeList[this.i].render();	
			ctx.drawImage(foreground, -groundScroll, groundY);
			
			if(score > highScore)
			{
				highScore = score;
				localStorage.setItem("highScoreFlappy", score);
			}
			
			ctx.font = "70px Electrolize";
			ctx.fillStyle = "white";
			let str = "Score: " + score;
			ctx.fillText(str, canvas.width / 2 - (str.length/2 * 35), canvas.height/4);
			
			let a = "High Score: " + highScore;
			ctx.fillText(a, canvas.width / 2 - (a.length/2 * 35), canvas.height/3);
		
			bird.update();
		}
	}
	
	
}



