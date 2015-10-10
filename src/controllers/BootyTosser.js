import BootyPrefab from '../prefabs/BootyPrefab';
import config from '../config/game-config';
import MGU from '../utils/MGU';
import GameFuncs from '../utils/GameFuncs';

class BootyTosser {
	constructor(game, bootyGroup, tossPeriodMills=2000) {
		this.game             = game;
		this.bootyGroup       = bootyGroup;
		this.tossPeriodMills  = tossPeriodMills;
		this.nextTossMills    = null;
		this.maxTossed        = 9;
		this.tossedCount      = 0;

		this.tossOptions      = {};

		this.tossPeriodMills = 1000;


		this.calculateNextToss();
	}
	tossWhenReady() {
		if ( this.isReadyToToss ) {
			this.toss();
		}
	}
	toss() {

		// Create a new booty object (we need the size)
		let booty                   = this._getBootyObject(0, 0, 0);

		// building
		let xPosition               = this.game.world.width - 1;

		// window
		let bootyH                  = booty.height * booty.scale.x;
		let yPosition               = MGU.random(bootyH + 50, this.game.world.height - (bootyH * 10));

		// height
		let height                  = this.game.world.height - yPosition;

		// where we want to hit
		let channelWidth            = this.game.world.width / 3;
		let landingX                = channelWidth / 1.65;

		// current gravity
		let gravity                 = config.physics.general.gravitySlowY;

		// travel speed
		let xVelocity               = -1 * GameFuncs.velocityToTravelXFromHeight(landingX, height, gravity);

		// put values on the object
		booty.x                     = xPosition;
		booty.y                     = yPosition;
		booty.body.velocity.x       = xVelocity;

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