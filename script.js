function compute(){
pollbar(0);
var question =document.getElementById("a");

//These random numbers will work without maintanence... XP
s1r=Math.floor(Math.random()*step1.length);
s2r=Math.floor(Math.random()*step2.length);
s3r=Math.floor(Math.random()*step3.length);
s4r=Math.floor(Math.random()*step4.length);
s5r=Math.floor(Math.random()*step5.length);

//Determines if step 2 should be capitalized
var step2cap="";
var step2S=step2[s2r];

if (s1r==1||s1r==6)
{
    for (i=0;i<step2[s2r].length;i++)
    {
        if (i==0)
        {
            step2cap+=step2[s2r][i].toUpperCase();
        }
        else{
            step2cap+=step2[s2r][i];
        }
    }
    step2S=step2cap;
}
//if step 1 is "who", then step five is blank...
if (s1r == 0){
    s5r=0;
}
//...also the spacebar is removed.
var spacebar=" ";

if (step5[s5r] === step5[0]){
spacebar='';
}

//The "what" questions are unique, requiring rephrasing of the sentence, this resolves the problem.
if (s1r==1){
    step6="?!";
  }
  else{
      step6="?";
  }
//the final step: create the question!
var text=step1[s1r]+" "+step2S+" "+step3[s3r]+" "+step4[s4r]+spacebar+step5[s5r]+step6;

question.innerHTML=text;
printAnswer();
}
compute();
