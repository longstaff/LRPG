
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