//the 6 core beginning words of a question, plus everything else (:P)
var grammarConstructs = [
    ["Who", "What?!", "When", "Where", "Why", "How", ""],
    ["could", "would", "did", "should", "might", "must", "may", "can", "did", "does", "will"],
    ["you", "your dog", "your brother", "your sister", "Dad", "Mom", "Grandma", "Grandpa", "your cat", "your fish", "your friend", "Chuck Noris", "an athlete", "a chef", "a surgeon", "a clown", "a spec of dust", "pizza", "somebody", "that guy", "the government", "the planet", "a bird", "aliens", "a computer", "your dentist", "the President", "the King", "the mechanic", "we", "they", "that cuddly creature", "that vampire", "your phone"],
    ["eat", "explode", "kill", "take care of", "drive to", "fly to", "swim to", "jump to", "dominate over", "lose to", "make", "bake", "flatten", "break into", "comment about", "race", "feed", "jump over", "teleport to", "construct", "pickle", "pester", "flip over", "advertise", "play with", "conquer", "become", "obtain", "infiltrate", "question", "plead to", "capture", "steal", "crave", "read about", "watch", "fight", "fight over", "cry over", "think about", "fetch", "clean", "repair", "run over", "punch", "karate-chop", "drink", "buy", "have", "chuck", "cuddle", "yell at", "fall off of", "topple over"],
    ["a burger", "a videogame", "a coin", "a pepper", "a house", "the world", "playing cards", "a violin", "the President", "a portal gun", "water", "air", "the beach", "mars", "the moon", "your teacher", "a bubble", "the ocean", "a car", "China", "your computer", "doritoes", "awesomeness", "a book", "an imagination", "life", "death", "the center of the earth", "hotdogs", "dust bunnies", "a helicopter", "a tank", "the universe", "math", "homework", "cheese", "you", "a superhero", "strength", "weakness", "candy", "ice cream", "a pirate", "the brain", "school", "the playground", "us", "them", "the squirrel", "steak", "pork-chop", "authority", "breakfast", "a vampire", "hair", "nothing", "everything", "a porqupine", "outer space", "War and Peace"]
];

function compute() {
    var punctuation = '?';

    //Grab a random phrase for each part of the sentence
    var sentence = [];
    for(var construct of grammarConstructs)
        sentence.push(construct[rnd(construct.length)])

    //Determines if step 2 should be capitalized ("What" or blank string triggers this)
    var isWhat = sentence[0] == grammarConstructs[0][1];
    if(isWhat || !sentence[0].length){
        sentence[1] = sentence[1][0].toUpperCase()+sentence[1].substring(1);
        if(isWhat) punctuation+='!'; //If the beginning is "What?!", keep the theme going ;P
    }
    //if index 1 is "who", then remove 5th construct...
    else if(sentence[0] == grammarConstructs[0][0]){
        sentence.pop();
    }

    return [sentence,punctuation];
}