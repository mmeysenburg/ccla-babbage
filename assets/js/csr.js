/**
 * Circular slide rule Web application.
 *
 * @author Mark M. Meysenburg
 * @version 2023-11-30
 */

//------------------------------------------------------------------------
// globals
//------------------------------------------------------------------------

// radii
let OUTER_RAD;
// let A_RAD;
let D_RAD;
// let K_RAD;
let B_RAD;
let C_RAD;
let CI_RAD;

// ring colors
// let A_COLOR;
let D_COLOR;
// let K_COLOR;
let B_COLOR;
let C_COLOR;
let CI_COLOR;

// TODO: dial font?
// let font;

// data tables
let A;
let CI;
let D;
// let K;

// graphics buffers for inner and outer discs
let innerDisc;
let outerDisc;

// angles for inner and outer discs
let innerDiscTheta = 0.0;
let cursorTheta = 0.0;

// flags for mode
let isCursor = false;
let isLocked = false;

/**
 * Create the inner disc image for the slide rule.
 */
function makeInnerDisc() {
  innerDisc = createGraphics(windowWidth, windowHeight);

  innerDisc.background(0, 0, 0, 0);
  innerDisc.stroke(0);

  // TODO: font?
  innerDisc.textAlign(CENTER, CENTER);
  innerDisc.ellipseMode(RADIUS);

  drawB();
  drawC();
  drawCI();
} // makeInnerDisc

/**
 * Create the outer disc image for the slide rule.
 */
function makeOuterDisc() {
  outerDisc = createGraphics(windowWidth, windowHeight);

  outerDisc.background(0, 0, 0, 0);
  outerDisc.stroke(0);

  // TODO: font?
  outerDisc.textAlign(CENTER, CENTER);

  outerDisc.ellipseMode(RADIUS);

  // drawA();
  drawD();
  // drawK();
}

function calcA(R, x) {
  return (R / 2.0) * log10(x);
}

function calcCI(R, x) {
  return abs(R * log10(10.0 / x) - R);
}

function calcD(R, x) {
  return R * log10(x);
}

function calcK(R, x) {
  return (R / 3.0) * log10(x);
}

/**
 * Calculate the base-10 logarithm of x.
 */
function log10(x) {
  return log(x) / log(10);
}

/**
 * Draw the A scale on the outer disc.
 */
// function drawA() {
//   outerDisc.fill(A_COLOR);
//   outerDisc.ellipse(
//     outerDisc.width / 2.0,
//     outerDisc.height / 2.0,
//     OUTER_RAD,
//     OUTER_RAD
//   );
//   outerDisc.fill(D_COLOR);
//   outerDisc.ellipse(
//     outerDisc.width / 2.0,
//     outerDisc.height / 2.0,
//     A_RAD,
//     A_RAD
//   );
//   outerDisc.fill(0);

//   outerDisc.text(
//     "A",
//     outerDisc.width / 2.0 + A_RAD + (OUTER_RAD - A_RAD) / 2.0,
//     outerDisc.height / 2.0 + 20.0
//   );

//   for (let row = 0; row < A.getRowCount(); row += 2) {
//     r = A.getRow(row);
//     lineLens = A.getRow(row + 1);

//     len = r.get(0);

//     tic = r.get(1);
//     v = r.get(1);
//     theta = calcA(2.0 * PI, v);

//     rad = A_RAD + 40.0;
//     x1 = rad * cos(theta) + outerDisc.width / 2.0;
//     y1 = rad * sin(theta) + outerDisc.height / 2.0;
//     outerDisc.text(tic, x1, y1);

//     theta += PI;
//     x1 = rad * cos(theta) + outerDisc.width / 2.0;
//     y1 = rad * sin(theta) + outerDisc.height / 2.0;
//     outerDisc.text(tic, x1, y1);

//     for (let col = 1; col <= len; col++) {
//       v = r.get(col);
//       theta = calcA(2.0 * PI, v);

//       ll = 10.0 * lineLens.get(col);

//       rad = A_RAD;
//       x1 = rad * cos(theta) + outerDisc.width / 2.0;
//       y1 = rad * sin(theta) + outerDisc.height / 2.0;
//       rad += ll;
//       x2 = rad * cos(theta) + outerDisc.width / 2.0;
//       y2 = rad * sin(theta) + outerDisc.height / 2.0;
//       outerDisc.line(x1, y1, x2, y2);

//       theta += PI;
//       rad = A_RAD;
//       x1 = rad * cos(theta) + outerDisc.width / 2.0;
//       y1 = rad * sin(theta) + outerDisc.height / 2.0;
//       rad += ll;
//       x2 = rad * cos(theta) + outerDisc.width / 2.0;
//       y2 = rad * sin(theta) + outerDisc.height / 2.0;
//       outerDisc.line(x1, y1, x2, y2);
//     }
//   }
// } // drawA

/**
 * Draw the B scale on the inner disc.
 */
function drawB() {
  innerDisc.fill(B_COLOR);
  innerDisc.ellipse(
    innerDisc.width / 2.0,
    innerDisc.height / 2.0,
    D_RAD,
    D_RAD
  );
  innerDisc.fill(C_COLOR);
  innerDisc.ellipse(
    innerDisc.width / 2.0,
    innerDisc.height / 2.0,
    B_RAD,
    B_RAD
  );
  innerDisc.fill(0);

  innerDisc.text(
    "B",
    innerDisc.width / 2.0 + B_RAD + (D_RAD - B_RAD) / 2.0,
    innerDisc.height / 2.0 + 20.0
  );

  for (let row = 0; row < A.getRowCount(); row += 2) {
    let r = A.getRow(row);
    let lineLens = A.getRow(row + 1);

    let len = r.get(0);

    let tic = r.get(1);
    let v = r.get(1);
    let theta = calcA(2.0 * PI, v);

    let rad = B_RAD + 40.0;
    let x1 = rad * cos(theta) + windowWidth / 2.0;
    let y1 = rad * sin(theta) + windowHeight / 2.0;
    innerDisc.text(tic, x1, y1);

    theta += PI;
    x1 = rad * cos(theta) + windowWidth / 2.0;
    y1 = rad * sin(theta) + windowHeight / 2.0;
    innerDisc.text(tic, x1, y1);

    for (let col = 1; col <= len; col++) {
      v = r.get(col);
      theta = calcA(2.0 * PI, v);

      let ll = 10.0 * lineLens.get(col);

      rad = B_RAD;
      x1 = rad * cos(theta) + windowWidth / 2.0;
      y1 = rad * sin(theta) + windowHeight / 2.0;
      rad += ll;
      let x2 = rad * cos(theta) + windowWidth / 2.0;
      let y2 = rad * sin(theta) + windowHeight / 2.0;
      innerDisc.line(x1, y1, x2, y2);

      theta += PI;
      rad = B_RAD;
      x1 = rad * cos(theta) + windowWidth / 2.0;
      y1 = rad * sin(theta) + windowHeight / 2.0;
      rad += ll;
      x2 = rad * cos(theta) + windowWidth / 2.0;
      y2 = rad * sin(theta) + windowHeight / 2.0;
      innerDisc.line(x1, y1, x2, y2);
    } // for col
  } // for row
} // drawB

/**
 * Draw the C scale on the inner disc.
 */
function drawC() {
  innerDisc.fill(CI_COLOR);
  innerDisc.ellipse(
    innerDisc.width / 2.0,
    innerDisc.height / 2.0,
    C_RAD,
    C_RAD
  );
  innerDisc.fill(0);

  innerDisc.text(
    "C",
    innerDisc.width / 2.0 + C_RAD + (B_RAD - C_RAD) / 2.0,
    innerDisc.height / 2.0 + 20.0
  );

  for (let row = 0; row < D.getRowCount(); row += 2) {
    r = D.getRow(row);
    lineLens = D.getRow(row + 1);

    len = r.get(0);

    tic = r.get(1);
    v = r.get(1);
    theta = calcD(2.0 * PI, v);

    rad = C_RAD + 40.0;
    x1 = rad * cos(theta) + windowWidth / 2.0;
    y1 = rad * sin(theta) + windowHeight / 2.0;
    innerDisc.text(tic, x1, y1);

    for (let col = 1; col <= len; col++) {
      v = r.get(col);
      theta = calcD(2.0 * PI, v);

      ll = 10.0 * lineLens.get(col);

      rad = C_RAD;
      x1 = rad * cos(theta) + windowWidth / 2.0;
      y1 = rad * sin(theta) + windowHeight / 2.0;
      rad += ll;
      x2 = rad * cos(theta) + windowWidth / 2.0;
      y2 = rad * sin(theta) + windowHeight / 2.0;
      innerDisc.line(x1, y1, x2, y2);
    }
  }
} // drawC

/**
 * Draw the CI scale on the inner disc.
 */
function drawCI() {
  innerDisc.fill(255);
  innerDisc.ellipse(
    innerDisc.width / 2.0,
    innerDisc.height / 2.0,
    CI_RAD,
    CI_RAD
  );
  innerDisc.fill(0);

  innerDisc.text(
    "CI",
    innerDisc.width / 2.0 + CI_RAD + ((C_RAD - CI_RAD) / 3.0) * 2.0,
    innerDisc.height / 2.0 + 20.0
  );

  for (let row = CI.getRowCount() - 2; row >= 0; row -= 2) {
    r = CI.getRow(row);
    lineLens = CI.getRow(row + 1);

    len = r.get(0);

    tic = r.get(1);
    v = r.get(1);
    theta = 2.0 * PI - calcCI(2.0 * PI, v);

    rad = CI_RAD + 40.0;
    x1 = rad * cos(theta) + windowWidth / 2.0;
    y1 = rad * sin(theta) + windowHeight / 2.0;
    innerDisc.text(tic, x1, y1);

    for (let col = 1; col <= len; col++) {
      v = r.get(col);
      theta = 2.0 * PI - calcCI(2.0 * PI, v);

      ll = 10.0 * lineLens.get(col);

      rad = CI_RAD;
      x1 = rad * cos(theta) + windowWidth / 2.0;
      y1 = rad * sin(theta) + windowHeight / 2.0;
      rad += ll;
      x2 = rad * cos(theta) + windowWidth / 2.0;
      y2 = rad * sin(theta) + windowHeight / 2.0;
      innerDisc.line(x1, y1, x2, y2);
    }
  }
} // drawCI

/**
 * Draw the D scale on the outer disc.
 */
function drawD() {
  outerDisc.fill(D_COLOR);
  outerDisc.ellipse(outerDisc.width / 2.0,
                    outerDisc.height / 2.0,
                    OUTER_RAD, OUTER_RAD);
  outerDisc.ellipse(
    outerDisc.width / 2.0,
    outerDisc.height / 2.0,
    D_RAD,
    D_RAD
  );
  outerDisc.fill(0);

  outerDisc.text(
    "D",
    outerDisc.width / 2.0 + D_RAD + (OUTER_RAD - D_RAD) / 2.0,
    outerDisc.height / 2.0 + 20.0
  );

  for (let row = 0; row < D.getRowCount(); row += 2) {
    r = D.getRow(row);
    lineLens = D.getRow(row + 1);

    len = r.get(0);

    tic = r.get(1);
    v = r.get(1);
    theta = calcD(2.0 * PI, v);

    rad = D_RAD + 40.0;
    x1 = rad * cos(theta) + windowWidth / 2.0;
    y1 = rad * sin(theta) + windowHeight / 2.0;
    outerDisc.text(tic, x1, y1);

    for (let col = 1; col <= len; col++) {
      v = r.get(col);
      theta = calcD(2.0 * PI, v);

      ll = 10.0 * lineLens.get(col);

      rad = D_RAD;
      x1 = rad * cos(theta) + windowWidth / 2.0;
      y1 = rad * sin(theta) + windowHeight / 2.0;
      rad += ll;
      x2 = rad * cos(theta) + windowWidth / 2.0;
      y2 = rad * sin(theta) + windowHeight / 2.0;
      outerDisc.line(x1, y1, x2, y2);
    } // for col
  } // for row
} // drawD

/**
 * Draw the K scale on the outer disc.
 */
// function drawK() {
//   outerDisc.fill(B_COLOR);
//   ellipse(outerDisc.width / 2.0, outerDisc.height / 2.0, K_RAD, K_RAD);
//   outerDisc.fill(0);

//   outerDisc.text(
//     "K",
//     outerDisc.width / 2.0 + K_RAD + (D_RAD - K_RAD) / 2.0,
//     outerDisc.height / 2.0 + 20.0
//   );

//   for (let row = 0; row < K.getRowCount(); row += 2) {
//     r = K.getRow(row);
//     lineLens = K.getRow(row + 1);

//     len = r.get(0);

//     tic = r.get(1);
//     v = r.get(1);
//     theta = calcK(360.0, v);

//     rad = K_RAD + 40.0;
//     x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//     y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//     outerDisc.text(tic, x1, y1);

//     theta += 120.0;
//     x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//     y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//     outerDisc.text(tic, x1, y1);

//     theta += 120.0;
//     x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//     y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//     outerDisc.text(tic, x1, y1);

//     for (let col = 1; col <= len; col++) {
//       v = r.get(col);
//       theta = calcK(360.0, v);

//       ll = 10.0 * lineLens.get(col);

//       rad = K_RAD;
//       x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       rad += ll;
//       x2 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y2 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       outerDisc.line(x1, y1, x2, y2);

//       theta += 120.0;

//       rad = K_RAD;
//       x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       rad += ll;
//       x2 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y2 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       outerDisc.line(x1, y1, x2, y2);

//       theta += 120.0;

//       rad = K_RAD;
//       x1 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y1 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       rad += ll;
//       x2 = rad * cos(radians(theta)) + windowWidth / 2.0;
//       y2 = rad * sin(radians(theta)) + windowHeight / 2.0;
//       outerDisc.line(x1, y1, x2, y2);
//     }
//   }
// } // drawK

/**
 * load assets, blocking until complete
 */
function preload() {
  A = loadTable("../assets/code/A.csv", "csv");
  CI = loadTable("../assets/code/CI.csv", "csv");
  D = loadTable("../assets/code/D.csv", "csv");
  // K = loadTable("../assets/code/K.csv", "csv");
}

/**
 * Setup the application
 */
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('csr-holder');
  // fullscreen(true);

  // A_COLOR = color(205, 168, 130);
  D_COLOR = color(227,206,185);
  // K_COLOR = color(220, 193, 167);
  B_COLOR = color(220,193,167);
  C_COLOR = color(212,181,149);
  CI_COLOR = color(205,168,130);

  OUTER_RAD = min(windowWidth, windowHeight) / 2.0;
  // A_RAD = OUTER_RAD - 50.0;
  D_RAD = OUTER_RAD - 75.0;
  // K_RAD = D_RAD - 50.0;
  B_RAD = D_RAD - 75.0;
  C_RAD = B_RAD - 75.0;
  CI_RAD = C_RAD - 75.0;

  makeInnerDisc();
  makeOuterDisc();
  
  // let btnCD = createButton('Change to cursor rotation');
  // btnCD.position(0, windowHeight - 50);
  // btnCD.mousePressed(() => {
  //   isCursor = !isCursor;
  //   btnCD.html(isCursor ? 'Change to disc rotation' : 'Change to cursor rotation');
  // });
  
  // let btnLock = createButton('Lock');
  // btnLock.position(0, windowHeight);
  // btnLock.mousePressed(() => {
  //   isLocked = !isLocked;
  //   btnLock.html(isLocked ? 'Unlock' : 'Lock');
  // });
}

function toggleCD() { 
  isCursor = !isCursor;
  lbl = isCursor ? 'Change to disc rotation' : 'Change to cursor rotation';
  document.getElementById('btnCD').innerHTML = lbl;
}

function toggleLock() {
  isLocked = !isLocked;
  lbl = isLocked ? 'Unlock' : 'Lock';
  document.getElementById('btnLock').innerHTML = lbl;
}
  
function draw() {
  background(234, 219, 203);

  // stationary outer disc
  image(outerDisc, 0, 0);

  // revolving inner disc
  applyMatrix();
  translate(windowWidth / 2.0, windowHeight / 2.0);
  rotate(innerDiscTheta);
  translate(-innerDisc.width / 2.0, -innerDisc.height / 2.0);
  image(innerDisc, 0, 0);
  resetMatrix();

  // revolving cursor
  x = OUTER_RAD * cos(cursorTheta) + windowWidth / 2.0;
  y = OUTER_RAD * sin(cursorTheta) + windowHeight / 2.0;
  if (isCursor) {
    stroke(255, 0, 0);
  } else {
    stroke(0, 255, 0);
  }
  line(windowWidth / 2.0, windowHeight / 2.0, x, y);
}

function mouseDragged() {
  if(isLocked) return;
  if (isCursor) {
    cursorTheta = atan2(
      mouseY - windowHeight / 2.0,
      mouseX - windowWidth / 2.0
    );
  } else {
    innerDiscTheta = atan2(
      mouseY - windowHeight / 2.0,
      mouseX - windowWidth / 2.0
    );
  }
}

function windowResized() {
  OUTER_RAD = min(windowWidth, windowHeight) / 2.0;
  // A_RAD = OUTER_RAD - 50.0;
  D_RAD = OUTER_RAD - 75.0;
  // K_RAD = D_RAD - 50.0;
  B_RAD = D_RAD - 75.0;
  C_RAD = B_RAD - 75.0;
  CI_RAD = C_RAD - 75.0;

  resizeCanvas(windowWidth, windowHeight);
  
  makeInnerDisc();
  makeOuterDisc();
}
