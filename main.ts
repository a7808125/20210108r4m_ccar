function right () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    120
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    120
    )
}
function back (speed: number) {
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    speed
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    speed * 1.1
    )
}
function left () {
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    120
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    120
    )
}
function stop () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    0
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    0
    )
}
function left3 () {
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    130
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    130
    )
}
function left2 () {
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    95
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    95
    )
}
function right3 () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    130
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    130
    )
}
function right2 () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    95
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    95
    )
}
function go (speed: number) {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    speed
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    speed * 1
    )
}
// 初始設定
// 程式執行指示(綠)燈一開始為不亮的狀態
pins.digitalWritePin(DigitalPin.P2, 0)
// 時間變數
let t = 0
// 旗標變數
let flag = 1
// 按鈕狀態變數(初始狀態為-1)
let button = -1
// 路線分段設定變數
let tag = 0
stop()
// 主程式運作
basic.forever(function () {
    // 一開始如果按鈕按下去
    if (button == 1) {
        // 綠燈亮起，來表示開始執行
        pins.digitalWritePin(DigitalPin.P2, 1)
        // 第0段為車子準備出發段
        if (tag == 0) {
            stop()
            basic.pause(500)
            // 將變數改為1進入路線第一段
            tag = 1
        }
        // 第一段:安壓開關後原地右轉，直到右邊循線感應遇到黑線停止。
        if (tag == 1) {
            if (pins.digitalReadPin(DigitalPin.P8) == 0) {
                right2()
            } else {
                stop()
                // 停止後進第二段
                tag = 2
                // 時間從新計時
                t = 0
            }
        }
        // 第二段:將循線一時間分為過彎前和過彎後兩段速度變化
        if (tag == 2) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                // 時間變數t可調整至適當時間
                if (t <= 10) {
                    go(120)
                } else {
                    go(100)
                }
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                if (t <= 10) {
                    right()
                    basic.pause(200)
                } else {
                    right2()
                }
            } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                if (t <= 10) {
                    left()
                    basic.pause(200)
                } else {
                    left2()
                }
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                stop()
                basic.pause(100)
                left2()
                basic.pause(100)
                go(100)
                basic.pause(1000)
                tag = 3
            }
        }
        if (tag == 3) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                go(100)
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                right2()
                basic.pause(100)
            } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                left2()
                basic.pause(100)
            } else {
                stop()
                tag = 4
            }
        }
        if (tag == 4) {
            go(100)
            basic.pause(400)
            stop()
            basic.pause(1000)
            back(110)
            basic.pause(2000)
            stop()
            tag = 5
        }
        if (tag == 5) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                go(100)
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                right2()
            } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                left2()
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                stop()
                basic.pause(500)
                go(100)
                basic.pause(1000)
                tag = 6
            }
        }
        if (tag == 6) {
            left()
            basic.pause(1000)
            tag = 7
        }
        if (tag == 7) {
            if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                right()
                basic.pause(200)
                stop()
                tag = 8
            } else {
                left()
            }
        }
        if (tag == 8) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                go(100)
            } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                right()
            } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                left()
            } else {
                stop()
                basic.pause(1000)
                left()
                basic.pause(500)
                go(110)
                basic.pause(2000)
                stop()
                tag = 9
            }
        }
        if (tag == 9) {
            stop()
        }
    } else {
        stop()
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
basic.forever(function () {
    // tag=2時開啟計時器
    if (tag == 2) {
        basic.pause(1000)
        // 設定時間變數每秒開始改變1)
        t += 1
    }
})
basic.forever(function () {
    // 啟動後不斷重複偵測按鈕之P20腳位狀態是否為0(按下為0，不按為1)
    if (pins.digitalReadPin(DigitalPin.P20) == 0) {
        // 將路線分段變數設為0，從第1段開始
        tag = 0
        // 將按鈕狀態變數改變(初始為-1乘以-1，改變為1，若再次按下又變為-1)
        button = button * -1
    }
    basic.pause(400)
})
basic.forever(function () {
    // 不斷在Microbit板子上顯示tag狀態，用以顯示程式現在跑到哪一段，與實際車子在場地上跑的分段是否相同，也可藉此了解實際跑後需要修改的程式段落)
    basic.showNumber(tag)
})
