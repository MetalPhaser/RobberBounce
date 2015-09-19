import Config from '../config/game-config';

import BootyPrefab from '../prefabs/BootyPrefab';
import PlatformPrefab from '../prefabs/PlatformSimplePrefab';

import KeyboardUtils from '../utils/KeyboardUtils';
import MenuLaunchController from '../utils/MenuLaunchController';
import BootyTossTestState from './BootyTossTestState'

class ThisState extends BootyTossTestState {

	constructor() {
		super();

		this.platform = null;

	}

	preload() {
		super.preload();

		PlatformPrefab.preload(this.game);
	}

	create() {
		super.create();

		this.game.physics.arcade.gravity.y = 400;

		// Create a new platform
		this.platform = new PlatformPrefab(this.game, 200, this.game.world.height - 50);

		// and add it to the game
		this.game.add.existing(this.platform);

		//this.throwBooty(250, 0, 0, 0);

	}

	update() {
		super.update();
		this.game.physics.arcade.collide(this.prefabGroup, this.platform);
	}
	shutdown() {
		super.shutdown();
	}

}
export default ThisState;