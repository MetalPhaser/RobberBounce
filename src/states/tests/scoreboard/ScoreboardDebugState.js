import BaseState from '../simplePlatformAndBooty/State'

class ThisState extends BaseState {

	create() {
		super.create();
		this.game.debug.renderShadow = false;
	}

	update() {
		super.update();
	}

	render() {
		// text(text, x, y, color, font)
		this.game.debug.text( 'Score: ' + this.game.bootyScore + '/' + this.game.bootyFails, 20, 32, "#808080");
	}

}
export default ThisState;