import MGU from '../../utils/MGU';

let KEY = 'trajectory-guide';

class Prefab extends Phaser.BitmapData {
	constructor(game, projectile) {
		super(game, KEY, game.world.width, game.world.height);

		this.projectile = projectile;

		this.context.strokeStyle = 'rgba(120, 120, 120, 0.6)';
		this.randomizeFillStyle();
		this.padding = 15;

		this.redraw();
	}
	reset() {
		this.cls();
	}
	remove() {
		this.reset();
	}
	redraw() {
		this.cls();
		this.redrawObjectHighlight();
	}
	redrawObjectHighlight() {
		let x = this.projectile.body.x;
		let y = this.projectile.body.y;
		let w = this.projectile.body.width;
		let h = this.projectile.body.height;

		// rectangles
		//this.context.fillRect(x - this.padding, y - this.padding,
		//                      w + (this.padding*2), h + (this.padding*2));

		// circles
		this.circle(x + (w/2), y + (h/2), w * 1.3);
	}
	randomizeFillStyle() {
		let val1 = MGU.random(255);
		let val2 = MGU.random(255);
		let val3 = MGU.random(255);

		this.context.fillStyle = 'rgba('+val1+', '+val2+', '+val3+', 0.5)';
	}
}
export default Prefab;