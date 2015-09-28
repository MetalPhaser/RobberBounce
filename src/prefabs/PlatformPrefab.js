import MGU from '../utils/MGU';

import BaseSprite from '../utils/BaseSprite'
import Config from '../config/game-config';
import KeyboardUtils from '../utils/KeyboardUtils';

let SPRITEKEY = 'platformPrefab';
let IMAGEPATH = 'images/tests/green_rectangle.png';

class Prefab extends BaseSprite {

	constructor(game, x, y, width) {
		super(game, x, y, SPRITEKEY);
		this.width = width;
		this.addListeners();
	}
	static preload (game) {
		game.load.image(SPRITEKEY, IMAGEPATH);
	}
	defineGeometry() {
		/**
		 *  Set Size
		 *  If you need to
		 */

		//this.width = MGU.getIntValue(this.game.world.width / 3);
		this.height = 20;
	}
	definePhysics() {
		/**
		 *  Enable Physics
		 *  This is needed for collision detection
		 */
		this.game.physics.arcade.enableBody(this);

		/**
		 *  Collide with World
		 *  To make this prefab collide automatically
		 *  with the world bounds enable this
		 */
		this.body.collideWorldBounds = true;

		this.body.immovable = true;
	}
	update() {}
	kill() {
		this.removeListeners();
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

	/**
	 *  MOVE HANDLER
	 */
	movePlatformRight() {
		if ( this.platformHasRoomToMove(true) ) {
			this.position.x += this.width;
		}
	}
	movePlatformLeft() {
		if ( this.platformHasRoomToMove(false) ) {
			this.position.x -= this.width;
		}
	}
	platformHasRoomToMove(toTheRight=true) {
		var width   = this.width;
		var leftX   = this.position.x - this.anchor.x;
		var rightX  = leftX + width;

		return (!toTheRight && leftX > 0 ) || (toTheRight && rightX < this.game.world.width );
	}

}
export default Prefab;