const diceStr = 'aaafrsaaeeeeaafirsadennnaeeeemaeegmuaegmnnafirsybjkqxzccenstceiiltceilptceipstddhnotdhhlordhlnordhlnoreiiittemotttensssufiprsygorrvwiprrrynootuwooottu';

const dice = diceStr
	.split('')
	.reduce((a, b) => {
		if (!a.length) {
			a.push(b);
			return a;
		}
		a[a.length - 1].length < 6 ?
			a[a.length - 1] += b :
			a.push(b);
		return a;
	}, []);

export default dice;