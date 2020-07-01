//These variables need to be sorted out into a static object...
var colors = colorTools.hex2RgbArray(["#FF0000", "#FF9900", "#FFE202", "#53FF04", "#02FF70", "#03FFEF", "#00A6FF", "#0040FF" , "#9A01FF", "#FF0379"]);
var answered = false;
//DOM collections are live so you can access this at any time in the code.
var answerBubbles = document.getElementsByClassName('answerBubble');

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

//Before reorganizing this file to the core, arrays were baked into functions... I'd rather have them here at this stage
//NOTE: due to the age of this design, I assumed there would only be 3 answer bubbles, so that's why you see a combination of 3 answer types in yesNoMaybe and "when.time". I'll try to accomodate for this codewise to fallback on indexes when they are greater than 3.
var answerComponents = {
    yesNoMaybe: [
        ["Yes!", "Absolutely!", "Obviously YES", "<strong>BIG YES</strong>", "yesyesyesyesyesyes!", "yurp :3", "lulz yez", "Yes sir!"],
        ["No!", "Nah...", "nupe", "WHAT?! NO!", "nononononononono", "\"Not today Zurg!\"", "No-Way...", "Just... no.", "Absolutely! <i>Not!</i>"],
        ["Maybe...", "Possibly...", "Yeah, but... maybe not...", "Yes and no.", "Well...", "That's a good question...", "THATS A TERRIBLE QUESTION!", "...Why?", "Well that's confusing -_-","Yes, but actually no","YNeos"]
    ],

    whoWhy:{
        guessParticles: ["", "probably", "obviously", "most likely"],
        replies: ["", "Obviously", "Must've been", "Eh, %" , "It was %", "Dude, it's gotta be", "Duh..."]
    },
    when:{
        preTime:["", "Exactly", "Almost", "Slightly"],
        time:[
            ["before", "prior to"],
            ["while", "when", "during the time"],
            ["after"]
        ],
        intention:["is brainwashed to", "accidentally will", "tries to", "goes to", "intentionaly tries to", "attempts to", "goes all out to"]
    },
    where: ["", "On top of", "Inside", "Outside", "Close to", "Miles away from", "Under", "Right behind", "In front of", "In disguise as", "Wherever someone tries to %" + " "],
    how: ["", "Just", "Easy! Just", "All you have to do is", "One step:", "No sweat! Just gotta", "Nothing much... just", "Elementary my dear, just"],

    clickerBots:{
        intrigue: ["Interesting; seems like", "Fascinating; looks like", "Hmm... apparently", "WHAT?!", "Oh my,", "No way!", "Incredible!", "Thats confusing..."],
        punct:[".", "...", "!","?","?!"]
    }
}

//Make a random color based on a collection of presets.
var rndColor = (colorArr = colors)=> colorTools.percentToColor(Math.floor(Math.random()*101),0,0,colorArr,1);

//returns a random item from an array via the arguments.
var rndItem = e=>e[rnd(e.length)];

//Grabs a person place or thing from indexes 2 and 4 via the "grammarConstructs" array.
var rndNoun = ()=>rndItem(grammarConstructs[[2,4][rnd(2)]]);

//Random item such as "eat" or "explode" from index 3 of grammarConstructs
var rndAction = ()=>grammarConstructs[3][rnd(grammarConstructs[3].length)];
var rndPunct = ()=>[".", "!"][rnd(2)];

var whoWhy = (index,sentence)=> (sentence[1] != 'will'? rndItem(answerComponents.whoWhy.replies).replace('%', rndItem(answerComponents.whoWhy.guessParticles)) + " ":'') +
    (sentence[0] == 'Why'? " to " + rndAction() + " ":'') +
    rndNoun() +
    rndPunct();

var what = index=>rndItem(answerComponents.yesNoMaybe[index]);
var when = index=>rndItem(answerComponents.when.preTime)+ " " + rndItem(answerComponents.when.time[index]) + " " + rndNoun() + " " + rndItem(answerComponents.when.intention) + " " + rndAction() + " " + rndNoun() + ".";
var where = ()=>rndItem(answerComponents.where).replace('%',rndAction()) + " " + rndNoun() + rndPunct();
var how = ()=>rndItem(answerComponents.how) + " " + rndAction() + " " + rndNoun() + rndPunct();

//Create the answer bubbles. We first grab the question beginning, followed by the target noun, and either ! or .
var answer = (index,sentence)=>window[questionMap[sentence[0]]](index % 3,sentence);

//converts to html
function printAnswer(sentence) {
    for (var i = 0; i< answerBubbles.length;i++) {
        answerBubbles[i].style.color = rndColor();
        answerBubbles[i].innerHTML = answer(i,sentence);
    }
}

//Shows the "results" of the poll
function pollbar() {
    if(answered) return;

    var percent = 100;
    var num;
    var pollResults = document.getElementsByClassName('pollResult');
    for (i = 0; i < pollResults.length; i++) {
        //outer shell
        pollResults[i].style.display = '';
        //inner shell
        pollResults[i].children[0].style.backgroundColor = answerBubbles[i].style.color;
        var subtract = i == pollResults.length-1 ? percent:rnd(percent);
        pollResults[i].children[0].style.width = subtract + "%";
        pollResults[i].children[0].innerHTML = subtract + "%";

        if(answerBubbles[i] == this) num = subtract;
        
        percent -= subtract;
    }

    mesg.innerHTML = rndItem(answerComponents.clickerBots.intrigue) + " " + num + "% of clicker-bots aggree with you" + rndItem(answerComponents.clickerBots.punct);
    answered = true;
}

function clearPolls(){
    //Erase everything
    for (result of document.getElementsByClassName('pollResult'))
        result.style.display = 'none';

    mesg.innerHTML = "";
    answered = false;
}