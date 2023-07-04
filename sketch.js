const filePath = "test.txt"; // path to your file!
const dimensions = [445, 445]; // canvas resolution, x and y respectively


let isDone = false, cols, rows;

document.write("Press S to save this image!")

function setup() {
  createCanvas(dimensions[0], dimensions[1]);
}

function draw() {
  // i'm using jquery
  $.getJSON(filePath, function(data) {

    // if it didn't draw the image yet, do it!
    if (!isDone) {
      try {
        cols = data.img.length;
        rows = data.img[0].length;
        // Check if all sub-arrays have the same length
        for (let i = 1; i < cols; i++) {
          if (data.img[i].length !== rows) {
            throw new Error("corrupted data, error 1");
          }
        }
      } catch (e) {
        console.error(e.message);
        return;
      }

      let squareSize = Math.min(width / cols, height / rows);
      let xOffset = (width - cols * squareSize) / 2;
      let yOffset = (height - rows * squareSize) / 2;

      // i didn't use background(0); because alpha is 255 by default
      background(0,0,0,0);

      // reading the file
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          noStroke();
          if (data.img[i][j].length === 1) {
            fill(data.img[i][j][0]);
          } else {
            fill(data.img[i][j][0], data.img[i][j][1], data.img[i][j][2]);
          }
          rect(j*squareSize+yOffset, i*squareSize+xOffset, squareSize, squareSize+1);
        }
      }
      // if you already drew the image, don't do it again!
      isDone = true;
    }
  });
  
  if (key === "s") {
    saveCanvas('RawImageFileInPNG', 'png');
    noLoop();
  }
}
