import RepeatingKey from './RepeatingKey';

let KeyboardUtils = {

	getKey            : function (game, keycode) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

		return game.input.keyboard.addKey(keycode);
	},
	getRepeatingKey    : function (game, keycode, repeatDelayMills=250) {

		// non-repeating
		if ( repeatDelayMills < 0 ) {
			return KeyboardUtils.getKey(game, keycode);
		}

		// add key to keyboard first
		KeyboardUtils.getKey(game, keycode);

		// then create our repeating key
		let repeatKey = new RepeatingKey(game, keycode, repeatDelayMills);

		// ** shim this into the keyboard
		game.input.keyboard._keys[keycode] = repeatKey;

		return repeatKey;
	}
};
export default KeyboardUtils;