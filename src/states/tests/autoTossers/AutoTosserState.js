import Config from '../../../config/game-config';
import BootyPrefab from '../../../prefabs/BootyPrefab';
import KeyboardUtils from '../../../utils/KeyboardUtils';
import BootyTosser from '../../../controllers/BootyTosser';
import BaseState from '../simplePlatformAndBooty/State';

class ThisState extends BaseState {

	constructor() {
		super();

		this.bootyGroup = null;

		// RANDOM NUMBER GENERATOR
		var seed = 0;
		this.rng = new Phaser.RandomDataGenerator([(seed).toString()]);

		this.throwKey = null;

		this.bootyTossers = [];
	}

	preload() {
		super.preload();
		BootyPrefab.preload(this.game);
	}

	create() {
		super.create();
		this.addListeners();

		this.bootyGroup = this.game.add.group();
		this.bootyTossers.push(new BootyTosser(this.game, this.bootyGroup, 1000));
		this.bootyTossers.push(new BootyTosser(this.game, this.bootyGroup, 1200));
		this.bootyTossers.push(new BootyTosser(this.game, this.bootyGroup, 800));
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

	shutdown() {
		super.shutdown();
		this.removeListeners();
	}

	update() {
		super.update();
		this.game.physics.arcade.collide(this.bootyGroup, this.platform);

		this.bootyTossers.every( (elem) => elem.tossWhenReady() );

	}

}
export default ThisState;