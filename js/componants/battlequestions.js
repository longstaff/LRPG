
Crafty.c("SingleQuestion", {
	
    init: function() {
        this.requires("2D, DOM, Text");
    },

    singleQuestion: function(problem) { 
        this.text(problem).css({ "color":"#333", "text-align":"center" });
        return this;
    },

    highlight:function(){
    	this.css({ "color":"#000" });
    },

    showAnswer:function(isCorrect){
    	var colour = isCorrect ? "#0F0" :"#F00";
        this.css({ "color":colour });
    }

});

Crafty.c("MultipleQuestion", {
	
	_questions:[],

    init: function() {
        this.requires("2D");
    },

    multipleQuestion: function(problem) {
    	var i,
    		width = 0,
    		yoffset = 0,
    		padding = 10,
    		targetWidth = this.w,
    		currentRow = [];

    	for(i=0; i<this._questions.length; i++){
    		this.detach(this._questions[i]);
    		this._questions[i].destroy();
    	}

    	this._questions = [];

		for(i=0; i<problem.length; i++){
    		this._questions[i] = Crafty.e("SingleQuestion").singleQuestion(problem[i]);
    		if(width + padding + this._questions[i].w > targetWidth){
    			this.centerRow(currentRow, targetWidth, width);
    			currentRow = [this._questions[i]];
    			yoffset = yoffset + 20;
    			width = 0;
    			console.log("overflow");
    		}
    		else{
    			currentRow.push(this._questions[i]);
    		}
    		this._questions[i].attr({x:this.x + width, y:this.y + yoffset});
			width = width + padding + 70;

    		this.attach(this._questions[i]);
    	}
    	this.centerRow(currentRow, targetWidth, width);
		this._questions[0].highlight();

        return this;
    },

    centerRow:function(array, targetWidth, width){
    	var offset = (targetWidth - width)/2;
    	for(var i=0; i<array.length; i++){
    		array[i].attr({x:array[i].x + offset});
    	}
    },

    showAnswer:function(isCorrect, index){
    	this._questions[index].showAnswer(isCorrect);
    	if(this._questions[index + 1]){
    		this._questions[index + 1].highlight();
    	}
    }

});
