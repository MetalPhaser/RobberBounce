import Config from '../config/game-config';
import GameState from './GameState';

let menuItems = [
	{
		stateName       : 'GameState',
		state           : GameState,
		description     : 'GameState : Time to play'
	}
];

class MenuState extends Phaser.State {

	create() {
		super.create();
		this.addListeners();
		this.drawMenuText();
	}
	preload() {
		this.game.stage.backgroundColor      = Config.stage.backgroundColor;
	}
	addListeners() {
		this.game.input.keyboard.onDownCallback = this.handleKeypress.bind(this);
	}
	removeListeners() {
		// remove all edits to the keyboard (for now)
		this.game.input.keyboard.reset(true);
		this.game.input.keyboard.onDownCallback = null;
	}
	shutdown() {
		this.removeListeners();
	}
	drawMenuText() {
		this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Let\'s Go', { font: '65px Arial', fill: '#808080', align: 'center'});
		this.titleText.anchor.setTo(0.5, 0.5);

		var fontSize = 20;
		var menuItemStyle = { font: fontSize+'px Arial', fill: '#808080', align: 'left'};

		//this.game.world.centerX
		let itemListStartY = 200;
		let itemListPadding = 5;
		for ( var i = 0, length = menuItems.length; i < length; ++i ) {
			var menuItem = menuItems[i];
			var title = (i+1) + ' - ' + menuItem.description;
			this.game.add.text(100, itemListStartY + (fontSize * i) + (itemListPadding*i), title, menuItemStyle);
		}
	}
	handleKeypress(keyboardEvent) {
		var keyCode = keyboardEvent.keyCode;

		var number = String.fromCharCode(keyCode) || null;
		if ( number && number > 0 && number <= menuItems.length ) {
			var menuItem = menuItems[number-1];
			if ( menuItem.state ) {
				this.game.state.add(menuItem.stateName, menuItem.state, false);
				this.game.state.start(menuItem.stateName);
			}
		}
	}

}
export default MenuState;