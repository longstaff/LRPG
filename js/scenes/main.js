LRPG = {
	player:{health:{max:10, current:10}, damage:2}
}

function endGame(){
	Crafty.scene("playerDead");
}

Crafty.scene("main", function () {
    Crafty.background("#000");

    this.button = Crafty.e("2D, DOM, Text, Mouse").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("Click to Battle!")
            .css({ "text-align": "center", "color":"#FFF" })
            .bind("Click", function(){
				Crafty.scene("battleScene");
            });
},function(){
    this.button.unbind("Click");
    this.button.destroy();
});

Crafty.scene("battleScene", function () {
    Crafty.background("#000");

    var type = Math.floor(Math.random()*6);
    this.battle = Crafty.e("Battle").battle(1, type, LRPG.player, {health:{max:6, current:6}, damage:1});

    this.bind("Battle.deadPlayer", endGame);
    this.bind("Battle.deadEnemy", function(){
    	LRPG.player = this.battle.getPlayer();
		Crafty.scene("main");
    });

}, function(){
	this.battle.destroy();
	this.unbind("Battle.deadPlayer");
    this.unbind("Battle.deadEnemy");
});

Crafty.scene("playerDead", function () {
    Crafty.background("#000");
    
    this.button = Crafty.e("2D, DOM, Text, Mouse").attr({ w: 100, h: 50, x: 150, y: 120 })
            .text("You are dead, click to start again!")
            .css({ "text-align": "center", "color":"#FFF" })
            .bind("Click", function(){
            	LRPG.player = {health:{max:20, current:20}, damage:2};
				Crafty.scene("main");
            });

}, function(){
    this.button.unbind("Click");
    this.button.destroy();
});
