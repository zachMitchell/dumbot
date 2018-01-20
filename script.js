function compute(){

var emessage="ARRRG! ...I made a booboo. :'( Here's some debug info:";

var question =document.getElementById("a");
var error=document.getElementById("b");

//the 6 core beginning words of a question, plus everything else (:P) :

var step1=["Who","What?!","When","Where","Why","How",""];

var step2=["could","would","did","should","might","must","may","can","did","does","will"];

var step3=["you","your dog","your brother","your sister","Dad","Mom","Grandma","Grandpa","your cat","your fish","your friend","Chuck Noris","an athlete","a chef","a surgeon","a clown","a spec of dust","pizza","somebody","that guy","the government","the planet","a bird","aliens","a computer","your dentist","the President","the King","the mechanic","we","they","that cuddly creature","that vampire","your phone"];

var step4=["eat","explode","kill","take care of","drive to","fly to","swim to","jump to","dominate over","lose to","make","bake","flatten","break into","comment about","race","feed","jump over","teleport to","construct","pickle","pester","flip over","advertise","play with","conquer","become","obtain","infiltrate","question","plead to","capture","steal","crave","read about","watch","fight","fight over","cry over","think about","fetch","clean","repair","run over","punch","karate-chop","drink","buy","have","chuck","cuddle"];

var step5=["","a burger","a videogame","a coin","a pepper","a house","the world","playing cards","a violin","the President","a portal gun","water","air","the beach","mars","the moon","your teacher","a bubble","the ocean","a car","China","your computer","doritoes","awesomeness","a book","an imagination","life","death","the center of the earth","hotdogs","dust bunnies","a helicopter","a tank","the universe","math","homework","cheese","you","a superhero","strength","weakness","candy","ice cream","a pirate","the brain","school","the playground","us","them","the squirrel","steak","pork-chop","authority","breakfast","a vampire","hair","nothing","everything","a porqupine","outer space","War and Peace"];
//This either has "?" or "?!" inside.
var step6;


//These random numbers will work without maintanence... XP
var s1r=Math.floor(Math.random()*step1.length);
var s2r=Math.floor(Math.random()*step2.length);
var s3r=Math.floor(Math.random()*step3.length);
var s4r=Math.floor(Math.random()*step4.length);
var s5r=Math.floor(Math.random()*step5.length);


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

//the error message
if(step3[s3r]===undefined){
error.innerHTML=emessage+s3r;
}
if(step5[s5r]===undefined){
error.innerHTML=emessage+s5r;
}
}
compute()
