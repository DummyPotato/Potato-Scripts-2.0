javascript:

/* Gives the info of a player, that doesn't include their login info or anything sensitive */

/* There is no point of encoding this, the code is 2 lines long lmao*/

var whatPlayer = prompt('What is the name of the player you want to get the info of?');
var doUrl = window.open('https://api.blooket.com/api/users?name=' + whatPlayer);
