export default class Tile {

	tileSize: number;
	row: number;
	lastTile: number;
	selectedList: Array<number>;

	constructor(num) {
		this.selectedList = [];
		this.tileSize = num * num - 1;
		this.row = num;
	}

	set last(num) {
		this.lastTile = num;

	}

	reset() {
		this.last = undefined;
		this.selectedList = [];
	}

	select(num) {
		if (this.lastTile === undefined) {
			this.selectedList.push(num);
			return this.last = num;
		}
		if (num === this.lastTile) {
			this.selectedList.pop();
			return this.last = this.selectedList[this.selectedList.length - 1];
		}

		let selectables = this.getAdjecent(this.lastTile)
			.filter(element => !this.selectedList.includes(element));
		if (!selectables.includes(num)) {
			console.info('cannot select this character');
			return;
		}
		this.selectedList.push(num);
		return this.last = num;
	}

	getAdjecent(num) {
		return [num, num - this.row, num + this.row]
			.filter(element => element >= 0 && element <= this.tileSize)
			.map(element => this._getLeftNRight(element))
			.reduce((a, b) => [...a, ...b]);
	}

	_getLeftNRight(num) {
		let rowNumber = Math.floor(num / this.row);
		return [num - 1, num, num + 1]
			.filter(element => Math.floor(element / this.row) === rowNumber);
	}
}