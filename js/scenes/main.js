LRPG = {
	player:{health:{max:20, current:20}, damage:2}
}

function endGame(){
	console.log("THE PLAYER IS DEAD!! OH NOES!");
	Crafty.scene("playerDead");
}

Crafty.scene("main", function () {
    Crafty.background("#000");

    Crafty.e("2D, DOM, Text, Mouse").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("Click to Battle!")
            .css({ "text-align": "center", "color":"#FFF" })
            .bind("Click", function(){
				Crafty.scene("battleScene");
            });
});

Crafty.scene("battleScene", function () {
    Crafty.background("#000");
    var battle = Crafty.e("Battle").battle(1, StaticFinal.MM, LRPG.player, {health:{max:10, current:10}, damage:1});

    this.bind("Battle.deadPlayer", endGame);
    this.bind("Battle.deadEnemy", function(){
    	LRPG.player = battle.getPlayer();
		Crafty.scene("main");
    });

}, function(){
	battle.destroy();
	this.unbind("Battle.deadPlayer");
    this.unbind("Battle.deadEnemy");
});

Crafty.scene("playerDead", function () {
    Crafty.background("#000");
    
    Crafty.e("2D, DOM, Text, Mouse").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("You are dead, click to start again!")
            .css({ "text-align": "center", "color":"#FFF" })
            .bind("Click", function(){
            	LRPG.player = {health:{max:20, current:20}, damage:2};
				Crafty.scene("main");
            });

});
