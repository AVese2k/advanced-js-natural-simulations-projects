var drawRange = function() {
    stroke(17, 74, 0);
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t);
        var y = map(n, 0, 1, 0, height/1.5);
        rect(t*120, height-y, 1, y);
    }
};

var drawClouds = function() {
    stroke(140, 137, 140);
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t) * -1;
        var y = map(n, 0, 1, 35, height/2);
        rect(t*150, (height-y) - 400, 1, y);
    }
};

var drawRain = function() {
    for (var i = 0; i <= width; i+=5) {
        stroke(0, 77, 255);
        var height = random(70, 150);
        line(i, 10, i, height);
    }
};

drawRange();
drawRain();
drawClouds();
