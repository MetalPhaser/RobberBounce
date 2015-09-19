import KeyboardUtils from '../utils/KeyboardUtils';
import MenuState from '../states/MenuState';

class MenuLaunchController {
	constructor(game) {
		this.game     = game;
		this.MENUKEY  = null;
		this.addListeners();
	}
	addListeners() {
		this.MENUKEY          = KeyboardUtils.getKey(this.game, Phaser.Keyboard.ESC);
		this.MENUKEY.onDown.add(this.menuKeyPressed, this);
	}
	removeListeners() {
		// remove all edits to the keyboard (for now)
		this.game.input.keyboard.reset(true);
		this.game.input.keyboard.onDownCallback = null;
	}
	shutdown() {
		this.removeListeners();
	}
	menuKeyPressed() {
		this.game.state.add('MenuState', MenuState, false);
		this.game.state.start('MenuState');
	}
}
export default MenuLaunchController;