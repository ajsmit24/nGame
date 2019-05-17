/**
 * @param {int} min the smallest included value
 * @param {int} max the largest included value 
 */
Math.__proto__.inclusiveRandom=function(min,max){
    max++; 
    return Math.floor(Math.random() * (+max - +min)) + +min; 
}
Math.__proto__.getCombinations=function(array, size, start, initialStuff, output) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        var i;
		//var arr=[];
        for (i = start; i < array.length; ++i) {	
	        Math.getCombinations(array, size, 0, initialStuff.concat(array[i]), output);
        }
        //return arr;
    }
};

Math.__proto__.getAllPossibleCombinations=function(array) {
    var output=[];
    var returnArr=[];
    Math.getCombinations(array, array.length, 0, [], output);
   
    for(var i=0;i<output.length;i++){
        var hasAll=true;
        var holder=output[i];
        for(var k=0;k<array.length;k++){
            var index=holder.indexOf(array[k])
            if(!(index>-1)){
                  hasAll=false;  
            }else{
                var temp=[];
                for(var z=0;z<holder.length;z++){
                    if(index!=z){
                        temp.push(holder[z])
                    }
                }
                holder=temp;
                //holder=holder.substring(0,holder.indexOf(array[k]+""))+holder.substring(holder.indexOf(array[k]+"")+(""+array[k]).length);
            }
        }
        if(hasAll){
            returnArr.push(output[i]);
            //console.log(output[i]);
        }
        var uniques=[returnArr[0]];
        for(var a=0;a<returnArr.length;a++){
            var alreadyCounted=false;
            for(var b=0;b<uniques.length;b++){
                if(arrayMath.equals(returnArr[a],uniques[b])){
                    alreadyCounted=true;
                }
            }
           //console.log(returnArr[a],uniques,alreadyCounted)
            if(!alreadyCounted){
                uniques.push(returnArr[a]);
            }
        }
        
    }
    return uniques;
}
var pageElements={
    cardsHolder:".app",
}
var arrayMath={
    equals:function(a,b){
        for(var i=0,j=0;i<a.length,j<b.length;i++,j++){
            if(a[i]!=b[i]){
                return false;
            }
        }
        return true;;
    }
}
var sm={
    add:function(a,b){
        return a+b;
    },
    sub:function(a,b){
        return a-b;
    },
    mult:function(a,b){
        return a*b;
    },
    div:function(a,b){
        return a/b;
    },
}
var game={
    /** n: the integer being played */
    n:24,
    /**using: the number of numbers being played withh */
    using:4,
    /**the smallest starting number */
    minium:0,
    /**the largest starting number */
    maxium:13,
    /**an object of legal math operators */
    operators:{
        addition:"+",
        subtraction:"-",
        multiplication:"*",
        division:"/",
        /**the opperator currently in use */
        selected:"+"
    },
    set:[],
    selectedNumbers:[],

    generateGame:function(){
        for(var i=0;i<game.using;i++){
            game.set.push(Math.inclusiveRandom(game.minium,game.maxium));
        }
    },

    displayGame:function(){
        for(var i=0;i<game.set.length;i++){
            $(pageElements.cardsHolder).append("<div class='card' onclick='game.selectElement(this)'><div class='number' id="+i+">"+game.set[i]+"</div></div>");
        }
    },
    selectElement:function(element){
        var id=0;
        if(game.selectedNumbers.length>2){
            game.selectedNumbers=[[game.selectedNumbers[0]]]
        }else if(game.selectedNumbers.indexOf([id])>-1){
            var holder=[]
            for(var i=0;i<game.selectedNumbers.length;i++){
                if(game.selectedNumbers[i]!=id){
                    holder.push(game.selectedNumbers[i]);
                }
            }
            game.selectedNumbers=holder;
        }else{
             game.selectedNumbers.push(id);
        }
        for(var i=0;i<game.selectedNumbers.length;i++){
            $("#"+game.selectedNumbers[i]).addClass("selelected");
        }
    },

    performOperation:function(){

    },

    updateDisplay:function(){

    },

    selectOperator:function(operator){
        game.operators.selected=game.operators[operator];        
    },

    generateSolution:function(){
        var numbers=game.set;
        var combos=Math.getAllPossibleCombinations(numbers);
        var resault="";
        for(var c=0;c<combos.length;c++){
        number=combos[c];
        
        var sum=0;
        var group=1;
        var operations=["+","-","/","*"];
        var res=[];
        var storForm="";
        var opIndex=[];
        var numbInd=[];
        for(var i=0;i<combos[c].length;i++){
            res.push("");
            res.push(""+combos[c][i]);
            numbInd.push(res.length-1)
            res.push("");
            if(i!=combos[c].length-1){
                res.push("+");
                opIndex.push(res.length-1);
            }
        }
        stormForm=res.slice(0);
        for(var k=0;k<opIndex.length;k++){
            for(var j=0;j<operations.length;j++){
                res[opIndex[k]]=operations[j];
                for(var y=0;y<numbInd.length;y++){
                    res[numbInd[y]-1]="(";
                    for(var z=y;z<numbInd.length;z++){
                        res[numbInd[z]+1]=")";
                    
                var hold="";
                for(var x=0;x<res.length;x++){
                    hold=hold+res[x];
                }

                 if(eval(hold)===24&&resault.length<1){
                     resault=hold;
                 }
                
            res[numbInd[z]+1]="";}res[numbInd[y]-1]=""; }
            }
        }
        
    }
    if(resault.length<1){
            return false;
        }else{
            return resault;
        }
    },
   

}