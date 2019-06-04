//TODO real local storage
var storage={
    defaults:{
        n:game.n,
        using:game.using,
        minium:game.minium,
        maxium:game.maxium
    },
    current:JSON.parse(JSON.stringify(current.defaults)),
    save:function(){
        var stor=JSON.stringify(storage.current);
        window.localStorage.setItem("userData", stor);
    },
    clear:function(){
        storage.current=storage.defaults;
        storage.save();
    },
    getData:function(){
        storage.current = JSON.parse(window.localStorage.getItem("userData"));
    },
}
    //n:24,
    /**using: the number of numbers being played withh */
    //using:4,
    /**the smallest starting number */
    //minium:1,
    /**the largest starting number */
    //maxium:13,