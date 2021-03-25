// import "./styles.css";
import { useEffect, useState } from "react";
import p5 from "react-p5";
import Sketch from "react-p5";

export default function App() {
  let colorPicker;
  const height = 1000;
  const width = 1000;
  var img;
  var w, h, tow, toh;
  var x, y, tox, toy;
  var zoom = 1.00;
  var zMin = 0.05;
  var zMax = 9.00;
  var sens = 0.01;

  const preload = (p5) => {
    img = p5.createImage(1000, 1000); 
  }

  const setup = (p5, canvasParentRef) => {
    //let img = p5.createImage(1000, 1000); 
    
    img.loadPixels();
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
    p5.background(0);

    colorPicker = p5.createColorPicker("#ed225d");
    colorPicker.position(0, 100 + 5);

    function writeColor(image, x, y, red, green, blue, alpha) {
      let index = (x + y * width) * 4;
      image.pixels[index] = red;
      image.pixels[index + 1] = green;
      image.pixels[index + 2] = blue;
      image.pixels[index + 3] = alpha;
    }
  
    let x, y;
    // fill with random colors
    for (y = 0; y < img.height; y++) {
      for (x = 0; x < img.width; x++) {
        let red = p5.random(255);
        let green = p5.random(255);
        let blue = p5.random(255);
        let alpha = 255;
        writeColor(img, x, y, red, green, blue, alpha);
      }
    }

    p5.scale(zoom)
    p5.noSmooth()
    img.updatePixels();
    p5.image(img, 0, 0);

  };

  const draw = (p5) => {

    // x = p5.lerp(x, tox, .1);
    // y = p5.lerp(y, toy, .1);
    // w = p5.lerp(w, tow, .1); 
    // h = p5.lerp(h, toh, .1);

    // p5.image(img, x-w/2, y-h/2, w, h);
    // p5.translate(p5.width/2,p5.height/2);
    p5.scale(zoom);
    p5.noSmooth()
    p5.image(img, 0, 0);
    // for (let i = 0; i < 200; i++) {
    //   for (let j = 0; j < 200; j++) {
    //     p5.background.set(i, j, p5.color(0, 90, 102));
    //   }
    // }
  };
  
  const mouseClicked = (p5, event) => {
    // console.log(event);
    p5.noStroke();
    let color = colorPicker.color();
    p5.fill(color);
    p5.rect(p5.mouseX, p5.mouseY, 5, 5);
  };

  const mouseDragged =(p5, event) => {
    //console.log(event);
    tox += p5.mouseX-p5.pmouseX;
    toy += p5.mouseY-p5.pmouseY;
  }


  const mouseWheel = (p5, event) => {
    console.log(event);
    zoom -= sens * event.delta;
    zoom = p5.constrain(zoom, zMin, zMax);
    return false;

  }

  return <Sketch mouseClicked={mouseClicked} preload = {preload} mouseWheel={mouseWheel} setup={setup} draw={draw} />;
}