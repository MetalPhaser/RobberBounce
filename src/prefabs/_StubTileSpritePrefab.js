
let SpriteKey = '_REPLACE_WITH_SPRITE_KEY_ADDED_TO_GAME_';

class Prefab extends Phaser.TileSprite {
	constructor(game, x, y, width, height, frame) {
		super(this, game, x, y, width, height, SpriteKey, frame);

		// start scrolling our tile?
		// pixels per second in x and y
		//this.autoScroll(-200,0);

		// enable physics on the sprite
		// this is needed for collision detection
		//this.game.physics.arcade.enableBody(this);

		// perhaps set the sprite's anchor to the center
		//this.anchor.setTo(0.5, 0.5);

		// add and play any animations
		//this.animations.add('walk');
		//this.animations.play('walk', 12, true);

	}
	update() {}
}
export default State;