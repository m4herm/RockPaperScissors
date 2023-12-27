let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0};
      /*ocalStorage.removeItem('score');
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      }
      */

 
     updateScoreElement();

     let isAutoPlaying = false; // Check if it's played or not
     let intervalId; // Get the setInterval Id to stop the autoplay

      //const autoPlay = () => {}

      // prefer regular function because of two reasons:
      // 1: In this case the regular function is a littl easier to read
      // 2: Hoisting: the regular function enables hoisting which
      // might need to call the function above so that 
      // we don't need to worry about the order of calling
      // the function.


      let getElementId = document.querySelector('.auto-play-button-js');
      
      function autoPlay() {
        if(!isAutoPlaying) {
          intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId); // clearInterval uses to stop setInterval by geting it's Id
          isAutoPlaying = false;
        }

        if(getElementId.innerHTML === 'Auto Play')
          getElementId.innerHTML = `Stop Play`;
        else
          getElementId.innerHTML = `Auto Play`;
      }

      document.querySelector('.rock-button-js')
        .addEventListener('click', () => {
          playGame('rock');
        });

      document.querySelector('.paper-button-js')
        .addEventListener('click', () => {
          playGame('paper');
        });

        document.querySelector('.scissor-button-js')
        .addEventListener('click', () => {
          playGame('scissor');
        });

        document.querySelector('.reset-button-js')
          .addEventListener('click', () => {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
          });

          getElementId.addEventListener('click', () => {
            autoPlay();
          });

          document.body.addEventListener('keydown', event => {
           if(event.key === 'r') {
            playGame('rock');
           } else if(event.key === 'p') {
            playGame('paper');
           } else if(event.key === 's'){
            playGame('scissor');
           }
          });
      function playGame(playerMove) {
        const computerMove = pickComputerMove();
        let result = '';

        if( playerMove === 'scissor') {
          if(computerMove === 'rock') {
            result = 'You lost.';
          } else if(computerMove === 'paper') {
            result = 'You won.';
          } else if ( computerMove === 'scissor') {
            result = 'Tie.';
          }
          
        } else if(playerMove  === 'paper') {
          if(computerMove === 'rock') {
            result = 'You won.';
          } else if(computerMove === 'paper') {
            result = 'Tie.';
          } else if ( computerMove === 'scissor') {
            result = 'You lost.';
          }
          
        } else if(playerMove === 'rock') {
          if(computerMove === 'rock') {
            result = 'Tie.';
          } else if(computerMove === 'paper') {
            result = 'You lost.';
          } else if ( computerMove === 'scissor') {
            result = 'You won.';
          }
        }

        if ( result === 'You won.') {
          score.wins += 1;
        } else if(result === 'You lost.') {
          score.losses += 1;
        } else {
          score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-moves').innerHTML =   
      `
      You 
      <img src="emojis/${playerMove}.png" 
      class="image-result">
      <img src="emojis/${computerMove}.png " 
      class="image-result">
      Computer `;

      }

       function pickComputerMove() {

          let computerMove = '';

          const randomNumber3 = Math.random();
          
          if( randomNumber3 >= 0 && randomNumber3 < 1/3) 
            computerMove = 'rock';
          
          else if(randomNumber3 >= 1/3 && randomNumber3 < 2/3)
          computerMove = 'paper';

          else if(randomNumber3 >= 2/3 && randomNumber3 < 1)
            computerMove = 'scissor';

            return computerMove;
       }

       function updateScoreElement() {

        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},
          Ties: ${score.ties}`;
       };