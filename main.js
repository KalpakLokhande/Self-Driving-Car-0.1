import Monza from './Monza.json' assert{type: 'json'}
import brain from './bestBrain-Monza.json' assert{type: 'json'}

const canvas = document.getElementById("canvas")
const staticCanvas = document.getElementById("staticCanvas")
const closeupCanvas = document.getElementById("closeupCanvas")



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
staticCanvas.width = window.innerWidth;
staticCanvas.height = window.innerHeight;

Monza.inside.push({ x: Monza.inside[0].x, y: Monza.inside[0].y })
Monza.outside.push({ x: Monza.outside[0].x, y: Monza.outside[0].y })


const ctx = canvas.getContext("2d")
const staticCtx = staticCanvas.getContext("2d")
const closeupCtx = closeupCanvas.getContext("2d")


let startingPos = { x: Monza.inside[0].x, y: Monza.inside[0].y - 20 }

const rewardGates = []
let generation = 0

for (let i = 0; i < Monza.inside.length - 100; i++) {

    rewardGates.push([{ x: Monza.inside[i].x, y: Monza.inside[i].y },
    { x: Monza.outside[i].x, y: Monza.outside[i].y },
    i * 100])

}


const drawMonzaDecorations = (ctx) => {

    ctx.lineWidth = 1
    ctx.fillStyle = 'aquaMarine'

    //Curve 3
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#e5e5e5'
    ctx.moveTo(-470, 200)
    ctx.quadraticCurveTo(-520, 645, -70, 645)
    ctx.quadraticCurveTo(-425, 500, -450, 200)
    // ctx.lineTo(-360, 500)
    // ctx.lineTo(-450,200)
    // ctx.lineTo(-70, 645)
    ctx.stroke()
    ctx.fill()
    ctx.restore()

    //Turn 4-5
    ctx.beginPath()
    ctx.lineWidth = 0.5
    ctx.moveTo(-440, -25)
    ctx.lineTo(-450, -100)
    ctx.quadraticCurveTo(-460, -160, -480, -160)
    ctx.lineTo(-560, -175)
    ctx.quadraticCurveTo(-560, -75, -550, -75)
    ctx.lineTo(-440, -25)
    ctx.fill()
    ctx.stroke()

    ctx.save()
    ctx.fillStyle = '#e5e5e5'
    ctx.beginPath()
    ctx.moveTo(-600, -175)
    ctx.lineTo(-600, -40)
    ctx.lineTo(-500, -10)
    ctx.lineTo(-600, -175)
    ctx.stroke()
    ctx.fill()
    ctx.restore()

    //turn 5 6 7
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(-635, -275)
    ctx.lineTo(-688, -380)
    ctx.quadraticCurveTo(-710, -430, -600, -470)
    ctx.lineTo(-340, -530)
    // ctx.bezierCurveTo(-788, -580, -300, -560, -138, -275)
    // ctx.lineTo(-688, -480)
    // ctx.lineTo(-300, -560)
    ctx.lineTo(-140, -270)
    ctx.lineTo(-360, -480)
    ctx.lineTo(-620, -400)
    ctx.lineTo(-635, -275)
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    //turn 8 9 10
    ctx.beginPath()
    ctx.moveTo(318, 260)
    ctx.lineTo(400, 340)
    ctx.lineTo(600, 340)
    ctx.lineTo(500, 280)
    ctx.lineTo(318, 260)
    ctx.fill()
    ctx.stroke()

    //turn 11
    ctx.beginPath()
    ctx.moveTo(1500, 314)
    ctx.lineTo(1680, 314)
    ctx.lineTo(1680, 520)
    ctx.lineTo(1440, 600)
    ctx.lineTo(1550, 520)
    ctx.lineTo(1580, 390)
    ctx.lineTo(1500, 314)
    ctx.stroke()
    ctx.fill()

    //Pit-Lane
    ctx.fillStyle = 'darkGray'
    ctx.beginPath()
    ctx.moveTo(500, 580)
    ctx.lineTo(1100, 570)
    ctx.lineTo(1140, 580)
    ctx.lineTo(1200, 580)
    ctx.lineTo(1110, 540)
    ctx.lineTo(480, 550)
    ctx.lineTo(400, 600)
    ctx.lineTo(470, 600)
    ctx.lineTo(500, 580)
    ctx.fill()
    ctx.stroke()

    //Grand_stand
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(490,545)
    ctx.lineTo(950, 538)
    ctx.lineTo(950, 480)
    ctx.lineTo(490, 482)
    ctx.lineTo(490,545)
    ctx.fill()
    ctx.stroke()

    // ctx.restore()

}

staticCtx.save()
staticCtx.translate(canvas.width / 3.33, canvas.height / 2.28)
staticCtx.scale(0.56, 0.58)
drawMonzaDecorations(staticCtx)
staticCtx.restore()


for (let i = 0; i < Monza.inside.length; i++) {

    staticCtx.save()
    staticCtx.translate(canvas.width / 3.33, canvas.height / 2.28)
    staticCtx.scale(0.56, 0.58)

    if (Monza.inside[i + 1]) {

        staticCtx.fillStyle = 'darkGray'
        staticCtx.strokeStyle = 'darkGray'
        staticCtx.lineWidth = 2

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
        staticCtx.lineTo(Monza.inside[i + 1].x, Monza.inside[i + 1].y)
        staticCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
        staticCtx.lineTo(Monza.outside[i].x, Monza.outside[i].y)
        staticCtx.fill()
        staticCtx.stroke()


        staticCtx.lineWidth = 3
        staticCtx.strokeStyle = 'white'
        staticCtx.beginPath()
        staticCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
        staticCtx.lineTo(Monza.inside[i + 1].x, Monza.inside[i + 1].y)
        staticCtx.stroke()

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.outside[i].x, Monza.outside[i].y)
        staticCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
        staticCtx.stroke()


        // staticCtx.beginPath()
        // staticCtx.moveTo(Monza.outside[i].x, Monza.outside[i].y)
        // staticCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
        // staticCtx.stroke()

    }

    staticCtx.restore()

}

// const save = document.getElementById('save')
// save.onclick = () => {

//     let a = document.createElement('a')
//     document.body.appendChild(a)
//     a.style = 'display : none'
//     const brain = localStorage.getItem('bestBrain')
//     let json = JSON.stringify(brain),
//         blob = new Blob([json], { type: 'text/json' }),
//         url = window.URL.createObjectURL(blob)

//     a.href = url
//     a.download = 'bestBrain-Monza'
//     a.click()
//     window.URL.revokeObjectURL(url)

// }


let cars = []

let N = 50;

for (let i = 0; i < N; i++) {

    cars.push(new Car(startingPos.x, startingPos.y, 12, 18))

}

let bestCar = cars[0]


if (localStorage.getItem("bestBrain")) {

    // let bestBrain = JSON.parse(localStorage.getItem("bestBrain"))

    // console.log(parseFloat(parseFloat(mutationValue).toFixed(1)))

    for (let i = 0; i < cars.length; i++) {

        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain")).brain

        if (i != 0) {

            neuralNetwork.mutate(cars[i].brain, 0.1)

        }

    }

} else {
    for (let i = 0; i < cars.length; i++) {

        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain")).brain

        if (i != 0) {

            neuralNetwork.mutate(brain, 0.1)

        }

    }
}


const animate = () => {

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.translate(canvas.width / 3.33, canvas.height / 2.28)
    ctx.scale(0.56, 0.58)

    for (let i = 0; i < cars.length; i++) {

        cars[i].update(Monza.inside, Monza.outside, rewardGates)

        cars[i].draw(0.2, false, ctx)

    }

    bestCar.draw(1, true, ctx)

    const Scores = cars.map(car => car.score)
    const highestScore = Math.max(...Scores)
    bestCar = cars.find(car => car.score === highestScore)

    ctx.restore()

    closeupCtx.save()
    closeupCtx.clearRect(0, 0, closeupCanvas.width, closeupCanvas.height)
    closeupCtx.translate((closeupCanvas.width / 2) - bestCar.x, (closeupCanvas.height / 2) - bestCar.y)
    drawMonzaDecorations(closeupCtx)


    for (let i = 0; i < Monza.inside.length; i++) {

        if (Monza.inside[i + 1]) {

            closeupCtx.fillStyle = 'darkGray'
            closeupCtx.strokeStyle = 'darkGray'
            closeupCtx.lineWidth = 2
            closeupCtx.beginPath()
            closeupCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
            closeupCtx.lineTo(Monza.inside[i + 1].x, Monza.inside[i + 1].y)
            closeupCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
            closeupCtx.lineTo(Monza.outside[i].x, Monza.outside[i].y)
            closeupCtx.fill()
            closeupCtx.stroke()

            closeupCtx.lineWidth = 3
            closeupCtx.strokeStyle = 'white'
            closeupCtx.beginPath()
            closeupCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
            closeupCtx.lineTo(Monza.inside[i + 1].x, Monza.inside[i + 1].y)
            closeupCtx.stroke()
    
            closeupCtx.beginPath()
            closeupCtx.moveTo(Monza.outside[i].x, Monza.outside[i].y)
            closeupCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
            closeupCtx.stroke()

        }
    }

    for (let i = 0; i < cars.length; i++) {

        cars[i].draw(0.2, false, closeupCtx)

    }

    bestCar.draw(1, true, closeupCtx)
    

    closeupCtx.restore()

    requestAnimationFrame(animate)

}

setTimeout(() => {

    localStorage.setItem('bestBrain', JSON.stringify({ brain: bestCar.brain, gen: generation }))

    generation++
    location.reload()

}, 350000)

animate()
