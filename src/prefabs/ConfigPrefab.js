
class ConfigPrefab extends Phaser.Sprite {
	constructor(game, prefabConfig, x=0, y=0) {

		// Create Sprite - passing 'null' as initial frame (will show first frame on sheet)
		super(game, x, y, prefabConfig.spriteKey, null);

		this.prefabConfig = prefabConfig;

		this.installAnimations();
	}

	installAnimations() {
		for ( let name of Object.keys(this.prefabConfig.animations) ) {
			let config = this.prefabConfig.animations[name];

			/**
			 * from Phaser.AnimationManager.add
			 * - name             The unique (within this Sprite) name for the animation, i.e. "run", "fire", "walk".
			 * - frames           An array of numbers/strings that correspond to the frames to add to this animation and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used. - Default: null
			 * - frameRate        The speed at which the animation should play. The speed is given in frames per second. - Default: 60
			 * - loop             Whether or not the animation is looped or just plays once. - Default: false
			 * - useNumericIndex  Are the given frames using numeric indexes (default) or strings? - Default: true
			 */
			this.animations.add(name, config.frames||null, config.frameRate||null, config.loop||null, config.useNumericIndex||null);

		}

	}
}
export default ConfigPrefab;