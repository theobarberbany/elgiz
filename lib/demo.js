var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var rh = 10;
var ah = ch - 10;

function drawSegment(rmin, rmax, amin, amax) {

  ctx.lineWidth="1";
  ctx.strokeStyle="green";
  ctx.fillStyle  ="red";
  console.log(rmin + ' ' + amin);
  ctx.beginPath();
  ctx.moveTo(rmin, rh);
  ctx.lineTo(amin, ah);
  //ctx.lineTo(amax, ah);
  //ctx.lineTo(rmax, rh);
  //ctx.closePath();
  //ctx.fill();
  ctx.stroke();
}

// reference
//ctx.moveTo(0,rh);
//ctx.lineTo(cw,rh);
//ctx.stroke();
// assembly
//ctx.moveTo(0,ah);
//ctx.lineTo(cw,ah);
//ctx.stroke();

Papa.parse("data/test", {
    download: true,
    delimiter: "\t",
    newline: "\n",
    quotes: false,
    warker: true,
  complete: function(results) {
      /*for (var i = 0; i < results.data.length-1; i++) {
	  console.log(i);
	  console.log(results.data[i][6]);
      	  var d = math.matrix(results.data[i]);
	  d = math.subset(d, math.index([6,7,8,9]));
	  console.log(math.size(d));
	  }*/
      results.data.pop();
      var d = math.matrix(results.data);
      
      d = math.subset(d, math.index(math.range(0,results.data.length-2),[6,7,8,9]));
      //console.log(math.size(d));
      d = d.map(function (value) {
	  return Number.parseInt(value);
      });
      //console.log(math.format(d));
      var length = d.size()[0]
      var draft = math.subset(d, math.index(math.range(0,length),[0,1]));
      var draft_min = math.min(draft);
      var draft_max = math.max(draft);
      console.log('DRAFT ' + draft_min + ' ' + draft_max);
      var ref = math.subset(d, math.index(math.range(0,length),[2,3]));
      var ref_min = math.min(ref);
      var ref_max = math.max(ref);
      console.log('REF ' + ref_min + ' ' + ref_max);
      var rd_min = math.min(d);
      var rd_max = math.max(d);
      console.log('RD ' + rd_min + ' ' + rd_max);
      //console.log(JSON.stringify(draft.size()[0]));
      //ctx.canvas.width = rd_max;
      
      var coeff = cw/rd_max;	      
      math.forEach(d, function(value, index, matrix) {
          // index is an array, second value is the column index
	  if (index[1] == 0) {
	      var row = math.squeeze(math.subset(d, math.index([index[0]],[0,1,2,3]))).toArray();
	      console.log(coeff);
              drawSegment(row[2]*coeff, row[3]*coeff, row[0]*coeff, row[1]*coeff);
	  }
      });
      //ctx.scale(cw/rd_max,1);
  }
});


