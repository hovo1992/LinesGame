$(function() {
	'use strict'
	
	createIndex();
	location.getQueryStringItems();

	function createIndex() {
		var defaultValues = {
				Board : {id: 'board', name: 'Board', type: 'number', title: "Board Size", min: '3', max: '10', value: '5'},                                                                    
				ColorCount : {id: 'colorCount', name: 'ColorCount', type: 'number', title: 'Color Count', min: '3', max: '7', value: '5'},
				FirstBallsCount : {id: 'firstBallsCount', name: 'FirstBallsCount', type: 'number', title: 'First Balls Count', min: '2', max: '33', value: '5'},
				SpawnBallsCount : {id: 'spawnBallsCount', name: 'SpawnBallsCount', type: 'number', title: 'Spawn Balls Count', min: '2', max: '6', value: '3'},
				RemovableLineLength : {id: 'removableLineLength', name: 'RemovableLineLength', type: 'number', title: 'Removable Line Length', min: '3', max: '10', value: '4'},
				Joker :	{id: 'joker', name: 'Joker', type: 'checkbox', title: 'Joker', value: true},
				ShowPath :	{id: 'showPath', name: 'ShowPath', type: 'checkbox', title: 'Show Path', value: true},
				Score :	{id: 'score', name: 'Score', type: 'text', title: 'Score', value: '0', readonly: 'readonly'},
				ChooseColor : {id: 'chooseColor', name: 'ChooseColor', type: 'button', title: 'Choose Color'}
			},

			colorsMenu = {
				Hue: { id: 'hue', name: 'Hue', type: 'range', value: 1, min: 1, max: 360, step: 1, title: 'Hue' },
				Saturation: { id: 'colorSaturation', name: 'ColorSaturation', type: 'range', value: '100', min: '1', max: '100', step: '1', title: 'Color Saturation' },
				Lightness: { id: 'colorLightness', name: 'ColorLightness', type: 'range', value: '50', min: '1', max: '100', step: '1', title: 'Color Lightness' },
				redDeficient: { id: 'redDeficient', name: 'redDeficient', type: 'checkbox', title: 'Red Deficient', value: true},
				greenDeficient: { id: 'greenDeficient', name: 'greenDeficient', type: 'checkbox', title: 'Green Deficient', value: true},
				blueDeficient: { id: 'blueDeficient', name: 'blueDeficient', type: 'checkbox', title: 'Blue Deficient', value: true},
				Apply: { id: 'fapply', name: 'Apply', type: 'button', value: 'Apply', title: 'Apply' }
			},

			defValLength = Object.keys(defaultValues).length,
			sortedKeys = Object.keys(defaultValues),

			colorsMenuLength = Object.keys(colorsMenu).length,
			colorsMenuKeys = Object.keys(colorsMenu),

			trMenuLength = new Array(colorsMenuLength + 1),
			menuLabels= $(trMenuLength.join('<label/>')),
			menuInputs = $(trMenuLength.join('<input/>')),
			menuHiddenInputs = $(trMenuLength.join('<input/>')),
			menuTds = $(trMenuLength.join('<td/>')),
			menuThs = $(trMenuLength.join('<th/>')),
			menuTrs =  $(trMenuLength.join('<tr/>')),
			menuTbody = $('<tbody>'),
			menuTable = $('<table>'),

			trLength = new Array(defValLength + 1),
			labels= $(trLength.join('<label/>')),
			inputs = $(trLength.join('<input/>')),
			hiddenInputs = $(trLength.join('<input/>')),
			tds = $(trLength.join('<td/>')),
			ths = $(trLength.join('<th/>')),
			trs =  $(trLength.join('<tr/>')),
			tbody = $('<tbody>'),
			table = $('<table>'),
			form = $('<form>'),
			main = $('<main>'),
			div = $('<div>'),
			container = $('<div>'),
			settingsBtn = $('<input/>'),
			applyBtn = $('<input>'),
			chooseColorBtn = $('<input>'),
			colorsDiv = $('<div>');

			settingsBtn
				.val('Settings')
				.attr('type', 'button');
			applyBtn
				.val('Apply')
				.attr('type', 'submit');

			div.attr('id', 'div');
			container.attr('id', 'container');
			
		for (let i = 0; i < colorsMenuLength; i++) {
			let obj = colorsMenu[colorsMenuKeys[i]],
				hdnMenuIpt = menuHiddenInputs[i];
			$(menuLabels[i])
							.text(obj.title)
							.attr('for', obj.id);
			setAttributes(menuInputs[i], obj);
			setAttributes(hdnMenuIpt, {type : 'hidden', name : obj.name, value: false});

			var $menuTbody = $(menuTbody),
				$menuTr = $(menuTrs[i]),
				$menuTh = $(menuThs[i]).append(menuLabels[i]),
				$menuTd = $(menuTds[i]).append(menuInputs[i]);

			$menuTr.append($menuTh[0]).append($menuTd[0]);
			$menuTbody.append($menuTr);

			if ('checkbox' == obj.type) {
				$(menuTds[i]).append(hdnMenuIpt);
			}
		};

		for (let i = 0; i < defValLength; i++) {
			let defValKeys = defaultValues[sortedKeys[i]],
				hdnIpt = hiddenInputs[i];
			$(labels[i])
				.text(defValKeys.title)
				.attr('for', defValKeys.id);
			setAttributes(inputs[i], defValKeys);
			setAttributes(hdnIpt, {type : 'hidden', name : defValKeys.name, value: false});
		
			var $tbody = $(tbody),
				$tr = $(trs[i]),
				$th = $(ths[i]).append(labels[i]),
				$td = $(tds[i]).append(inputs[i]);
		
			$tr.append($th[0]).append($td[0]);
			$tbody.append($tr);

			if ('checkbox' == defValKeys.type) {
				$(tds[i]).append(hdnIpt);
			}
		};

		colorsDiv
			.attr('id', 'colorsDiv')
			.append(menuTable.append($menuTbody));

		chooseColorBtn
			.attr({'type': 'button', 'value': 'advanced'});


	var divResult = $('<div>').attr('id','divResult'),
		ballsColorsDivLength = new Array(8),
		ballsColorsDiv = $(ballsColorsDivLength.join('<div/>'));

		ballsColorsDiv.each(function (item, elem){
			divResult.append($(elem).attr('class','ballsColorsDiv'));
		})

		$(tds[8])
			.append(chooseColorBtn)
			.append(colorsDiv.append(divResult.append(ballsColorsDivLength)));

		settingsBtn.on('click', function(){
				let divDspl = getComputedStyle($('#div')[0], null).getPropertyValue('display');
				div.css('display', divDspl == 'block' ? 'none' : 'block');
			});
		
		chooseColorBtn.on('click', function(){
				let divDspl = getComputedStyle($('#colorsDiv')[0], null).getPropertyValue('display');
				colorsDiv.css('display', divDspl == 'block' ? 'none' : 'block');
			});

		function setAttributes(el, attrs) {
			for(var key in attrs) {
				el.setAttribute(key, attrs[key]);
			}
		}

		$('html').on('keypress', function(e) {
			if(e.keyCode < 48 || e.keyCode > 57) {
	      		return false;
	      		e.stopPropagation();
	   		}
		});
		$('html').on('paste', function(e) {
			var pastedData = e.originalEvent.clipboardData.getData('text');
			if(!/^\d+$/.test(pastedData)) {
				return false;
			}
		});
			changeValues();
			[$('#board')[0], $('#colorCount')[0], $('#firstBallsCount')[0], $('#spawnBallsCount')[0]]
				.forEach(function(item, i){$(item).on('input', changeValues)});
	
		

	function changeValues() {
		var boardSize = $('#board').val(),
			cCount = $('#colorCount'),
			fBCount = $('#firstBallsCount'),
			sBCount = $('#spawnBallsCount'),
			rLLength = $('#removableLineLength');

		fBCount
			//.attr({min: Math.floor(boardSize/2)})
			.attr({max: Math.round(Math.pow(boardSize, 2)/4)})
			.val(fBCount.val() > fBCount.attr('max') ? fBCount.attr('max') : fBCount.val());
		cCount
			.attr({max: +boardSize > 7 ? 7 : boardSize })
			.val(+cCount.val() > +cCount.attr('max') ? cCount.attr('max') : cCount.val());
		sBCount
			.attr({max: Math.round((boardSize/2)+1)})
			.val(sBCount.val() > sBCount.attr('max') ? sBCount.attr('max') : sBCount.val());
		rLLength
			.attr({max: boardSize-1})
			.val(rLLength.val() > rLLength.attr('max') ? rLLength.attr('max') : rLLength.val());
 
	}
$(document.body)
			.append(main
			.append(container
				.append(settingsBtn)
			.append(
				div.append(
					form.append(table.append($tbody)).append(applyBtn)))));	
var red = $('#redDeficient'),
	green = $('#greenDeficient'),
	blue = $('#blueDeficient');


	$('#fapply').on('click', function() {
		var isred = red.prop('checked'),
			isgreen = green.prop('checked'),
			isblue = blue.prop('checked');
			if(isred && isgreen && isblue) {
				blackWhite();
			} else {
		fapply.apply(this,
			isred && isgreen ? [150, 180, 181, 315] :
			isred && isblue ? [60, 135, 285, 330] :
			isgreen && isblue ? [0, 45, 270, 359] :
			isred ?
				[60, 70, 71, 315] :
		 	isgreen ? 
		 		[0, 45, 150, 359] :
		 	isblue ? [0, 150, 285, 359] :
		 		[0, 180, 181, 359]);
	}});

	$('#colorsDiv :checkbox').each(function(item, elem) {
		$(elem).on('click', refuse);
	});
	function refuse() {
		var hue = $('#hue'),
			saturation = $('#colorSaturation'),
			lightness = $('#colorLightness'),
		    isred = red.prop('checked'),
			isgreen = green.prop('checked'),
			isblue = blue.prop('checked');

			if(isred && isgreen && isblue) {
				hue.attr('disabled', 'disabled').val(0);
				saturation.attr('disabled', 'disabled').val(0);
				lightness.attr('disabled', 'disabled').val(0);
			} else {
				hue.removeAttr('disabled');
				saturation.removeAttr('disabled');
				lightness.removeAttr('disabled');
			}
	}

	function blackWhite() {
		var step = Math.round(100 / $('#colorCount').val() - 1),
			colorsArr = new Array(count),
			count = $('#colorCount').val();

		for (var i = 0; i < count; i++) {
			colorsArr[i] = 'hsl(0, 0%,' + i * step + '%)';
		}

		for(var j = 0; j < count; j++){
		    	// console.log('%c' + (j+1) + '  some text', 'background-color:' + colorsArr[j]);
		    	$(ballsColorsDiv[j]).css('background', colorsArr[j]);
		}
	}

	function fapply(start1, end1, start2, end2){
	    var palette = 359,
			count = $('#colorCount').val(),
			random = getRandomizer(start1, end1, start2, end2),
			colorsArr = new Array(count),
			step = parseInt(+$('#hue').val()/7);

	    $('#hue').max = parseInt(palette / count);

		for (let i = 0; i < count; i++) {
			colorsArr[i] = 'hsl(' + random + ',' + $('#colorSaturation').val() + '%,' + $('#colorLightness').val()  + '%)';
			random += step;
			if(random > 359) {
				random %= 360;
			}

			while( !((random >= start1 && random <= end1) || (random >= start2 && random <= end2))) {
				if(random < start1) {
					random += start1;
				}
				if (random > end1 && random < start2) {
			        random = random % end1 + start2;
			    }
			    if (random > end2) {
		            random = random % end2 + start1;
		        }
			}
		}
		    for(var j = 0; j < count; j++){
		    	//console.log('%c' + (j+1) + '  some text', 'background-color:' + colorsArr[j]);
				$(ballsColorsDiv[j]).css('background', colorsArr[j]);
		    }
			for (var i = 0; i < $('#colorCount')[0].value ; i++) {
			console.log($('#colorCount')[0].value);
			$(ballsColorsDiv[i]).css('display', 'inline-block');
			for (var j = $('#colorCount')[0].value; j < $('#colorCount')[0].max; j++) {
				$(ballsColorsDiv[j]).css('display', 'none');
			}
			
		}
		}
	function getRandomizer(start1, end1, start2, end2) {
		    var rand = Math.floor(Math.random() * 2) + 1;
		    if (rand == 1) {
		        return (Math.floor(Math.random() * (1 + end1 - start1)) + start1);
		    }
		    if (rand == 2) {
		        return (Math.floor(Math.random() * (1 + end2 - start2)) + start2);
		    }
		}
	$('#hue').on('input', function() {
		var hueValue = $('#hue').val();
		$('#colorSaturation').css('background', '-webkit-linear-gradient(left,hsla(' + hueValue + ', 100%, 50%, 0), hsla(' + hueValue + ', 100%, 50%, 1)');
		$('#colorLightness').css('background', '-webkit-linear-gradient(left,hsla(0, 0%, 0%, 1), hsla(' + hueValue + ', 100%, 50%, 1)');
	});

}
}
);