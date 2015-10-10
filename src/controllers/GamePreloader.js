import SSConfig from '../config/booty-ss-config';
import MGU from '../utils/MGU';
import GameFuncs from '../utils/GameFuncs';

class GamePreloader {
	constructor(game) {
		this.game     = game;


		//var entities  = this.preloadAssets(SSConfig);
		//MGU.merge(BootyPrefab.entities, entities);
		//Array.prototype.push.apply(BootyPrefab.types, Object.keys(entities));

	}

	static preloadBooty(game) {
		var entities = GamePreloader.preloadAssets(game, SSConfig);

		game.gameModel.booty.clear();

		MGU.merge(game.gameModel.booty.entities, entities);
		Array.prototype.push.apply(game.gameModel.booty.types, Object.keys(entities));

		console.log('Booty Entities', game.gameModel.booty.entities);
		console.log('Booty Types', game.gameModel.booty.types);

	}
	static preloadAssets(game, spritesheetConfig) {

		let allEntities   = {};

		// go through the SS config file
		for ( let sheetKey of Object.keys(spritesheetConfig) ) {

			// install the spritesheet
			var entities = GameFuncs.installSpritesheetFromConfig(game, sheetKey, spritesheetConfig[sheetKey]);

			MGU.merge(allEntities, entities);
		}
		return allEntities;
	}
}
export default GamePreloader;