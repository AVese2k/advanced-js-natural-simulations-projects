//the flies swarm around the creatures face using mutual attraction
var G = 1;

var creature = function() {
    this.position = new PVector(width/2, height/2);//
};

var Fly = function(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);//
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

Fly.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
Fly.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);//
};

Fly.prototype.display = function() {
    noStroke();
    fill(0, 0, 0);
    ellipse(this.position.x-10, this.position.y-60, this.mass*8, this.mass*4);//
};

Fly.prototype.calculateAttraction = function(m) {
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);//
    force.normalize();
    var strength = (G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

creature.prototype.display = function() {
    stroke(53, 117, 30);
    strokeWeight(10);
    line(this.position.x-64, this.position.y-41, this.position.x, this.position.y);//
    line(this.position.x-64, this.position.y+143, this.position.x, this.position.y);
    line(this.position.x+49, this.position.y-41, this.position.x, this.position.y-12);
    line(this.position.x+37, this.position.y+142, this.position.x+-12, this.position.y);
    noStroke();
    fill(53, 117, 30);
    rect(this.position.x-36, this.position.y-67, 54, 135, 50);
    ellipse(this.position.x-9, this.position.y-95, 85, 85);
    fill(252, 70, 70);
    ellipse(this.position.x+2, this.position.y-106, 17, 9);
    ellipse(this.position.x-20, this.position.y-106, 17, 9);//
};

var monster = new creature();

var flies = [];
for (var i = 0; i < 25; i++) {
    flies[i] = new Fly(random(0.1, 0.8), random(width), random(height));
}

draw = function() {
    background(50, 50, 50);//
    monster.display();
    for (var i = 0; i < flies.length; i++) {
        for (var j = 0; j < flies.length; j++) {
            if (i !== j) {
                var force = flies[j].calculateAttraction(flies[i]);
                flies[i].applyForce(force);//
            }
        }

        flies[i].update();
        flies[i].display();
    }
};
