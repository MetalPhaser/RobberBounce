import MenuState from './states/MenuState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 700, Phaser.AUTO, 'content', null);

		// menu
		this.state.add('MenuState', MenuState, false);
		this.state.start('MenuState');
	}
}

new Game();
