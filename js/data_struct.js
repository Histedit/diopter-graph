"use strict";

var fnx = function(){
	var distance_from_led = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0]
	let pupil_case = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0]
	let target_case = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	
	var realfinal_dict = {}
	distance_from_led.forEach( (led) => {
		var final_dict = {} 
		target_case.forEach( (target) => {
			var resmin = []
			var resmax = []
			pupil_case.forEach( (pupil) => {
				 resmin[pupil.toFixed(1)] = (Math.round(led / (pupil * target) * 1000) / 1000).toFixed(3)
				 resmax[pupil.toFixed(1)] = (Math.round(led / (pupil * 0.25 * target) * 1000) / 1000).toFixed(3)
			})
			final_dict[target] = {'min' : resmin, 'max' : resmax}
		});	
		realfinal_dict[led] = final_dict
	})
	
	return (realfinal_dict)
}

var fnz = function roundup(round) {
    if (parseFloat(round) > 5) {
        return {
            'str': '>+5.00',
            'raw': '5.00'
        }
    } else if (parseFloat(round) < -5) {
        return {
            'str': '<-5.00',
            'raw': '-5.00'
        }
    } else {
        var fractionPart = parseFloat(round) - parseInt(round)
        var integerPart = parseInt(round)
        if (fractionPart <= -0.875)
            fractionPart = -1;
        else if (fractionPart < -0.625)
            fractionPart = -0.75;
        else if (fractionPart < -0.375)
            fractionPart = -0.5;
        else if (fractionPart < -0.125)
            fractionPart = -0.25;
        else if (fractionPart < 0.125)
            fractionPart = 0;
        else if (fractionPart < 0.375)
            fractionPart = 0.25;
        else if (fractionPart < 0.625)
            fractionPart = 0.5;
        else if (fractionPart < 0.875)
            fractionPart = 0.75;
        else if (fractionPart < 1)
            fractionPart = 1;
        var result = (integerPart + fractionPart).toFixed(2)
        var res = {}
        return result >= 0 ? {
            'str': '+' + result,
            'raw': result
        } : {
            'str': result,
            'raw': result
        }
    }
}