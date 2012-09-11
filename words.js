window.words = function(){
	
	var ENG = 0;
	var FIN = 1;

	var level1 = [
		["English1", "Finnish1"],
		["English2", "Finnish2"],
		["English3", "Finnish3"],
		["English4", "Finnish4"],
		["English5", "Finnish5"],
		["English6", "Finnish6"],
		["English7", "Finnish7"]
	];
	var level2 = [
		["English1", "Finnish1"],
		["English2", "Finnish2"],
		["English3", "Finnish3"],
		["English4", "Finnish4"],
		["English5", "Finnish5"],
		["English6", "Finnish6"],
		["English7", "Finnish7"]
	];
	var level3 = [
		["English1", "Finnish1"],
		["English2", "Finnish2"],
		["English3", "Finnish3"],
		["English4", "Finnish4"],
		["English5", "Finnish5"],
		["English6", "Finnish6"],
		["English7", "Finnish7"]
	];
	var level4 = [
		["English1", "Finnish1"],
		["English2", "Finnish2"],
		["English3", "Finnish3"],
		["English4", "Finnish4"],
		["English5", "Finnish5"],
		["English6", "Finnish6"],
		["English7", "Finnish7"]
	];
	var wordList = [level1, level2, level3, level4];

	function getWordRandom(byLevel, lang){
		var wordArray = wordList[byLevel];
		if(wordArray){
			var index = Math.floor(Math.random(wordArray.length));
			var word;
			if(lang === ENG){
				word = wordArray[index][ENG];
			}
			else if(lang === FIN){
				word = wordArray[index][FIN];
			}
			else{
				word = wordArray[index];
			}
			return {
				ind:index,
				word:word
			}
		}
		else return null;
	}

	function getWordAt(byLevel, index, lang){
		var wordArray = wordList[byLevel];
		if(wordArray && wordArray[index]){
			var word;
			if(lang === ENG){
				word = wordArray[index][ENG];
			}
			else if(lang === FIN){
				word = wordArray[index][FIN];
			}
			else{
				word = wordArray[index];
			}
			return word;
		}
		else return null;
	}

	function testWordAt(test, byLevel, index, lang){
		var wordArray = wordList[byLevel];
		if(wordArray && wordArray[index]){
			if(wordArray[index][lang] === test){
				return true;
			}
			else{
				return false;
			}
		}
		else return null;
	}

	return {
		getWordRandom:getWordRandom,
		getWordAt:getWordAt,
		testWordAt:testWordAt
	}

}();

window.phrase = function(){
	
	var ENG = 0;
	var FIN = 1;

	var level1 = [
		[["English", "number", "one"], ["Finnish", "number", "one"]],
		[["English", "number", "two"], ["Finnish", "number", "two"]],
		[["English", "number", "three"], ["Finnish", "number", "three"]],
		[["English", "number", "four"], ["Finnish", "number", "four"]],
		[["English", "number", "five"], ["Finnish", "number", "five"]],
		[["English", "number", "six"], ["Finnish", "number", "six"]],
		[["English", "number", "seven"], ["Finnish", "number", "seven"]]
	];
	var level2 = [
		[["English", "number", "one"], ["Finnish", "number", "one"]],
		[["English", "number", "two"], ["Finnish", "number", "two"]],
		[["English", "number", "three"], ["Finnish", "number", "three"]],
		[["English", "number", "four"], ["Finnish", "number", "four"]],
		[["English", "number", "five"], ["Finnish", "number", "five"]],
		[["English", "number", "six"], ["Finnish", "number", "six"]],
		[["English", "number", "seven"], ["Finnish", "number", "seven"]]
	];
	var level3 = [
		[["English", "number", "one"], ["Finnish", "number", "one"]],
		[["English", "number", "two"], ["Finnish", "number", "two"]],
		[["English", "number", "three"], ["Finnish", "number", "three"]],
		[["English", "number", "four"], ["Finnish", "number", "four"]],
		[["English", "number", "five"], ["Finnish", "number", "five"]],
		[["English", "number", "six"], ["Finnish", "number", "six"]],
		[["English", "number", "seven"], ["Finnish", "number", "seven"]]
	];
	var level4 = [
		[["English", "number", "one"], ["Finnish", "number", "one"]],
		[["English", "number", "two"], ["Finnish", "number", "two"]],
		[["English", "number", "three"], ["Finnish", "number", "three"]],
		[["English", "number", "four"], ["Finnish", "number", "four"]],
		[["English", "number", "five"], ["Finnish", "number", "five"]],
		[["English", "number", "six"], ["Finnish", "number", "six"]],
		[["English", "number", "seven"], ["Finnish", "number", "seven"]]
	];
	var phraseList = [level1, level2, level3, level4];

	function getPhraseRandom(byLevel, lang){
		var phraseArray = phraseList[byLevel];
		if(phraseArray){
			var index = Math.floor(Math.random(phraseArray.length));
			var phrase;
			if(lang === ENG){
				phrase = phraseArray[index][ENG].join(" ");
			}
			else if(lang === FIN){
				phrase = phraseArray[index][FIN].join(" ");
			}
			else{
				phrase = phraseArray[index];
			}
			return {
				ind:index,
				word:phrase
			}
		}
		else return null;
	}

	function getPhraseAt(byLevel, index, lang){
		var phraseArray = phraseList[byLevel];
		if(phraseArray && phraseArray[index]){
			var phrase;
			if(lang === ENG){
				phrase = phraseArray[index][ENG].join(" ");
			}
			else if(lang === FIN){
				phrase = phraseArray[index][FIN].join(" ");
			}
			else{
				phrase = phraseArray[index];
			}
			return phrase;
		}
		else return null;
	}

	function getPhraseLengthAt(byLevel, index,  lang){
		var phraseArray = phraseList[byLevel];
		if(phraseArray && phraseArray[index]){
			var phraseLength;
			if(lang === ENG){
				phraseLength = phraseArray[index][ENG].length;
			}
			else if(lang === FIN){
				phraseLength = phraseArray[index][FIN].length;
			}
			else{
				phraseLength = 0;
			}
			return phraseLength;
		}
		else return null;
	}

	function testPhraseWordAt(test, byLevel, index, word, lang){
		var phraseArray = phraseList[byLevel];
		if(phraseArray && phraseArray[index] && phraseArray[index][lang]){
			if(phraseArray[index][lang][word] === test){
				return true;
			}
			else{
				return false;
			}
		}
		else return null;
	}

	return {
		getPhraseRandom:getPhraseRandom,
		getPhraseAt:getPhraseAt,
		getPhraseLengthAt:getPhraseLengthAt,
		testPhraseWordAt:testWordAt
	}

}();