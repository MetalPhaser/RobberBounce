import BaseState from '../simplePlatformAndBooty/State'

class ThisState extends BaseState {

	create() {
		super.create();
		this.scoreLabel                     = null;
		this.defineText();
	}

	preload() {
		super.preload();
		this.game.load.bitmapFont('futura-60', 'fonts/futura-60/font.png', 'fonts/futura-60/font.fnt');
	}
	update() {
		super.update();
		this.scoreLabel.text                = this.game.bootyScore + ' / ' + this.game.bootyFails;
	}

	defineText() {
		this.scoreLabel                     = this.game.add.bitmapText(20, 32, 'futura-60', '', 60);
	}

}
export default ThisState;