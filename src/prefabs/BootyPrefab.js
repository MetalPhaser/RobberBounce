import BaseSprite from '../utils/BaseSprite'

let SPRITEKEY = 'bootyPrefab';
let IMAGEPATH = 'images/tests/green_rectangle.png';

class Prefab extends BaseSprite {
	constructor(game, x, y) {
		super(game, x, y, SPRITEKEY);



	}
	static preload (game) {
		game.load.image(SPRITEKEY, IMAGEPATH);
	}
	defineGeometry() {
		/**
		 *  Set Size
		 *  If you need to
		 */
		this.width = 25;
		this.height = 25;
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
		this.body.collideWorldBounds = false;

		/**
		 *  Bounciness
		 *  If you want to define a specific rebound
		 *  value for this prefab, this is the place
		 */
		this.body.bounce.x     = .7;
		this.body.bounce.y     = .7;

		this.checkWorldBounds = true;
		//this.outOfBoundsKill = true;

		// optionally
		this.events.onOutOfBounds.add(this.outOfBounds, this);
	}
	defineAnimations() {}
	update() {}
	outOfBounds() {
		// fail
		if ( this.didExitBottom() ) {
			this.game.bootyFails++;
		}

		// score
		else {
			this.game.bootyScore++;

		}
		this.printScore();
		this.kill();
	}
	kill() {}
	destroy() {}

	printScore() {
		console.log('Score', this.game.bootyScore+'/'+this.game.bootyFails);
	}

	didExitBottom() {
		return this.body.y > this.game.world.height;
	}
	didExitSide() {
		return this.body.x < 0;
	}
}
export default Prefab;