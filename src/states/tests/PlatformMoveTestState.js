import Config from '../../config/game-config';
import PlatformPrefab from '../../prefabs/PlatformSimplePrefab';
import KeyboardUtils from '../../utils/KeyboardUtils';
import MenuLaunchController from '../../utils/MenuLaunchController';


class ThisState extends Phaser.State {

	constructor() {
		super();
		this.platform = null;
		this.menuLaunchController   = null;
		this.leftKey = null;
		this.rightKey = null;
		this.jumpKey = null;
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
		this.game.physics.arcade.gravity.y = Config.physics.general.gravityY;

		// Create a new platform
		this.platform = new PlatformPrefab(this.game, 200, 100);

		// and add it to the game
		this.game.add.existing(this.platform);
	}

	addListeners() {

		let keyRepeatMills    = Config.controls.cursorKeyRepeatMills;

		this.leftKey          = KeyboardUtils.getRepeatingKey(this.game, Phaser.Keyboard.LEFT, keyRepeatMills);
		this.rightKey         = KeyboardUtils.getRepeatingKey(this.game, Phaser.Keyboard.RIGHT, keyRepeatMills);
		this.jumpKey          = KeyboardUtils.getKey(this.game, Phaser.Keyboard.SPACEBAR);

		this.leftKey.onDown.add(this.movePlatformLeft, this);
		this.rightKey.onDown.add(this.movePlatformRight, this);

		// keep these keypresses from going back out to the browser
		this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
		this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);
		this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);

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

	movePlatformRight() {
		if ( this.platformHasRoomToMove(true) ) {
			this.platform.position.x += this.platform.width;
		}
	}
	movePlatformLeft() {
		if ( this.platformHasRoomToMove(false) ) {
			this.platform.position.x -= this.platform.width;
		}
	}
	platformHasRoomToMove(toTheRight=true) {
		var width   = this.platform.width;
		var leftX   = this.platform.position.x - this.platform.anchor.x;
		var rightX  = leftX + width;

		return (!toTheRight && leftX > 0 ) || (toTheRight && rightX < this.game.world.width );
	}
}
export default ThisState;