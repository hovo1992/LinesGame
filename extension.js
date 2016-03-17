(function () {
	'use strict'
	Location.prototype.getQueryStringItems = function () {//force Validation, harcni set anem te che

		if (null == this.search) {
			return;
		}
		var query = {},
			loc = this.search.substring(1).split('&');
		for (let i = 0; i < loc.length; i++) {
			var locItem = loc[i].split('='),
				queryLabel = decodeURIComponent(locItem[0]);

			if (null != query[queryLabel]) {
				continue;
			}
			query[queryLabel] = decodeURIComponent(locItem[1]);
			var name = locItem[0];
			if (null == name || '' == name) {
				continue;
			}
			var elem = $('[name=' + name + ']');
			if (2 == elem.length && 'checkbox' == $(elem[0]).attr('type')) {
				$(elem[0]).prop('checked', 'true' == decodeURIComponent(locItem[1]));
				continue;
			}
			elem.val(decodeURIComponent(locItem[1]));
		}
		return query;
	}

	
	// function getRandomIntInclusive(min, max) {
 //  		return (Math.floor(Math.random() * (max - min + 1)) + min);
	// }
	// colorCount = 4;
	// var random = getRandomIntInclusive(0,359);
	// var hsl = 'hsl(' + random + ',' + 100 + '%' + ',' + 50 + '%' + ')';
	// var step = 51;

	// var colorsArr = new Array(colorCount);
	// colorsArr[0] = hsl;
	// for (var i = 1; i < colorCount; i++) {
	// 	random += step;
	// 	colorsArr[i] = 'hsl(' + random + ',' + 100 + '%' + ',' + 50 + '%' + ')';
	// }

	// alert(colorsArr);





	// function getRandomIntInclusive(min, max) {
 //  		return (Math.floor(Math.random() * (max - min + 1)) + min);
	// }

	// var rgb = new Array(3),
	// 	d = getRandomIntInclusive(0,2);
	// rgb[d] = 255; 
	// var a = getRandomIntInclusive(0,2);
	// var index,
	// 	step = 60;

	// while(rgb[a] == 255) {
	// 	a = getRandomIntInclusive(0,2);
	// } 
	// rgb[a] = 0;
	
	// for(var i = 0; i < rgb.length; i++) {
	// 	if(undefined == rgb[i]) {
	//     	rgb[i] = getRandomIntInclusive(0,255);
	//     	index = i;
	//         break;
	//     }
	// }
	// if(index == 0) {

	// 	rgb[index] += step;
	// 	if(rgb[index])

	// }




	
})();



