
let SPRITEKEY = 'platformPrefab';
let IMAGEPATH = 'images/tests/green_rectangle.png';

class Prefab extends Phaser.Sprite {

	static get key () {
		return SPRITEKEY;
	}

	static preload (game) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

		game.load.image(SPRITEKEY, IMAGEPATH);
	}
	
	constructor(game, x, y) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

		super(game, x, y, Prefab.key);

		// enable physics on the sprite
		// this is needed for collision detection
		this.game.physics.arcade.enableBody(this);

		// collide with the world?
		this.body.collideWorldBounds = true;

		// be unaffected by gravity ?
		//this.body.allowGravity = false;

		// make the Sprite immovable?
		//this.body.immovable = true;

		// perhaps set the sprite's anchor
		//this.anchor.setTo(0.5, 1.0);

		// add and play any animations
		//this.animations.add('flap');
		//this.animations.play('flap', 12, true);

		this.width = 100;
		this.height = 20;
	}
	update() {
		//console.log('physicsElapsed', this.game.time.physicsElapsed);
	}

	// Example method
	//jump() {
	//	this.body.velocity.y = -400;
	//}
}
export default Prefab;