
Crafty.c("ProblemGenerator", {

	_level:0,
	_type:-1,
	_problem:{},

    init: function() {

    },

    problemGenerator: function(level, type) { 
    	this._level = level;
    	this.makeProblem(type);
    	return this;
    },

    makeProblem: function(type){
    	if(this._type > 0 && this._type !== type){
			this._problem.destroy();
    	}

    	this._type = type;

    	if(type === StaticFinal.MS || type === StaticFinal.MM){
    		this._problem = Crafty.e('MultiChoiceProblem').multiChoiceProblem(this._level, type);
    	}
        else if(type === StaticFinal.LS || type === StaticFinal.LM){
            this._problem = Crafty.e('LetterHintProblem').letterHintProblem(this._level, type);
        }
        else if(type === StaticFinal.FS || type === StaticFinal.FM){
            this._problem = Crafty.e('FreeTypeProblem').freeTypeProblem(this._level, type);
        }
        
    	else{
    		throw new Error("unsupported type");
    	}
    },

    getProblem: function(){
    	if(this._problem){
    		return this._problem.getProblem();
    	} 
    	else{
    		throw new Error("no problem initiated, cannot get problem");
    	}
    },

    getNext: function(){
        return this._problem.getNext();
    },

    checkAnswer: function(answer){
    	if(this._problem){
    		return this._problem.checkAnswer(answer);
    	} 
    	else{
    		throw new Error("no problem initiated, cannot check answer");
    	}
    }
});


Crafty.c("MultiChoiceProblem", {

	_level:0,
	_type:0,
	_problem:{},
    _problemList:{},
	_index:0,

    init: function() {
    	this._problemList = Crafty.e('ProblemList');
    },

    multiChoiceProblem: function(level, type) { 
    	this._level = level; 
    	this._type = type; 
    	this.makeProblem();
    	return this;
    },

    makeProblem:function(){
    	if(this._type == StaticFinal.MS){
    		this._problem = this._problemList.singleProblem(this._level, 3);
    	}else{
    		this._problem = this._problemList.multiProblem(this._level, 3, 3);
    	}
    	return this._problem;
    },

    getProblem: function(){
    	return this._problem;
    },

    getNext:function(){
        this._index = this._index+1;
        return this._problem.answers[this._index];
    },

    checkAnswer: function(answer){
    	if(this._problem){
    		if(this._problem.answers[this._index][this._problem.correct[this._index]].toLowerCase() === answer.toLowerCase()){
    			return true;
    		}else{
    			return false;
    		}
    	} 
    	else{
    		throw new Error("no problem initiated, cannot check answer");
    	}
    }
});

Crafty.c("LetterHintProblem", {

    _level:0,
    _type:0,
    _problem:{},
    _problemList:{},
    _index:0,

    init: function() {
        this._problemList = Crafty.e('ProblemList');
    },

    letterHintProblem: function(level, type) { 
        this._level = level; 
        this._type = type; 
        this.makeProblem();
        return this;
    },

    makeProblem:function(){
        if(this._type == StaticFinal.LS){
            this._problem = this._problemList.singleProblem(this._level, 1);
        }else{
            this._problem = this._problemList.multiProblem(this._level, 1, 3);
        }
        return this._problem;
    },

    getProblem: function(){
        return this._problem;
    },

    getNext:function(){
        this._index = this._index+1;
        return this._problem.answers[this._index];
    },

    checkAnswer: function(answer){
        if(this._problem){
            if(this._problem.answers[this._index][this._problem.correct[this._index]].toLowerCase() === answer.toLowerCase()){
                return true;
            }else{
                return false;
            }
        } 
        else{
            throw new Error("no problem initiated, cannot check answer");
        }
    }
});

Crafty.c("FreeTypeProblem", {

    _level:0,
    _type:0,
    _problem:{},
    _problemList:{},
    _index:0,

    init: function() {
        this._problemList = Crafty.e('ProblemList');
    },

    freeTypeProblem: function(level, type) { 
        this._level = level; 
        this._type = type; 
        this.makeProblem();
        return this;
    },

    makeProblem:function(){
        if(this._type == StaticFinal.LS){
            this._problem = this._problemList.singleProblem(this._level, 1);
        }else{
            this._problem = this._problemList.multiProblem(this._level, 1, 3);
        }
        return this._problem;
    },

    getProblem: function(){
        return this._problem;
    },

    getNext:function(){
        this._index = this._index+1;
        return this._problem.answers[this._index];
    },

    checkAnswer: function(answer){
        if(this._problem){
            if(this._problem.answers[this._index][this._problem.correct[this._index]].toLowerCase() === answer.toLowerCase()){
                return true;
            }else{
                return false;
            }
        } 
        else{
            throw new Error("no problem initiated, cannot check answer");
        }
    }
});


Crafty.c("ProblemList", {

	//STORE PROBLEM ARRAYS IN HERE

    init: function() {
    },

    singleProblem:function(level, answersLength){
    	var answers = [];
    	var question = "question";
    	var correct = 0;
        answers.push("correctAnswer");
        
        if(answersLength > 1){
            for(var i=1; i<answersLength; i++){
                answers.push("incorrectAnswer");
            }
            correct = Math.ceil(Math.random() * answersLength-1);
            answers.splice((correct), 0, answers.shift());
        }
        
        return {
            answers:[answers],
            correct:[correct],
            question:[question]
        }
    },

    multiProblem:function(level, answersLength, qustionLength){
        var answersList = [];
        var correctList = [];
        var questionList = [];

        for(var i=0; i<qustionLength; i++){
            var answers = [];
            var question = "question";
            var correct = 0;
            answers.push("correctAnswer");
            
            if(answersLength > 1){
                for(var j=1; j<answersLength; j++){
                    answers.push("incorrectAnswer");
                }
                correct = Math.ceil(Math.random() * answersLength-1);
                answers.splice((correct), 0, answers.shift());
            }

            answersList.push(answers);
            correctList.push(correct);
            questionList.push(question);
        }
    	
    	return {
    		answers:answersList,
    		correct:correctList,
    		question:questionList
    	}
    }
});