
Crafty.c("MultiChoiceSolution", {
	
    _selectedIndex:0,
    _choices:[],

    init: function() {
        this.requires("Keyboard").bind('KeyDown', this.keyboardHandler);
        this.requires("Mouse, 2D");
    },

    multiChoiceSolution: function(answers) { 
        this.populateChoices(answers);
        return this;
    },

    populateChoices: function(answers){
        var self = this, i;

        if(this._choices.length !== 0){
            for(i=0; i<this._choices.length; i++){
                this.detach(this._choices[i]);
                this._choices[i].destroy();
            }
            this._choices = [];
        }

        for(i=0; i<answers.length; i++){
            var index = i;
            this._choices[i] = Crafty.e("MultiChoiceAnswer")
                .multiChoiceAnswer(answers[i], i, i===0)
                .bind('Click', function(e) {
                    self.submitChoice();
                })
                .bind('MouseOver', function(e) {
                    self.selectChoice(this.getIndex());
                })
                .attr({
                    x:this.x, y:this.y + (20*i)
                });

            this.attach(this._choices[i]);
        }

        this._selectedIndex = 0;
    },

    keyboardHandler:function(ev){
        if (this.isDown('ENTER')){
            this.submitChoice();
        }
        else if (this.isDown('UP_ARROW')){
            var index = this._selectedIndex;
            if(index >0){
                index = index - 1;
                this.selectChoice(index);
            }
        }
        else if (this.isDown('DOWN_ARROW')){
            var index = this._selectedIndex;
            if(index < this._choices.length -1){
                index = index + 1;
                this.selectChoice(index);
            }
        }
    },

    selectChoice: function(newIndex){
        this._choices[this._selectedIndex].render();
        this._selectedIndex = newIndex;
        this._choices[this._selectedIndex].renderSelected();
    },

    submitChoice: function(){
        Crafty.trigger("Battle.answer", {submit:this._choices[this._selectedIndex].getAnswer()});
    }

});

Crafty.c("MultiChoiceAnswer", {
    
    _answer:"",
    _index:0,

    init: function() {
        this.requires("2D, DOM, Mouse, Text");
    },

    multiChoiceAnswer: function(answer, index, selected) { 
        this.attr({w:170, h:20});
        this._answer = answer;
        this._index = index;
        if(selected) this.renderSelected();
        else this.render();
        return this;
    },

    render:function(){
        this.text(this._answer)
            .css({ "color":"#000" });
    },

    renderSelected:function(){
        this.text(this._answer)
            .css({ "color":"#F00" });
    },

    getAnswer:function(){
        return this._answer;
    },

    getIndex:function(){
        return this._index;
    }

});

Crafty.c("LetterHintSolution", {
    
    _selectedIndex:0,
    _letters:[],

    init: function() {
        this.requires("2D, Keyboard").bind('KeyDown', this.keyboardHandler);
    },

    letterHintSolution: function(answer) { 
        this.populateLetters(answer[0].length);
        return this;
    },

    populateLetters: function(length){
        var self = this, i;

        if(this._letters.length !== 0){
            for(i=0; i<this._letters.length; i++){
                this.detach(this._letters[i]);
                this._letters[i].destroy();
            }
            this._letters = [];
        }

        for(i=0; i<length; i++){
            this._letters[i] = Crafty.e("LetterAnswer")
                .letterAnswer(i, i===0, "_")
                .attr({
                    x:this.x + (14*i), y:this.y 
                });

            this.attach(this._letters[i]);
        }

        this._selectedIndex = 0;
    },

    keyboardHandler:function(ev){
        if (this.isDown('ENTER')){
            this.submitChoice();
        }
        else if (this.isDown('BACKSPACE')){
            if(this._selectedIndex > 0){
                if(this._letters.length > this._selectedIndex)
                    this._letters[this._selectedIndex].setHighlight(false);
                this._selectedIndex = this._selectedIndex - 1;
                this._letters[this._selectedIndex].clearLetter().setHighlight(true);

                for (var i = this._selectedIndex; i < this._letters.length-1; i++) {
                    this._letters[i].setLetter(this._letters[i+1].getLetter());
                };
            }
            //STOP BROWSER BACK
            ev.preventDefault();
        }
        else if (this.isDown('LEFT_ARROW')){
            if(this._selectedIndex > 0){
                if(this._letters.length > this._selectedIndex)
                    this._letters[this._selectedIndex].setHighlight(false);
                this._selectedIndex = this._selectedIndex - 1;
                this._letters[this._selectedIndex].setHighlight(true);
            }
        }
        else if (this.isDown('RIGHT_ARROW')){
            if(this._selectedIndex < this._letters.length){
                if(!(this._letters[this._selectedIndex].getLetter() === "_" && this._letters[this._selectedIndex+1].getLetter() === "_")){
                    this._letters[this._selectedIndex].setHighlight(false);
                    this._selectedIndex = this._selectedIndex + 1;
                    this._letters[this._selectedIndex].setHighlight(true);
                }
            }
        }
        else if(this._letters.length > this._selectedIndex && (ev.key >= 65 && ev.key <= 90 || ev.key === 222 || ev.key === 192)){
            
            for (var i = this._letters.length-1; i>this._selectedIndex; i--) {
                this._letters[i].setLetter(this._letters[i-1].getLetter());
            };

            this._letters[this._selectedIndex].setLetter(this.fixedFromCharCode(ev.keyIdentifier)).setHighlight(false);
            this._selectedIndex = this._selectedIndex + 1;
            if(this._letters.length > this._selectedIndex)
                this._letters[this._selectedIndex].setHighlight(true);
        }
    },

    fixedFromCharCode:function (codePt) {
        codePt = parseInt(codePt.substring(2), 16);
        if(codePt === 192) return "&Ouml;";
        else if(codePt === 222) return "&Auml;";
        else if (codePt > 0xFFFF) {
            codePt -= 0x10000;
            return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        } else {
            return String.fromCharCode(codePt);
        }
    },

    submitChoice: function(){
        var answer = "";
        for(i=0; i<this._letters.length; i++){
            answer = answer.concat(this._letters[i].getLetter());
        }
        Crafty.trigger("Battle.answer", {submit:answer});
    }

});


Crafty.c("FreeTypeSolution", {
    
    _selectedIndex:0,
    _letters:[],

    init: function() {
        this.requires("2D, Keyboard").bind('KeyDown', this.keyboardHandler);
    },

    freeTypeSolution: function() { 
        this.populateLetters();
        return this;
    },

    populateLetters: function(){
        var self = this, i;

        if(this._letters.length !== 0){
            for(i=0; i<this._letters.length; i++){
                this.detach(this._letters[i]);
                this._letters[i].destroy();
            }
            this._letters = [];
        }
        for(i=0; i<15; i++){
            this._letters[i] = Crafty.e("LetterAnswer")
                .letterAnswer(i, i===0, "")
                .attr({
                    x:this.x + (12*i), y:this.y 
                });

            this.attach(this._letters[i]);
        }

        this._selectedIndex = 0;
    },

    keyboardHandler:function(ev){
        if (this.isDown('ENTER')){
            this.submitChoice();
        }
        else if (this.isDown('BACKSPACE')){
            if(this._selectedIndex > 0){
                if(this._letters.length > this._selectedIndex)
                    this._letters[this._selectedIndex].setHighlight(false);
                this._selectedIndex = this._selectedIndex - 1;
                this._letters[this._selectedIndex].clearLetter().setHighlight(true);

                for (var i = this._selectedIndex; i < this._letters.length-1; i++) {
                    this._letters[i].setLetter(this._letters[i+1].getLetter());
                };
            }
            //STOP BROWSER BACK
            ev.preventDefault();
        }
        else if (this.isDown('LEFT_ARROW')){
            if(this._selectedIndex > 0){
                if(this._letters.length > this._selectedIndex)
                    this._letters[this._selectedIndex].setHighlight(false);
                this._selectedIndex = this._selectedIndex - 1;
                this._letters[this._selectedIndex].setHighlight(true);
            }
        }
        else if (this.isDown('RIGHT_ARROW')){
            if(this._selectedIndex < this._letters.length){
                if(!(this._letters[this._selectedIndex].getLetter() === "" && this._letters[this._selectedIndex+1].getLetter() === "")){
                    this._letters[this._selectedIndex].setHighlight(false);
                    this._selectedIndex = this._selectedIndex + 1;
                    this._letters[this._selectedIndex].setHighlight(true);
                }
            }
        }
        else if(this._letters.length > this._selectedIndex && (ev.key >= 65 && ev.key <= 90 || ev.key === 222 || ev.key === 192)){
            
            for (var i = this._letters.length-1; i>this._selectedIndex; i--) {
                this._letters[i].setLetter(this._letters[i-1].getLetter());
            };

            this._letters[this._selectedIndex].setLetter(this.fixedFromCharCode(ev.keyIdentifier)).setHighlight(false);
            this._selectedIndex = this._selectedIndex + 1;
            if(this._letters.length > this._selectedIndex)
                this._letters[this._selectedIndex].setHighlight(true);
        }
    },

    fixedFromCharCode:function (codePt) {
        codePt = parseInt(codePt.substring(2), 16);
        if(codePt === 192) return "&Ouml;";
        else if(codePt === 222) return "&Auml;";
        else if (codePt > 0xFFFF) {
            codePt -= 0x10000;
            return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        } else {
            return String.fromCharCode(codePt);
        }
    },

    submitChoice: function(){
        var answer = "";
        for(i=0; i<this._letters.length; i++){
            var letter = this._letters[i].getLetter();
            if(letter !== ""){
                answer = answer.concat(letter);
            }
            else{
                break;
            }
        }
        Crafty.trigger("Battle.answer", {submit:answer});
    }

});

Crafty.c("LetterAnswer", {
    
    _default:"",
    _answer:"",
    _index:0,
    _highlight:false,

    init: function() {
        this.requires("2D, DOM, Mouse, Text");
    },

    letterAnswer: function(index, selected, defaultLetter) { 
        this.attr({w:12, h:20}).css({"background":"#ccc"});
        this._index = index;
        this._default = defaultLetter;
        this._answer = defaultLetter;
        if(selected) this._highlight = true;
        this.render();
        return this;
    },

    clearLetter: function() {
        this._answer = this._default;
        this.render();
        return this;
    },

    getLetter: function() {
        return this._answer;
    },
    setLetter: function(letter) {
        this._answer = letter;
        this.render();
        return this;
    },

    setHighlight:function(highlight){
        this._highlight = highlight;
        this.render();
        return this;
    },

    render:function(){
        this.text(this._answer)
        if(this._highlight){
            this.css({ "color":"#F00" });
        }
        else{
            this.css({ "color":"#000" });
        }
    },

    getAnswer:function(){
        return this._answer;
    },

    getIndex:function(){
        return this._index;
    }

});

Crafty.c("AnswerScreen", {

    init: function() {
        this.requires("2D, DOM, Text, Mouse, Keyboard").
            bind('KeyDown', this.respondKeyboard).
            attr({w:200,h:50});
        this.bind('Click', this.respondMouse);
        
    },

    answerScreen: function(correct) { 
        var response = correct ? "Correct!<br/>Next" : "Wrong!<br/>Next";
        var colour = correct ? "#0F0" : "#F00";
        this.text(response).css({ "color":colour, "text-align":"center" });
        return this;
    },

    respondKeyboard: function(ev){
        if (this.isDown('ENTER')){
            Crafty.trigger("Battle.step");
        }
    },

    respondMouse:function(ev){
        Crafty.trigger("Battle.step");
    }
});