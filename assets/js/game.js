$(document).ready(function() {

  const numbersCardsArray = ['n01', 'n02', 'n03', 'n04', 'n05', 'n06', 'n07', 'n08', 'n09', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17', 'n18', 'n19', 'n20', 'n21', 'n22', 'n23', 'n24', 'n25', 'n26', 'n27', 'n28', 'n29', 'n30', 'n31', 'n32'];
  const lettersCardsArray = ['l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07', 'l08', 'l09', 'l10', 'l11', 'l12', 'l13', 'l14', 'l15', 'l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l22', 'l23', 'l24', 'l25', 'l26', 'l27', 'l28', 'l29', 'l30', 'l31', 'l32'];
  const picturesCardsArray = ['p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'p31', 'p32'];
  
  let displayCardsArray = [];
  let activeCardsArray = lettersCardsArray;

  // theme color changing
  $('#theme-light').click(function () {
    $('#content-wrapper').addClass('content-wrapper-light').removeClass('content-wrapper-dark');
 });

 $('#theme-dark').click(function () {
  $('#content-wrapper').addClass(' content-wrapper-dark').removeClass('content-wrapper-light');
});

  // difficulty level selection buttons
  $('#level-easy').click(function () {
     clearGrid();
     createDashboardEasy();
     displayCardsArrayEasy = createCardsDeck(activeCardsArray, 16)
     displayShuffledCards(displayCardsArrayEasy);
     $('.card-hard').hide();
     $('.card-medium').hide();
     $('.card-easy').show();
  });
 
    $('#level-medium').click(function () {
    clearGrid();
    createDashboardMedium();
    displayCardsArrayMedium = createCardsDeck(activeCardsArray, 32)
    displayShuffledCards(displayCardsArrayHard);
    $('.card-easy').hide();
    $('.card-hard').hide();
    $('.card-medium').show();
  });
   
  $('#level-hard').click(function () {
    clearGrid();
    createDashboardHard();
    displayCardsArrayHard = createCardsDeck(activeCardsArray, 64)
    displayShuffledCards(displayCardsArrayHard);
    $('.card-easy').hide();
    $('.card-medium').hide();
    $('.card-hard').show();
  });
  
  // functions that builds a grid for level easy
  function createDashboardEasy() {
  let dashboardEasy = $("<div class='card-count card-easy'><div id='force-flip' class='flip-card-inner'><div class='flip-card-front game-card face-down'></div><div class='flip-card-back game-card face-up'></div></div></div>");
  for (let x = 0; x < 16; x++) {
     dashboardEasy.clone().appendTo('#game');
  }
  }
  
  // functions that builds a grid for level medium
  function createDashboardMedium() {
  let dashboardMedium = $("<div class='card-count card-medium'><div id='force-flip' class='flip-card-inner'><div class='flip-card-front game-card face-down'></div><div class='flip-card-back game-card face-up'></div></div></div>");
  for (let x = 0; x < 32; x++) {
    dashboardMedium.clone().appendTo('#game');
  }
  }
  
  // functions that builds a grid for level hard
  function createDashboardHard() {
  let dashboardHard = $("<div class='card-count card-hard'><div id='force-flip' class='flip-card-inner'><div class='flip-card-front game-card face-down'></div><div class='flip-card-back game-card face-up'></div></div></div>");
  for (let x = 0; x < 64; x++) {
    dashboardHard.clone().appendTo('#game');
  }
  }

  // deck selection button
  $('#pictures-deck').click(function() {
    deckCards(picturesCardsArray);
    resetGame() 
  });

  $('#letters-deck').click(function() {
    deckCards(lettersCardsArray);
    resetGame() 
  });

  $('#numbers-deck').click(function() {
    deckCards(numbersCardsArray);
    resetGame() 
  });

  function deckCards(arr) {
    activeCardsArray = arr;
    resetGame();
  }

  // below code copied (and modified) from:
  // https://github.com/AJGreaves/picflip/blob/master/assets/js/game.js
  function resetGame() {
    let num = howManyCards();
    let cards = createCardsDeck(activeCardsArray, num);
    setTimeout(function() {
      displayShuffledCards(cards);
    }, 100);
  }
  
  // display, create, shuffle cards deck for different levels
  function displayShuffledCards(cards) {
    $('.flip-card-front').each(function(i) {
      let lastClass = $(this).attr('class').split(' ').pop();
      if (lastClass == 'game-card') {
          $(this).addClass('game-card').addClass(cards[i]);
      }
      else {
          $(this).removeClass(lastClass).addClass(cards[i]);
      }
  
    });
  }
  
  function createCardsDeck(arr, num) {
    let cutArray = cutDeck(arr, num);
    let doubleCardsArray = duplicateCards(cutArray);
    let shuffledCardsArray = [];
  
  // shuffling cards
    for (let i = 0; i < num* 2; i++) {
        let randIndex = Math.floor(Math.random() * doubleCardsArray.length);
        let rand = doubleCardsArray[randIndex];
        doubleCardsArray.splice(randIndex, 1);
        shuffledCardsArray.push(rand);
    }
    return shuffledCardsArray;
  }
  
  function howManyCards() {
    let num = $('.card-count').length;
    let halfNum = (num / 2);
    return halfNum;
  }
  
  // cuts the deck for different difficulty levels
  function cutDeck(cards, num) {
    let cutCards = cards.slice(0, num);
    return cutCards;
  }
  
  // returns an array with element elem repeated twice
  function duplicateCards(elem) {
    let doubledCards = [];
    for (let i = 0; i < 2; i++) {
        doubledCards = doubledCards.concat(elem);
    }
    return doubledCards;
  }
  // End of copied code

// clear grid - prevents double grids
function clearGrid(){
  $(".card-medium, .card-hard, .card-easy").remove();
};

//FLIPPING CARDS NOT WORKING ** to be solved
$('#force-flip').click(function() {
  if ($(this).hasClass('face-down')) {
      $(this).addClass('is-flipped face-up').removeClass('face-down');
  } console.log('flip');
});

// $('#force-flip').click(function(){
//   $(this).toggleClass('.is-flipped');
//   console.log('should flip cards');
// });

// first page load
createDashboardMedium();
displayCardsArrayMedium = createCardsDeck(activeCardsArray, 32)
displayShuffledCards(displayCardsArrayMedium);

}); 