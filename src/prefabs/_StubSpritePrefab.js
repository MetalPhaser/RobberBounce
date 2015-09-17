
let SpriteKey = '_REPLACE_WITH_SPRITE_KEY_ADDED_TO_GAME_';

class Prefab extends Phaser.Sprite {
	constructor(game, x, y, width, height) {
		super(this, game, x, y, width, height, SpriteKey);

		// enable physics on the sprite
		// this is needed for collision detection
		//this.game.physics.arcade.enableBody(this);

		// be unaffected by gravity ?
		//this.body.allowGravity = false;

		// make the Sprite immovable?
		//this.body.immovable = true;

		// perhaps set the sprite's anchor to the center
		//this.anchor.setTo(0.5, 0.5);

		// add and play any animations
		//this.animations.add('flap');
		//this.animations.play('flap', 12, true);

	}
	update() {}

	// Example method
	//jump() {
	//	this.body.velocity.y = -400;
	//}
}
export default State;