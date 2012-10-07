Crafty.c("PlayerScreen", {

	_type:-1,
    _screen:{},
	_answers:[],

    init: function() {
        this.requires("HealthBar, 2D, DOM").
        css({"background":"#FFF"}).
        attr({w:200, h:150});
    },

    playerScreen: function(type, answers) { 
    	this.makeSolution(answers, type);
    	return this;
    },

    makeSolution:function(answers, type){
        //CATCH FIRST TIME INIT
        if(this._screen.destroy){
            this.detach(this._screen);
            this._screen.destroy();
        }

        //SET OBJECTS
        if(answers){
            this._answers = answers;
        }
        if(type !== undefined){
            this._type = type;
        }

        //RENDER NEW SOLUTIONS
    	if(this._type === StaticFinal.MS || this._type === StaticFinal.MM){
    		this._screen = Crafty.e('MultiChoiceSolution').attr({x:this.x + 10, y:this.y +10}).multiChoiceSolution(this._answers);
            this.attach(this._screen);
    	}
        else if(this._type === StaticFinal.LS || this._type === StaticFinal.LM){
            this._screen = Crafty.e('LetterHintSolution').attr({x:this.x + 10, y:this.y +10}).letterHintSolution(this._answers);
            this.attach(this._screen);
        }
    	else{
    		throw new Error("unsupported type");
    	}
    },

    answer:function(isCorrect){
        this.detach(this._screen);
        this._screen.destroy();
        this._screen = Crafty.e('AnswerScreen').attr({
            x:this.x + 10, 
            y:this.y + ((this.h - 40) /2),
            w: this.w - 20
        }).answerScreen(isCorrect);
        this.attach(this._screen);
    }
});


Crafty.c("EnemyScreen", {

    _type:-1,
    _index:0,
    _screen:{},
    _question:"",

    init: function() {
        this.requires("HealthBar, 2D, DOM").
        css({"background":"#FFF"}).
        attr({w:200, h:150});
    },

    enemyScreen: function(type, question) { 
        this.makeQuestion(question, type);
        return this;
    },

    makeQuestion:function(question, type){
        if(this._screen.destroy){
            this.detach(this._screen);
            this._screen.destroy();
        }

        if(question) this._question = question;
        if(type) this._type = type;
        this._index = 0;

        if(type === StaticFinal.MS || type === StaticFinal.LS || type === StaticFinal.FS){
            this._screen = Crafty.e('SingleQuestion').attr({
                "x": this.x+10, 
                "y": this.y + ((this.h - 40) /2),
                "w": this.w - 20
            }).singleQuestion(this._question[0])
            this._screen.highlight();
            this.attach(this._screen);
        }
        else if(type === StaticFinal.MM || type === StaticFinal.LM || type === StaticFinal.FM){
            this._screen = Crafty.e('MultipleQuestion').attr({
                "x": this.x+10, 
                "y": this.y + ((this.h - 40) /2),
                "w": this.w - 20
            }).multipleQuestion(this._question);
            this.attach(this._screen);
        }
        else{
            throw new Error("unsupported type");
        }
    },

    answer:function(isCorrect){
        this._screen.showAnswer(isCorrect, this._index);
        this._index = this._index +1;
    }
});

Crafty.c("HealthBar", {

    _healthMax:10,
    _healthCurrent:10,
    _fullBar:{},
    _currentBar:{},

    init: function() {
        this.requires("2D");
        this._fullBar = Crafty.e("2D, DOM").css({"background":"#ccc"});
        this._currentBar = Crafty.e("2D, DOM").css({"background":"#F00"});
        this.attach(this._fullBar, this._currentBar);
    },

    healthBar: function(health, left) {
        this._healthMax = health.max || 10;
        this._healthCurrent = health.current || 10;
        
        if(left){
            this._fullBar.attr({x:this.x-10, h:this.h, w:10});
            this._currentBar.attr({x:this.x-10, w:10});
        }else{
            this._fullBar.attr({x:this.x + this.w, h:this.h, w:10});
            this._currentBar.attr({x:this.x + this.w, w:10});
        }
        this.drawHealth();

        return this;
    },

    drawHealth: function(){
        var perc = this._healthCurrent/this._healthMax;
        this._currentBar.attr({h:this.h*perc, y:this.y + this.h - (this.h*perc)});
    },

    takeDamage: function(damage){
        this._healthCurrent = Math.max(this._healthCurrent - damage, 0);
        this.drawHealth();
    },

    getHealth: function(){
        return this._healthCurrent;
    },

    isDead:function(){
        if(this._healthCurrent === 0){
            return true;
        }
        else return false;
    }
});
