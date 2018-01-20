//concats javascript arrays
function conArray(arrayList){
    var count=0;
for (i=0;i<arrayList;i++){
for (j=0;){
if (arrayList[i][j]!=","){
    if (step3Plus5=undefined){
        step3Plus5="";
    }
    step3Plus5[count]+=arrayList[i][j];
}
else if (arrayList[i][j] === "," && arrayList[i][j+1] === ","){
    j++;
}
else{
    count++;
}
        }
    }
    console.log(step3Plus5);
}