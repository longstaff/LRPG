
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
                .multiChoiceAnswer(answers[i], i===0)
                .bind('Click', function(e) {
                    console.log("clicked");
                    self.submitChoice();
                })
                .bind('MouseOver', function(e) {
                    console.log("mouseover");
                    self.selectChoice(index);
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

    init: function() {
        this.requires("2D, DOM, Text, Mouse");
    },

    multiChoiceAnswer: function(answer, selected) { 
        this._answer = answer;
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
    }

});

Crafty.c("AnswerScreen", {
    init: function() {
        this.requires("2D, DOM, Text");
        this.requires("Keyboard").bind('KeyDown', this.respond);
    },

    answerScreen: function(correct) { 
        var response = correct ? "Correct!" : "Wrong!";
        var colour = correct ? "#0F0" : "#F00";
        this.text(response).css({ "color":colour, "text-align":"center" });
        return this;
    },

    respond: function(ev){
        if (this.isDown('ENTER')){
            console.log("next page");
            Crafty.trigger("Battle.step");
        }
    }
});