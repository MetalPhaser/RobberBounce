/**
 *  EXTENDS Phaser.Sprite
 */
class BaseSprite extends Phaser.Sprite {

	constructor(game, x, y, spriteKey) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}
		if ( !spriteKey ) {
			throw new ReferenceError('SpriteKey reference was empty');
		}

		super(game, x, y, spriteKey);

		this.defineGeometry();
		this.definePhysics();
		this.defineAnimations();
	}
	defineGeometry() {
		/**
		 *  Choose Anchor Point
		 *  If you need a new point to position with and
		 *  rotate around change the anchor point
		 */
		//this.anchor.setTo(0.5, 0.5);

		/**
		 *  Set Size
		 *  If you need to
		 */
		//this.width = 100;
		//this.height = 100;
		//this.scale = 0.5;
	}
	definePhysics() {
		/**
		 *  Enable Physics
		 *  This is needed for collision detection
		 */
		//this.game.physics.arcade.enableBody(this);

		/**
		 *  Collide with World
		 *  To make this prefab collide automatically
		 *  with the world bounds enable this
		 */
		//this.body.collideWorldBounds = true;

		/**
		 *  Unaffected by Gravity
		 *  Marking 'allowGravity' as false gives you
		 *  a prefab that does not respond to gravity
		 */
		//this.body.allowGravity = false;

		/**
		 *  Make Immovable
		 *  If you need your prefab to remain in place
		 *  until you move it yourself, this is your item
		 */
		//this.body.immovable = true;

		/**
		 *  Bounciness
		 *  If you want to define a specific rebound
		 *  value for this prefab, this is the place
		 */
		//this.body.bounce.x     = 10;
		//this.body.bounce.y     = 10;

	}
	defineAnimations() {
		/**
		 *  Animations
		 *  This is needed for collision detection
		 */
		//this.animations.add('flap');
		//this.animations.play('flap', 12, true);
	}
	update() {}
	kill() {}

}
export default BaseSprite;