import ScoreModel from './ScoreModel';
import AbilityModel from './AbilityModel';

class GameModel {
	constructor() {

		this.scoreLifetime        = new ScoreModel();
		this.scoreCurrentLevel    = new ScoreModel();

		this.abilities            = new AbilityModel();

	}
}
export default GameModel;