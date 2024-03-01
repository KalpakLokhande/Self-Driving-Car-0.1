import Monza from './Monza.json' assert{type: 'json'}

const canvas = document.getElementById("canvas")
const staticCanvas = document.getElementById("staticCanvas")


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
staticCanvas.width = window.innerWidth;
staticCanvas.height = window.innerHeight;


const ctx = canvas.getContext("2d")
const staticCtx = staticCanvas.getContext("2d")



let startingPos = { x: Monza.inside[0].x, y: Monza.inside[0].y - 20 }

const rewardGates = []

for (let i = 1; i < Monza.inside.length - 20; i += 10) {

    rewardGates.push([{ x: Monza.inside[i].x, y: Monza.inside[i].y },
    { x: Monza.outside[i].x, y: Monza.outside[i].y },
    { reward: 1000000 - (i * 100)}])

}

for (let i = 0; i < Monza.inside.length; i++) {

    staticCtx.save()
    staticCtx.translate(canvas.width / 3.33, canvas.height / 2.28)
    staticCtx.scale(0.56, 0.58)

    if (Monza.inside[i + 1]) {

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
        staticCtx.lineTo(Monza.inside[i + 1].x, Monza.inside[i + 1].y)
        staticCtx.stroke()

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.outside[i].x, Monza.outside[i].y)
        staticCtx.lineTo(Monza.outside[i + 1].x, Monza.outside[i + 1].y)
        staticCtx.stroke()

    } else {

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.outside[i].x, Monza.outside[i].y)
        staticCtx.lineTo(Monza.outside[0].x, Monza.outside[0].y)
        staticCtx.stroke()

        staticCtx.beginPath()
        staticCtx.moveTo(Monza.inside[i].x, Monza.inside[i].y)
        staticCtx.lineTo(Monza.inside[0].x, Monza.inside[0].y)
        staticCtx.stroke()

    }

    staticCtx.restore()

}


let cars = []


let N = 100;

for (let i = 0; i < N; i++) {

    cars.push(new Car(startingPos.x, startingPos.y, 12, 18))

}

let bestCar = cars[0]


if (localStorage.getItem("bestBrain")) {

    // let bestBrain = JSON.parse(localStorage.getItem("bestBrain"))

    // console.log(parseFloat(parseFloat(mutationValue).toFixed(1)))

    for (let i = 0; i < cars.length; i++) {

        // let mutationValue = localStorage.getItem("minDist")

        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"))

        if (i != 0) {

            neuralNetwork.mutate(cars[i].brain, 0.05)

        }

    }

}

const clear = document.getElementById("clear")
const save = document.getElementById("save")

save.onclick = () => {

    const distances = cars.map(d => d.dist)
    const minDist = Math.min(...distances)
    bestCar = cars.find(c => c.dist === minDist)

    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))

    location.reload()

}

clear.onclick = () => {

    localStorage.clear()

    location.reload()

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

    requestAnimationFrame(animate)

}

setTimeout(() => {

    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))

    location.reload()

}, 20000)

animate()
