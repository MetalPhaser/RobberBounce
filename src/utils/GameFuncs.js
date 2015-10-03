let GameFuncs                               = {};
GameFuncs.timeToFall                        = function (height, gravity) {
	return Math.sqrt( 2 * height / gravity );
};
GameFuncs.velocityToTravelXFromHeight       = function (xDistance, height, gravity) {
	if ( !xDistance || !height || !gravity ) {
		return 0;
	}
	var timeToFall        = GameFuncs.timeToFall(height, gravity);
	return xDistance / timeToFall;
};
GameFuncs.installSpritesheetFromConfig      = function (game, sheetKey, sheetConfig) {

	if ( !game || !sheetKey || !sheetConfig ) {
		throw new Error('installAtlasSpritesheetFromConig : incomplete values to perform installation');
	}

	if ( !sheetConfig.atlas || !sheetConfig.texture ) {
		console.error('installAtlasSpritesheetFromConig : configuration incorrect');
		return null;
	}

	game.load.atlasJSONHash(sheetKey, sheetConfig.texture, sheetConfig.atlas);


	// entities found on config
	if ( sheetConfig.entities ) {
		for ( let entityKey of Object.keys(sheetConfig.entities) ) {
			let entityConfig    = sheetConfig.entities[entityKey];
			//let sprite          = game.add.sprite(0, 0, sheetKey, entityKey);
			entityConfig.spriteKey = sheetKey;

			//THIS IS WHERE I NEED TO DECIDE HOW TO DEAL WITH
			//FRAMES OF ANIMATIONS SUCH THAT WE CAN GET BACK TO THEM
			//LATER WHEN NEEDED


		}

	}

	return sheetConfig.entities || null;

};
export default GameFuncs;