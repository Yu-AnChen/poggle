export default class Dice {

	dice: Array<String>;

	constructor(dice) {
		this.dice = dice;
	}

	getDiceRandom(number) {
		return Array(number)
			.fill(1)
			.map(element => {
				let position = Math.floor(Math.random() * this.dice.length);
				return this.dice.splice(position, 1)[0];
			});
	}

	rollDie(die: String, face: number) {
		let dieArr = die.split('');
		let startIndex = Math.floor(Math.random() * die.length);

		let outputArr = dieArr.splice(startIndex);
		outputArr.push(...dieArr);
		return outputArr.slice(0, face).join('');
	}

	convertQToQu(str) {
		return str === 'q' ? 'qu' : str;
		// return str
		// 	.split('')
		// 	.map(element => {
		// 		return element === 'q' ? 'qu' : element;
		// 	});
	}
}