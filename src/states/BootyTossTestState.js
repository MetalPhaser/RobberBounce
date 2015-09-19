import Config from '../config/game-config';
import BootyPrefab from '../prefabs/BootyPrefab';
import KeyboardUtils from '../utils/KeyboardUtils';
import MenuLaunchController from '../utils/MenuLaunchController';


class ThisState extends Phaser.State {

	constructor() {
		super();
		this.prefabGroup = null;
		this.menuLaunchController   = null;

		// RANDOM NUMBER GENERATOR
		var seed = 0;
		this.rng = new Phaser.RandomDataGenerator([(seed).toString()]);

		this.throwKey = null;
	}

	preload() {
		this.game.stage.backgroundColor      = Config.stage.backgroundColor;
		BootyPrefab.preload(this.game);
	}

	create() {

		this.game.bootyScore = 0;
		this.game.bootyFails = 0;

		this.menuLaunchController   = new MenuLaunchController(this.game);

		// listen to things we care about (keys, clicks, presses)
		this.addListeners();

		// set up physics
		this.game.physics.arcade.gravity.y = Config.physics.general.gravityY;

		// create our booty group
		this.prefabGroup = this.game.add.group();

		this.game.time.events.repeat(Phaser.Timer.SECOND * 1.5, 25, this.throwBooty, this);

		this.throwBooty();
	}

	throwBooty(x, y, xV, yV) {
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
		this.prefabGroup.add(prefab);
	}


	addListeners() {
		this.throwKey          = KeyboardUtils.getKey(this.game, Phaser.Keyboard.SPACEBAR);
		this.throwKey.onDown.add(this.throwBooty, this);
	}

	removeListeners() {
		// remove all edits to the keyboard (for now)
		this.game.input.keyboard.reset(true);
	}

	shutdown() {
		this.removeListeners();
		this.menuLaunchController.shutdown();
		this.menuLaunchController = null;
	}

	update() {}

}
export default ThisState;