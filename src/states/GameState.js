import Config from '../config/game-config';
import KeyboardUtils from '../utils/KeyboardUtils';
import MenuLaunchController from '../controllers/MenuLaunchController';

class GameState extends Phaser.State {

	constructor() {
		super();

		this.menuLaunchController   = null;

			// keys
		this.leftKey                = null;
		this.rightKey               = null;
		this.jumpKey                = null;

		// sprites
		this.player                 = null;
		this.platforms              = null;

		// configuration
		this.jumpStrength           = Config.physics.general.gravityY/2;
		this.moveStrength           = 250;
		this.playerBounciness       = 0.2;
	}

	preload() {
    this.game.stage.backgroundColor      = '#85b5e1';
    this.game.load.baseURL               = 'http://examples.phaser.io/assets/';
    this.game.load.crossOrigin           = 'anonymous';
		this.game.load.image('player', 'sprites/phaser-dude.png');
		this.game.load.image('platform', 'sprites/platform.png');
	}

	create() {

		// set up physics
		this.game.physics.arcade.gravity.y = Config.physics.general.gravityY;

		this.menuLaunchController   = new MenuLaunchController(this.game);

		this.leftKey          = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey         = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.jumpKey          = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// PLATFORMS
		this.platforms        = this.game.add.group();
		this.platforms.enableBody = true;
		this.platforms.create(500, 150, 'platform');
		this.platforms.create(-200, 300, 'platform');
		this.platforms.create(400, 450, 'platform');
		this.platforms.setAll('body.immovable', true);
		this.platforms.setAll('body.allowGravity', false);

		// PLAYER
		this.player           = this.game.add.sprite(100, 0, 'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y     = this.playerBounciness;

	}

	shutdown() {
		this.game.load.baseURL = '';
		this.menuLaunchController.shutdown();
		this.menuLaunchController = null;
	}

	pauseUpdate() {
		//console.log('pauseUpdate');
	}
	update() {
		this.game.physics.arcade.collide(this.player, this.platforms);

		this.player.body.velocity.x = 0;
		//console.log('this.leftKey', this.leftKey.isDown, this.leftKey);
		if (this.leftKey.isDown) {
			this.player.body.velocity.x = -(this.moveStrength);
		}
		else if (this.rightKey.isDown) {
			this.player.body.velocity.x = this.moveStrength;
		}

		if (this.jumpKey.isDown && (this.player.body.onFloor() || this.player.body.touching.down)) {
			this.player.body.velocity.y = -(this.jumpStrength);
		}
		//else if (jumpButton.isDown) {
		//	player.body.velocity.y = -150;
		//}
	}

}
export default GameState;