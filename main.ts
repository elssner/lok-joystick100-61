input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    live = true
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.showNumber(a[0])
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Hold), function () {
    live = false
})
let live = false
let a: number[] = []
radio.setTransmitPower(7)
radio.setFrequencyBand(1)
radio.setGroup(220)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
a = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)
basic.showLeds(`
    . . # . .
    . # . # .
    . # . # .
    # # # # #
    . # . # .
    `)
live = true
let ready = true
loops.everyInterval(500, function () {
    if (ready) {
        if (live) {
            a = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)
        }
        radio.sendNumber(a[0])
    }
})
