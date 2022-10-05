/*

Needs to be ran on api.blooket.com domain, and signed into an account on blooket for this to work

This script generates all possible 3 letter usernames using the characters that are allowed, see below:

Didn't encode this script, enjoy :)


HOW TO USE:
Set up the configurations you want to have below, and run the script.'
(I recommend using a notepad or something similar. If you don't have one, https://browserpad.org can be used in the browser if you want to use tha)

*/


/*  CONFIGURATIONS  */


var nopeLog = true; /* Log when a name is unavailable */
var yesLog = true; /* Log when a name is available */

var allowCaps = true; /* Allow capital letters */
var allowLowercase = true; /* Allow lowercase letters */
var allowNumbers = true; /* Allow numbers */
var allowSpecialCharacters = true; /* Allow special characters such as @ */
var allowSpaces = true; /* Allow spaces */


/* End of configurations list */



console.warn('MADE BY DUMMYPOTATO, DO NOT TAKE CREDIT FOR MY WORK');

var doAsk = confirm('Are the configuraions you wanted all set up? \nAnswer below \n \n OK: Yes \n Cancel: No');


var dateString = '';


var cMonth = new Date();
dateString += cMonth.getMonth() + 1;
dateString += '/';

var cDay = new Date();
dateString += cDay.getDate();
dateString += '/';

var cYear = new Date();
dateString += cYear.getFullYear();

var dateTime = ' ';

var cHours = new Date();
dateTime += cHours.getHours();

var cMins = new Date();
dateTime += ':';
if (cMins.getMinutes() < 10) {
    dateTime += '0' + cMins.getMinutes();
}
else {
    dateTime += cMins.getMinutes();
}

var cSecs = new Date();
dateTime += ':';
dateTime += cSecs.getSeconds();

var finalDate = dateString + dateTime + ' (24 Hour Clock)';

if (doAsk == true) {

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    console.log('Starting...');
    await sleep(1000);
    console.log('Started at ' + finalDate);

    function* charCombinations(chars, minLength, maxLength) {
        chars = typeof chars === 'string' ? chars : '';
        minLength = parseInt(minLength) || 0;
        maxLength = Math.max(parseInt(maxLength) || 0, minLength);

        for (i = minLength; i <= maxLength; i++) {

            word = (chars[0] || '').repeat(i);
            yield word;

            for (j = 1; j < Math.pow(chars.length, i); j++) {

                for (k = 0; k < i; k++) {

                    if (!(j % Math.pow(chars.length, k))) {

                        let charIndex = chars.indexOf(word[k]) + 1;
                        char = chars[charIndex < chars.length ? charIndex : 0];
                        word = word.substr(0, k) + char + word.substr(k + char.length);
                    }
                }

                yield word.split('').reverse().join('');
            }
        }
    }

    var namesToUse = ''; /* All available names will be in this table */
    var debugMode = false; /* For testing */
    var leftUntilKill = 100; /* For testing as well */


    var passCombo = '';
    if (allowLowercase == true) { passCombo += 'abcdefghijklmnopqrstuvwxyz' }
    if (allowNumbers == true) { passCombo += '1234567890' }
    if (allowCaps == true) { passCombo += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
    if (allowSpecialCharacters == true) { passCombo += '!@#$%^&*()_ ' }
    if (allowSpaces == true) { passCombo += ' ' }


    /* old line: let passwords = charCombinations('abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_ ', 3); */
    var passwords = charCombinations(passCombo, 3); /* characters to use, length of strings */
    var password;
    while (password = passwords.next()) {
        await sleep(5);
        if (debugMode == true) {
            leftUntilKill = leftUntilKill - 1;
            if (leftUntilKill == 0) {
                break;
            }
        }
        fetch('https://api.blooket.com/api/users?name=' + password.value)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
            })
            .then((myName) => {
                if (nopeLog == true) {
                    console.log(password.value + ' is not an available name :(');
                }
            })
            .catch((error) => {
                if (yesLog == true) {
                    console.warn(password.value + ' is an available name!');
                }
                namesToUse += password.value + ', ';
            });
    }

    console.log('Finished search at ' + finalDate);
    console.log('Search finished! Results: ' + namesToUse);


}
else {
    console.log('Canceled.');
}
