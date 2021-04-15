/*
	Danielle Krishna

	Yahtzee Lite Program
	Allow player to roll 5 dice 3 times to get a large straight, which is
	1,2,3,4,5 or 2,3,4,5,6 
	Before each roll, the player can keep some die and roll only the rest.
*/
		
// variables used in program
 var numberDice = 5;
 var win = 0;
 var keeper = new Array(numberDice);
 var dieValue = new Array(numberDice);
 
 
 // current number of rolls by player
 var rollNumber = 0;
 
 
// variables used to refer to page elements
 var dieImages = new Array(numberDice);    // roll die img  
 var messages;                             // "messages" paragraph
 var gameOverMessage;                      // "gameOverMessage" paragraph
 var playButton;                           // Play button
 var rollButton;                           // Roll button
 var diceRollingAudio 					   // audio clip for dice
 
 
 // starts a new game when click Play
 function startGame() 
 {
	 console.log("Entered startGame()");
	 
	 rollButton.disabled = false;
	 playButton.disabled = true;
     rollButton.addEventListener( "click", rollDice, false );
	 
	 //reset vars
	 numberDice = 5;
	 win = 0;
	 rollNumber = 0;
	 
	 for ( var i = 0; i < numberDice; ++i ) 
	{ 
		keeper[i] = document.getElementById( "keeper" + (i + 1));
		keeper[i].disabled = false;
		console.log("keepers enabled");
		keeper[i].value = "keep?";
		keeper[i].addEventListener( "click", updateKeeper);	 
	}
	 
	 document.getElementById("gameOverMessage").innerHTML =  "";
	 document.getElementById("messages").innerHTML = "Click roll to roll the dice!";
	 
     die1Image = document.getElementById( "die1" ).src = "die1.png";
     die2Image = document.getElementById( "die2" ).src = "die2.png";
     die3Image = document.getElementById( "die3" ).src = "die3.png";
     die4Image = document.getElementById( "die4" ).src = "die4.png";
	 die5Image = document.getElementById("die5").src = "die6.png";
 } 


 // roll the dice
 // this is called by startGame and it is the Roll event listener
 function rollDice() 
 {
	console.log("rollDice: entered");

	for (var i = 0; i < numberDice; i++)
	{
		if (keeper[i].disabled == false)
		{
			dieValue[i] = Math.floor(1 + Math.random() * 6);
			setImage(dieImages[i], dieValue[i]);
		}
	}
	
	console.log("rollDice: play audio");
	diceRollingAudio.play(); 
	
	rollNumber++;
	document.getElementById("messages").innerHTML = "You have " +  (3 - rollNumber) + " more rolls!";
	
	if (rollNumber >= 3)
	{
		document.getElementById("messages").innerHTML = "";
		checkLargeStraight();
	}
	
 } 
 
 // check for a large straight
 // 1,2,3,4,5  and ss2 to 2,3,4,5,6
 // Use sort array method 
 // Tip: don't rearrange the dice!
 
function checkLargeStraight() 
{
	console.log("checkLargeStraight: entered");
	
	var clone = dieValue.slice(0);
	clone.sort( compareIntegers );
	
	var ls1 = [1, 2, 3, 4, 5];
	var ls2 = [2, 3, 4, 5, 6];
	
	var win1 = 1;
	var win2 = 1;
	
	for (var i = 0; i < numberDice; i++)
	{
		if (clone[i] != ls1[i])
		{
			win1 = 0;
		}
		
		if (clone[i] != ls2[i])
		{
			win2 = 0;
		}
	}
	
	if (win1 == 1 || win2 == 1)
	{
		win = 1;
	}
	
	gameOver();
}

// send game over message using a special font and/or color
// reset the Play and Roll buttons
// (no need to reset the keepers; player might want to see current state)
function gameOver() 
{
	console.log("gameOver: entered");
	 
	 playButton.disabled = false;
	 rollButton.disabled = true;
	 for ( var i = 0; i < numberDice; ++i ) 
	{ 
		keeper[i] = document.getElementById( "keeper" + (i + 1));
		keeper[i].disabled = true;	 
	}
	 
	 document.getElementById("gameOverMessage").innerHTML =  "Game Over!";
	 
	 if (win == 1)
	 {
		 document.getElementById("messages").innerHTML =  "Congratulations! You won!";
	 }
	 
	 else
	 {
		 document.getElementById("messages").innerHTML = "Sorry, better luck next time!";
	 } 
}
 
 
 // comparison function for use with sort
function compareIntegers( value1, value2 )        
{                                                 
   return parseInt( value1 ) - parseInt( value2 );
}    


 // display rolled dice
 function showDice()
 {
	 console.log("showDice: entered");
	 for ( var i = 0; i < numberDice; ++i ) {
		setImage( dieImages[ i ], dieValue[ i ] ); 
	}
 } 


 // set image source for a die
 function setImage( dieImages, dieValue ) 
 {
	if ( isFinite( dieValue ) )
	   dieImages.src = "die" + dieValue + ".png";
	else
	   dieImages.src = "blank.png";
 } 

 
 // Update keeper buttons
 function updateKeeper()
 {
	 console.log("updateKeeper: disabled? =",this.disabled);
	 if(rollNumber >= 1) 
	 {
		this.disabled = true;
		this.value = "keeper";
	 };
}

// Reset keeper buttons when a new game is started
 
 // ================================ 
 // load event handler
 // get page elements to interact with and register event listeners
 function start()
 {
	 console.log("start: entered");
	
	// page elements and event listeners associated with them
	playButton = document.getElementById( "playButton" );
	playButton.addEventListener( "click", startGame, false );
	
	rollButton = document.getElementById( "rollButton" );
	rollButton.addEventListener( "click", rollDice, false );
	
	diceRollingAudio = document.getElementById( "diceRollingAudio" );
	// once audio ended, show dice
	diceRollingAudio.addEventListener( "ended", showDice, false );
	
	messages = document.getElementById( "messages" ); 
	gameOverMessage = document.getElementById( "gameOverMessage");
	 
	for ( var i = 0; i < numberDice; ++i ) 
	{
      dieImages[ i ] = document.getElementById( "die" + (i + 1) );
    };
	
	// prepare the GUI
	rollButton.disabled = true; // disable rollButton
	playButton.disabled = false;  // enable play button
	
	// set image to blank before games start
	for ( var i = 0; i < numberDice; ++i ) 
	{
		setImage( dieImages[ i ] ); 
	};
	 
	 // extract page element for keeper buttons
	 // identify event handler
	 // set disabled flag to roll all dice
	   
	for ( var i = 0; i < numberDice; ++i ) 
	{ 
		keeper[i] = document.getElementById( "keeper" + (i + 1));
		keeper[i].disabled = false;
		keeper[i].value = "keep?";
		keeper[i].addEventListener( "click", updateKeeper);	 
	}
 } 
	window.addEventListener( "load", start, false );
      

 