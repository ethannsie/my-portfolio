// physicsSketch.js
// p5.js port of your Processing physics sandbox
// Intended to be loaded onto a page which provides a container div with id 'physics-canvas'

export function createPhysicsSketch(p) {
  // --- Globals (mirrors Processing variables) ---
  let NUM_ORBS, NUM_PARTICLES, MIN_SIZE, MAX_SIZE;
  let MIN_MASS, MAX_MASS, GRAVITY, K_CONSTANT;
  let cd, zone1, zone2, zone3;
  let SPRING_LENGTH, SPRING_K, selectedR, selectedC, arcRadius;
  let showVArrow, planetTrace, moonTrace, moving, bounce, gravitySim, springSim, dragSim, allSim, electroSim, earthGravity, showArc, instructions;
  let dragOrbs, multiArray, center, anchor, plate1, plate2, milks, galaxy, particles;

  // utility for color hex parse
  function hexToRgb(hex) {
    // expects number like 0xFFAA33 or string "#FFAABB"
    if (typeof hex === 'number') {
      const r = (hex >> 16) & 255; const g = (hex >> 8) & 255; const b = hex & 255;
      return [r, g, b];
    }
    return [255, 255, 255];
  }

  // --- Classes (converted) ---
  class Orb {
    constructor(x, y, s, m, col) {
      if (x === undefined) {
        this.size = Math.floor(p.random(MIN_SIZE, MAX_SIZE));
        const rx = Math.floor(p.random(this.size/2, p.width - this.size/2));
        const ry = Math.floor(p.random(this.size/2, p.height - this.size/2));
        this.position = p.createVector(rx, ry);
        this.mass = p.random(MIN_MASS, MAX_MASS);
      } else {
        this.position = p.createVector(x, y);
        this.size = s;
        this.mass = m;
      }
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.c = col ? col : p.color(0, 255, 255);
      // lerp color like Processing but simplified
      this.c = p.lerpColor(p.color(0, 255, 255), p.color(0), (this.mass/this.size)/(MAX_MASS/MIN_SIZE));
    }

    display() {
      p.noStroke();
      p.fill(this.c);
      p.circle(this.position.x, this.position.y, this.size);
      if (showVArrow) this.displayVArrow();
    }

    applyForce(force) {
      const scaleForce = force.copy().div(this.mass);
      this.acceleration.add(scaleForce);
    }

    run() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      if (bounce) {
        this.yBounce();
        this.xBounce();
      }
    }

    getSpring(other, springLength, springK) {
      const direction = p.createVector(other.position.x - this.position.x, other.position.y - this.position.y);
      direction.normalize();
      const displacement = p.dist(this.position.x, this.position.y, other.position.x, other.position.y) - springLength;
      const mag = springK * displacement;
      direction.mult(mag);
      return direction;
    }

    getGravity(other, gConstant) {
      const g = p.createVector(0, 0);
      if (other !== this) {
        let d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
        d = p.constrain(d, 5, p.height);
        const mag = (gConstant * this.mass * other.mass) / (d * d);
        const direction = p.createVector(other.position.x - this.position.x, other.position.y - this.position.y);
        direction.normalize();
        direction.mult(mag);
        return direction;
      }
      return g;
    }

    getDragForce(cdVal) {
      let dragMag = this.velocity.mag();
      dragMag = -0.5 * dragMag * dragMag * cdVal;
      const dragForce = this.velocity.copy();
      dragForce.normalize();
      dragForce.mult(dragMag);
      return dragForce;
    }

    yBounce() {
      if (this.position.y < this.size / 2) {
        this.position.y = this.size / 2;
        this.velocity.y *= -0.99;
      } else if (this.position.y >= (p.height - this.size / 2)) {
        this.position.y = p.height - this.size / 2;
        this.velocity.y *= -0.99;
      }
    }

    xBounce() {
      if (this.position.x < this.size / 2) {
        this.position.x = this.size / 2;
        this.velocity.x *= -0.99;
      } else if (this.position.x >= p.width - this.size / 2) {
        this.position.x = p.width - this.size / 2;
        this.velocity.x *= -0.99;
      }
    }

    isSelected(x, y) {
      const d = p.dist(x, y, this.position.x, this.position.y);
      return d < this.size / 2;
    }

    // --- FIX APPLIED HERE ---
    displayVArrow() {
      const xc = (this.size / 2) * Math.cos(this.velocity.heading());
      const yc = (this.size / 2) * Math.sin(this.velocity.heading());
      const arrowStart = p.createVector(this.position.x + xc, this.position.y + yc);
      
      // Use chainable instance methods instead of global p5.Vector static methods
      const arrowEnd = arrowStart.copy().add(this.velocity.copy().mult(10));
      
      p.stroke(0);
      if (gravitySim) p.stroke(255, 255, 255);
      p.strokeWeight(3);
      p.line(arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y);
    }

    // --- FIX APPLIED HERE ---
    displayAArrow() {
      if (moving) {
        const xc = (this.size / 2) * Math.cos(this.acceleration.heading());
        const yc = (this.size / 2) * Math.sin(this.acceleration.heading());
        const arrowStart = p.createVector(this.position.x + xc, this.position.y + yc);

        // Use chainable instance methods instead of global p5.Vector static methods
        const arrowEnd = arrowStart.copy().add(this.acceleration.copy().mult(10));
        
        p.stroke(0);
        if (gravitySim) p.stroke(255, 255, 255);
        p.strokeWeight(3);
        p.line(arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y);
      }
    }
  } // End Orb Class
  
  class FixedOrb extends Orb {
    constructor(x, y, s, m, c1) {
      super(x, y, s, m, c1 ? c1 : p.color(0));
      this.c = c1 ? c1 : p.color(0);
    }
    run() { /* do nothing */ }
    display() {
      p.fill(this.c);
      p.stroke(this.c);
      p.circle(this.position.x, this.position.y, this.size);
    }
  }

  class multiOrbNode extends Orb {
    constructor(x, y, s, m, north, south, east, west) {
      if (arguments.length === 0) {
        super();
        this.up = null; this.down = null; this.left = null; this.right = null;
      } else {
        super(x, y, s, m);
        this.up = north || null; this.down = south || null; this.left = west || null; this.right = east || null;
      }
      this.fixed = false;
    }

    applySprings(springLength, springK) {
      if (this.up) this.applyForce(this.getSpring(this.up, springLength, springK));
      if (this.down) this.applyForce(this.getSpring(this.down, springLength, springK));
      if (this.left) this.applyForce(this.getSpring(this.left, springLength, springK));
      if (this.right) this.applyForce(this.getSpring(this.right, springLength, springK));
    }

    display() {
      p.strokeWeight(1);
      if (this.right) {
        const d = this.position.dist(this.right.position);
        if (d < SPRING_LENGTH) p.stroke(0, 255, 0);
        else if (d > SPRING_LENGTH) p.stroke(255, 0, 0);
        else p.stroke(0);
        p.line(this.position.x, this.position.y, this.right.position.x, this.right.position.y);
      }
      if (this.down) {
        const d = this.position.dist(this.down.position);
        if (d < SPRING_LENGTH) p.stroke(0, 255, 0);
        else if (d > SPRING_LENGTH) p.stroke(255, 0, 0);
        else p.stroke(0);
        p.line(this.position.x, this.position.y, this.down.position.x, this.down.position.y);
      }
      super.display();
    }
  }

  class FixedOrbNode extends multiOrbNode {
    constructor(x, y, s, m) {
      super(x, y, s, m);
      this.fixed = true;
      this.c = p.color(0);
    }
    run() { /* do nothing */ }
  }

  class Atom {
    constructor(a, b) {
      // three constructors in processing merged into flexible JS constructor:
      // Accept (p1, p2) where p1,p2 are Particle; or (p, atom) or (a1, a2) atoms
      this.particleList = [];
      this.charge = 0;
      this.mass = 0;
      this.joined = false;
      if (a instanceof Particle && b instanceof Particle) {
        this.particleList.push(a);
        this.particleList.push(b);
        this.charge = a.charge + b.charge;
        this.mass = a.mass + b.mass;
      } else if (a instanceof Particle && b instanceof Atom) {
        this.particleList.push(a);
        for (let i = 0; i < b.particleList.length; i++) this.particleList.push(b.particleList[i]);
        this.charge = a.charge + b.charge;
        this.mass = a.mass + b.mass;
      } else if (a instanceof Atom && b instanceof Atom) {
        for (let i = 0; i < a.particleList.length; i++) this.particleList.push(a.particleList[i]);
        for (let i = 0; i < b.particleList.length; i++) this.particleList.push(b.particleList[i]);
        this.charge = a.charge + b.charge;
        this.mass = a.mass + b.mass;
      }
      // place atom at first particle pos reference
      this.position = this.particleList.length ? this.particleList[0].position.copy() : p.createVector(0,0);
    }

    display() {
      // update children positions relative to first particle's deltas if present
      for (let i = 0; i < this.particleList.length; i++) {
        if (i === 0) continue;
        const child = this.particleList[i];
        child.position.x = this.particleList[0].position.x + (child.deltaX || 0);
        child.position.y = this.particleList[0].position.y + (child.deltaY || 0);
      }
      for (let i = 0; i < this.particleList.length; i++) {
        this.particleList[i].display();
      }
      p.stroke(0);
      p.text(String(this.charge), this.position.x + 10, this.position.y);
    }

    run() {
      // run the first member (leader)
      if (this.particleList.length) this.particleList[0].run();
    }
  }

  class Particle extends Orb {
    constructor(x, y, s, m, c) {
      if (arguments.length === 1) { // Particle(c) in Processing
        super();
        this.charge = x;
      } else if (arguments.length === 0) {
        super();
        this.charge = 0;
      } else {
        super(x, y, s, m);
        this.charge = c;
      }
      this.deltaX = 0; this.deltaY = 0;
      this.joined = false;
      this.s1 = null; this.s2 = null;
      this.connectedAtom = null;
    }

    display() {
      if (this.charge <= -1) this.c = p.color(255, 0, 0);
      if (this.charge >= 1) this.c = p.color(0, 0, 255);
      if (this.charge === 0) this.c = p.color(155, 155, 155);
      if (!this.joined) {
        p.fill(this.c);
        p.text(String(this.charge), this.position.x + this.size/2, this.position.y);
      }
      if (this.s1 !== null && this.s2 !== null) {
        this.s1.display();
        this.s2.display();
        p.stroke(0);
        p.strokeWeight(1);
        const d1 = p.dist(this.position.x, this.position.y, this.s1.position.x, this.s1.position.y);
        const d2 = p.dist(this.position.x, this.position.y, this.s2.position.x, this.s2.position.y);
        if (d1 > 550) p.stroke(255, 0, 0);
        if (d1 < 550) p.stroke(0, 255, 0);
        p.line(this.position.x, this.position.y, this.s1.position.x, this.s1.position.y);
        if (d2 > 550) p.stroke(255, 0, 0);
        if (d2 < 550) p.stroke(0, 255, 0);
        p.line(this.position.x, this.position.y, this.s2.position.x, this.s2.position.y);
      }
      super.display();
    }

    getElectroForce(other, k) {
      const electroforce = p.createVector(other.position.x - this.position.x, other.position.y - this.position.y);
      let distance = electroforce.mag();
      const forceMagnitude = k * (-1 * this.charge * other.charge) / (distance * distance || 1);
      electroforce.normalize();
      electroforce.mult(forceMagnitude);
      return electroforce;
    }

    connect(other) {
      if (!this.joined) {
        if (p.dist(this.position.x, this.position.y, other.position.x, other.position.y) < (this.size/2 + other.size/2) && other.charge !== 0 && (this.charge / other.charge) < 0) {
          this.deltaX = other.position.x - this.position.x;
          this.deltaY = other.position.y - this.position.y;
          const connectedAtom = new Atom(other, this);
          other.connectedAtom = connectedAtom;
          this.connectedAtom = connectedAtom;
          this.joined = true;
          other.joined = true;
          this.acceleration.mult(0);
          this.velocity.mult(0);
          other.velocity.mult(0);
          other.acceleration.mult(0);
          // remove particles from global list - handled by main loop if desired
        }
      }
    }

    run() {
      super.run();
      if (this.joined && this.connectedAtom) {
        this.position.x = this.connectedAtom.particleList[0].position.x + this.deltaX;
        this.position.y = this.connectedAtom.particleList[0].position.y + this.deltaY;
      }
    }
  }

  class Planet extends Orb {
    constructor(x, y, s, m, o, col) {
      super(x, y, s, m);
      this.orbitPlanet = o;
      this.c = p.color(120, 120, 120);
      this.orbitPlanetDist = p.dist(this.position.x, this.position.y, this.orbitPlanet.position.x, this.orbitPlanet.position.y);
      const constant = 5;
const gravForce = (constant * this.mass * this.orbitPlanet.mass) / (this.orbitPlanetDist * this.orbitPlanetDist);
      this.orbitV = Math.sqrt(gravForce * this.orbitPlanetDist / this.mass);
      const direction = p.createVector(this.orbitPlanet.position.x - this.position.x, this.orbitPlanet.position.y - this.position.y).normalize();
      const normal = p.createVector(-direction.y, direction.x);
      this.velocity = normal.mult(this.orbitV);
      this.moons = [];
      this.tracers = [];
      this.c = col;
    }

    run() {
      this.orbitPlanetDist = p.dist(this.position.x, this.position.y, this.orbitPlanet.position.x, this.orbitPlanet.position.y);
      const constant = 5;
      this.gravForce = (constant * this.mass * this.orbitPlanet.mass) / (this.orbitPlanetDist * this.orbitPlanetDist);
      const direction = p.createVector(this.orbitPlanet.position.x - this.position.x, this.orbitPlanet.position.y - this.position.y).normalize();
      const gravAccel = direction.mult(this.gravForce / this.mass);
      this.velocity.add(gravAccel);
      super.run();
    }

    updateMoons() {
      for (let i = 0; i < this.moons.length; i++) {
        this.moons[i].position.add(this.velocity);
        const moonPlanetDist = p.dist(this.moons[i].position.x, this.moons[i].position.y, this.position.x, this.position.y);
        const moonGravForce = (2 * this.moons[i].mass * this.mass) / (moonPlanetDist * moonPlanetDist || 1);
        const moonDirection = p.createVector(this.position.x - this.moons[i].position.x, this.position.y - this.moons[i].position.y).normalize();
        const moonGravAccel = moonDirection.mult(moonGravForce / this.moons[i].mass);
        this.moons[i].velocity.add(moonGravAccel);
        this.moons[i].run();
      }
    }

    display() {
      super.display();
      p.noFill();
      p.stroke(255);
      p.strokeWeight(0.25);
      if (!planetTrace && !moonTrace) {
        p.arc(this.orbitPlanet.position.x, this.orbitPlanet.position.y, this.orbitPlanetDist * 2, this.orbitPlanetDist * 2, 0, p.TWO_PI);
        this.tracers = [];
      }
      if (planetTrace || moonTrace) this.showTrace();
    }

    addMoon(pObj) { this.moons.push(pObj); }

    showTrace() {
      if (planetTrace) {
        if (this.orbitPlanet instanceof FixedOrb) this.trace();
      }
      if (moonTrace) {
        if (this.orbitPlanet instanceof Planet) this.trace();
      }
    }

    trace() {
      const o = new FixedOrb(Math.floor(this.position.x), Math.floor(this.position.y), 1, 2, p.color(0xAAAAAA));
      this.tracers.push(o);
      for (let i = 0; i < this.tracers.length; i++) this.tracers[i].display();
      if (this.tracers.length > 80) {
        if (this.tracers[0].position.dist(this.tracers[this.tracers.length - 1].position) < 50) {
          this.tracers.shift();
        }
      }
    }
  }

  // --- Setup & high-level functions ---

  p.setup = function () {
    const container = document.getElementById('physics-canvas');
    // The container dimensions can be dynamic; set canvas to fill container
    let w = container ? container.clientWidth : 1200;
    let h = container ? container.clientHeight : 800;
    p.createCanvas(w, h).parent(container || document.body);

    anchor = new FixedOrb(p.width/2, 2000, 10, 250);
    setState();
    instructions = true;

    SPRING_LENGTH = 75;
    SPRING_K = 0.005;
    arcRadius = 100;
    NUM_ORBS = 2;
    NUM_PARTICLES = 80;
    MIN_SIZE = 10;
    MAX_SIZE = 60;
    MIN_MASS = 10;
    MAX_MASS = 100;
    GRAVITY = 20;
    K_CONSTANT = 50;
    cd = 0.0001;
    zone1 = 150;
    zone2 = 450;
    zone3 = 800;
    selectedR = -1; selectedC = -1;
    dragOrbs = null;
  };

  p.draw = function () {
    p.background(255);
    if (instructions) setupInstructions();
    if (electroSim) displayElectroSim();
    if (gravitySim) displayGravitySim();
    if (springSim) displaySpringSim();
    if (dragSim) displayDragSim();
    if (allSim) displayAllSim();
    menuDisplay();
  };

  function menuDisplay() {
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(15);
    p.noStroke();
    const off = p.color(80, 80, 80);
    const textOff = p.color(150, 150, 150);
    const textOn = p.color(250, 250, 250);

    // draw background boxes
    p.fill(off);
    const boxes = [5,85,180,285,390,495,600,705,810,915];
    for (let i=0;i<boxes.length;i++){
      p.rect(boxes[i],5, (i===9?175:100), 20);
    }

    p.fill(moving ? textOn : textOff); p.text("MOVING [ ]", 10, 7);
    p.fill(bounce ? textOn : textOff); p.text("BOUNCE [b]", 90, 7);
    p.fill(earthGravity ? textOn : textOff); p.text("GRAVITY [g]", 185, 7);
    p.fill(showVArrow ? textOn : textOff); p.text("VArrow [v]", 290, 7);
    p.fill(gravitySim ? textOn : textOff); p.text("PLANETS [1]", 395, 7);
    p.fill(springSim ? textOn : textOff); p.text("SPRING [2]", 500, 7);
    p.fill(dragSim ? textOn : textOff); p.text("DRAG [3]", 605, 7);
    p.fill(electroSim ? textOn : textOff); p.text("ELECTRIC [4]", 710, 7);
    p.fill(allSim ? textOn : textOff); p.text("COMBO SIM [5]", 815, 7);
    p.fill(instructions ? textOn : textOff); p.text("Click [i] for instructions", 920, 7);
  }

  // --- Gravity sim functions ---
  function populateGravity() {
    center = new FixedOrb(p.width/2, p.height/2, 50, 800, p.color(255,255,0));
    galaxy = [];
    for (let i = 0; i < 7; i++) createPlanet(i);
  }

  function createPlanet(index) {
    let x = Math.floor(p.random(200, p.width-200));
    while (Math.abs(x - p.width/2) < 50) x = Math.floor(p.random(200, p.width-200));
    let y = Math.floor(p.random(200, Math.min(600, p.height-50)));
    const pObj = new Planet(x, y, Math.floor(p.random(15,60)), Math.floor(p.random(100,400)), center, p.color(Math.random()*255, Math.random()*255, Math.random()*255));
    galaxy.push(pObj);
    if (index !== -1) {
      for (let j=0;j<Math.floor(p.random(1,5));j++) {
        const a = new Planet(Math.floor(galaxy[index].position.x + p.random(25,50)), Math.floor(galaxy[index].position.y + p.random(25,50)), Math.floor(p.random(5,15)), Math.floor(p.random(50,100)), galaxy[index], p.color(100,100,100));
        galaxy[index].addMoon(a);
      }
    } else {
      for (let j=0;j<Math.floor(p.random(1,5));j++) {
        const a = new Planet(Math.floor(pObj.position.x + p.random(25,50)), Math.floor(pObj.position.y + p.random(25,50)), Math.floor(p.random(5,15)), Math.floor(p.random(50,100)), pObj, p.color(100,100,100));
        pObj.addMoon(a);
      }
    }
    pObj.applyForce(p.createVector(200,0));
  }

  function displayGravitySim() {
    p.background(0);
    if (moving) {
      for (let i=0;i<galaxy.length;i++) {
        galaxy[i].run();
        galaxy[i].updateMoons();
      }
    }
    for (let i=0;i<galaxy.length;i++) {
      galaxy[i].display();
      for (let j=0;j<galaxy[i].moons.length;j++) galaxy[i].moons[j].display();
    }
    if (center) center.display();
  }

  // --- Spring Sim ---
  function populateSpringSim() {
    multiArray = new Array(5);
    for (let i=0;i<5;i++){
      multiArray[i] = new Array(8);
      for (let j=0;j<8;j++){
        multiArray[i][j] = new multiOrbNode(125+j*125, 125+i*125, 50, 100.0);
      }
    }
    SPRING_LENGTH = Math.floor(p.createVector(multiArray[0][0].position.x, multiArray[0][0].position.y).dist(multiArray[0][1].position));
    for (let i=0;i<multiArray.length;i++){
      for (let j=0;j<multiArray[i].length;j++){
        if (i>0) multiArray[i][j].up = multiArray[i-1][j];
        if (j>0) multiArray[i][j].left = multiArray[i][j-1];
        if (j < multiArray[i].length-1) multiArray[i][j].right = multiArray[i][j+1];
        if (i < multiArray.length-1) multiArray[i][j].down = multiArray[i+1][j];
      }
    }
  }

  function displaySpringSim() {
    if (!moving) {
      for (let i=0;i<multiArray.length;i++) for (let j=0;j<multiArray[i].length;j++) multiArray[i][j].display();
    } else {
      for (let i=0;i<multiArray.length;i++){
        for (let j=0;j<multiArray[i].length;j++){
          multiArray[i][j].run();
          multiArray[i][j].applySprings(SPRING_LENGTH, SPRING_K);
          if (earthGravity) multiArray[i][j].applyForce(multiArray[i][j].getGravity(anchor, GRAVITY));
          multiArray[i][j].display();
        }
      }
    }
    if (showArc && selectedR !== -1 && selectedC !== -1) {
      const x = multiArray[selectedR][selectedC].position.x;
      const y = multiArray[selectedR][selectedC].position.y;
      p.noFill(); p.stroke(0);
      p.arc(x, y, arcRadius, arcRadius, 0, p.TWO_PI);
    }
  }

  // --- Drag Sim ---
  function makeDragOrbs() {
    dragOrbs = new Array(4);
    for (let i=0;i<4;i++){
      const x = 20;
      const y = Math.floor((i+1) * p.height/(dragOrbs.length+1));
      const s = Math.floor(p.random(10,30));
      dragOrbs[i] = new Orb(x,y,s, s/2, p.color(0xF25157)); // redBall approximated
      const initialX = p.createVector(20,0);
      dragOrbs[i].applyForce(initialX);
    }
  }

  function displayDragSim() {
    p.fill(170,170,170,50); p.rect(0,0,p.width,p.height);
    p.fill(185,216,230); p.rect(150,0,200,p.height);
    p.fill(150,222,209); p.rect(450,0,300,p.height);
    p.fill(100,150,170); p.rect(850,0,200,p.height);
    if (!dragOrbs) makeDragOrbs();
    for (let i=0;i<dragOrbs.length;i++){
      dragOrbs[i].display();
      if (moving) {
        cd = .001;
        if (dragOrbs[i].position.x > zone1 && dragOrbs[i].position.x > zone1 + 200) cd = .005;
        if (dragOrbs[i].position.x > zone2 && dragOrbs[i].position.x < zone2 + 300) cd = .025;
        if (dragOrbs[i].position.x > zone3 && dragOrbs[i].position.x < zone3 + 200) cd = 0.125;
        const force = dragOrbs[i].getDragForce(cd);
        dragOrbs[i].applyForce(force);
        if (earthGravity) dragOrbs[i].applyForce(dragOrbs[i].getGravity(anchor, GRAVITY));
        dragOrbs[i].run();
      }
    }
  }

  // --- Electro Sim ---
  function makeParticles() {
    particles = [];
    NUM_PARTICLES = 80;
    for (let i=0;i<NUM_PARTICLES;i++){
      const x = Math.floor(p.random(p.width/2 - 500, p.width/2 + 500));
      const y = Math.floor(p.random(p.height/2 - 300, p.height/2 + 300));
      const charge = Math.floor(p.random(-3,3));
      const part = new Particle(x,y,10,5,charge);
      particles.push(part);
    }
  }

  function chargeAll() {
    for (let i=0;i<particles.length;i++){
      if (particles[i].charge > 0) particles[i].charge++;
      if (particles[i].charge < 0) particles[i].charge--;
    }
  }

  function displayElectroSim() {
    p.background(255);
    if (!particles) makeParticles();
    //console.log(NUM_PARTICLES);
    for (let i=0;i<particles.length;i++){
      particles[i].display();
      if (moving) {
        for (let j=0;j<particles.length;j++){
          if (i !== j && particles[i].connectedAtom === particles[j].connectedAtom && particles[i] != null) {
            const force = particles[i].getElectroForce(particles[j], K_CONSTANT);
            particles[i].applyForce(force);
            particles[i].connect(particles[j]);
          }
        }
        if (!particles[i].joined) particles[i].run();
      }
    }
  }

  // --- Combo sim ---
  function makePlates() {
    plate1 = new Array(100); plate2 = new Array(100);
    for (let i=0;i<plate1.length;i++) {
      plate1[i] = new Particle(100 + Math.floor((i+1/2)*10), 100, 10, 5, 1);
      plate2[i] = new Particle(100 + Math.floor((i+1/2)*10), p.height-100, 10, 5, -1);
    }
    milks = new Array(9);
    for (let i=0;i<milks.length;i++){
      milks[i] = new Particle(600, 150 + (i+1) * 50, 10, 5, -1);
      milks[i].s1 = new FixedOrb(50, 150 + (i+1) * 50, 20, 5);
      milks[i].s2 = new FixedOrb(p.width-50, 150 + (i+1) * 50, 20, 5);
    }
  }

  function displayAllSim() {
    if (!milks) makePlates();
    for (let i=0;i<milks.length;i++){
      milks[i].display();
      for (let j=0;j<plate1.length;j++){
        plate1[j].display(); plate2[j].display();
        if (moving) {
          const force1 = milks[i].getElectroForce(plate1[j], K_CONSTANT);
          const force2 = milks[i].getElectroForce(plate2[j], K_CONSTANT);
          milks[i].applyForce(force1);
          milks[i].applyForce(force2);
          milks[i].applyForce(milks[i].getSpring(milks[i].s1, 550, SPRING_K));
          milks[i].applyForce(milks[i].getSpring(milks[i].s2, 550, SPRING_K));
          milks[i].run();
        }
      }
    }
  }

  // --- Input handlers (attach to p5 events) ---
  p.mousePressed = function () {
    if (electroSim && particles) {
      for (let i=0;i<particles.length;i++){
        const par = particles[i];
        if (par.isSelected(p.mouseX, p.mouseY)) par.charge *= -1;
      }
    }
  };

  p.mouseClicked = function () {
    if (springSim) {
      for (let i=0;i<multiArray.length;i++){
        for (let j=0;j<multiArray[i].length;j++){
          if (multiArray[i][j].isSelected(p.mouseX, p.mouseY)) {
            // toggle fixed/floating
            if (multiArray[i][j] instanceof FixedOrbNode) {
              multiArray[i][j] = new multiOrbNode(Math.floor(multiArray[i][j].position.x), Math.floor(multiArray[i][j].position.y), multiArray[i][j].size, multiArray[i][j].mass);
            } else {
              multiArray[i][j] = new FixedOrbNode(Math.floor(multiArray[i][j].position.x), Math.floor(multiArray[i][j].position.y), multiArray[i][j].size, multiArray[i][j].mass);
            }
            // rewire neighbors
            if (i > 0) { multiArray[i][j].up = multiArray[i-1][j]; multiArray[i-1][j].down = multiArray[i][j]; }
            if (i < multiArray.length-1) { multiArray[i][j].down = multiArray[i+1][j]; multiArray[i+1][j].up = multiArray[i][j]; }
            if (j > 0) { multiArray[i][j].left = multiArray[i][j-1]; multiArray[i][j-1].right = multiArray[i][j]; }
            if (j < multiArray[i].length-1) { multiArray[i][j].right = multiArray[i][j+1]; multiArray[i][j+1].left = multiArray[i][j]; }
          }
        }
      }
    }
  };

  p.mouseDragged = function () {
    if (springSim) {
      for (let i=0;i<multiArray.length;i++){
        for (let j=0;j<multiArray[i].length;j++){
          if (multiArray[i][j].isSelected(p.mouseX, p.mouseY)) {
            multiArray[i][j].position.x = p.mouseX;
            multiArray[i][j].position.y = p.mouseY;
            showArc = true;
            selectedR = i; selectedC = j;
          }
        }
      }
    }
  };

  p.mouseReleased = function () {
    if (springSim) {
      showArc = false;
    }
  };

  p.keyPressed = function () {
    const k = p.key;
    if (k === ' ' && !instructions) moving = !moving;
    if (k === 'g' && (springSim || dragSim)) earthGravity = !earthGravity;
    if (k === 'b' && !gravitySim) bounce = !bounce;
    if (k === '=') { if (gravitySim) createPlanet(-1); }
    if (k === '-') { if (gravitySim && galaxy && galaxy.length) galaxy.pop(); }
    if (k === 'i') { setState(); instructions = true; }
    if (k === '1') { populateGravity(); setState(); gravitySim = true; }
    if (k === '2') { selectedR = -1; selectedC = -1; populateSpringSim(); setState(); springSim = true; }
    if (k === '3') { makeDragOrbs(); setState(); dragSim = true; }
    if (k === '4') { makeParticles(); setState(); electroSim = true; }
    if (k === '5') { makePlates(); setState(); allSim = true; }
    if (k === 'p' && electroSim) chargeAll();
    if (k === 'v') showVArrow = !showVArrow;
    if (k === 't') { planetTrace = !planetTrace; moonTrace = false; }
    if (k === 'm') { planetTrace = false; moonTrace = !moonTrace; }
  };

  function setState() {
    moving = false; bounce = false; earthGravity = false; gravitySim = false; springSim = false; dragSim = false; electroSim = false; allSim = false;
    showVArrow = false; showArc = false; instructions = false;
  }

function setupInstructions() {
    const off = p.color(75, 75, 75);
    const textOn = p.color(200, 200, 200);
    p.fill(off);
    const x1 = 10, x2 = 246, x3 = 482, x4 = 718, x5 = 954;
    const width1 = 231;
    p.rect(x1, 75, width1, p.height - 85);
    p.rect(x2, 75, width1, p.height - 85);
    p.rect(x3, 75, width1, p.height - 85);
    p.rect(x4, 75, width1, p.height - 85);
    p.rect(x5, 75, width1, p.height - 85);
    p.fill(textOn);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(30);
    p.text("Planetary Motion", x1 + width1 / 2, 100);
     p.text(``, x1 + width1 / 2, 100);
    p.text("Spring Sim", x2 + width1 / 2, 100);
    p.text("Drag Sim", x3 + width1 / 2, 100);
    p.text("Electro Sim", x4 + width1 / 2, 100);
    p.text("Combo Sim", x5 + width1 / 2, 100);
    p.textSize(18);
    p.textAlign(p.CENTER, p.TOP);





    // Functions section
    p.textSize(25);
    p.text("Functions", x1 + width1 / 2, 200);
    p.textSize(15);
    p.text(`[1] Press to Activate Planetary Motion Instructions:
- Click and drag planets to adjust initial positions.
- Press [v] to toggle velocity arrows.
- Press [t] or [m] to toggle orbit traces for planets and moons.
- Press [space] to toggle movement.`, x1 + 15, 445, width1 - 25, p.height-85);
    p.textSize(25);
p.text("Functions", x2 + width1 / 2, 200);
    p.textSize(15);

    p.text(`[2] Press to Activate Spring Simulation Instructions:
- Click and drag nodes to move them.
- Click a node to toggle fixed/floating state.
- Press [space] to toggle movement.
- Press [g] to enable Earth gravity.`, x2 + 15, 360, width1 - 25, p.height - 85);
    p.textSize(25);

p.text("Functions", x3 + width1 / 2, 200);
    p.textSize(15);

    p.text(`[3] Press to Activate Drag Simulation Instructions:
- Particles experience variable drag depending on zones.
- Press [space] to toggle movement.
- Press [g] to enable Earth gravity.`, x3 + 15, 385, width1 - 25, p.height - 85);
    p.textSize(25);

p.text("Functions", x4 + width1 / 2, 200);
    p.textSize(15);

    p.text(`[4] Press to Activate Electro Simulation Instructions:
- Click a particle to reverse its charge.
- Press [p] to charge all particles.
- Particles attract/repel based on charge.
- Press [space] to toggle movement.`, x4 + 15, 410, width1 - 25, p.height - 85);
    p.textSize(25);

p.text("Functions", x5 + width1 / 2, 200);
    p.textSize(15);

    p.text(`[5] Press to Activate Combo Simulation Instructions:
- Multiple charged particles and springs interact.
- Press [space] to toggle movement.
- Observe combined forces of springs and electric charges.`,
 x5 + 15, 430, width1 - 25, p.height - 85);
}


  // expose a teardown so React can remove the sketch cleanly if needed
  p._teardown = function () {
    // any cleanup if needed
  };
}; // end createPhysicsSketch

