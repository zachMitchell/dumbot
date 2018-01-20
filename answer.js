function step3Plus5(){
    var rand = Math.floor(Math.random() * 2);
    var word;
switch (rand){
    case 0:
    word = step3[Math.floor(Math.random()*step3.length)];
    break;
    case 1:
    word = step5[Math.floor(Math.random()*step5.length)];
    break;
}
if (word===""){
    console.log("XP");
    word = step3Plus5();
}
return word;
}

var count=0;

function random(thing){
return Math.floor(Math.random()*thing);
}

function answer(){

var ap1=step4[random(step4.length)];
var ap2 = step3Plus5();
var punct = [".","!"][random(2)];

function whoWhy(){
var a1Sub = ["","probably","obviously","most likely"][random(this.length)];
var answer1 = ["","Obviously","Must've been","Eh, "+a1Sub,"It was"+a1Sub,"Dude, it's gotta be","Duh..."];
    var result='';
    if(s2r!=10)
    result+=answer1[random(answer1.length)]+" ";
    if (s1r === 4)
        result+=" to "+ap1+" ";
    result +=ap2+punct;
    return result;
}

function what(){
var answerYes=["Yes!","Absolutely!","Obviously YES","<strong>BIG YES</strong>","yesyesyesyesyesyes!","yurp :3","lulz yez","Yes sir!"];
var answerNo=["No!","Nah...","nupe","WHAT?! NO!","nononononononono","\"Not today Zurg!\"","No-Way...","Just... no.","Absolutely! <i>Not!</i>"];
var answerMaybe=["Maybe...","Possibly...","Yeah, but... maybe not...","Yes and no.","Well...","That's a good question...","THATS A TERRIBLE QUESTION!","...Why?","Well that's confusing -_-"];

switch(count){
        case 0:
        result = answerYes[random(answerYes.length)];
        count++;
        break;
        case 1:
        result = answerNo[random(answerNo.length)];
        count++;
        break;
        case 2:
        result = answerMaybe[random(answerMaybe.length)];
        count = 0;
        break;
    }
    return result;

}

function when(){
    var answerWhen = ["is brainwashed to","tries to","goes to","intentionaly tries to","attempts to","goes all out to"];
    var result = (["","Exactly","Almost","Slightly"][random(4)])+" ";
switch (count){
    case 0:
    result+="before";
    count++;
    break;
    case 1:
    result+=["while","when","during the time"][random(2)];
    count++;
    break;
    case 2:
    result+="after";
    count = 0;
    break;
}
result+=" "+step3Plus5()+" "+answerWhen[random(answerWhen.length)]+ " "+ap1+" "+ap2+".";
return result;
}

function where(){
    var answerWhere = ["","On top of","Inside","Outside","Close to","Miles away from","Under","Right behind","In front of","In disguise as","Wherever someone tries to "+ap1+" "];
    return answerWhere[random(answerWhere.length)]+" "+ap2+punct;
}

function how(){
    var answerHow=["","Just","Easy! Just","All you have to do is","One step:","No sweat! Just gotta","Nothing much... just","Elementary my dear, just"];
return answerHow[random(answerHow.length)]+" "+ap1+" "+ap2+punct;
}

if (s1r == 6 || s1r == 1)
    return what();

else if(s1r==2)
    return when();

else if(s1r == 3)
    return where();

else if (s1r==0|| s1r ==4)
    return whoWhy();

else
    return how();
    console.log("aaaand nope... that's an error -_-");
}

//converts to html
function printAnswer(){
for(i=0;i<3;i++){
    var colors=["#FF0000","#FF5500","#FF8400","#FF9900","#FFC400","#FFE202","#FFFF03","#C0FF03","#53FF04","#02FF70","#02FFCD","#03FFEF","#00A6FF","#0037FF","#0B03FF","#9A01FF","#EF03FF","#FF0379"];
    var bleh= document.getElementById("a"+""+(i+1)+"");
    bleh.style.color=colors[random(colors.length)];
    bleh.innerHTML=answer();
}
}

//Shows the "results" of the poll
function pollbar(choice){
var percent = 100;
var num;
if (choice>0){
for(i=0;i<3;i++){
    //outer shell
    document.getElementById("pB"+(i+1)).style.border="6px solid grey";
    //inner shell
    var temp = document.getElementById("pB"+(i+1)+"a");
    temp.style.backgroundColor = document.getElementById("a"+(i+1)).style.color;
    document.getElementById("a"+(i+1)).onclick="";
    console.log("XP");
    var subtract;
    if(i==2)
    subtract = percent;
    else subtract = random(percent);
    temp.style.width = subtract+"%";
    percent-=subtract;
    temp.innerHTML=subtract+"%";
}
num=document.getElementById("pB"+choice+"a").style.width;

var intrigue=["Interesting; seems like","Fascinating; looks like","Hmm... apparently","WHAT?!","Oh my,","No way!","Incredible!","Thats confusing..."];
document.getElementById("mesg").innerHTML=intrigue[random(intrigue.length)]+" "+num+" of clicker-bots aggree with you"+([".","...","!"][random(3)]);
}
else{
    //Erase everything XP
    for (i=0;i<3;i++){
        document.getElementById("pB"+(i+1)).style.border="";
        var temp = document.getElementById("pB"+(i+1)+"a");
        temp.style.backgroundColor = "";
        document.getElementById("a"+(i+1)).onclick="pollbar("+i+1+")";
        temp.innerHTML="";
    }
    document.getElementById("mesg").innerHTML="";
}
}