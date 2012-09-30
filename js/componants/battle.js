window.StaticFinal = {
	MS:0,//MULTICHOICE_SINGLE = 0;
	MM:1,//MULTICHOICE_MULTI = 1;
	LS:2,//LETTERS_SINGLE = 2;
	LM:3,//LETTERS_MULTI = 3;
	FS:4,//FREETYPE_SINGLE = 4;
	FM:5//FREETYPE_MULTI = 5;
}

Crafty.c("Battle", {

	_level:0,
	_type:0,
	_playerData:{},

	_problem:{},
	_playerScreen:{},
	_enemyScreen:{},

    init: function() {
    	this._problem = Crafty.e('ProblemGenerator');
    	this._playerScreen = Crafty.e('PlayerScreen');
    	this._enemyScreen = Crafty.e('EnemyScreen');

        this.bind("Battle.answer", this.answerHandler);
        this.bind("Battle.step", this.nextQuestion);
    },

    battle: function(level, type, player, enemy) { 
    	this._level = level; 
    	this._type = type; 
        this._playerData = player; 
    	this._enemyData = enemy; 

    	this._playerScreen.attr({x:20, y:220}).healthBar({max:this._playerData.health.max, current:this._playerData.health.current});
    	this._enemyScreen.attr({x:180, y:20}).healthBar({max:this._enemyData.health.max, current:this._enemyData.health.current});
        this.initProblem();

    	return this;
    },

    initProblem:function(){
        this._problem.problemGenerator(this._level, this._type);
        var problem = this._problem.getProblem();
        this._playerScreen.playerScreen(this._type, problem.answers[0]);
        this._enemyScreen.enemyScreen(this._type, problem.question);
    },

    answerHandler:function(ev){
        var isCorrect = this._problem.checkAnswer(ev.submit);
        
        //CHECK IF MULTIPLE
        if(this._type === StaticFinal.MM || this._type === StaticFinal.LM || this._type === StaticFinal.FM){
            if(isCorrect === false){
                console.log("isWrong");
                //WRONG ANSWER
                //TODO: DO DAMAGE HERE
                this._playerScreen.answer(false);
                this._enemyScreen.answer(false);
            }
            var nextProblem = this._problem.getNext();
            if(nextProblem){
                console.log("isNext", nextProblem);
                //SET NEXT PROBLEM
                this._playerScreen.makeSolution(nextProblem);
                this._enemyScreen.answer(true);
            }
            else{
                console.log("noNext", nextProblem);
                //FINISHED PROBLEM
                //TODO: DO DAMAGE HERE
                this._playerScreen.answer(true);
                this._enemyScreen.answer(true);
            }
        }
        else{
            //SINGLE ONLY, COMPLETE
            this._playerScreen.answer(isCorrect);
            this._enemyScreen.answer(isCorrect);
        }
    },

    nextQuestion:function(ev){
        //this._playerScreen.makeSolution();
        if(this._playerScreen.isDead()){

        }
        else if(this._enemyScreen.isDead()){

        }
        else{
            this.initProblem();
        }
    }
});