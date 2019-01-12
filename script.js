/*

Design Patter in JS

1. Module Design Pattern.
We can add bunch of different properties into objects. 

So we do not have any variable like the ones below floating around that
are not inside of an object.

We dont have any functions that are just on their own like this, as below, on
the window object. Rather we add them to our own object.

eg.

var game = {};

game.init = function(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

*/

var numberofSquares = 6;
var colors = new Array();
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

/* This is what to do to start when page loads/reloads. */
init();

function init() {

    setUpModeButtons();

    setUpSquares();

    reset();
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numberofSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {

        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
}

function setUpModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {

        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            // Terniary Operators for if else statement. Good for one statements

            this.textContent === "Easy" ? numberofSquares = 3 : numberofSquares = 6;

            reset();
        });
    }
}

function setUpSquares() {
    /***************************************************************
     * Select each square, fill a background color from colors array.
     * Create Click Event Listener function for every square
     * When or if clicked on any color, check for win or lose
     ***************************************************************/
    for (var i = 0; i < squares.length; i++) {
        //add quick listeners to squares
        squares[i].addEventListener("click", function () {

            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;

            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}



/**********************************
 * New Color Button
 **********************************/
resetButton.addEventListener("click", function () {
    reset();
});

/******************************************************
 * Push Random Colors inside each Object of array colors 
 *******************************************************/
function generateRandomColors(num) {
    //make an array
    var arr = [];

    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }

    //return that array
    return arr;
};

/******************************
 * Generate Random r,g,b Colors
 *******************************/
function randomColor() {
    //pick a "red" from 0 to 255
    var r = Math.floor(Math.random() * 256);
    //pick a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
};

function changeColors(color) {
    //loop through all the squares
    for (var i = 0; i < squares.length; i++) {

        //change each color to match given color
        squares[i].style.backgroundColor = color;
    };
};

function pickColor() {
    //Math.floor chops off any digits after the decimal
    //Math.random gives random number between 0 and 1 without including them

    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

/************* UNUSED CODE AFTER REFACTORING ********************/

/*
easyButton.addEventListener("click", function(){
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    numberofSquares = 3;

    colors = generateRandomColors(numberofSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    //If there is a color in that square number, then insert the rgb from the indexed array.
    for (var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

});

hardButton.addEventListener("click", function(){
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    numberofSquares = 6;

    colors = generateRandomColors(numberofSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }

});
*/