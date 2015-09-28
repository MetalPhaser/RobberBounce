import BootyPrefab from '../prefabs/BootyPrefab';
import MGU from '../utils/MGU';

class BootyTosser {
	constructor(game, bootyGroup, tossPeriodMills=2000) {
		this.game             = game;
		this.bootyGroup       = bootyGroup;
		this.tossPeriodMills  = tossPeriodMills;
		this.nextTossMills    = null;
		this.maxTossed        = 9;
		this.tossedCount      = 0;

		this.tossOptions      = {

		};
		this.calculateNextToss();
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
		let yPosition       = MGU.random(50, 300);

		// travel speed
		let xVelocity       = MGU.random(-400, -100);

		// Create a new booty object
		let booty           = this._getBootyObject(xPosition, yPosition, xVelocity);

		// and add it to the group
		if ( booty ) {
			this.bootyGroup.add(booty);
			this.tossedCount++;
		}

		this.calculateNextToss();
	}
	destroy() {
		this.game          = null;
	}
	get isReadyToToss() {
		if ( this.tossedCount >= this.maxTossed ) {
			return false;
		}
		return this.game.time.now >= this.nextTossMills;
	}
	get timeUntilToss() {
		return Math.max(0, this.nextTossMills - this.game.time.now);
	}
	calculateNextToss() {
		// never tossed before - be ready right away
		if ( !this.nextTossMills ) {
			this.nextTossMills = this.game.time.now;
		}

		// retossing
		else {
			this.nextTossMills = this.game.time.now + this.tossPeriodMills;
		}



	}
	_getBootyObject(xPosition, yPosition, xVelocity) {
		// try to get one that is killed already
		let booty = this.bootyGroup.getFirstExists(false);

		// recycled a BOOTY, reset it!
		if ( booty ) {
			booty.reset(xPosition, yPosition, xVelocity);
		}

		// create one if there isn't one
		else {
			booty           = new BootyPrefab(this.game, xPosition, yPosition, xVelocity);
		}

		return booty;
	}
}
export default BootyTosser;