class Car {

    constructor(x, y, width, height, AI = true) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height

        this.angle = Math.PI / 2
        this.speed = 0;
        this.acceleration = 0.1;
        this.friction = 0.03;
        this.maxSpeed = 3;
        this.points = 0
        this.score = 0
        this.AI = AI

        this.controls = new Controller()
        this.polygons = this.createPolygons()
        this.sensors = new Sensors(this)

        this.damaged = false

        if (AI) {

            this.brain = new neuralNetwork([this.sensors.rayCount, 6, 4])

        }

    }

    update(roadBorderInside, roadBorderOutside, rewardGates) {

        this.polygons = this.createPolygons()
        this.damaged = this.assessDamage(roadBorderInside, roadBorderOutside)

        if (!this.damaged) {

            this.move()
            this.sensors.update(roadBorderInside, roadBorderOutside)

            for (let i = 0; i < rewardGates.length; i++) {

                if (polyIntersect(this.polygons, rewardGates[i])) {

                    this.score += rewardGates[i][2]
                    // rewardGates[i][2] = -1

                }

            }

        }

        if (this.AI) {

            const offset = this.sensors.readings.map(s => s == null ? 0 : 1 - s.offset)
            const output = neuralNetwork.feedForward(offset, this.brain)

            this.controls.forward = output[0]
            this.controls.right = output[1]
            this.controls.left = output[2]
            this.controls.reverse = output[3]

        }

    }

    assessDamage(roadBorderInside, roadBorderOutside) {


        if (polyIntersect(this.polygons, roadBorderInside)) return true
        if (polyIntersect(this.polygons, roadBorderOutside)) return true

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

                this.angle += 0.2 * flip

            }
            if (this.controls.right) {

                this.angle -= 0.2 * flip

            }

        }

        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed

    }

    draw(opacity = 0.3, bestCar = false, ctx) {


        ctx.save()
        ctx.globalAlpha = opacity
        if (this.damaged) {

            ctx.fillStyle = 'red'

        } else {

            ctx.fillStyle = 'black'

        }

        ctx.beginPath()
        if (bestCar) {
            ctx.fillStyle = 'yellow'
            this.sensors.draw(ctx)
        } else {
            ctx.fillStyle = 'black'
        }
        ctx.moveTo(this.polygons[0].x, this.polygons[0].y)

        for (let i = 1; i < this.polygons.length; i++) {

            ctx.lineTo(this.polygons[i].x, this.polygons[i].y)

        }
        ctx.fill()
        ctx.restore()

    }



}