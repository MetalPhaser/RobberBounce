import BaseState from '../autoTossers/TimedTosserState'

class ThisState extends BaseState {

	create() {
		super.create();
		this.game.debug.renderShadow = false;
	}

	update() {
		super.update();
	}

	render() {
		let collected = this.game.gameModel.scoreCurrentLevel.itemsCollected;
		let dropped = this.game.gameModel.scoreCurrentLevel.itemsDropped;
		this.game.debug.text( 'Score: ' + collected + '/' + dropped, 20, 32, "#808080");
	}

}
export default ThisState;