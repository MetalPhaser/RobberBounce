import MGU from '../../utils/MGU';

let KEY = 'column-guide';

class Prefab extends Phaser.BitmapData {
	constructor(game, width, height, columnWidth) {
		super(game, KEY, width, height);
		this.columnWidth = columnWidth;
		this.drawColumns();
	}
	drawColumns() {
		// These functions use the canvas context to draw lines using the canvas API

		for(let x = this.game.width-this.columnWidth; x >= this.columnWidth; x -= this.columnWidth) {
			this.context.beginPath();
			this.context.strokeStyle = 'rgba(120, 120, 120, 0.1)';
			this.context.moveTo(x, 0);
			this.context.lineTo(x, this.game.height);
			this.context.stroke();
		}
	}
}
export default Prefab;