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
				scale       : 0.07,
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
				scale       : 0.08,
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
				scale       : 0.08,
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
				scale       : 0.2,
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
	},
	ss2 : {
		atlas           : 'images/tests/ss2/ss2-ss.json',
		texture         : 'images/tests/ss2/ss2-ss.png',
		entities        : {
			baby     : {
				size        : { width : 20, height : 20 },
				scale       : 0.3,
				animations  : {
					idle   : {
						frames              : ['ss2-baby'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			clock     : {
				size        : { width : 20, height : 20 },
				scale       : 0.15,
				animations  : {
					idle   : {
						frames              : ['ss2-clock'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			dog     : {
				size        : { width : 20, height : 20 },
				scale       : 0.4,
				animations  : {
					idle   : {
						frames              : ['ss2-dog'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			},
			money     : {
				size        : { width : 20, height : 20 },
				scale       : 0.3,
				animations  : {
					idle   : {
						frames              : ['ss2-money'],
						frameRate           : 1,
						loop                : false,
						useNumericIndex     : false
					}
				}
			}

		}
	}
}