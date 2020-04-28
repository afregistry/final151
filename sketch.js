let characters = [];
let keybored = [];
let kpcx, input, button, greeting, splitString, dKey, doDraw, counter, lrCounter, workCounter;


function setup() {
  doDraw = 0;

  createCanvas(640, 450);
  background(60, 99, 100);

  draw1stBored();

  input = createInput();
  input.size(595, 94);
  input.position(20, 65);

  button = createButton('submit');
  button.style('background-color', '');
  button.position(input.x + input.width - 55, 165);
  button.mousePressed(createNK);

  greeting = createElement('h2', 'Please enter a string of lower-case text for sample input:');
  greeting.style('color', '#ffffff');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);


  //create all the letter holders and defaults
  let tempCount = 0;
  for (let i = 0; i < 26; i++) {
    characters.push(new Letter());
    characters[i].addKVal(unchar('a') + i);
    characters[i].addFreq(0);
  }

  tempCount = 0;
  for (let i = 0; i < 36; i++) {
    keybored.push(new kee());
    keybored[i].addKVal('');
  }
  assignProm(keybored);

  frameRate(15);

  workCounter = 0;
  lrCounter = 0;
  counter = 0;
  noLoop();

  key = 'a';

}

function draw() {
  // print(mouseX, ' ', mouseY);

  // key = ' ';

  // let tKey = key;
  // dKey = key;

  workCounter++;
  typedKey();

  if (lrCounter == 22) {
    fill('white');
    rect(20, 65, 595, 100);
    lrCounter = 0;
  }

  // if (tKey != ' ') {
  // //   tKey = ' ';
  // }
  // // if (counter > 1)
  //   counter--;

  // if(keyPressed)
  counter++;

  if (dKey >= 'a' && dKey <= 'z') {
    if (counter != 0) {
      textSize(45);
      // textStyle('italicize');
      let randomColor = color(random(255), random(255), random(255));
      fill(randomColor);
      // text(key, 100, 85);
      text(dKey, (55 + (lrCounter * 25)), 128);
      // print("inherer" + lrCounter);
      lrCounter++;

    }
    counter++;

  } else if (counter != 0) {
    fill('white');
    rect(20, 65, 595, 100);
    lrCounter = 0;
  }

  // if (doDraw == 1) {
  let words = ['Good job!', 'Keep it up!', 'Do something better with your time!', 'Great effort!'];
  let word = ' '; // select random word
  if ((workCounter % 8) == 0) {
    word = random(words);
    fill(60, 99, 120);
    noStroke();
    rect(0, 168, 640, 100);

  }
  //motivation
  textSize(40);
  // textStyle('italicize');
  let randomColor = color(random(255), random(255), random(255));
  fill(randomColor);
  // text(key, 100, 85);
  text(word, width / 2, 230);
  // }


}

function keyPressed() {
  if (doDraw == 1) {
    redraw();
  }
}

function createNK() {
  const daInput = input.value();
  splitString = split(daInput, '');

  countNumLetters(splitString);

  let freqArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  let charArr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  for (let i = 0; i < characters.length; i++) {
    freqArr[i] = characters[i].freq;

    // if (characters[i].freq == 0) {
    charArr[i] = characters[i].kVal;
    // } else {
    //   charArr[i] = '';
    // }
  }


  let min
  for (let i = 0; i < (26 - 1); i++) {
    min = i;
    for (let j = i + 1; j < 26; j++) {
      if (freqArr[j] < freqArr[min]) {
        min = j;
      }
    }

    let tempF = freqArr[min];
    let tempC = charArr[min];
    freqArr[min] = freqArr[i];
    charArr[min] = charArr[i];
    freqArr[i] = tempF;
    charArr[i] = tempC;
  }


  // print(charArr);

  // freqArr = sort(freqArr, 26);

  //   for (i = 0; i < freqArr.length; i++) {
  //     if(freqArr[i] > 0){
  //     freqArr[i] += i;
  //     }
  //   }

  //   // for (i = 0; i < freqArr.length; i++) {
  //   //   let max = 0
  //   //   i
  //   // }


  freqArr = reverse(freqArr);
  charArr = reverse(charArr);



  for (let i = 0; i < freqArr.length; i++) {
    let j = 0;
    if (freqArr[i] > 0) {
      for (j = 0; j < characters.length; j++) {
        for (let k = 0; k < keybored.length; k++) {
          if (keybored[k].promVal == i) {
            keybored[k].addKVal(charArr[i]);
          }
        }
      }
    }
  }


  greeting.html('This is your new keyboard layout! Try it out:');
  input.value('');

  background(60, 99, 120);

  draw2ndBored();

  doDraw = 1;

  fill('white');
  //display text
  rect(20, 65, 595, 100);

  input.position(-100, -100);
  button.position(-100, -100);

  // text(characters[0].freq, 157, 127);

  // print(keybored[20].kVal);


}

//assigns prominence scores by force
function assignProm(keybored) {
  keybored[0].addPromVal(-1);
  keybored[1].addPromVal(-1);
  keybored[2].addPromVal(-1);
  keybored[3].addPromVal(5);
  keybored[4].addPromVal(3);
  keybored[5].addPromVal(16);
  keybored[6].addPromVal(20);
  keybored[7].addPromVal(19);
  keybored[8].addPromVal(15);
  keybored[9].addPromVal(2);
  keybored[10].addPromVal(4);
  keybored[11].addPromVal(8);
  keybored[12].addPromVal(-1);
  keybored[13].addPromVal(-1);
  keybored[14].addPromVal(7);
  keybored[15].addPromVal(14);
  keybored[16].addPromVal(12);
  keybored[17].addPromVal(1);
  keybored[18].addPromVal(10);
  keybored[19].addPromVal(9);
  keybored[20].addPromVal(0);
  keybored[21].addPromVal(11);
  keybored[22].addPromVal(13);
  keybored[23].addPromVal(6);
  keybored[24].addPromVal(-1);
  keybored[25].addPromVal(24);
  keybored[26].addPromVal(-1);
  keybored[27].addPromVal(22);
  keybored[28].addPromVal(18);
  keybored[29].addPromVal(25);
  keybored[30].addPromVal(17);
  keybored[31].addPromVal(21);
  keybored[32].addPromVal(-1);
  keybored[33].addPromVal(-1);
  keybored[34].addPromVal(23);
}


//iterates through everything and figures out how man times a letter occured
function countNumLetters(splitString) {
  let uncharLet = -1;
  for (let i = 0; i < splitString.length; i++) {
    uncharLet = unchar(splitString[i]) - 97;
    if (uncharLet > -1 && uncharLet < 26) {
      characters[uncharLet].addFreq();
    }
  }
}

function draw1stBored() {
  //row 1
  // kpcx = 495;
  // for (let i = 0; i < 2; i++) {
  //   rect(kpcx, 220, 50, 50);
  //   kpcx += 50;
  // }

  //row 2
  kpcx = 20;
  for (let i = 0; i < 12; i++) {
    rect(kpcx, 270, 50, 50);
    kpcx += 50;
  }

  //row 3
  kpcx = 30;
  for (let i = 0; i < 11; i++) {
    rect(kpcx, 320, 50, 50);
    kpcx += 50;
  }

  //row 4
  kpcx = 60;
  for (let i = 0; i < 10; i++) {
    rect(kpcx, 370, 50, 50);
    kpcx += 50;
  }
}

function draw2ndBored() {
  //   //row 1
  //   kpcx = 495;
  //   for (let i = 0; i < 2; i++) {
  //     fill('white');

  //     rect(kpcx, 220, 50, 50);

  //     kpcx += 50;
  //   }

  //row 2
  kpcx = 20;
  for (let i = 0; i < 12; i++) {
    fill('white');

    rect(kpcx, 270, 50, 50);

    kpcx += 50;
  }

  //row 3
  kpcx = 30;
  for (let i = 0; i < 11; i++) {
    fill('white');

    rect(kpcx, 320, 50, 50);

    kpcx += 50;
  }

  //row 4
  kpcx = 60;
  for (let i = 0; i < 10; i++) {
    fill('white');
    rect(kpcx, 370, 50, 50);

    kpcx += 50;
  }

  // text(keybored,300,300)

  for (let j = 0; j < keybored.length; j++) {

    let tempcv = unchar(keybored[j].kVal) - 97;
    if (tempcv >= 0 && tempcv < 26) {

      if (j >= 0 && j < 3) {
        keybored[j].assignX(495 + 25 + (50 * j));
        keybored[j].assignY(255);
        keybored[j].drawKee();
      } else if (j >= 2 && j < 14) {
        keybored[j].assignX(20 + 25 + (50 * (j - 2)));
        keybored[j].assignY(305);
        keybored[j].drawKee();
      } else if (j >= 14 && j < 25) {
        keybored[j].assignX(30 + 25 + (50 * (j - 14)));
        keybored[j].assignY(355);
        keybored[j].drawKee();
      } else {
        keybored[j].assignX(60 + 25 + (50 * (j - 25)));
        keybored[j].assignY(405);
        keybored[j].drawKee();
      }
    }
  }
}


// Kee class to hold values of the keys
// Prom value
class kee {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.kVal = '';
    this.promVal = -1;
  }

  assignX(x) {
    this.x = x;
  }

  assignY(y) {
    this.y = y;
  }

  addPromVal(pVal) {
    this.promVal = pVal;
  }

  addKVal(dKey) {
    this.kVal = dKey;
  }

  drawKee() {
    fill('black');
    textSize(40);
    textFont('Arial');
    // Draw the letter to the screen
    // text(this.promVal, this.x, this.y)//debug
    text(this.kVal, this.x, this.y);
  }

}

// Letter class
class Letter {
  constructor() {
    this.freq = -1;
    this.kVal = '';
  }

  addKVal(dKey) {
    this.kVal = char(dKey);
  }

  addFreq() {
    this.freq += 1;
  }

}

//"reprograms" key pressed to be new keyboard. Only handles lowercased alphabet. 
function typedKey() {
  switch (key) {
    //row: 1 *******
    case 'w':
      dKey = keybored[3].kVal;
      break;
    case 'e':
      dKey = keybored[4].kVal;
      break;
    case 'r':
      dKey = keybored[5].kVal;
      break;
    case 't':
      dKey = keybored[6].kVal;
      break;
    case 'y':
      dKey = keybored[7].kVal;
      break;
    case 'u':
      dKey = keybored[8].kVal;
      break;
    case 'i':
      dKey = keybored[9].kVal;
      break;
    case 'o':
      dKey = keybored[10].kVal;
      break
    case 'p':
      dKey = keybored[11].kVal;
      break

      //row: 2 ************************************
    case 'a':
      dKey = keybored[14].kVal;
      break;
    case 's':
      dKey = keybored[15].kVal;
      break;
    case 'd':
      dKey = keybored[16].kVal;
      break;
    case 'f':
      dKey = keybored[17].kVal;
      break;
    case 'g':
      dKey = keybored[18].kVal;
      break;
    case 'h':
      dKey = keybored[19].kVal;
      break;
    case 'j':
      dKey = keybored[20].kVal;
      break;
    case 'k':
      dKey = keybored[21].kVal;
      break;
    case 'l':
      dKey = keybored[22].kVal;
      break;
    case '\;':
      dKey = keybored[23].kVal;
      break;
    case '\'':
      dKey = keybored[24].kVal;
      break;

      //row: 3 ****************************************
    case 'z':
      dKey = keybored[25].kVal;
      break;
    case 'x':
      dKey = keybored[26].kVal;
      break;
    case 'c':
      dKey = keybored[27].kVal;
      break;
    case 'v':
      dKey = keybored[28].kVal;
      break;
    case 'b':
      dKey = keybored[29].kVal;
      break;
    case 'n':
      dKey = keybored[30].kVal;
      break;
    case 'm':
      dKey = keybored[31].kVal;
      break;
    case '\,':
      dKey = keybored[32].kVal;
      break;
    case '\.':
      dKey = keybored[33].kVal;
      break;
    case '\/':
      dKey = keybored[34].kVal;
      break;
    default:
      dKey = ' ';
      break;
  }
  return false;
}