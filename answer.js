//Grabs a person place or thing from indexes 2 and 4 via the "grammarConstructs" array.
function rndNoun() {
    var construct = grammarConstructs[[2,4][rnd(2)]];
    return construct[rnd(construct.length)];
}

//Random item such as "eat" or "explode" from index 3 of grammarConstructs
var rndAction = ()=>grammarConstructs[3][rnd(grammarConstructs[3].length)];
var rndPunct = ()=>[".", "!"][rnd(2)];

//This appears to be which answer bubble is currently being rendered
var count = 0;

function whoWhy(sentence) {
    var a1Sub = ["", "probably", "obviously", "most likely"][rnd(this.length)];
    var answer1 = ["", "Obviously", "Must've been", "Eh, " + a1Sub, "It was" + a1Sub, "Dude, it's gotta be", "Duh..."];
    var result = '';
    if (sentence[1] != 'will')
        result += answer1[rnd(answer1.length)] + " ";
    if (sentence[0] == 'Why')
        result += " to " + rndAction() + " ";

    result += rndNoun() + rndPunct();
    return result;
}

function what() {
    var answerYes = ["Yes!", "Absolutely!", "Obviously YES", "<strong>BIG YES</strong>", "yesyesyesyesyesyes!", "yurp :3", "lulz yez", "Yes sir!"];
    var answerNo = ["No!", "Nah...", "nupe", "WHAT?! NO!", "nononononononono", "\"Not today Zurg!\"", "No-Way...", "Just... no.", "Absolutely! <i>Not!</i>"];
    var answerMaybe = ["Maybe...", "Possibly...", "Yeah, but... maybe not...", "Yes and no.", "Well...", "That's a good question...", "THATS A TERRIBLE QUESTION!", "...Why?", "Well that's confusing -_-"];

    switch (count) {
        case 0:
            result = answerYes[rnd(answerYes.length)];
            count++;
            break;
        case 1:
            result = answerNo[rnd(answerNo.length)];
            count++;
            break;
        case 2:
            result = answerMaybe[rnd(answerMaybe.length)];
            count = 0;
            break;
    }
    return result;

}

function when() {
    var answerWhen = ["is brainwashed to", "tries to", "goes to", "intentionaly tries to", "attempts to", "goes all out to"];
    var result = (["", "Exactly", "Almost", "Slightly"][rnd(4)]) + " ";
    switch (count) {
        case 0:
            result += "before";
            count++;
            break;
        case 1:
            result += ["while", "when", "during the time"][rnd(2)];
            count++;
            break;
        case 2:
            result += "after";
            count = 0;
            break;
    }
    result += " " + rndNoun() + " " + answerWhen[rnd(answerWhen.length)] + " " + rndAction() + " " + rndNoun() + ".";
    return result;
}


function where() {
    var answerWhere = ["", "On top of", "Inside", "Outside", "Close to", "Miles away from", "Under", "Right behind", "In front of", "In disguise as", "Wherever someone tries to " + rndAction() + " "];
    return answerWhere[rnd(answerWhere.length)] + " " + rndNoun() + rndPunct();
}

function how() {
    var answerHow = ["", "Just", "Easy! Just", "All you have to do is", "One step:", "No sweat! Just gotta", "Nothing much... just", "Elementary my dear, just"];
    return answerHow[rnd(answerHow.length)] + " " + rndAction() + " " + rndNoun() + rndPunct();
}

//Map functions to the beginning of the question
var questionMap = {
    'Who':'whoWhy',
    'Why':'whoWhy',
    'What?!':'what',
    '':'what',
    'When':'when',
    'Where':'where',
    'How':'how'
}

//Create the answer bubbles. We first grab the question beginning, followed by the target noun, and either ! or .
var answer = sentence=>window[questionMap[sentence[0]]](sentence);

//converts to html
function printAnswer(sentence) {
    for (i = 0; i < 3; i++) {
        var colors = ["#FF0000", "#FF5500", "#FF8400", "#FF9900", "#FFC400", "#FFE202", "#FFFF03", "#C0FF03", "#53FF04", "#02FF70", "#02FFCD", "#03FFEF", "#00A6FF", "#0037FF", "#0B03FF", "#9A01FF", "#EF03FF", "#FF0379"];
        window["a"+(i+1)].style.color = colors[rnd(colors.length)];
        window["a"+(i+1)].innerHTML = answer(sentence);
    }
}

//Shows the "results" of the poll
function pollbar(choice) {
    var percent = 100;
    var num;
    if (choice > 0) {
        for (i = 0; i < 3; i++) {
            //outer shell
            document.getElementById("pB" + (i + 1)).style.border = "6px solid grey";
            //inner shell
            var temp = document.getElementById("pB" + (i + 1) + "a");
            temp.style.backgroundColor = document.getElementById("a" + (i + 1)).style.color;
            document.getElementById("a" + (i + 1)).onclick = "";
            console.log("XP");
            var subtract;
            if (i == 2)
                subtract = percent;
            else subtract = rnd(percent);
            temp.style.width = subtract + "%";
            percent -= subtract;
            temp.innerHTML = subtract + "%";
        }
        num = document.getElementById("pB" + choice + "a").style.width;

        var intrigue = ["Interesting; seems like", "Fascinating; looks like", "Hmm... apparently", "WHAT?!", "Oh my,", "No way!", "Incredible!", "Thats confusing..."];
        document.getElementById("mesg").innerHTML = intrigue[rnd(intrigue.length)] + " " + num + " of clicker-bots aggree with you" + ([".", "...", "!"][rnd(3)]);
    }
    else {
        //Erase everything XP
        for (i = 0; i < 3; i++) {
            document.getElementById("pB" + (i + 1)).style.border = "";
            var temp = document.getElementById("pB" + (i + 1) + "a");
            temp.style.backgroundColor = "";
            document.getElementById("a" + (i + 1)).onclick = "pollbar(" + i + 1 + ")";
            temp.innerHTML = "";
        }
        document.getElementById("mesg").innerHTML = "";
    }
}