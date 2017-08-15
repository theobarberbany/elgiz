var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var rh = 10;
var ah = ch - 10;

ctx.lineWidth="1";
ctx.strokeStyle="green";

function drawSegment(rmin, rmax, amin, amax) {
  ctx.moveTo(rmin, rh);
  ctx.lineTo(amin, ah);
}

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
  quotes: false,
  fastMode: true,
  complete: function(results) {
    ctx.beginPath();
    results.data.forEach(function(row) {
      var i = 6;
      if (row.length > 1) {
        while (i < 10) {
	  row[i] = Math.floor(Number.parseInt(row[i]) * coeff);
	  i++;
        }
        drawSegment(row[8], row[9], row[6], row[7]);
      }
    });
    ctx.stroke();
    console.log("All done!");
  }
});

