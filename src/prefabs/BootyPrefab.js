import ConfigPrefab from './ConfigPrefab';

import MGU from '../utils/MGU'
import GameFuncs from '../utils/GameFuncs'
import GameConfig from '../config/game-config';

import TrajectoryGuide from './guides/TrajectoryGuidePrefab';
import ObjectHighlightGuide from './guides/ObjectHighlightGuidePrefab';

let SPRITEKEY = 'bootyPrefab';
let IMAGEPATH = 'images/tests/green_rectangle.png';

class BootyPrefab extends ConfigPrefab {
	constructor(game, x=0, y=0, xVelocity=0, yVelocity=0) {

		// get random type
		var typeKey         = game.gameModel.booty.types[MGU.random(game.gameModel.booty.types.length-1)];
		var config          = game.gameModel.booty.entities[typeKey];

		// call ConfigPrefab class
		super(game, config, x, y);

		// PLAY IDLE ANIMATION
		this.animations.play('idle');

		this.useTrajectoryGuide = GameConfig.debug.booty.usePathGuides;
		this.useObjectHighlight = GameConfig.debug.booty.useHighlightGuides;

		// load config from type
		this.type     = typeKey;
		this.config   = config;

		// define this object
		this.defineGeometry();
		this.definePhysics();
		this.defineAnimations();

		// set up the path guide
		if ( this.useTrajectoryGuide ) {
			this.trajectoryGuide = new TrajectoryGuide(this.game, this);
			this.game.add.image(0, 0, this.trajectoryGuide);
		}

		// add an object highlight
		if ( this.useObjectHighlight ) {
			this.objectHighlightGuide = new ObjectHighlightGuide(this.game, this);
			this.game.add.image(0, 0, this.objectHighlightGuide);
		}

		// assign velocity - if provided
		if ( xVelocity ) {
			this.body.velocity.x       = xVelocity;
		}
		if ( yVelocity ) {
			this.body.velocity.y       = yVelocity;
		}


		this.spin();
	}
	static preload () {}

	defineGeometry() {
		/**
		 *  Set Size
		 *  If you need to
		 */
		this.anchor.add(0.5, 0.5);

		//this.scale.setTo(0.05,0.05);

		//this.width = this.config.size.width;
		//this.height = this.config.size.height;

		this.scale.setTo(this.config.scale, this.config.scale);

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
		this.body.bounce.x     = 0.9;
		this.body.bounce.y     = 0.9;

		this.checkWorldBounds = true;
		//this.outOfBoundsKill = true;

		// optionally
		this.events.onOutOfBounds.add(this.outOfBounds, this);
	}
	defineAnimations() {}
	spin() {
		//this.game.add.tween(this).to({angle: 360}, 3000).start();
		this.game.add.tween(this).to({angle: -360}, MGU.random(5000,800), Phaser.Easing.Linear.NONE, true, 0, 1000, false);

	}
	update() {
		super.update();
		if ( this.trajectoryGuide ) {
			this.trajectoryGuide.redraw(this.x, this.y);
		}
		if ( this.objectHighlightGuide ) {
			this.objectHighlightGuide.redraw(this.x, this.y);
		}

	}
	outOfBounds() {
		// fail
		if ( this.didExitBottom() ) {
			this.game.gameModel.scoreCurrentLevel.itemsDropped++;
		}

		// score
		else {
			this.game.gameModel.scoreCurrentLevel.itemsCollected++;
		}

		this.printScore();
		this.kill();
	}
	kill() {
		super.kill();
		if ( this.trajectoryGuide ) {
			this.trajectoryGuide.remove();
		}
		if ( this.objectHighlightGuide ) {
			this.objectHighlightGuide.remove();
		}
	}
	reset(x=0, y=0, xVelocity=0) {
		super.reset(x, y);
		this.revive();
		this.body.velocity.x=xVelocity;
		this.body.velocity.y=0;

		if ( this.trajectoryGuide ) {
			this.trajectoryGuide.reset();
		}
		if ( this.objectHighlightGuide ) {
			this.objectHighlightGuide.reset();
		}
	}
	printScore() {

		//console.log('scoreCurrentLevel', this.game.gameModel.scoreCurrentLevel);

		//let collected = this.game.gameModel.scoreCurrentLevel.itemsCollected;
		//let dropped = this.game.gameModel.scoreCurrentLevel.itemsDropped;
		//console.log('Score', collected+'/'+dropped);
	}
	didExitBottom() {
		return this.body.y > this.game.world.height;
	}
	didExitSide() {
		return this.body.x < 0;
	}
}
export default BootyPrefab;