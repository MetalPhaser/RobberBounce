import MGU from '../../utils/MGU';

let KEY = 'trajectory-guide';

class Prefab extends Phaser.BitmapData {
	constructor(game, projectile) {
		super(game, KEY, game.world.width, game.world.height);

		this.projectile             = projectile;

		//this.context.strokeStyle = 'rgba(120, 120, 120, 0.07)';
		this.context.fillStyle      = 'rgba(0, 0, 0, 0.06)';
		this.pathStepRadius         = 4;
		this.drawn                  = false;

		this.redrawMillsDelay       = 100;
		this.lastDrawnMills         = 0;
	}
	reset() {
		this.cls();
		this.drawn                  = false;
		this.lastDrawnMills         = 0;
	}
	remove() {
		this.reset();
	}
	redraw() {
		if ( !this.drawn || this.isTimeToRedraw() ) {
			this.cls();
			this.redrawProjectedPath();
		}
	}
	isTimeToRedraw() {
		return this.game.time.now - this.lastDrawnMills > this.redrawMillsDelay;
	}

	redrawProjectedPath() {
		this.drawn              = true;
		this.lastDrawnMills     = this.game.time.now;

		let projX               = this.projectile.body.x;
		let projY               = this.projectile.body.y;
		let projXCenter         = projX + this.projectile.body.width / 2;
		let projYCenter         = projY + this.projectile.body.height / 2;

		// Just a variable to make the trajectory match the actual track a little better.
		// The mismatch is probably due to rounding or the physics engine making approximations.
		var correctionFactor    = .99;

		// Draw the trajectory
		var theta               = 0;

		var x                   = 0,
		    y                   = 0;

		var drawX               = 0,
		    drawY               = 0;

		var xV                  = this.projectile.body.velocity.x,
		    yV                  = this.projectile.body.velocity.y,
		    gravity             = this.game.physics.arcade.gravity.y;

		for(var t = .2; t < 3; t += 0.04) {

			//x                     = xV * t * Math.cos(theta) * correctionFactor;
			//y                     = (xV * t * Math.sin(theta) * correctionFactor - 0.5) * (gravity+yV) * t * t;

			x                     = xV * t;
			y                     = ((-1*yV) * t) + (-0.5 * gravity * t * t);

			drawX                 = x + projXCenter - (this.pathStepRadius/2);
			drawY                 = projYCenter - y - (this.pathStepRadius/2);

			// circles
			this.circle(drawX, drawY, this.pathStepRadius);

			if (drawY > this.game.world.height) break;
		}

		this.dirty = true;
	}
	randomizeFillStyle() {
		let val1 = MGU.random(255);
		let val2 = MGU.random(255);
		let val3 = MGU.random(255);

		this.context.fillStyle = 'rgba('+val1+', '+val2+', '+val3+', 0.5)';
	}
}
export default Prefab;