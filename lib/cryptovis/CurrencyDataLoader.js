
const $ = require('jquery');
const cc = require('cryptocompare');

class CurrencyDataLoader{
	constructor(){
		this.nameData = undefined;
		// this.topCoins = ["BTC","ETH","XRP","BCH","ADA","LTC","XEM","NEO","XLM","MIOTA","EOS","DASH","XMR","TRX","BTG","ETC","QTUM","ICX","LSK","XRB","OMG","ARDR","STRAT","BNB","ZEC","SC","BCN","PPT","XVG","VEN","BCC","USDT","SNT","STEEM","BTS","KCS","DOGE","WAVES","REP","ZRX","KMD","DGB","GNT","VERI","SMART","QASH","GAS","DRGN","ETN","ARK","WAX","HSR","DCN","BAT","DCR","PIVX","LRC","KNC","ZCL","WTC","SALT","GBYTE","AION","FUN","BTM","FCT","DENT","ETHOS","MONA","XP","MAID","GXS","AE","POWR","SUB","SYS","RDD","NXT","RHOC","MED","REQ","ENG","NXS","KIN","DGD","GAME","NAS","PART","BNT","PAY","GNO","XZC","ICN","ELF","CVC","XDN","EMC","LINK","COB","BTX"];
		// this.topCoins = ["BTC","ETH","XRP","BCH","ADA","LTC","XEM","NEO","XLM","MIOTA","EOS","DASH","XMR","TRX","BTG","ETC","QTUM","ICX","LSK","XRB","OMG","ARDR","STRAT","BNB","ZEC","SC","BCN","PPT","XVG","VEN","BCC","USDT","SNT","STEEM","BTS","KCS","DOGE","WAVES","REP","ZRX","KMD","DGB","GNT","VERI","SMART","QASH","GAS","DRGN","ETN","ARK","WAX","HSR","DCN","BAT","DCR","PIVX","LRC","KNC","ZCL","WTC","SALT","GBYTE","AION","FUN","BTM","FCT","DENT","ETHOS","MONA","XP","MAID"];
		this.topCoins = ["BTC","ETH","XRP","BCH","ADA","LTC","XEM","NEO","XLM","MIOTA","EOS","DASH","XMR","TRX","BTG","ETC","QTUM","ICX","LSK","XRB","OMG","ARDR","STRAT","BNB","ZEC","SC","BCN","PPT","XVG","VEN"];
		// this.topCoins = ["BTC","ETH","XRP","BCH","ADA","LTC","XEM","NEO","XLM","MIOTA","EOS","DASH","XMR","TRX","BTG"];
	}

	load( callbackFunc ){
		this.callbackFunc = callbackFunc;
		this.getCoinList();
	}

	// TODO: top coins as of Jan 15, 2017 from https://coinmarketcap.com/all/views/all/

	getCoinList(){
		var self = this;
		var coinNames = [];
		cc.coinList().then( response => {
			self.nameData = response.Data;
			for(var n in response.Data){
				// if there's a name
				if(n){
					// loop through the top coins
					for( var i=0; i<self.topCoins.length; i++ ){
						var n2 = self.topCoins[i];
						// if the top coin names match the cc database coins, add them to price fetch list
						if( n == n2 ) coinNames.push(n);
					}
				}
			}
			// console.log(coinNames)
			self.getPrices(coinNames);

			self.displayPrices(coinNames)
		});	
	}

	getPrices(coinNames){
		var self = this;
		// fetch the prices for coins by name
		cc.priceMulti(coinNames, ["USD", "EUR"]).then( response => {
			// respond to the application with the data loaded...
			self.callbackFunc.call(self, response);
		});
	}

	displayPrices(coinNames){

		var h = '';
		for(var i=0; i<coinNames.length; i++){
			var o = this.nameData[coinNames[i]];
			h += '<div>'+(i+1)+': '+o.CoinName+"</div>";
		}

		$("#coinlist").empty().append(h);
	}
}

module.exports = CurrencyDataLoader;