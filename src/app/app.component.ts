import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdGridListModule } from '@angular/material';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
	title = 'app works!';
	board = [];
	_dice: Array<String>;
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
		this.setDice();

		this.board = this._getFiveDiceRandom()
			.map(element => this._rollDie(element))
			.map(element => this._convertQToQu(element))
			.reduce((a, b) => [...a, ...b]);
	}

	setDice() {
		return this._dice = 'aaafrsaaeeeeaafirsadennnaeeeemaeegmuaegmnnafirsybjkqxzccenstceiiltceilptceipstddhnotdhhlordhlnordhlnoreiiittemotttensssufiprsygorrvwiprrrynootuwooottu'
			.split('')
			.reduce((a, b) => {
				if (!a.length) {
					a.push(b);
					return a;
				}
				if (a[a.length - 1].length < 6) {
					a[a.length - 1] += b;
					return a;
				} else {
					a.push(b);
					return a;
				}
			}, []);
	}

	_getFiveDiceRandom() {
		return Array(5)
			.fill(1)
			.map(element => {
				let position = Math.floor(Math.random() * this._dice.length);
				return this._dice.splice(position, 1)[0];
			});
	}

	_rollDie(die) {
		let dieArr = die.split('');
		let startIndex = Math.floor(Math.random() * die.length);
		let outputArr = Array(5)
			.fill(0)
			.map(element => {
				if (startIndex < dieArr.length) {
					return dieArr.splice(startIndex, 1);
				} else {
					return dieArr.splice(0, 1);
				}
			});
		return outputArr.join('');
	}

	_convertQToQu(str) {
		return str
			.split('')
			.map(element => {
				if (element === 'q') {
					return 'qu';
				} else {
					return element;
				}
			});
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
