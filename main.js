const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d")

let startingX = 100
let startingY = 100

let cars = []

let obstacles = []

obstacles.push([{ x: 0, y: 0 }, { x: canvas.width, y: 0 }])
obstacles.push([{ x: canvas.width, y: 0 }, { x: canvas.width, y: canvas.height }])
obstacles.push([{ x: canvas.width, y: canvas.height }, { x: 0, y: canvas.height }])
obstacles.push([{ x: 0, y: canvas.height }, { x: 0, y: 0 }])
obstacles.push([{ x: 200, y: 0 }, { x: 200, y: 350 }])
obstacles.push([{ x: 0, y: 450 }, { x: 400, y: 450 }])
obstacles.push([{ x: 400, y: 450 }, { x: 400, y: 200 }])
obstacles.push([{ x: 500, y: 0 }, { x: 500, y: 500 }])
obstacles.push([{ x: 800, y: canvas.height }, { x: 800, y: 300 }])
obstacles.push([{ x: canvas.width, y: 400 }, { x: 900, y: 400 }])

let N = 5000;

for (let i = 0; i < N; i++) {

    cars.push(new Car(100, 100, 15, 25))

}

let goal = { x: canvas.width - 100, y: canvas.height - 100 }

let bestCar = cars[0]


if (localStorage.getItem("bestBrain")) {

    // let bestBrain = JSON.parse(localStorage.getItem("bestBrain"))

    // console.log(parseFloat(parseFloat(mutationValue).toFixed(1)))

    for (let i = 0; i < cars.length; i++) {

        // let mutationValue = localStorage.getItem("minDist")

        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"))

        if (i != 0) {

            neuralNetwork.mutate(cars[i].brain, 0.1)

        }

    }

}

const dist = document.getElementById('dist')
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

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < cars.length; i++) {

        cars[i].update(obstacles, goal)

        cars[i].draw(0.5, false)

    }

    bestCar.draw(1, true)

    const distances = cars.map(d => d.dist)
    const minDist = Math.min(...distances)
    cars.find(c => c.dist === minDist).points += 1
    const highScore = (cars.map(c => c.points))

    bestCar = cars.find(c => c.dist === minDist)

    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.setLineDash(p = [5, 5])
    ctx.beginPath()
    ctx.moveTo(bestCar.x, bestCar.y)
    ctx.lineTo(goal.x, goal.y)
    ctx.stroke()
    ctx.restore()

    ctx.beginPath()
    ctx.arc(goal.x, goal.y, 10, 0, Math.PI * 2)
    ctx.fill()

    dist.innerHTML = bestCar.dist

    for (let i = 0; i < obstacles.length; i++) {

        ctx.save()
        // ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(obstacles[i][0].x, obstacles[i][0].y)
        ctx.lineTo(obstacles[i][1].x, obstacles[i][1].y)
        ctx.stroke()
        ctx.restore()

    }

    requestAnimationFrame(animate)

}

setTimeout(() => {

    const distances = cars.map(d => d.dist)
    const minDist = Math.min(...distances)
    bestCar = cars.find(c => c.dist === minDist)


    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))
    localStorage.setItem('minDist', bestCar.dist)


    location.reload()

}, 30000)

animate()
