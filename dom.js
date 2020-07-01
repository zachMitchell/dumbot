//Made by Zachary Mitchell in 2020!
//Stuff to fire up the DOM starts here. This assumes all other js files are loaded as well.

var debug = false;
//Something shiny!! Wanted to spruce the app up so here's a moving background!
var bgObj;
var qm = document.createElement('img');
qm.onload = () => {
    detectFramerate.go(frameRate => {
        bgObj = new qmbg(qm, canvasBG, .5, 1000 / frameRate);
        bgObj.animate();

        window.onresize = function () {
            canvasBG.width = window.innerWidth * .995;
            canvasBG.height = window.innerHeight * 1.05;
        }
        //Update Framerate every so often
        setInterval(() => detectFramerate.go(fr => { bgObj.frameRate = 1000 / fr; if (debug) console.log(fr) }), 7000);

        window.onresize();
    });
}
qm.src = 'qm.svg';

//Assign each bubble to show the answer from all the clickerbots ;P
for (var i of answer.answerBubbles) i.onclick = pollbar;

buttonContainer.onclick = function () {
    clearPolls();
    var question = compute();
    questionElement.innerHTML = question[0].join(' ') + question[1];
    answer.printAnswer(question[0]);
}

//Run first time:
buttonContainer.click();

answerModeCheck.onchange = function () {
    var display = this.checked ? '' : 'none';
    for (var i of answer.answerBubbles)
        i.style.display = display;

    for(var i of document.getElementsByClassName('pollResult'))
        i.style.display = display;
    if(display == '') answer.answered = false;
}

answerModeCheck.onchange();