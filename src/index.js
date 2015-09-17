import GameState from './states/GameState';
import PlatformMoveState from './states/PlatformMoveTestState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 700, Phaser.AUTO, 'content', null);

		// orig game
		//this.state.add('GameState', GameState, false);
		//this.state.start('GameState');

		// orig game
		this.state.add('PlatformMoveState', PlatformMoveState, false);
		this.state.start('PlatformMoveState');
	}
}

new Game();
