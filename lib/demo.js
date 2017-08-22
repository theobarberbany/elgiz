import * as plotter from './plotter';

$(document).ready( function() {

  var cw = 1500;
  var ch = 400;
  var ca = $('<canvas/>');
  var c=ca[0];
  c.height = ch;
  c.width  = cw;
  $(c).addClass("canvas");
  $('body').append(c);

  var ctx = c.getContext("2d");


  // reference
  //ctx.moveTo(0,rh);
  //ctx.lineTo(cw,rh);
  //ctx.stroke();
  // assembly
  //ctx.moveTo(0,ah);
  //ctx.lineTo(cw,ah);
  //ctx.stroke();

  var coeff = cw/3260000000;

  Papa.parse("data/test", {
    download:  true,
    delimiter: "\t",
    newline:   "\n",
    quotes:    false,
    fastMode:  true,
    complete:  function(results) {
      let subset = new Array(results.data.length);
      results.data.forEach(function(row) {
	if (row.length > 1) {
          subset.push(row
	    .slice(6,10)
	    .map(function(el) {
	      return Math.floor(Number.parseInt(el)) * coeff;
	  }));
	}
      });
      plotter.showAssembly(ctx, ch, subset);		     
    }
  });
});

