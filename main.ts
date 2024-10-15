enum RadioMessage {
    message1 = 49434,
    Connected$ = 11087
}
radio.onReceivedMessage(RadioMessage.Connected$, function () {
    Connection += 2
})
input.onButtonPressed(Button.AB, function () {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -120 || Connection == 0) {
        for (let index = 0; index < 2; index++) {
            basic.pause(500)
            basic.showLeds(`
                # # . . .
                # . # . #
                # . . # .
                # . # . #
                # . . . .
                `)
            basic.pause(500)
            basic.clearScreen()
        }
    } else if (false) {
    	
    } else if (false) {
    	
    } else {
    	
    }
})
let Connection = 0
radio.setGroup(1)
radio.setTransmitPower(7)
loops.everyInterval(500, function () {
    radio.sendMessage(RadioMessage.Connected$)
    if (Connection > 0) {
    	
    } else {
    	
    }
})
