import BaseGameState from './BaseGameState';
//import Config from '../config/game-config';
import BootyPrefab from '../prefabs/BootyPrefab';
import KeyboardUtils from '../utils/KeyboardUtils';
import MGU from '../utils/MGU';
import BootyTosser from '../controllers/BootyTosser';

import ColumnGuide from '../prefabs/guides/ColumnGuidePrefab';

class GameState extends BaseGameState {
	constructor() {
		super();

		this.bootyGroup         = null;
		this.scoreLabel         = null;
		this.bootyTossers       = [];

		this.guides             = [];

		this._lastCollectedCount = 0;
	}
	preload() {
		super.preload();
		BootyPrefab.preload(this.game);
	}
	create() {
		super.create();

		this.addGuides();

		this.defineText();
		this.defineTossers();

		this.addListeners();
	}

	addGuides() {
		this.guides.push(new ColumnGuide(this.game, this.game.world.width, this.game.world.height, this.getColumnWidth()));

		this.game.add.image(0, 0, this.guides[0]);
	}

	defineTossers() {
		this.bootyGroup = this.game.add.group();
		this.addATosser();
	}
	addATosser() {
		this.bootyTossers.push(new BootyTosser(this.game, this.bootyGroup, MGU.random(1500,800)));
	}
	doTosserWork() {
		let collected           = this.game.gameModel.scoreCurrentLevel.itemsCollected;

		// ADD A NEW TOSSER
		if (this._lastCollectedCount !== collected && collected % 2 === 0 ) {
			this.addATosser();
			this._lastCollectedCount = collected;
		}

		// TELL TOSSERS TO TOSS
		this.bootyTossers.every( (elem) => elem.tossWhenReady() );
	}
	update() {
		super.update();
		// COLLIDE BOOTY ITEMS AND PLATFORM
		this.game.physics.arcade.collide(this.bootyGroup, this.platform);

		// LET TOSSER-CREW WORK
		this.doTosserWork();

		// REDRAW SCORE BOARD
		this.redrawScoreboard();
	}
	redrawScoreboard() {
		let collected           = this.game.gameModel.scoreCurrentLevel.itemsCollected;
		let dropped             = this.game.gameModel.scoreCurrentLevel.itemsDropped;
		this.scoreLabel.text    = collected + ' / ' + dropped;
	}
	shutdown() {
		super.shutdown();
		this.removeListeners();
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
	addListeners() {
		super.addListeners();
		//this.throwKey          = KeyboardUtils.getKey(this.game, Phaser.Keyboard.SPACEBAR);
		//this.throwKey.onDown.add(this.throwBooty, this);
	}
	removeListeners() {
		super.removeListeners();
		// remove all edits to the keyboard (for now)
		this.game.input.keyboard.reset(true);
	}

	/**
	 *  STATE-SPECIFIC FUNCTIONS
	 */
	getColumnWidth() {
		return MGU.getIntValue(this.game.world.width / 3);
	}

}
export default GameState;