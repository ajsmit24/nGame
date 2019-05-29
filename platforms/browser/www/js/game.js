/**
 * @param {int} min the smallest included value
 * @param {int} max the largest included value 
 */
Math.__proto__.inclusiveRandom=function(min,max){
    max++; 
    return Math.floor(Math.random() * (+max - +min)) + +min; 
}
//TODO permutations
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
            }
        }
        if(hasAll){
            returnArr.push(output[i]);
        }
        var uniques=[returnArr[0]];
        for(var a=0;a<returnArr.length;a++){
            var alreadyCounted=false;
            for(var b=0;b<uniques.length;b++){
                if(arrayMath.equals(returnArr[a],uniques[b])){
                    alreadyCounted=true;
                }
            }
            if(!alreadyCounted){
                uniques.push(returnArr[a]);
            }
        }
        
    }
    return uniques;
}
var pageElements={
    cardsHolder:".play-area",
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
    add:function(a,b,sp){
        return a+b;
    },
    sub:function(a,b,sp){
        if(sp){
        return Math.abs(a-b);
        }else{
            return a-b;
        }
    },
    mult:function(a,b,sp){
        return a*b;
    },
    div:function(a,b,sp){
        if(sp&&a/b<1){
            return b/a;
        }
        return a/b;
    },
}
var game={
    /** n: the integer being played */
    n:24,
    /**using: the number of numbers being played withh */
    using:4,
    /**the smallest starting number */
    minium:1,
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
    saveState:{
        html:"",
        selected:[],
        defaultState:{
            html:"",
            selected:[]
        }
    },
    setup:function(){
        game.reset();
        /*$("#hint").click(function(){game.displayHint()})
        $("#undo").click(function(){game.restore()})
        $("#not-solvable").click(function(){game.isNotSolvable()})
        $("#settings").click(function(){app.pageNavigation.switchPage(1)})*/
        game.save(true);
        //app.pages[1].initalization();

    },
    generateGame:function(){
        for(var i=0;i<game.using;i++){
            game.set.push(Math.inclusiveRandom(game.minium,game.maxium));
        }
    },
    displayHint:function(){
        console.log(game.generateSolution());
    },
    displayGame:function(){
        var elem=$(pageElements.cardsHolder);
        for(var i=0;i<game.set.length;i++){
            elem.append("<div class='card not-selected' data-numbIndex="+i+"><div class='number' id="+i+">"+game.set[i]+"</div></div>");
        }
         elem.append("<div id='ops' class='main-container'></div>");
         var ops=$("#ops");
         var opKeys=Object.keys(game.operators);
         var mathKey=Object.keys(sm);
         for(var j=0,k=0;j<opKeys.length,k<mathKey.length;j++,k++){
             ops.append("<div class='op'data-index='"+j+"'><div class='center'>"+game.operators[opKeys[j]]+"</div></div>");
         }
         game.bind(true);
    },
    selectElement:function(element){
        //console.log("selecting")
        var id=parseInt(element.firstChild.id);
       // console.log(game.selectedNumbers,id,game.selectedNumbers.indexOf(id),game.selectedNumbers.length>1)
        if(game.selectedNumbers.length>1){
            game.selectedNumbers=[game.selectedNumbers[0],game.selectedNumbers[1]]
            //console.log(game.selectedNumbers.length)
            if(game.selectedNumbers.indexOf(id)>-1){
                //console.log("h19")
                $("#"+id).css("border","0px solid black");
                var holder=[];
                for(var i=0;i<game.selectedNumbers.length;i++){
                    if(game.selectedNumbers[i]!=id){
                        holder.push(game.selectedNumbers[i])
                    }
                }
                game.selectedNumbers=holder;
            }
        }else if(game.selectedNumbers.indexOf(id)>-1){
            var holder=[];
            $("#"+id).css("border","0px solid black")
            //console.log("h2")
            for(var i=0;i<game.selectedNumbers.length;i++){
                if(game.selectedNumbers[i]!=id){
                    holder.push(game.selectedNumbers[i]);
                }else{
                   /* $("#"+game.selectedNumbers[i]).css("border","0px solid black")
                    console.log("h3")*/
                }
            }
            game.selectedNumbers=holder;
        }else{
            //console.log("h5")
             game.selectedNumbers.push(id);
        }
        for(var i=0;i<game.selectedNumbers.length;i++){
            $("#"+game.selectedNumbers[i]).removeClass("not-selected");
            $("#"+game.selectedNumbers[i]).css("border","2px solid green");
        }
        //console.log("fin")
    },

    performOperation:function(element){
        game.save();
        game.unbind();
        if(game.selectedNumbers.length>1){
        var i=parseInt(element.getAttribute("data-index"));
        var keys=Object.keys(sm);
        var selected=[];
        var cards=$(".card");
        for(var k=0;k<cards.length;k++){
            if(parseInt(cards[k].getAttribute("data-numbIndex"))===game.selectedNumbers[0]||parseInt(cards[k].getAttribute("data-numbIndex"))===game.selectedNumbers[1]){
                selected.push(parseInt(cards[k].innerText));
                cards[k].outerHTML="";
            }
           // console.log(cards[k],cards[k].getAttribute("data-numbIndex"),game.selectedNumbers[0],game.selectedNumbers[1])
        }
        var newNumb=sm[keys[i]](selected[0],selected[1],true)
        var j=Math.min(game.selectedNumbers[1],game.selectedNumbers[0])
        game.selectedNumbers=[];
        $(pageElements.cardsHolder).append("<div class='card not-selected' data-numbIndex="+j+"><div class='number' id="+j+">"+newNumb+"</div></div>");
        game.bind();
        game.checkSolution()
        }
    },
    save:function(isDef){
        game.saveState.html=$(pageElements.cardsHolder)[0].innerHTML+"";
        game.saveState.selected=game.selectedNumbers.slice(0);
        if(isDef){
            game.saveState.defaultState.html=game.saveState.html+"";
            game.saveState.defaultState.selected=[];
        }
    },
    restore:function(){
        game.unbind();
        $(pageElements.cardsHolder)[0].innerHTML=game.saveState.html;
        game.bind();
        game.selectedNumbers=game.saveState.selected.slice(0);
        game.saveState.selected=game.saveState.defaultState.selected;
        game.saveState.html=game.saveState.defaultState.html;
    },
    bind:function(outsideAlso){
         $(".card").click(function(){game.selectElement(this)});
         $(".op").click(function(){game.performOperation(this)});
         if(outsideAlso){
             console.log("bind ind")
            $("#hint").click(function(){game.displayHint()})
            $("#undo").click(function(){game.restore()})
            $("#not-solvable").click(function(){game.isNotSolvable()})
            $("#settings").click(function(){app.pageNavigation.switchPage(1)})  
         }
    },
    unbind:function(outsideAlso){
      $(".card").off("click");  
      $(".op").off("click");
      if(outsideAlso){
            $("#hint").off("click");  
            $("#undo").off("click");  
            $("#not-solvable").off("click");
            $("#settings").off("click");
         }
    },

    updateDisplay:function(){

    },

    selectOperator:function(operator){
        game.operators.selected=game.operators[operator];        
    },

    generateSolution:function(){
        console.log("generating")
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

    checkSolution:function(){
        var x= parseInt($(".card")[0].innerText)==game.n&&$(".card").length>-1;
        if(x){
           game.winner(); 
        }
    },
    winner:function(){
        game.unbind(true);
         var isAlready=$("#winner")[0];
         if(isAlready){isAlready.outerHTML="";}
         $(pageElements.cardsHolder).append("<div id='winner'>Winner</div>")
         $("#winner").click(function(){game.reset();})
    },
    reset:function(){
        $(pageElements.cardsHolder)[0].innerHTML="";
        game.set=[];
        game.selectedNumbers=[];
        game.generateGame();
        game.displayGame();
        game.save(true);
    },
    isNotSolvable:function(){
        console.log("solving")
        if(!game.generateSolution()){
            game.winner();
        }else{
            
        }
    }

   

}