export function showAssembly(ctx, ch, matrix) {

  var rh = 10;
  var ah = ch - 10;
    
  ctx.lineWidth   = "1";
  ctx.strokeStyle = "green";
  ctx.beginPath();
  let count = 1;
  matrix.forEach(function(row) {
      drawSegment(ctx, row, rh, ah);
    count++;
  });
  ctx.stroke();
  console.log(`All done! ${count} rows rendered`);
}

function drawSegment(ctx, row, rh, ah) {
  //row is amin, amax, rmin, rmax
  ctx.moveTo(row[2], rh);
  ctx.lineTo(row[0], ah);
}
