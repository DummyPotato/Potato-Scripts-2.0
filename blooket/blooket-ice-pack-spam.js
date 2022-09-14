javascript:

/* Since there is currently no way to spam the new pack in Blooket,
I created a script that manually grinds the pack for you,
and even adds daily rewards.
*/

(async () => {
    let n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();

    var getValues = () => new Promise((e, t) => {
        try {
            let n = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString();
            e({
                blooketBuild: n.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
                secret: n.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
            })
        } catch {
            t("Could not fetch auth details")
        }
    })
    var encodeValues = async (e, t) => {
        let d = window.crypto.getRandomValues(new Uint8Array(12));
        return window.btoa(Array.from(d).map(e => String.fromCharCode(e)).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: d
        }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {
            name: "AES-GCM"
        }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map(e => String.fromCharCode(e)).join(""))
    };
            fetch("https://api.blooket.com/api/users", { credentials: "include" }).then(x => x.json()).then(x => {
                getValues().then(async e => {
                    fetch("https://api.blooket.com/api/users/add-rewards", {
                        method: "put",
                        credentials: "include",
                        headers: {
                            "content-type": "application/json",
                            "X-Blooket-Build": e.blooketBuild
                        },
                        body: await encodeValues({
                            name: x.name,
                            addedTokens: 500,
                            addedXp: 300
                        }, e.secret)
                    });
                    fetch("https://api.blooket.com/api/users/add-rewards", {
                        method: "put",
                        credentials: "include",
                        headers: {
                            "content-type": "application/json",
                            "X-Blooket-Build": e.blooketBuild
                        },
                        body: await encodeValues({
                            name: x.name,
                            addedTokens: 500,
                            addedXp: 300
                        }, e.secret)
                    }).then(() => console.log('Added daily rewards!')).catch(() => alert('There was an error when adding rewards!'));;
                }).catch(() => alert('There was an error encoding requests!'));
            }).catch(() => alert('There was an error getting username!'));
})();

function createFooter() {
    let element = document.createElement('div');

    element.style = `font-family: "Nunito", sans-serif; font-size: 14px; height: 65px; width: 175px; border: 4px solid rgb(168, 135, 50); background: rgb(242, 231, 133); position: absolute; top: 20x; left: 20px; border-radius: 10px; color: rgb(0, 0, 0); text-align: center;`;
    element.innerHTML = `<p>Made by DummyPotato, v1.0</p>`;
    document.body.appendChild(element);

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = ((e = window.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = (() => {
            document.onmouseup = null;
            document.onmousemove = null;
        });
        document.onmousemove = ((e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
            let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
            element.style.top = top + "px";
            element.style.left = left + "px";
        });
    });
};

createFooter();

var secondTime = false;


function openBox() {
const box = document.getElementsByClassName('styles__packContainer___3RwSU-camelCase');

for (let i = 0; i < box.length; i++) {
  box[i].click();
}
setTimeout(doPress, 750);
}

function doPress() {
const press = document.getElementsByClassName('styles__openPackContainer___2m4Yf-camelCase');

for (let i = 0; i < press.length; i++) {
  press[i].click();
}
if (secondTime == false) {
secondTime = true;
setTimeout(doPress, 1500);
}
else {
setTimeout(openBox, 500);
}
}


console.warn('MADE BY DUMMYPOTATO, DO NOT TAKE CREDIT FOR MY WORK');
var ask = confirm('This script adds daily rewards and opens Ice Boxes manually for you, continue? \n \n MUST HAVE INSTANT OPEN ON');
if(ask == true) {
console.log('Starting task...');
alert('The script is a bit funky, but it does the job of manually openinng Ice pack for you.');
openBox();
}
else {
console.log('Canceled task.');
}




