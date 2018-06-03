const five = require('johnny-five');

const board = new five.Board();

board.on('ready', function(){

    var servoM  = new five.Servo.Continuous('A0');
    var LDR1 = new five.Sensor({pin: "A1", freq: 1000});
    var LDR2 = new five.Sensor({pin: "A2", freq: 1000});
    var currentSensor = new five.Sensor({
        pin: "A3",
        freq: 1000
    });
    var relay = new five.Relay(10);
    var btn = new five.Button(2);

    relay.on();
    var readingTime = 0;
    var readings = 0;
    var check = true;
    currentSensor.on("data", function() {
        if(check) {
            readingTime++;
            console.log(this.value);
            readings += (this.value < 510) ? 1 : 0;

            if(readingTime == 3) {
                {
                    if(readings >= 2)
                    {
                        console.log("Mobile connected");
                    }
                    else {
                        console.log("No Mobile");
                        check = false;
                        relay.off();
                    }
                }
                readings = 0;
                readingTime = 0;
            }
        }
    });

    btn.on("up", function() {
        relay.on();
        check = true;
        console.log("hi");
    });

    var LDR1val, LDR2val;

    LDR1.on("data", function() {
        LDR1val = this.value;
    });

    LDR2.on("data", function() {
        LDR2val = this.value;
    });
    setInterval(function() {
        console.log(LDR1val, LDR2val);
        if(LDR1val > LDR2val) { // GO Up
            console.log("Up");
            servoM.cw(0.4);
            setTimeout(function() {
                servoM.stop();
            }, 500);
        } else if (LDR2val > LDR1val) {
            console.log("Down");
            servoM.ccw(0.4);
            setTimeout(function() {
                servoM.stop();
            }, 500);        }
    }, 3000);

});