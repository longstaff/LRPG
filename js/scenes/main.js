Crafty.scene("main", function () {
    //generateWorld();

    //black background with some loading text
    Crafty.background("#000");
    var battle = Crafty.e("Battle").battle(1, StaticFinal.MS, {health:{max:20, current:15}}, {health:{max:10, current:10}});

});