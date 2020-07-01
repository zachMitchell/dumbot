//Made by Zachary Mitchell from 2016 - 2020!
//These functions were all over the place and disorganized, that changes today in the land of 2020
answer = {
    colors: colorTools.hex2RgbArray(["#FF0000", "#FF9900", "#FFE202", "#53FF04", "#02FF70", "#03FFEF", "#00A6FF", "#0040FF", "#9A01FF", "#FF0379"]),
    answered: false,
    //DOM collections are live so you can access this at any time in the code.
    answerBubbles: document.getElementsByClassName('answerBubble'),

    //Map functions to the beginning of the question
    questionMap: {
        'Who': 'whoWhy',
        'Why': 'whoWhy',
        'What?!': 'what',
        '': 'what',
        'When': 'when',
        'Where': 'where',
        'How': 'how'
    },
    //Before reorganizing this file to the core, arrays were baked into functions... I'd rather have them here at this stage
    //NOTE: due to the age of this design, I assumed there would only be 3 answer bubbles, so that's why you see a combination of 3 answer types in yesNoMaybe and "when.time". I'll try to accomodate for this codewise to fallback on indexes when they are greater than 3.
    answerComponents: {
        yesNoMaybe: [
            ["Yes!", "Absolutely!", "Obviously YES", "<strong>BIG YES</strong>", "yesyesyesyesyesyes!", "yurp :3", "lulz yez", "Yes sir!"],
            ["No!", "Nah...", "nupe", "WHAT?! NO!", "nononononononono", "\"Not today Zurg!\"", "No-Way...", "Just... no.", "Absolutely! <i>Not!</i>"],
            ["Maybe...", "Possibly...", "Yeah, but... maybe not...", "Yes and no.", "Well...", "That's a good question...", "THATS A TERRIBLE QUESTION!", "...Why?", "Well that's confusing -_-", "Yes, but actually no", "YNeos"]
        ],

        whoWhy: {
            guessParticles: ["", "probably", "obviously", "most likely"],
            replies: ["", "Obviously", "Must've been", "Eh, %", "It was %", "Dude, it's gotta be", "Duh..."]
        },
        when: {
            preTime: ["", "Exactly", "Almost", "Slightly"],
            time: [
                ["before", "prior to"],
                ["while", "when", "during the time"],
                ["after"]
            ],
            intention: ["is brainwashed to", "accidentally will", "tries to", "goes to", "intentionaly tries to", "attempts to", "goes all out to"]
        },
        where: ["", "On top of", "Inside", "Outside", "Close to", "Miles away from", "Under", "Right behind", "In front of", "In disguise as", "Wherever someone tries to %" + " "],
        how: ["", "Just", "Easy! Just", "All you have to do is", "One step:", "No sweat! Just gotta", "Nothing much... just", "Elementary my dear, just"],

        clickerBots: {
            intrigue: ["Interesting; seems like", "Fascinating; looks like", "Hmm... apparently", "WHAT?!", "Oh my,", "No way!", "Incredible!", "Thats confusing..."],
            punct: [".", "...", "!", "?", "?!"]
        }
    },

    //Make a random color based on a collection of presets.
    rndColor: (colorArr = answer.colors) => colorTools.percentToColor(Math.floor(Math.random() * 101), 0, 0, colorArr, 1),

    //abs a person place or thing from indexes 2 and 4 via the "grammarConstructs" array.
    rndNoun: () => rndItem(grammarConstructs[[2, 4][rnd(2)]]),

    //Random item such as "eat" or "explode" from index 3 of grammarConstructs
    rndAction: () => grammarConstructs[3][rnd(grammarConstructs[3].length)],
    rndPunct: () => [".", "!"][rnd(2)],

    whoWhy: (index, sentence) => (sentence[1] != 'will' ? rndItem(answer.answerComponents.whoWhy.replies).replace('%', rndItem(answer.answerComponents.whoWhy.guessParticles)) + " " : '') +
        (sentence[0] == 'Why' ? " to " + answer.rndAction() + " " : '') +
        answer.rndNoun() +
        answer.rndPunct(),

    what: index => rndItem(answer.answerComponents.yesNoMaybe[index]),
    when: index => rndItem(answer.answerComponents.when.preTime) + " " + rndItem(answer.answerComponents.when.time[index]) + " " + answer.rndNoun() + " " + rndItem(answer.answerComponents.when.intention) + " " + answer.rndAction() + " " + answer.rndNoun() + ".",
    where: () => rndItem(answer.answerComponents.where).replace('%', answer.rndAction()) + " " + answer.rndNoun() + answer.rndPunct(),
    how: () => rndItem(answer.answerComponents.how) + " " + answer.rndAction() + " " + answer.rndNoun() + answer.rndPunct(),

    //Create the answer bubbles. We first grab the question beginning, followed by the target noun, and either ! or .
    answer: (index, sentence) => answer[answer.questionMap[sentence[0]]](index % 3, sentence),

    //converts to html
    printAnswer: function (sentence) {
        for (var i = 0; i < answer.answerBubbles.length; i++) {
            answer.answerBubbles[i].style.color = answer.rndColor();
            answer.answerBubbles[i].innerHTML = answer.answer(i, sentence);
        }
    }
}

//Shows the "results" of the poll
function pollbar() {
    if (answer.answered) return;

    var percent = 100;
    var num;
    var pollResults = document.getElementsByClassName('pollResult');
    for (i = 0; i < pollResults.length; i++) {
        //outer shell
        pollResults[i].style.visibility = '';
        //inner shell
        pollResults[i].children[0].style.backgroundColor = answer.answerBubbles[i].style.color;
        var subtract = i == pollResults.length - 1 ? percent : rnd(percent);
        pollResults[i].children[0].style.width = subtract + "%";
        pollResults[i].children[0].innerHTML = subtract + "%";

        if (answer.answerBubbles[i] == this) num = subtract;

        percent -= subtract;
    }

    mesg.innerHTML = rndItem(answer.answerComponents.clickerBots.intrigue) + " " + num + "% of clicker-bots aggree with you" + rndItem(answer.answerComponents.clickerBots.punct);
    answer.answered = true;
}

function clearPolls() {
    //Erase everything
    for (result of document.getElementsByClassName('pollResult'))
        result.style.visibility = 'hidden';

    mesg.innerHTML = "";
    answer.answered = false;
}