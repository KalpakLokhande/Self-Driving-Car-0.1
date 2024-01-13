class Car {

    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height

        this.angle = Math.PI
        this.speed = 0;
        this.acceleration = 0.3;
        this.friction = 0.03;
        this.maxSpeed = 4;
        this.dist = Infinity
        this.points = 0

        this.controls = new Controller()
        this.polygons = this.createPolygons()
        this.sensors = new Sensors(this)

        this.damaged = false

        this.brain = new neuralNetwork([this.sensors.rayCount + 1, 12, 18, 6, 4])

    }

    update(block,goal) {

        this.polygons = this.createPolygons()
        this.damaged = this.assessDamage(block)

        if (!this.damaged) {

            this.move()
            this.sensors.update(block)
            this.dist = Math.hypot((this.x - goal.x),(this.y - goal.y)) / Math.hypot((100 - goal.x),(100 - goal.y))
            // console.log((this.dist / Math.hypot(100 - goal.x, 100 - goal.y)))

        }

        this.brain.levels[0].inputs[6] = (this.dist)
        const offset = this.sensors.readings.map(s => s == null ? 0 : 1 - s.offset)
        const output = neuralNetwork.feedForward(offset, this.brain)

        this.controls.forward = output[0]
        this.controls.right = output[1]
        this.controls.left = output[2]
        this.controls.reverse = output[3]

    }

    assessDamage(borders) {

        for (let i = 0; i < borders.length; i++) {

            if (polyIntersect(this.polygons, borders[i])) return true

        }

        return false

    }

    createPolygons() {

        let points = []

        let rad = Math.hypot(this.width, this.height) / 2
        let alpha = Math.atan2(this.width, this.height)

        points.push({
            x: this.x + Math.sin(this.angle + alpha) * rad,
            y: this.y + Math.cos(this.angle + alpha) * rad
        })
        points.push({
            x: this.x + Math.sin(this.angle - alpha) * rad,
            y: this.y + Math.cos(this.angle - alpha) * rad
        })
        points.push({
            x: this.x + Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y + Math.cos(Math.PI + this.angle + alpha) * rad
        })
        points.push({
            x: this.x + Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y + Math.cos(Math.PI + this.angle - alpha) * rad
        })

        return points

    }

    move() {

        if (this.controls.forward) {

            this.speed += this.acceleration;

        }
        if (this.controls.reverse) {

            this.speed -= this.acceleration

        }
        if (this.speed > 0) {

            this.speed -= this.friction

        }
        if (this.speed < 0) {

            this.speed += this.friction

        }
        if (Math.abs(this.speed) < this.friction) {

            this.speed = 0

        }
        if (this.speed > this.maxSpeed) {

            this.speed = this.maxSpeed

        }
        if (this.speed < -this.maxSpeed / 2) {

            this.speed = -this.maxSpeed / 2

        }
        if (this.speed != 0) {

            const flip = this.speed < 0 ? -1 : 1

            if (this.controls.left) {

                this.angle += 0.06 * flip

            }
            if (this.controls.right) {

                this.angle -= 0.06 * flip

            }

        }

        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed

    }

    draw(opacity = 0.3, drawSensors = false) {


        ctx.save()
        ctx.globalAlpha = opacity
        if (this.damaged) {

            ctx.fillStyle = 'red'

        } else {

            ctx.fillStyle = 'black'

            if(drawSensors){

                this.sensors.draw()

            }


        }
        ctx.beginPath()
        ctx.moveTo(this.polygons[0].x, this.polygons[0].y)

        for (let i = 1; i < this.polygons.length; i++) {

            ctx.lineTo(this.polygons[i].x, this.polygons[i].y)

        }
        ctx.fill()
        ctx.restore()

    }



}