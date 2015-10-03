/**
 *  Atlas Spritesheet config
 *
 *  This file is a definition of spritesheets. Within
 *  each definition is the path to the atlas data and
 *  the texture file as well as a list of entities
 *  to be found on those sheets. These entity blocks
 *  define named frame-sets (animations).
 *
 */
export default {
	clipart : {
		atlas           : 'images/tests/spritesheet/clipart-ss.json',
		texture         : 'images/tests/spritesheet/clipart-ss.png',
		entities        : {
			coffeeCup     : {
				size        : { width : 20, height : 20 },
				animations  : {
					idle   : {
						frames              : ['clip-coffee-cup'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			purse         : {
				size        : { width : 40, height : 40 },
				animations  : {
					idle   : {
						frames  : ['clip-purse'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			chair         : {
				size        : { width : 50, height : 50 },
				animations  : {
					idle   : {
						frames  : ['clip-chair'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			trophy        : {
				size        : { width : 35, height : 35 },
				animations  : {
					idle   : {
						frames  : ['clip-trophy'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			}
		}
	}
}