import ScoreModel from './ScoreModel';
import AbilityModel from './AbilityModel';
import BootyModel from './BootyModel';

class GameModel {
	constructor() {
		this.scoreLifetime        = new ScoreModel();
		this.scoreCurrentLevel    = new ScoreModel();
		this.abilities            = new AbilityModel();
		this.booty                = new BootyModel();
	}
}
export default GameModel;