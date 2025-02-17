enum RadioMessage {
    message1 = 49434,
    Connected$ = 11087
}
/**
 * Power saving feature reduces comm frequency + led, slightly glitched
 */
input.onButtonPressed(Button.A, function () {
    State = 3
    if (Status == 2) {
        basic.clearScreen()
        basic.showString("P2T")
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("" + (P2T))
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("P2M")
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("" + (P2M))
        basic.pause(5000)
        basic.clearScreen()
    } else {
        if (input.temperature() > 29) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    # . . # .
                    # . # # #
                    # . . # .
                    # # . . .
                    # . . . .
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
        } else if (input.temperature() < 10) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    # . . . .
                    # . # # #
                    # . . . .
                    # # . . .
                    # . . . .
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
        } else {
            basic.showNumber(input.temperature())
            basic.pause(1000)
            basic.clearScreen()
        }
    }
    State = 0
})
radio.onReceivedMessage(RadioMessage.Connected$, function () {
    Connection = 2
})
input.onButtonPressed(Button.AB, function () {
    Status = 2
    State = 1
    while (Status == 2) {
        basic.clearScreen()
        basic.showString("A?")
        basic.pause(100)
        basic.clearScreen()
        basic.showString("B?")
        basic.pause(100)
    }
    State = 0
})
input.onButtonPressed(Button.B, function () {
    State = 3
    if (Status == 2) {
        basic.clearScreen()
        basic.showString("P3T")
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("" + (P3T))
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("P3M")
        basic.pause(5000)
        basic.clearScreen()
        basic.showString("" + (P3M))
        basic.pause(5000)
        basic.clearScreen()
    } else {
        if (pins.analogReadPin(AnalogPin.P0) > 600) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    # # . . .
                    # . . . #
                    . . . # #
                    . . # # #
                    . . . . #
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
        } else if (pins.analogReadPin(AnalogPin.P0) < 120) {
            for (let index = 0; index < 4; index++) {
                basic.showLeds(`
                    . # . . .
                    # # # . #
                    . . . # #
                    # . # # #
                    . # . . #
                    `)
                basic.pause(100)
                basic.clearScreen()
                basic.pause(100)
            }
        } else {
            basic.showNumber(pins.analogReadPin(AnalogPin.P0))
            basic.pause(1000)
            basic.clearScreen()
        }
        State = 0
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "P2M") {
        P2M = value
    } else if (name == "P2T") {
        P2T = value
    } else if (name == "P3T") {
        P3T = value
    } else if (name == "P3M") {
        P3M = value
    } else {
    	
    }
})
/**
 * This took me over an hour for no reason :3
 */
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Status = 1
    State = 1
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) <= -122 || Connection == 0) {
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                # # . . .
                # . # . #
                # . . # .
                # . # . #
                # . . . .
                `)
            basic.pause(500)
            basic.clearScreen()
            basic.pause(500)
        }
        State = 0
    } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) <= -124 && radio.receivedPacket(RadioPacketProperty.SignalStrength) < -80) {
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                # # . . .
                # . . . .
                # . . . .
                # . . . .
                # . . . #
                `)
            basic.pause(500)
            basic.clearScreen()
            basic.pause(500)
        }
        State = 0
    } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -80 && radio.receivedPacket(RadioPacketProperty.SignalStrength) < -60) {
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                # # . . .
                # . . . .
                # . . . .
                # . . # .
                # . . # #
                `)
            basic.pause(500)
            basic.clearScreen()
            basic.pause(500)
        }
        State = 0
    } else {
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                # # . . .
                # . . . .
                # . # . .
                # . # # .
                # . # # #
                `)
            basic.pause(500)
            basic.clearScreen()
            basic.pause(500)
        }
        State = 0
    }
})
let P3M = 0
let P3T = 0
let Connection = 0
let P2M = 0
let P2T = 0
let Status = 0
let State = 0
radio.setTransmitPower(7)
radio.setGroup(1)
loops.everyInterval(10000, function () {
    if (Connection > 0) {
        Connection += -1
    }
})
loops.everyInterval(5000, function () {
    if (State == 0) {
        basic.pause(9000)
        if (State == 0) {
            while (State == 0) {
                led.setBrightness(44)
                basic.showLeds(`
                    . # . . .
                    # # # . #
                    . # . # .
                    . . . . #
                    . . . # .
                    `)
                basic.pause(5000)
                basic.clearScreen()
                basic.pause(5000)
                Status = 10
            }
            led.setBrightness(255)
            Status = 0
        }
    }
})
loops.everyInterval(5000, function () {
    if (Status == 10) {
        while (Status == 10) {
            basic.pause(30000)
            radio.sendValue("P1T", input.temperature())
            radio.sendValue("P1M", pins.analogReadPin(AnalogPin.P0))
            radio.sendMessage(RadioMessage.Connected$)
            if (Connection > 0) {
                Connection += -1
            }
        }
    } else {
        basic.pause(3500)
        radio.sendValue("P1T", input.temperature())
        radio.sendValue("P1M", pins.analogReadPin(AnalogPin.P0))
        radio.sendMessage(RadioMessage.Connected$)
    }
})
