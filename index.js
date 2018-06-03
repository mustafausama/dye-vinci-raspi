const five = require('johnny-five');

const board = new five.Board();

var convert = require('color-convert');

board.on('ready', function(){

    const io = require('socket.io-client')('http://localhost:3000/machine');
    
    /////// Pins ///////
    var RGBLED = new five.Led.RGB([6, 5, 3]);

    var textileInServo  = new five.Servo.Continuous("A0");
    var topBeltServo    = new five.Servo.Continuous('A1');
    var downBeltServo   = new five.Servo.Continuous('A2');
    var beltLevel1Servo = new five.Servo.Continuous('A3');
    var beltLevel2Servo = new five.Servo.Continuous('A4');
    var textileOutServo = new five.Servo.Continuous('A5');

    /////// Constants ///////
    const m1up = 0.2;
    const m2up = 0.18;
    const m1down = 0.15;
    const m2down = 0.08;
    
    
    console.log('Testing motor');
    /**/
    io.on('connect', function() {
        console.log('Connected');
        
        /////// Textile In ///////
        io.on('textile-in', function(data) {
            console.log('textile-in ', data);
            if(data == 0 || data == null) {
                console.log('Textile-In Stop');
                textileInServo.stop();
            }
            else {
                console.log('Textile-In Start');
                textileInServo.ccw((data/10) * 0.8);
            }
        });

        /////// Top Belt ///////
        io.on('top-belt', function(data) {
            console.log('top-belt ', data);
            if(data == 0 || data == null) {
                console.log('Top Belt Stop');
                topBeltServo.stop();
            }
            else {
                console.log('Top Belt Start');
                topBeltServo.cw((data/10) * 0.8);
            }
        });

        /////// Down Belt ///////
        io.on('down-belt', function(data) {
            console.log('down-belt ', data);
            if(data == 0 || data == null) {
                console.log('Down Belt Stop');
                downBeltServo.stop();
            }
            else {
                console.log('Down Belt Start');
                downBeltServo.cw((data/10) * 0.8);
            }
        });

        /////// Belt goes up one step ///////
        io.on('belt-up', function() {
            console.log('belt-up started');
            beltLevel1Servo.cw(m1up);
            beltLevel2Servo.cw(m2up);
            setTimeout(() => {
                console.log('belt-up stopped');
                beltLevel1Servo.stop();
                beltLevel2Servo.stop();
            }, 100);
        });

        /////// Belt goes down one step ///////
        io.on('belt-down', function() {
            console.log('belt-down started');
            beltLevel1Servo.ccw(m1down);
            beltLevel2Servo.ccw(m2down);
            setTimeout(() => {
                console.log('belt-down stopped');
                beltLevel1Servo.stop();
                beltLevel2Servo.stop();
            }, 30);
        });

        /////// Textile Out ///////
        io.on('textile-out', function(data) {
            console.log('textile-out ', data);
            if(data == 0 || data == null) {
                console.log('Textile-Out Stop');
                textileOutServo.stop();
            }
            else {
                console.log('Textile-Out Start');
                textileOutServo.ccw((data/10) * 0.8);
            }
        });

        /////// RGB LED ///////
        io.on('colors', function(data) {
            console.log('R:', data.iRed, 'G:', data.iGreen, 'B:', data.iBlue);
            console.log(`#${convert.rgb.hex(parseInt(data.iRed), parseInt(data.iGreen), parseInt(data.iBlue))}`);
            var keywordColor = convert.rgb.keyword(parseInt(data.iRed), parseInt(data.iGreen), parseInt(data.iBlue));
            console.log(keywordColor);
            RGBLED.color(`#${convert.rgb.hex(parseInt(data.iRed), parseInt(data.iGreen), parseInt(data.iBlue))}`);
        });

        io.on('disconnect', function() {
            console.log('Disconnected');
        });
    });
});