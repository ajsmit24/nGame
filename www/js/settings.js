var settings={
    setup:function(){
        console.log("set")
       settings.bind();
    },
    saveSettings:function(){
        settings.validateInputs();
        console.log("saving")      
        var n=document.getElementById("playTo").value;
        var minium=document.getElementById("min").value;
        var maxium=document.getElementById("max").value;
        var numbOfCards=document.getElementById("numbOfCards").value;
        var numbsTest=[true,[]];
        if(/\d+$/g.test(n)){
            game.n=parseInt(n);
        }else{
            numbsTest[0]=false;
            numbsTest[1].push("playTo");
        }
        if(/\d+$/g.test(minium)){
            game.minium=minium
        }else{
            numbsTest[0]=false;
            numbsTest[1].push("min");
        }
        if(/\d+$/g.test(maxium)){
            game.maxium=maxium
        }else{
            numbsTest[0]=false;
            numbsTest[1].push("max");
        }
        if(/\d+$/g.test(numbOfCards)){
            game.using=numbOfCards
        }else{
           numbsTest[0]=false;
           numbsTest[1].push("numbOfCards");
        }
        if(numbsTest[0]){
            settings.unbind();
            $(".options").append("<div class='central-display save-check'>&#10004;</div>");
            setTimeout(function(){
                settings.bind();
                $(".save-check")[0].outerHTML="";
                app.pageNavigation.switchPage(0);
            }, 2500);
        }else{
            for(var j=0;j<numbsTest[1].length;j++){
                settings.invalidInput(numbsTest[1][j])
            }
        }
        console.log(numbsTest)
    },
    unbind:function(){
        console.log("unbind")
         $("#saveSettings").off("click")
    },
    bind:function(){
        $("#saveSettings").click(function(){
            console.log("here")  
            settings.saveSettings();
        });
    },
    invalidInput:function(id){
        document.getElementById(id).labels[0].style.color="red";
        $(".options").append("<div class='central-display save-x'>&#10005;</div>");
    },
    validateInputs:function(id){
        var sets=$(".set");
        for(var i=0;i<sets.length;i++){
           sets[i].labels[0].style.color="";
        }
        var x=$(".save-x")[0];
        if(x){x.outerHTML="";}
    }
};
