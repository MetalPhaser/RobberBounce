import BaseState from '../autoTossers/TimedTosserState'

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
		let collected = this.game.gameModel.scoreCurrentLevel.itemsCollected;
		let dropped = this.game.gameModel.scoreCurrentLevel.itemsDropped;
		this.scoreLabel.text                = collected + ' / ' + dropped;
	}

	defineText() {
		this.scoreLabel                     = this.game.add.bitmapText(20, 32, 'futura-60', '', 60);
	}

}
export default ThisState;