import BootyPrefab from '../prefabs/BootyPrefab';

class BootyTosser {
	constructor(game, bootyGroup, tossPeriodMills=2000) {
		this.game             = game;
		this.bootyGroup       = bootyGroup;
		this.nextTossMills    = this.game.time.now; // be ready immediately

		this.tossPeriodMills  = tossPeriodMills;

		// get a random generator to use
		var seed              = 0;
		this.rng              = new Phaser.RandomDataGenerator([(seed).toString()]);

		this.newCount = 0;
	}
	tossWhenReady() {
		if ( this.isReadyToToss ) {
			this.toss();
		}
	}
	toss() {

		// building
		let xPosition       = this.game.world.width - 1;

		// window
		let yPosition       = this.rng.between(50, 300); // window

		// travel speed
		let xVelocity       = this.rng.between(-400, -100);

		// Create a new booty object
		let booty           = this._getBootyObject(xPosition, yPosition, xVelocity);

		// and add it to the group
		if ( booty ) {
			this.bootyGroup.add(booty);
		}

		// recalc next toss times
		this.calculateNextTossTime();
	}
	destroy() {
		this.game          = null;
	}
	get isReadyToToss() {
		return this.game.time.now >= this.nextTossMills;
	}
	get timeUntilToss() {
		return Math.max(0, this.nextTossMills - this.game.time.now);
	}
	calculateNextTossTime() {
		this.nextTossMills = this.game.time.now + this.tossPeriodMills;
	}
	_getBootyObject(xPosition, yPosition, xVelocity) {
		// try to get one that is killed already
		let booty = this.bootyGroup.getFirstExists(false);

		if ( booty ) {
			booty.revive();
		}

		// create one if there isn't one
		else {
			this.newCount++;
			booty           = new BootyPrefab(this.game, xPosition, yPosition, xVelocity);
		}

		// set positions and velocity
		booty.x = xPosition;
		booty.y = yPosition;
		booty.body.velocity.x = xVelocity;
		booty.body.velocity.y = 0;

		console.log(' > booty count', this.bootyGroup.length);

		return booty;
	}
}
export default BootyTosser;