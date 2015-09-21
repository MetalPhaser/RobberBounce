import GameModel from './models/GameModel';
import MenuState from './states/MenuState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 700, Phaser.AUTO, 'content', null);

		this.gameModel = null;

		this.initialize();
	}
	initialize() {

		if ( this.scoreController ) {
			throw new Error('Cannot call initialize on Game more than once');
		}

		this.gameModel = new GameModel();

		// menu
		this.state.add('MenuState', MenuState, false);
		this.state.start('MenuState');
	}
}

new Game();
