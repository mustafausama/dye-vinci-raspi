# Dye-Vinci Controller

It is part of the dye-vinci project Dye-Vinci: http://dye-vinci.herokuapp.com/
Dye-vinci is a simple project to control a prototype of a textile factory.

This part is the client side of the application. It is supposed to be hosted on the main controller of the factory.
Dye-vinci-raspi starts a client that connects to the server, which is hosted on the other part of the project "dye-vinci: https://github.com/mustafausama/dye-vinci"

Given that the connection is successful and the microprocessing board (Arduino or RaspberryPi) is connected to the host of this app, in case of arduino, or is the host itself, in case of the raspberrypi, the app can receive orders using a socket-io and with the help of event listners. It can correspondingly control each of the factory units.
