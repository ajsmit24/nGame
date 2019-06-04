var settings={
    setup:function(){
       settings.bind();
       settings.populateFields();
    },
    saveSettings:function(){
        settings.validateInputs();   
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
            }, 1500);
        }else{
            for(var j=0;j<numbsTest[1].length;j++){
                settings.invalidInput(numbsTest[1][j])
            }
        }

    },
    unbind:function(){
         $("#saveSettings").off("click")
         $(".back").off()
    },
    bind:function(){
        $("#saveSettings").click(function(){
            settings.saveSettings();
        });
        $(".back").click(function(){app.pageNavigation.goBack()})
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
    },
    populateFields:function(){
        document.getElementById("playTo").value=game.n;
        document.getElementById("min").value=game.minium;
        document.getElementById("max").value=game.maxium;
        document.getElementById("numbOfCards").value=game.using;
    }
};
