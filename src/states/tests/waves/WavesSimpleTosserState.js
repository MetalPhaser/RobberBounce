import BaseState from '../autoTossers/AutoTosserState'

class ThisState extends BaseState {

	create() {
		super.create();
		this.scoreLabel                     = null;
		this.defineText();
		console.log('AUTO TOSS');
	}

	update() {
		super.update();
		let collected           = this.game.gameModel.scoreCurrentLevel.itemsCollected;
		let dropped             = this.game.gameModel.scoreCurrentLevel.itemsDropped;
		this.scoreLabel.text    = collected + ' / ' + dropped;
	}

	defineText() {
		this.scoreLabel                     = this.game.add.text(20, 32, '');

		//	Center align
		//this.scoreLabel.anchor.set(0.5);
		//this.scoreLabel.align               = 'center';

		//	Font style
		this.scoreLabel.font                = 'Arial Black';
		this.scoreLabel.fontSize            = 30;
		this.scoreLabel.fontWeight          = 'bold';

		//	Stroke color and thickness
		this.scoreLabel.strokeThickness     = 4;
		this.scoreLabel.stroke              = '#41523A';
		this.scoreLabel.fill                = '#526B48';


		let grd = this.scoreLabel.context.createLinearGradient(0, 0, 0, this.scoreLabel.height);
		//  Add in 2 color stops
		grd.addColorStop(0, '#C1F4AB');
		grd.addColorStop(1, '#526B48');

		//  And apply to the Text
		this.scoreLabel.fill = grd;

	}

}
export default ThisState;