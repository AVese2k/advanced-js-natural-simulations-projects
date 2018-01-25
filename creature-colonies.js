//this is a particle system using a creature as a particle
var Particle = function(position) {
    this.acceleration = new PVector(0, -0.05);
    this.velocity = new PVector(random(-1, 1), random(0, -1));
    this.position = position.get();
};

var Creature = function(position) {
    Particle.call(this, position);
};

Creature.prototype = Object.create(Particle.prototype);

Creature.prototype.display = function() {
    stroke(53, 117, 30);
    strokeWeight(10);
    line(this.position.x-64, this.position.y-41, this.position.x, this.position.y);
    line(this.position.x-64, this.position.y+143, this.position.x, this.position.y);
    line(this.position.x+49, this.position.y-41, this.position.x, this.position.y-12);
    line(this.position.x+37, this.position.y+142, this.position.x+-12, this.position.y);
    noStroke();
    fill(53, 117, 30);
    rect(this.position.x-36, this.position.y-67, 54, 135, 50);
    ellipse(this.position.x-9, this.position.y-95, 85, 85);
    fill(252, 70, 70);
    ellipse(this.position.x-9, this.position.y-106, 17, 9);
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

Particle.prototype.display = function() {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 12, 12);
};

var ParticleSystem = function(position) {
    this.origin = position.get();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Creature(this.origin));
};

ParticleSystem.prototype.run = function(){
	for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
  }
};

var particleSystem = new ParticleSystem(new PVector(width/2, 280));

draw = function() {
    background(255, 255, 255);
    particleSystem.addParticle();
    particleSystem.run();
};
