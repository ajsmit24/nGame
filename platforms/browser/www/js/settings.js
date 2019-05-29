var settings={
    setup:function(){
        console.log("set")
       settings.bind();
    },
    saveSettings:function(){
        console.log("saving")      
        var n=document.getElementById("playTo").value;
        var minium=document.getElementById("min").value;
        var maxium=document.getElementById("max").value;
        var numbOfCards=document.getElementById("numbOfCards").value;
        var onlyNumbs=/\d+$/g;
        if(onlyNumbs.text(n)){
            game.n=n;
        }else{

        }
        if(onlyNumbs.text(minium)){
            game.minium=minium
        }else{

        }
        if(onlyNumbs.text(maxium)){
            game.maxium=maxium
        }else{

        }
        if(onlyNumbs.text(numbOfCards)){
            game.using=numbOfCards
        }else{

        }
        settings.unbind();
        $(".options").append("<div class='central-display save-check'>✓</div>");
        setTimeout(function(){
            settings.bind();
             app.pageNavigation.switchPage(0);
        }, 2000);
    },
    unbind:function(){
        console.log("unbind")
         $("#saveSettings").off("click")
    },
    bind:function(){
        console.log("bind:", $("#saveSettings"))
        $("#saveSettings").click(function(){
            console.log("here")  
            settings.saveSettings();
        });
    }
};
