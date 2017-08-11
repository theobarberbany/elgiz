var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var rh = 10;
var ah = ch - 10;

ctx.lineWidth="1";
ctx.strokeStyle="green";
 ctx.beginPath();
function drawSegment(rmin, rmax, amin, amax, reset) {

  //ctx.lineWidth="1";
  //ctx.strokeStyle="green";
  //ctx.fillStyle  ="red";
  //console.log(rmin + ' ' + amin);
  //ctx.beginPath();
  ctx.moveTo(rmin, rh);
  ctx.lineTo(amin, ah);
  //ctx.lineTo(amax, ah);
  //ctx.lineTo(rmax, rh);
  //ctx.closePath();
    //ctx.fill();
    /*if (reset == 0) {
	ctx.stroke();
	 ctx.beginPath();
    }*/
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
//var coeff = cw/4708053;

var lineNumber = 0;

////Papa.SCRIPT_PATH="node_modules/papaparse/papaparse.min.js";
Papa.RemoteChunkSize=50;
console.log('WORKERS ' + Papa.RemoteChunkSize);

Papa.parse("file:///Users/mg8/working/aviz/data/test", {
  download: true,
  delimiter: "\t",
  newline: "\n",
  quotes: false,
  fastMode: true,
  //worker: true,
   
    step: function(row, parser) { //per row
      var i = 6;
	row = row.data[0];
      
	//console.log(JSON.stringify(row));
	//console.log(lineNumber);
      if (row.length > 1) {
        while (i < 10) {
	    row[i] = math.floor(math.multiply(Number.parseInt(row[i]), coeff));
	    //row[i] = math.floor(math.multiply(math.number(row[i]), coeff));
	    //row[i] = math.chain(row[i]).number().multiply(coeff).floor().done();
	    //if (Number.parseInt(row[i]) < 0) {console.log('Negative on iteration ' + lineNumber);}
	  i++;
        }
	  //lineNumber++;
	  drawSegment(row[8], row[9], row[6], row[7]);
      }
	//if (lineNumber % 10000 == 0) {
	    //console.log('Will pause at line ' + lineNumber);
	    //parser.pause();
	    //window.setTimeout(parser.resume(), 1);
	//}
  },
  complete: function() {ctx.stroke();
    console.log("All done!");
  }
});


