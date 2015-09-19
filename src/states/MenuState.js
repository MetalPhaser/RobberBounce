import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';

import GameState from './GameState';
import PlatformMoveTestState from './tests/PlatformMoveTestState';
import BootyTossTestState from './tests/BootyTossTestState';
import BootyTossWithPlatformTestState from './tests/BootyTossWithPlatformTestState';
import BootyTossWithScoreTestState from './tests/BootyTossWithScoreTestState';

import ScoreboardDebugState from './tests/scoreboard/ScoreboardDebugState';
import ScoreboardTextState from './tests/scoreboard/ScoreboardTextState';
import ScoreboardBMPFontState from './tests/scoreboard/ScoreboardBMPFontState';

let menuItems = [
	{stateName:'GameState',               state:GameState,              description:'GameState : A little platform game test'},
	{stateName:'PlatformMoveTestState',   state:PlatformMoveTestState,  description:'PlatformMoveTestState : Move a platform'},
	{stateName:'BootyTossTestState',      state:BootyTossTestState,     description:'BootyTossTestState : Toss some Booty!'},
	{stateName:'BootyTossWithPlatformTestState',      state:BootyTossWithPlatformTestState,     description:'BootyTossWithPlatformTestState : First Play!'},
	{stateName:'BootyTossWithScoreTestState',      state:BootyTossWithScoreTestState,     description:'BootyTossWithScoreTestState : Scores : console'},
	{stateName:'ScoreboardDebugState',      state:ScoreboardDebugState,     description:'ScoreboardDebugState : Scoreboard : debug'},
	{stateName:'ScoreboardTextState',      state:ScoreboardTextState,     description:'ScoreboardTextState : Scoreboard : text'},
	{stateName:'ScoreboardBMPFontState',      state:ScoreboardBMPFontState,     description:'ScoreboardTextState : Scoreboard : BMP Text'}
];

class MenuState extends Phaser.State {

	create() {
		super.create();

		// listen to the keyboard
		this.addListeners();


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
	handleKeypress(keyboardEvent) {
		var keyCode = keyboardEvent.keyCode;

		console.log('KEYBOARD HEARD ON MENU');

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