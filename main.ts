input.onButtonEvent(Button.AB, input.buttonEventValue(ButtonEvent.Click), function () {
    live = true
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    live = false
    joystick_h += -5
})
function Tempo (Value: number, Min: number, Max: number, NullToNull: boolean) {
    v = Math.abs(Value)
    if (v < 3 && NullToNull) {
        ret = 0
    } else {
        ret = Math.round(Min + v / 100 * (Max - Min))
    }
    display(v, ret)
    if (Value < 0) {
        _4digit.point(true)
        return ret * -1
    } else {
        _4digit.point(false)
        return ret
    }
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    live = false
    joystick_h += 5
})
function display (a1: number, b1: number) {
    if (a1 > 98) {
        _4digit.show(9800 + b1)
    } else {
        _4digit.show(a1 * 100 + b1)
    }
}
function lokjoystick10061 () {
    qwiicjoystick.comment("3 Erweiterungen:")
    qwiicjoystick.comment("radio")
    qwiicjoystick.comment("Grove")
    qwiicjoystick.comment("calliope-net/joystick")
}
let ret = 0
let v = 0
let joystick_h = 0
let live = false
let _4digit: grove.TM1637 = null
_4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
radio.setTransmitPower(7)
radio.setFrequencyBand(1)
radio.setGroup(220)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
let list = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)
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
            joystick_h = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)[0]
        }
        if (joystick_h < 0) {
            radio.sendNumber(Tempo(joystick_h, 35, 80, true))
        } else {
            radio.sendNumber(Tempo(joystick_h, 45, 90, true))
        }
    }
})
