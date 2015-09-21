import Config from '../../../config/game-config';
import BootyPrefab from '../../../prefabs/BootyPrefab';
import PlatformPrefab from '../../../prefabs/PlatformSimplePrefab';
import KeyboardUtils from '../../../utils/KeyboardUtils';
import MenuLaunchController from '../../../controllers/MenuLaunchController';
import BootyTosser from '../../../controllers/BootyTosser';

class ThisState extends Phaser.State {

	constructor() {
		super();
		this.bootyGroup           = null;
		this.menuLaunchController = null;
	}

	preload() {
		this.game.stage.backgroundColor      = Config.stage.backgroundColor;
		PlatformPrefab.preload(this.game);
	}

	create() {

		this.menuLaunchController   = new MenuLaunchController(this.game);

		// listen to things we care about (keys, clicks, presses)
		this.addListeners();

		// set up physics
		this.game.physics.arcade.gravity.y = Config.physics.general.gravitySlowY;


		// Create a new platform
		this.platform = new PlatformPrefab(this.game, 200, this.game.world.height - 50);

		// and add it to the game
		this.game.add.existing(this.platform);

		// create our booty group
		this.bootyGroup = this.game.add.group();
	}

	addListeners() {}

	removeListeners() {
		// remove all edits to the keyboard (for now)
		this.game.input.keyboard.reset(true);

		if ( this.menuLaunchController ) {
			this.menuLaunchController.shutdown();
			this.menuLaunchController = null;
		}

	}

	shutdown() {
		this.removeListeners();
	}

	update() {}

}
export default ThisState;