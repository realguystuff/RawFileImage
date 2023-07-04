# RawFileImage
A new way to store images without encrypting anything.

## Intro
Hello everyone!

This is a custom image file type made by me (realguystuff)!

Remember to change the filename on the sketch.js file!

Basically what this does is... nevermind. Check example.rif (numbers are "red, green, blue", or if it is just one number, black to white. (0 to 255 for both ways)).

Test it by using `git clone https://github.com/realguystuff/RawFileImage` and running `index.html`!

## What is this?
### For Users:
The Raw Image File is a unique file type that offers a straightforward and accessible way to work with images. Unlike other image file formats, it is not encoded into hexadecimal bits and remains human-readable. This means that you can open and view the contents of the file using a text editor, without the need for specialized software.

One notable aspect of the Raw Image File is that it is not compressed in any way. This ensures that the image data remains uncompressed and unaltered, allowing for precise editing and manipulation. You can modify the file's contents directly, making it easy to tweak specific elements of the image.

Please note that due to its simplicity, the Raw Image File may have certain limitations compared to more traditional image formats. However, its openness and editability can be advantageous, especially for tasks such as training text-based neural networks to generate images.

### For Developers:
The Raw Image File is a JSON-based file format designed to store image data in a structured manner. It follows a specific sequence defined as:

```json
{
  "img": [
    [[r, g, b], [r, g, b], ...],
    [[r, g, b], [r, g, b], ...],
    ...
  ]
}
```

Each image is represented by a nested array, where each inner array contains RGB values. The RGB values are represented as numbers ranging from 0 to 255, denoting the intensity of red (r), green (g), and blue (b) color channels.

Alternatively, to simplify the file size, you can represent the image using a monochrome format. In this case, you can use a single element array to store the RGB value, enabling you to represent black (0) to white (255) with a single value. The format for this monochrome representation is:

```json
{
  "img": [
    [[m], [m], ...],
    [[m], [m], ...],
    ...
  ]
}
```

You have the flexibility to use a combination of both monochrome and RGB values within the same Raw Image File, allowing you to optimize the file size while retaining the desired level of detail.

It is important to note that the Raw Image File's simplicity and ease of editing also introduce certain security considerations. Since the file is easily editable with a text editor, there is a potential risk of malicious code being inserted into the file. To mitigate this risk, ensure that the Raw Image File only contains the "img" key and numerical values, without any additional functions or obfuscated code. This precaution helps maintain the integrity and safety of the file format.

In summary, the Raw Image File offers developers a unique approach to working with images. It facilitates easy editing and manipulation without the need for complex image processing software. However, it is essential to be mindful of security concerns when working with this file format and ensure that it adheres to the specified structure to prevent any potential vulnerabilities.

#### How do I use it in code?

Since the .rif file is JSON, we can just use a library to read the .rif file which is really JSON.\
For example, in Javascript, we would use JQuery to read JSON files:

```js
$.getJSON(filePath, function(data) {
  // do stuff here
}
```

or in Node.js, we'd use `require();`:

```js
const data = require('./example.rif');
```

To read the file, use a nested `for` loop because the .rif format is a 3d array. For example, in p5.js:

```js
let cols, rows

// ...

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
```


## Additional notes:
- It's essential to emphasize that the .rif file format is distinct and should not be confused with any other existing file formats or programs that happen to use the .rif extension for different purposes. Users and developers should be cautious when handling .rif files and ensure they are using the correct specifications for this specific file type to avoid potential compatibility issues.

- For users who want to visualize the images stored in .rif format, a p5.js program has been provided (link not shown). This program allows users to view the image data and interact with it. By pressing the "S" key, users can download the image in the more common .png format for easier sharing and viewing outside of the Raw Image File format.

- As of now, there is no direct method provided to convert a common image file format (e.g., .png, .jpeg) to the .rif format. However, the development of such a conversion tool may be in progress or planned for the future. Users and developers should keep an eye out for updates and announcements regarding this feature.

- The RIF file format currently does not have the alpha channel support, but that may change in the future.

The introduction of this new .rif file format brings a novel and accessible approach to working with images, offering both users and developers unique advantages in terms of editability and ease of manipulation. As the format gains traction and potential conversion tools are developed, it is essential to stay informed about updates and ensure proper usage to harness the full potential of this innovative file format.
