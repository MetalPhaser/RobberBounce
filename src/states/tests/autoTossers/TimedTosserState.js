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

	}

	preload() {
		super.preload();
		BootyPrefab.preload(this.game);
	}

	create() {
		super.create();
		this.addListeners();

		this.bootyGroup = this.game.add.group();

		this.game.time.events.repeat(Phaser.Timer.SECOND * 1.5, 25, this.throwBooty, this);

		this.throwBooty();

	}

	throwBooty(x, y, xV, yV) {
		console.log('tried to throw');
		let xPosition = (x^0===x) ? x : this.game.world.width - 1;
		let yPosition = (y^0===y) ? y : this.rng.between(50, 300);
		let xVelocity = (xV^0===xV) ? xV : this.rng.between(-400, -100);
		let yVelocity = (yV^0===yV) ? yV : 0;

		// Create a new platform
		let prefab = new BootyPrefab(this.game, xPosition, yPosition);

		// add velocity
		prefab.body.velocity.x = xVelocity;
		prefab.body.velocity.y = yVelocity;

		// and add it to the game
		this.bootyGroup.add(prefab);
	}


	addListeners() {
		super.addListeners();
		this.throwKey          = KeyboardUtils.getKey(this.game, Phaser.Keyboard.SPACEBAR);
		this.throwKey.onDown.add(this.throwBooty, this);
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
	}

}
export default ThisState;