global.fetch = require('node-fetch');


const CurrencyDataLoader = require('./CurrencyDataLoader.js');
const SceneManager = require('./SceneManager.js');

const CurrencyGroup = require('./CurrencyGroup.js')




class Application{
	constructor(){
		var self = this;

		this.sceneManager = new SceneManager();
		 
		this.currencyDataLoader = new CurrencyDataLoader();
		this.currencyDataLoader.load( prices => {
			// console.log(prices)
			this.buildRingsFromPrices( prices );
		});

	}

	buildRingsFromPrices( prices ){

		var group = new CurrencyGroup( prices );

		this.sceneManager.add( group );


	}


}

let app = new Application();