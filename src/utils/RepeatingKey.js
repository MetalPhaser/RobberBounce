class RepeatingKey extends Phaser.Key { //  extends Phaser.Key

	constructor(game, keycode, repeatPeriodMills=150) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

		super(game, keycode);

		this.onUp.add(this.onRepeaterUp, this);
		this.onHoldCallback = this.onRepeaterHoldHandler.bind(this);

		this.lastOnDownSignaled = 0;
		this.repeatPeriodMills = repeatPeriodMills;
	}

	onRepeaterUp() {
		this.lastOnDownSignaled = 0;
	}
	onRepeaterHoldHandler() {
		// time to repeat
		if ( this.game.time.now - this.lastOnDownSignaled >=  this.repeatPeriodMills) {
			this.lastOnDownSignaled = this.game.time.now;

			if ( !this.justDown ) {
				this.onDown.dispatch(this);
			}
		}
	}
}
export default RepeatingKey;