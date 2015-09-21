import Config from '../../config/game-config';

import BootyPrefab from '../../prefabs/BootyPrefab';
import PlatformPrefab from '../../prefabs/PlatformSimplePrefab';

import KeyboardUtils from '../../utils/KeyboardUtils';
import MenuLaunchController from '../../controllers/MenuLaunchController';
import BaseState from './autoTossers/TimedTosserState'

class ThisState extends BaseState {

	constructor() {
		super();
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();

		this.game.physics.arcade.gravity.y = 400;
	}

	update() {
		super.update();
	}
	shutdown() {
		super.shutdown();
	}

}
export default ThisState;