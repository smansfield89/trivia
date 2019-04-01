//

var qCounter = 0; //Tracks question number
var choice = []; //array of player's choices
var trivia = $('#trivia'); //Quiz div object



// question set 

(function() {

    var questions = [{
        
    question: "What did Michael Scott purchase when he finally broke down?",
    choices: ["a 'the works' pretzel","a plasma screen tv","a sari", "a new sebring"],
    correctAnswer: 1
    }, {
    question: "You jump to the right and you shake a hand, then you jump to the left and you shake their hand. You meet new friends and you tie some yarn. And that's how you do the ________ ?",
    choices: ["javascript", "thang", "scarn", "dunder shuffle"],
    correctAnswer: 2
    }, {
    question: "Michael's replacement when he moves to Colorado is a fan of the American Southwest named _______ ?",
    choices: ["de'angelo vickers", "todd packer", "'craigers'", "josh", "david wallace"],
    correctAnswer: 0
    }, {
    question: "His name's Darryl Philbin, but Michael has managed to change his name from Regis, to Reeg, to Roger, then ________ ",
    choices: ["Millionaire", "the baler", "Foreman Philbin", "Mittah Rogers"],
    correctAnswer: 3
    },{
    question: "In S3E9, The Convict, which of these things does Prison Mike NOT claim to have been busted for?",
    choices: ["I stole", "I robbed","I killed Dumbledore", "I kidnapped the President's son"],
    correctAnswer: 2
    },{
    question: "Scranton lives in mortal fear of him until Toby goes to jury duty",
    choices: ["the pennsylvania punisher", "the hash slinging slasher", "the scranton strangler", "maxwell and his silver hammer"],
    correctAnswer: 2
    },{
    question: "Who is pepperoni Tony?",
    choices: ["Dwight's recommendation for Michael to fire", "a medium amount of a good pizza", "an all you can eat a pretty good pizza", "Kevin Malone's family recipe"],
    correctAnswer: 0
    },{
    question: "He's got a kanga hat and a catch phrase",
    choices: ["date mike, nice to meet me", "mikey love, welcome to funder mifflin","agent michael scarn"],
    correctAnswer: 0
    },{
    question: "Jan's baby was born a girl, named Astrid. If born a boy, what was Michael's choice of name for the newborn?",
    choices: ["Michael", "Chevy", "Mifflin", "Robert California"],
    correctAnswer: 3
    },{
    question: "According to Michael, Webster's dictionary defines wedding as:",
    choices: ["eternal love", "phyllis and Bob Vance, Vance Refrigeration", "The fusing of two metals with a hot torch", "Serentiy by Jan"],
    correctAnswer: 3
    },{
    question: "only one of the following is a true name for one of the 'five families'",
    choices: ["bob vance, vance insulation", "Michael scott, michael scott paper company", "bill cress, cress tool and dye", "WB Faust, disaster kits ltd."],
    correctAnswer: 3
    },{
    question: "In 'The Client,' where do Jan and Michael take Christian, the Lackawanna County rep in order to win his business?",
    choices: ["applebees", "olive garden", "poor richards", "chili's"],
    correctAnswer: 3
    }];
   
    
    

    
    // show the starting question..
    displayNext();
    
    //next button handler
    $('#next').on('click', function (e) {
      e.preventDefault();
      
    // previous button
    $('#prev').on('click', function (e) {
        e.preventDefault();
        
        if(trivia.is(':animated')) {
          return false;
        }
        choose();
        qCounter--;
        displayNext();
      });
      
      // restart button
      $('#start').on('click', function (e) {
        e.preventDefault();
        
        if(trivia.is(':animated')) {
          return false;
        }
        qCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
      });
      
    // prevent user from continuing without answer

    if ( (choice[qCounter])) {
    alert("'You miss 100% of the shots you dont take - wayne gretsky' - michael scott");
    } else {
    qCounter++;
    displayNext();
    }
    });
    
    
    
    // basic button animation for hover..

    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // questions and answers divs..

    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // list of radios..
    
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // interpret users anser and push to array
    function choose() {
      choice[qCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // kicks off next requested element

    function displayNext() {
      trivia.fadeOut(function() {
        $('#question').remove();
        
        if(qCounter < questions.length){
          var nextQuestion = createQuestionElement(qCounter);
          trivia.append(nextQuestion).fadeIn();
          if (!(isNaN(choice[qCounter]))) {
            $('input[value='+selections[qCounter]+']').prop('checked', true);
          }
          
    // Controls display of 'prev' button

          if(qCounter === 1){
            $('#prev').show();
          } else if(qCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          trivia.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < choice.length; i++) {
        if (choice[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append("You answered " + numCorrect + " right but you're still not going to Paris!");
      return score;
    }
  })();

 

