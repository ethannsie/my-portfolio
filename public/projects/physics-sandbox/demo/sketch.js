// ========================================================================================================================
// GLOBAL VARIABLES (from physicsDriver.pde)
// ========================================================================================================================
let NUM_ORBS;
let NUM_PARTICLES;
let MIN_SIZE;
let MAX_SIZE;

let MIN_MASS;
let MAX_MASS;
let GRAVITY;
let K_CONSTANT;

let cd;
let zone1;
let zone2;
let zone3;
let redBall; // p5.js color type

let SPRING_LENGTH;
let SPRING_K;
let selectedR, selectedC;
let arcRadius;

let showVArrow;
let planetTrace;
let moonTrace;
let moving;
let bounce;
let gravitySim;
let springSim;
let dragSim;
let allSim;
let electroSim;
let earthGravity;
let showArc;
let instructions;

let dragOrbs; // Array of Orb
let multiArray; // 2D array of multiOrbNode
let center, anchor; // FixedOrb
let plate1, plate2, milks; // Array of Particle/FixedOrb for Combo Sim
let galaxy; // Array of Planet
let particles; // Array of Particle/Atom


// ========================================================================================================================
// BASE CLASS: Orb (from Orb.pde)
// Handles vectors, movement, force application, bounce, gravity, spring, and drag
// ========================================================================================================================
class Orb {
  constructor(x, y, s, m, col = null) {
    if (x === undefined) {
      // Default constructor logic
      this.size = floor(random(MIN_SIZE, MAX_SIZE));
      let rx = floor(random(this.size / 2, width - this.size / 2));
      let ry = floor(random(this.size / 2, height - this.size / 2));
      this.mass = random(MIN_MASS, MAX_MASS);
      this.position = createVector(rx, ry);
      this.c = color(0, 255, 255);
    } else {
      // Main constructor logic
      this.position = createVector(x, y);
      this.size = s;
      this.mass = m;
      this.c = col || color(0, 255, 255);
    }

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    // Color adjustment logic (based on original PDE)
    let c1 = color(0);
    let massRatio = map(this.mass / this.size, MIN_MASS / MAX_SIZE, MAX_MASS / MIN_SIZE, 0, 1, true);
    this.c = lerpColor(this.c, c1, massRatio);
    this.fixed = false;
  }

  display() {
    noStroke();
    fill(this.c);
    ellipse(this.position.x, this.position.y, this.size, this.size);
    if (showVArrow) {
      this.displayVArrow();
    }
  }

  applyForce(force) {
    // F = ma -> a = F/m
    let scaleForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(scaleForce);
  }

  run() {
    if (this.fixed) return;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration

    if (bounce) {
      this.yBounce();
      this.xBounce();
    }
  }

  getSpring(other, springLength, springK) {
    let direction = p5.Vector.sub(other.position, this.position);
    let displacement = this.position.dist(other.position) - springLength;
    let mag = springK * displacement;
    direction.normalize();
    direction.mult(mag);
    return direction;
  }

  getGravity(other, gConstant) {
    let g = p5.Vector.sub(other.position, this.position);
    let distance = g.mag();
    distance = constrain(distance, this.size / 2 + other.size / 2, 500);
    g.normalize();

    // Newton's Law of Gravitation: F = G * (m1 * m2) / r^2
    let strength = (gConstant * this.mass * other.mass) / (distance * distance);
    g.mult(strength);
    return g;
  }

  getDragForce(cd) {
    let drag = this.velocity.copy();
    let speed = drag.mag();
    // Simplified drag: Fd = -1 * Cd * v^2 * Area (Area is proxied by size)
    let dragMagnitude = -1 * cd * speed * speed * this.size;
    drag.normalize();
    drag.mult(dragMagnitude);
    return drag;
  }

  yBounce() {
    if (this.position.y < this.size / 2) {
      this.position.y = this.size / 2;
      this.velocity.y *= -0.99;
    } else if (this.position.y >= (height - this.size / 2)) {
      this.position.y = height - this.size / 2;
      this.velocity.y *= -0.99;
    }
  }

  xBounce() {
    if (this.position.x < this.size / 2) {
      this.position.x = this.size / 2;
      this.velocity.x *= -0.99;
    } else if (this.position.x >= width - this.size / 2) {
      this.position.x = width - this.size / 2;
      this.velocity.x *= -0.99;
    }
  }

  isSelected(x, y) {
    let d = dist(x, y, this.position.x, this.position.y);
    return d < this.size / 2;
  }

  displayVArrow() {
    let heading = this.velocity.heading();
    let radius = this.size / 2;
    let arrowStart = createVector(this.position.x + radius * cos(heading), this.position.y + radius * sin(heading));
    let arrowEnd = p5.Vector.add(arrowStart, p5.Vector.mult(this.velocity, 10));

    strokeWeight(3);
    stroke(gravitySim ? 255 : 0);
    line(arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y);
  }
}

// ========================================================================================================================
// SUBCLASSES
// ========================================================================================================================

// FixedOrb (from FixedOrb.pde)
class FixedOrb extends Orb {
  constructor(x, y, s, m, col = color(0)) {
    super(x, y, s, m, col);
    this.fixed = true;
  }
  run() {
    // do nothing!
  }
  display() {
    fill(this.c);
    stroke(this.c);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}

// multiOrbNode (from multiOrbNode.pde)
class multiOrbNode extends Orb {
  constructor(x, y, s, m, north = null, south = null, east = null, west = null) {
    super(x, y, s, m);
    this.up = north;
    this.down = south;
    this.left = west;
    this.right = east;
    this.fixed = false;
  }

  applySprings(springLength, springK) {
    if (this.fixed) return;

    if (this.up) this.applyForce(this.getSpring(this.up, springLength, springK));
    if (this.down) this.applyForce(this.getSpring(this.down, springLength, springK));
    if (this.left) this.applyForce(this.getSpring(this.left, springLength, springK));
    if (this.right) this.applyForce(this.getSpring(this.right, springLength, springK));
  }

  display() {
    strokeWeight(1);
    this._drawSpring(this.right);
    this._drawSpring(this.down);
    super.display();
  }

  _drawSpring(other) {
    if (other) {
      let d = this.position.dist(other.position);
      if (d < SPRING_LENGTH) {
        stroke(0, 255, 0); // Green (Compressed)
      } else if (d > SPRING_LENGTH) {
        stroke(255, 0, 0); // Red (Stretched)
      } else {
        stroke(0); // Black (Rest)
      }
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}

// FixedOrbNode (from FixedOrbNode.pde)
class FixedOrbNode extends multiOrbNode {
  constructor(x, y, s, m) {
    super(x, y, s, m);
    this.fixed = true;
    this.c = color(0);
  }
  run() {
    // do nothing!
  }
}

// Particle (from Particle.pde)
class Particle extends Orb {
  constructor(x, y, s, m, c) {
    super(x, y, s, m);
    this.charge = c;
    this.deltaX = 0;
    this.deltaY = 0;
    this.joined = false;
    this.s1 = null; // FixedOrb anchor 1 (Combo Sim)
    this.s2 = null; // FixedOrb anchor 2 (Combo Sim)
    this.connectedAtom = null; // Atom reference
  }

  display() {
    // Set color based on charge
    if (this.charge < 0) this.c = color(255, 0, 0); // Red (Negative)
    else if (this.charge > 0) this.c = color(0, 0, 255); // Blue (Positive)
    else this.c = color(155, 155, 155); // Gray (Neutral)

    super.display();

    if (!this.joined) {
      // Display charge number
      fill(this.c);
      textSize(10);
      textAlign(LEFT, CENTER);
      text(this.charge, this.position.x + this.size / 2, this.position.y);
    }

    if (this.s1 && this.s2) {
      // For combo sim
      this.s1.display();
      this.s2.display();
      stroke(0);
      strokeWeight(1);
      line(this.position.x, this.position.y, this.s1.position.x, this.s1.position.y);
      line(this.position.x, this.position.y, this.s2.position.x, this.s2.position.y);
    }
  }

  getElectroForce(other, k) {
    let electroforce = p5.Vector.sub(other.position, this.position);
    let distance = electroforce.mag();

    distance = constrain(distance, this.size / 2 + other.size / 2, 500);

    // Coulomb's Law: F = k * (q1 * q2) / r^2. Negative sign for attraction with sub() vector.
    let forceMagnitude = k * (-1 * this.charge * other.charge) / (distance * distance);

    electroforce.normalize();
    electroforce.mult(forceMagnitude);
    return electroforce;
  }

  connect(other) {
    if (!this.joined && !other.joined) {
      // Proximity and opposite charges
      if (dist(this.position.x, this.position.y, other.position.x, other.position.y) < (this.size / 2 + other.size / 2) &&
        other.charge !== 0 && this.charge / other.charge < 0) {

        this.deltaX = other.position.x - this.position.x;
        this.deltaY = other.position.y - this.position.y;

        this.connectedAtom = new Atom(other, this);
        other.connectedAtom = this.connectedAtom;

        this.joined = true;
        other.joined = true;
        
        return true; // Signal a connection
      }
    }
    return false;
  }

  run() {
    super.run();
    if (this.joined && this.connectedAtom) {
      // If joined, the particle should follow its connected atom's position
      this.position = this.connectedAtom.position.copy();
    }
  }
}

// Atom (from Atom.pde)
class Atom extends Particle {
  constructor(p1, p2, a1 = null, a2 = null) {
    super(0, 0, 0, 0, 0); // Initialize Orb/Particle properties

    this.particleList = [];

    // Logic to handle all three constructor types from Atom.pde
    if (a1 && a2) { // Atom(Atom a1, Atom a2)
      this.particleList.push(...a1.particleList, ...a2.particleList);
      this.charge = a1.charge + a2.charge;
      this.mass = a1.mass + a2.mass;
      this.position = a1.position.copy();
    } else if (p2 instanceof Atom) { // Atom(Particle p, Atom atom)
      this.particleList.push(p1, ...p2.particleList);
      this.charge = p2.charge + p1.charge;
      this.mass = p1.mass + p2.mass;
      this.position = p1.position.copy();
    } else { // Atom(Particle p1, Particle p2)
      this.particleList.push(p1, p2);
      this.charge = p1.charge + p2.charge;
      this.mass = p1.mass + p2.mass;
      this.position = p1.position.copy();
    }

    this.velocity.mult(0);
    this.joined = true; // Atoms are part of the 'particles' list. They are a composition.

    // Calculate Atom's size (arbitrary sum of sizes)
    this.size = this.particleList.reduce((sum, p) => sum + p.size * 0.75, 0); 
  }

  display() {
    // An Atom should draw its constituent particles.
    for (let p of this.particleList) {
      p.display();
    }

    // Calculate center of mass for atom's position
    let totalX = this.particleList.reduce((sum, p) => sum + p.position.x * p.mass, 0);
    let totalY = this.particleList.reduce((sum, p) => sum + p.position.y * p.mass, 0);
    this.position.set(totalX / this.mass, totalY / this.mass);

    // Set color based on NET charge
    if (this.charge < 0) this.c = color(200, 50, 50); // Darker Red
    else if (this.charge > 0) this.c = color(50, 50, 200); // Darker Blue
    else this.c = color(50, 50, 50); // Very Dark Gray (Neutral)

    noStroke();
    fill(this.c, 100); // Semi-transparent shell
    ellipse(this.position.x, this.position.y, this.size, this.size);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(`Net: ${this.charge}`, this.position.x, this.position.y);

    if (showVArrow) this.displayVArrow();
  }

  run() {
    super.run();
    // The Particle.run() function handles the constituents following the Atom.
  }
}

// Planet (from Planet.pde)
class Planet extends Orb {
  constructor(x, y, s, m, o, c1) {
    super(x, y, s, m, c1);
    this.orbitPlanet = o; // Orb
    this.numMoons = 0;
    this.moons = new Array(10).fill(null); // Array of Planet
    this.tracers = []; // Array of FixedOrb for trace
    this.constant = 5; // Gravity constant for planetary system

    this.orbitPlanetDist = dist(this.position.x, this.position.y, this.orbitPlanet.position.x, this.orbitPlanet.position.y);
    this.gravForce = (this.constant * this.mass * this.orbitPlanet.mass) / (this.orbitPlanetDist * this.orbitPlanetDist);
    this.orbitV = sqrt(this.constant * this.orbitPlanet.mass / this.orbitPlanetDist);

    let direction = p5.Vector.sub(this.orbitPlanet.position, this.position).normalize();
    let normal = createVector(-direction.y, direction.x); // Perpendicular vector
    this.velocity = normal.mult(this.orbitV);
  }

  run() {
    this.orbitPlanetDist = dist(this.position.x, this.position.y, this.orbitPlanet.position.x, this.orbitPlanet.position.y);
    this.gravForce = (this.constant * this.mass * this.orbitPlanet.mass) / (this.orbitPlanetDist * this.orbitPlanetDist);
    let direction = p5.Vector.sub(this.orbitPlanet.position, this.position).normalize();
    let gravAccel = direction.mult(this.gravForce / this.mass);

    this.velocity.add(gravAccel);
    super.run();

    if ((planetTrace && this.orbitPlanet instanceof FixedOrb) || (moonTrace && this.orbitPlanet instanceof Planet)) {
      this.trace();
    }
  }

  updateMoons() {
    for (let i = 0; i < this.numMoons; i++) {
      let moon = this.moons[i];
      let moonPlanetDist = dist(moon.position.x, moon.position.y, this.position.x, this.position.y);
      let moonGravForce = (2 * moon.mass * this.mass) / (moonPlanetDist * moonPlanetDist);

      let moonDirection = p5.Vector.sub(this.position, moon.position).normalize();
      let moonGravAccel = moonDirection.mult(moonGravForce / moon.mass);

      moon.velocity.add(moonGravAccel);
      moon.run();
    }
  }

  display() {
    super.display();

    noFill();
    stroke(255);
    strokeWeight(0.25);

    if (!planetTrace && !moonTrace && this.orbitPlanet instanceof FixedOrb) {
      // Draw the theoretical circular orbit (only for main planets)
      ellipse(this.orbitPlanet.position.x, this.orbitPlanet.position.y, this.orbitPlanetDist * 2, this.orbitPlanetDist * 2);
      this.tracers = [];
    }
    
    for (let tracer of this.tracers) {
      tracer.display();
    }
  }

  addMoon(p) {
    if (this.numMoons < this.moons.length) {
      this.moons[this.numMoons] = p;
      this.numMoons++;
    }
  }

  trace() {
    let o = new FixedOrb(floor(this.position.x), floor(this.position.y), 1, 1, this.c);
    this.tracers.push(o);
    if (this.tracers.length > 500) { // Limit trace length
      this.tracers.shift();
    }
  }
}

// ========================================================================================================================
// CORE SKETCH FUNCTIONS (from physicsDriver.pde)
// ========================================================================================================================

function setup() {
  createCanvas(1200, 800);
  anchor = new FixedOrb(width / 2, 2000, 10, 250); // Anchor for Earth Gravity
  setState(); // Initialize boolean flags
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
  GRAVITY = 20; // Gravitational acceleration constant
  K_CONSTANT = 50; // Electrostatic constant
  cd = 0.0001;
  zone1 = 150;
  zone2 = 450;
  zone3 = 800;
  redBall = color(242, 81, 87); // redBall = #F25157
  textSize(15);
  textAlign(LEFT, TOP);
}

function draw() {
  background(255);

  if (instructions) setupInstructions();
  else if (electroSim) displayElectroSim();
  else if (gravitySim) displayGravitySim();
  else if (springSim) displaySpringSim();
  else if (dragSim) displayDragSim();
  else if (allSim) displayAllSim();

  menuDisplay();
}

function setState() {
  moving = false;
  bounce = false;
  earthGravity = false;
  showVArrow = false;
  planetTrace = false;
  moonTrace = false;
  gravitySim = false;
  springSim = false;
  dragSim = false;
  allSim = false;
  electroSim = false;
  showArc = false;
  instructions = false;

  dragOrbs = null;
  multiArray = null;
  galaxy = null;
  particles = null;
  plate1 = null;
  plate2 = null;
  milks = null;
}

function menuDisplay() {
  textAlign(LEFT, TOP);
  textSize(15);
  noStroke();
  let off = color(80);
  let textOff = color(150);
  let textOn = color(250);

  let modes = [
    { text: "MOVING [ ]", flag: moving, x: 5, w: 75 },
    { text: "BOUNCE [b]", flag: bounce, x: 85, w: 90 },
    { text: "GRAVITY [g]", flag: earthGravity, x: 180, w: 100 },
    { text: "VArrow [v]", flag: showVArrow, x: 285, w: 100 },
    { text: "PLANETS [1]", flag: gravitySim, x: 390, w: 100 },
    { text: "SPRING [2]", flag: springSim, x: 495, w: 100 },
    { text: "DRAG [3]", flag: dragSim, x: 600, w: 100 },
    { text: "ELECTRIC [4]", flag: electroSim, x: 705, w: 100 },
    { text: "COMBO SIM [5]", flag: allSim, x: 810, w: 100 },
    { text: "Click [i] for instructions", flag: instructions, x: 915, w: 175 }
  ];

  for (let m of modes) {
    fill(off);
    rect(m.x, 5, m.w, 20);
    fill(m.flag ? textOn : textOff);
    text(m.text, m.x + 5, 7);
  }
}

function setupInstructions() {
  background(255);
  textAlign(CENTER, TOP);
  textSize(40);
  fill(0);
  text("Physics Simulations - p5.js Conversion", width / 2, 50);

  let width1 = (width - 25) / 5;
  let x = 5;

  let cols = [
    { title: "Planetary Motion [1]", text: "The Planetary Motion simulation demonstrates gravitational force applied to the orbiting bodies. Use [t] and [m] for traces." },
    { title: "Spring Simulation [2]", text: "Demonstrates a grid of orbs connected by springs. The top row is fixed. Drag an orb to move it. [Mouse Click] selects an orb." },
    { title: "Drag Simulation [3]", text: "Shows three regions of fluid drag (blue rectangles) that affect the orbs differently. Use [b] for bounce and [g] for gravity." },
    { title: "Electrostatic Force [4]", text: "Shows attraction/repulsion. Oppositely charged particles combine into an atom. [Mouse Click] flips charge. [p] increases all charges." },
    { title: "Combo Sim [5]", text: "Modeled after the Millikan's Oil Drop Experiment, demonstrating equilibrium between electric, spring, and gravitational forces." }
  ];

  for (let i = 0; i < cols.length; i++) {
    let c = cols[i];
    let colX = x + i * (width1 + 5);

    fill(200);
    rect(colX, 100, width1, height - 110);
    fill(0);
    textSize(20);
    textAlign(CENTER, TOP);
    text(c.title, colX + width1 / 2, 110);
    textSize(15);
    textAlign(LEFT, TOP);
    text(c.text, colX + 15, 140, width1 - 30, height - 200);

    // Functions
    textSize(25);
    textAlign(CENTER, TOP);
    text("Functions", colX + width1 / 2, 410);
    textSize(15);
    textAlign(LEFT, TOP);
    let startY = 440;

    if (i === 0) { // Planets
      text("[v] Toggles velocity arrows", colX + 15, startY + 0);
      text("[+] Adds a new planet", colX + 15, startY + 20);
      text("[-] Removes the last planet", colX + 15, startY + 40);
      text("[t] Toggles planet trace", colX + 15, startY + 60);
      text("[m] Toggles moon trace", colX + 15, startY + 80);
    } else if (i === 1) { // Spring
      text("[g] Activates Earth gravity", colX + 15, startY + 0);
      text("[Mouse Drag] Moves selected orb", colX + 15, startY + 20);
    } else if (i === 2) { // Drag
      text("[b] Activates bounce", colX + 15, startY + 0);
      text("[g] Activates Earth gravity", colX + 15, startY + 20);
    } else if (i === 3) { // Electric
      text("[p] Increases every charge by +/- 1", colX + 15, startY + 0);
      text("[Mouse Click] Flips a particle's charge", colX + 15, startY + 20);
    }
    
    text("[SPACE] Pause/Resume (all)", colX + 15, startY + 100);
    text("[i] Instructions (this menu)", colX + 15, height - 50);
  }
}

// ========================================================================================================================
// SIMULATION LOGIC
// ========================================================================================================================

// Planetary Motion Sim
function populateGravity() {
  center = new FixedOrb(width / 2, height / 2, 50, 800, color(255, 255, 0)); // Yellow sun
  galaxy = [];
  for (let i = 0; i < 7; i++) createPlanet(i);
}

function createPlanet(index) {
  let x = floor(random(200, width - 200));
  let y = floor(random(200, 600));
  while (abs(x - width / 2) < 50) x = floor(random(200, width - 200));

  let p = new Planet(x, y, floor(random(15, 60)), random(100, 400), center, color(random(255), random(255), random(255)));
  galaxy.push(p);

  // Add moons
  for (let j = 0; j < floor(random(1, 5)); j++) {
    let parent = (index !== -1) ? galaxy[index] : p;
    let a = new Planet(
      floor(parent.position.x + random(25, 50)),
      floor(parent.position.y + random(25, 50)),
      floor(random(5, 15)),
      random(50, 100),
      parent,
      color(100) // Gray moon
    );
    parent.addMoon(a);
  }
}

function displayGravitySim() {
  background(0);
  if (moving) {
    for (let p of galaxy) {
      p.run();
      p.updateMoons();
    }
  }

  for (let p of galaxy) {
    p.display();
    for (let j = 0; j < p.numMoons; j++) {
      p.moons[j].display();
    }
  }
  center.display();
}

// Spring Simulation
function populateSpringSim() {
  multiArray = new Array(5).fill(0).map(() => new Array(8).fill(0));
  for (let i = 0; i < multiArray.length; i++) {
    for (let j = 0; j < multiArray[i].length; j++) {
      let x = 125 + j * 125;
      let y = 125 + i * 125;
      // Top row is FixedOrbNode (i==0)
      multiArray[i][j] = (i === 0) ? 
        new FixedOrbNode(x, y, 50, 100.0) : 
        new multiOrbNode(x, y, 50, 100.0);
    }
  }

  SPRING_LENGTH = p5.Vector.dist(multiArray[0][0].position, multiArray[0][1].position);

  // Connect nodes
  for (let i = 0; i < multiArray.length; i++) {
    for (let j = 0; j < multiArray[i].length; j++) {
      if (i > 0) multiArray[i][j].up = multiArray[i - 1][j];
      if (j > 0) multiArray[i][j].left = multiArray[i][j - 1];
      if (j < multiArray[i].length - 1) multiArray[i][j].right = multiArray[i][j + 1];
      if (i < multiArray.length - 1) multiArray[i][j].down = multiArray[i + 1][j];
    }
  }
}

function displaySpringSim() {
  background(255);
  for (let i = 0; i < multiArray.length; i++) {
    for (let j = 0; j < multiArray[i].length; j++) {
      let node = multiArray[i][j];
      if (moving) {
        node.applySprings(SPRING_LENGTH, SPRING_K);
        if (earthGravity) {
          node.applyForce(node.getGravity(anchor, GRAVITY / 100));
        }
        node.run();
      }
      node.display();
    }
  }

  if (showArc && selectedR !== -1 && selectedC !== -1) {
    let selectedNode = multiArray[selectedR][selectedC];
    noFill();
    stroke(0);
    ellipse(selectedNode.position.x, selectedNode.position.y, arcRadius, arcRadius);
  }
}

// Drag Simulation
function makeDragOrbs() {
  dragOrbs = new Array(4);
  for (let i = 0; i < 4; i++) {
    let x = 20;
    let y = (i + 1) * height / (dragOrbs.length + 1);
    let s = floor(random(10, 30));
    dragOrbs[i] = new Orb(x, y, s, s / 2, redBall);
    dragOrbs[i].applyForce(createVector(20, 0, 0));
  }
}

function displayDragSim() {
  background(255);
  noStroke();
  fill(170, 170, 170, 50); rect(0, 0, width, height); // Light Gray Zone 0
  fill(185, 216, 230, 150); rect(zone1, 0, 200, height); // Light Blue Zone 1
  fill(150, 222, 209, 150); rect(zone2, 0, 300, height); // Teal Zone 2
  fill(100, 150, 170, 150); rect(zone3, 0, 200, height); // Darker Blue Zone 3

  if (dragOrbs === null) makeDragOrbs();

  for (let orb of dragOrbs) {
    if (moving) {
      let current_cd = 0.001;
      if (orb.position.x > zone1 && orb.position.x < zone1 + 200) current_cd = 0.005;
      else if (orb.position.x > zone2 && orb.position.x < zone2 + 300) current_cd = 0.025;
      else if (orb.position.x > zone3 && orb.position.x < zone3 + 200) current_cd = 0.125;

      orb.applyForce(orb.getDragForce(current_cd));
      if (earthGravity) orb.applyForce(orb.getGravity(anchor, GRAVITY));
      orb.run();
    }
    orb.display();
  }
}

// Electrostatic Simulation
function makeParticles() {
  particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    let x = floor(random(width / 2 - 500, width / 2 + 500));
    let y = floor(random(height / 2 - 300, height / 2 + 300));
    let charge = floor(random(-3, 3));
    particles.push(new Particle(x, y, 10, 5, charge));
  }
}

function chargeAll() {
  for (let p of particles) {
    if (p.charge > 0) p.charge++;
    else if (p.charge < 0) p.charge--;
  }
}

function displayElectroSim() {
  background(255);
  if (particles === null) makeParticles();

  // Create new array for next frame: filter out connected particles and replace with atoms
  let nextParticles = [];
  let newlyFormedAtoms = [];

  for (let p of particles) {
    if (p instanceof Particle && p.joined && p.connectedAtom && !p.connectedAtom.isProcessed) {
      // Found the first particle of a new atom, add the atom
      p.connectedAtom.isProcessed = true;
      newlyFormedAtoms.push(p.connectedAtom);
    } else if (!p.joined || p instanceof Atom) {
      // Keep all non-joined particles and existing atoms
      nextParticles.push(p);
    }
  }
  particles = nextParticles.concat(newlyFormedAtoms);

  if (moving) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let p1 = particles[i];
        let p2 = particles[j];

        if (p1 instanceof Particle && p2 instanceof Particle && !p1.joined && !p2.joined) {
          let force1 = p1.getElectroForce(p2, K_CONSTANT);
          let force2 = p2.getElectroForce(p1, K_CONSTANT);
          p1.applyForce(force1);
          p2.applyForce(force2);

          if (p1.charge * p2.charge < 0) p1.connect(p2);
        }
      }
    }
  }

  for (let p of particles) {
    if (moving && !p.joined) p.run();
    p.display();
  }
}

// Combo Simulation (Millikan's Oil Drop Model)
function makePlates() {
  plate1 = []; plate2 = []; milks = [];
  // Fixed plates (using FixedOrb for fixed position)
  for (let i = 0; i < 100; i++) {
    let x = 100 + (i + 0.5) * 10;
    plate1.push(new FixedOrb(x, 100, 10, 5, color(0, 0, 255))); // Top: Positive (Blue)
    plate2.push(new FixedOrb(x, 700, 10, 5, color(255, 0, 0))); // Bottom: Negative (Red)
  }

  // Oil drops (milks)
  for (let i = 0; i < 9; i++) {
    let y = 150 + (i + 1) * 50;
    milks.push(new Particle(600, y, 10, 5, -1));

    // Fixed spring anchors
    milks[i].s1 = new FixedOrb(50, y, 5, 5);
    milks[i].s2 = new FixedOrb(1150, y, 5, 5);
  }
}

function displayAllSim() {
  background(255);
  if (plate1 === null) makePlates();

  for (let p of plate1) p.display();
  for (let p of plate2) p.display();

  // Draw Field Lines (visual aid)
  stroke(0, 100);
  for (let x = 0; x < width; x += 50) line(x, 100, x, 700);

  for (let milk of milks) {
    if (moving) {
      // 1. Electrostatic Force (from plates)
      let netElectroForce = createVector(0, 0);
      for (let p of plate1) netElectroForce.add(milk.getElectroForce({ position: p.position, charge: 1, size: p.size }, K_CONSTANT));
      for (let p of plate2) netElectroForce.add(milk.getElectroForce({ position: p.position, charge: -1, size: p.size }, K_CONSTANT));
      milk.applyForce(netElectroForce);

      // 2. Gravitational Force
      milk.applyForce(p5.Vector.mult(createVector(0, 1), GRAVITY * milk.mass));

      // 3. Spring Force
      milk.applyForce(milk.getSpring(milk.s1, 550, SPRING_K));
      milk.applyForce(milk.getSpring(milk.s2, 550, SPRING_K));
      
      milk.run();
    }
    milk.display();
  }
}

// ========================================================================================================================
// MOUSE AND KEY INTERACTION (Collision/Interaction Logic)
// ========================================================================================================================

function mousePressed() {
  if (instructions) {
    instructions = false;
    return;
  }

  if (springSim) {
    for (let i = 0; i < multiArray.length; i++) {
      for (let j = 0; j < multiArray[i].length; j++) {
        if (multiArray[i][j].isSelected(mouseX, mouseY)) {
          selectedR = i;
          selectedC = j;
          showArc = true;
          return;
        }
      }
    }
  }

  if (electroSim && moving) {
    for (let p of particles) {
      if (p instanceof Particle && !p.joined && p.isSelected(mouseX, mouseY)) {
        p.charge *= -1;
        return;
      }
    }
  }
}

function mouseDragged() {
  if (springSim && selectedR !== -1 && selectedC !== -1) {
    let node = multiArray[selectedR][selectedC];
    if (!node.fixed) {
      node.position.add(mouseX - pmouseX, mouseY - pmouseY);
    }
  }
}

function mouseReleased() {
  if (springSim) {
    selectedR = -1;
    selectedC = -1;
    showArc = false;
  }
}

function keyPressed() {
  if (key === ' ' && !instructions) moving = !moving;
  else if (key === 'g' && (springSim || dragSim)) earthGravity = !earthGravity;
  else if (key === 'b' && !gravitySim) bounce = !bounce;
  else if (key === '=') { if (gravitySim) createPlanet(-1); }
  else if (key === '-') { if (gravitySim && galaxy.length > 0) galaxy.pop(); }
  else if (key === 'i') { setState(); instructions = true; }
  else if (key === '1') { populateGravity(); setState(); gravitySim = true; }
  else if (key === '2') { selectedR = -1; selectedC = -1; populateSpringSim(); setState(); springSim = true; }
  else if (key === '3') { makeDragOrbs(); setState(); dragSim = true; }
  else if (key === '4') { makeParticles(); setState(); electroSim = true; }
  else if (key === '5') { makePlates(); setState(); allSim = true; }
  else if (key === 'p' && electroSim) chargeAll();
  else if (key === 'v') showVArrow = !showVArrow;
  else if (key === 't') { planetTrace = !planetTrace; moonTrace = false; }
  else if (key === 'm') { planetTrace = false; moonTrace = !moonTrace; }
}
