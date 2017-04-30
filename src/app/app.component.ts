import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdGridListModule } from '@angular/material';

import dice from './dice';
import Dice from './DiceClass';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
	title = 'app works!';
	board = [];
	lastNum: number;
	selectedArr: Array<number> = [];
	wordList: Array<String> = [];
	pointList: Array<number>;
	totalScore: number;
	currentWord: String = '';

	ngOnInit() {
		this.setBoard();
		console.log(this.board);
	}

	ngOnChanges(change: SimpleChanges) {
		console.log(change);
	}

	setBoard() {
		let newDice = new Dice(dice);

		this.board = newDice.getDiceRandom(5)
			.map(element => newDice.rollDie(element, 5))
			.join('')
			.split('')
			.map(element => newDice.convertQToQu(element))
	}

	select(num) {
		if (this.lastNum === undefined) {
			this.selectedArr.push(num);
			this.lastNum = num;
			this._toWord();
			return;
		}
		if (num === this.lastNum) {
			this.selectedArr.pop();
			this.lastNum = this.selectedArr[this.selectedArr.length - 1];
			this._toWord();
			return;
		}
		let lastNum = this.lastNum;

		let selectables = [lastNum, lastNum - 5, lastNum + 5]
			.filter(element => element >=0 && element <= 24)
			.map(element => this._getNeighbors(element))
			.reduce((a, b) => [...a, ...b])
			.filter(element => !this.selectedArr.includes(element));
		if (!selectables.includes(num)) {
			console.info('cannot select this character');
			return;
		}
		this.selectedArr.push(num);
		this.lastNum = num;
		this._toWord();
		return;
	}

	_getNeighbors(num) {
		return [num - 1, num, num + 1]
			.filter(element => Math.floor(element / 5) === Math.floor(num / 5));
	}
	submitWord() {
		let add = this._addCurrentWordToWordList();
		if (add === 'fail') {
			return;
		}
		this.selectedArr = [];
		this._toWord();
		this.lastNum = undefined;
		this._updateScore();
		return;
	}

	_addCurrentWordToWordList() {
		let word = this._toWord();
		if (this.wordList.includes(word) || word.length < 3) {
			return 'fail';
		}
		this.wordList.push(word);
		return 'success';
	}

	_toWord() {
		this.currentWord = this.selectedArr
			.map(element => this.board[element])
			.join('');
		console.log(this.currentWord);
		return this.currentWord;
	}

	_updateScore() {
		this.pointList = this.wordList.map(element => this.__wordToPoint(element));
		this.totalScore = this.pointList.reduce((a, b) => a + b );
		return;
	}

	__wordToPoint(word) {
		let lengthOfWord = [3, 4, 5, 6, 7];
		let points = [1, 2, 3, 4, 5];
		let length = word.length;

		if (!lengthOfWord.includes(word)) {
			if (length > 7) {
				return 6;
			}
			// length < 3 instance is handled by this._addCurrentWordToWordList
		}
		return points[lengthOfWord.indexOf(length)];
	}


}
