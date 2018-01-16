const THREE = require('three');

class CurrencyGroup extends THREE.Group{
  constructor( prices ){
  	super();
  	// highest num
  	var highestPrice = 0;
   	for(var p in prices) {
   		var modifier = prices[p].USD;
   		if(modifier > highestPrice) highestPrice = modifier;
   	}
   	// lowest num
  	var lowestPrice = highestPrice;
   	for(var p in prices) {
   		var modifier = prices[p].USD;
   		if(modifier < lowestPrice) lowestPrice = modifier;
   	}

		// ratio
  	var ratio = lowestPrice/highestPrice;

  	// console.log(ratio)

  	this.objects = [];
  	// use the USD information as the "size"

  	var getRandomColor = function(hex1, hex2){
  		var rgb = function(string){ return string.match(/\w\w/g).map(function(b){ return parseInt(b,16) }); }
  		//
  		var rgb1 = rgb(hex1);
  		var rgb2 = rgb(hex2);
  		// 
			var rgb3 = [];
			for (var i=0; i<3; i++) rgb3[i] = rgb1[i]+Math.random()*(rgb2[i]-rgb1[i])|0;
			//
			return(
				'#' + rgb3
		    .map(function(n){ return n.toString(16) })
		    .map(function(s){ return "00".slice(s.length)+s}).join('')
			);
		}

		// console.log( getRandomColor("#d2164f", "#8f19b7") );

  	var i=1;
   	for(var p in prices){
   		var modifier = prices[p].USD;
   		var color = getRandomColor("#d2164f", "#8f19b7");
   		// var radius = modifier / 1000;
   		// var radius = (i*100)*(modifier*ratio);
   		var radius = i;
	  	// var geometry = new THREE.SphereGeometry( radius, 32, 32 );
	  	// var geometry = new THREE.CircleGeometry( radius, 32 );
	  	var geometry = new THREE.TorusGeometry( radius, 0.03, 5, 100 );
			// var material = new THREE.MeshBasicMaterial( {color: randomColor, wireframe:true} );
			var material = new THREE.MeshBasicMaterial( {color: color} );
			var mesh = new THREE.Mesh( geometry, material );


    	mesh.rotation.x = Math.random()*6.28319;
			mesh.rotation.y = Math.random()*6.28319;

			this.objects.push( mesh );
			this.add( mesh );

			i+=0.4;
   	}
  }

  update(){
    this.objects.forEach((object) => {
    	object.rotation.x += 0.008;
			object.rotation.y += 0.008;
			// console.log(object);
    });
  }
}
module.exports = CurrencyGroup;