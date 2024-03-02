class Sensors {

    constructor(car) {

        this.rayCount = 6;
        this.raySpread = Math.PI;
        this.rayLength = 100;
        this.rays = []

        this.car = car
        this.readings = []

    }

    update(roadBorderInside, roadBorderOutside) {

        this.readings = []
        this.castRays()

        for (let i = 0; i < this.rays.length; i++) {

            this.readings.push(this.getReadings(this.rays[i], [...roadBorderInside, ...roadBorderOutside]))

        }

    }

    getReadings(ray, block) {

        let touches = []

        for (let i = 0; i < block.length; i++) {

            let touch
            if (block[i + 1]) {

                touch = lineIntersection(
                    ray[0],
                    ray[1],
                    block[i],
                    block[i + 1]
                )

            } 

            if (touch) {

                touches.push(touch)

            }

        }

        if (touches.length == 0) {

            return null

        } else {

            const offsets = touches.map(e => e.offset)

            const minOffset = Math.min(...offsets)

            return touches.find(e => e.offset === minOffset)

        }

    }

    castRays() {

        this.rays = []

        for (let i = 0; i < this.rayCount; i++) {

            let rayAngle = lerp(-this.raySpread / 2, this.raySpread / 2, i / (this.rayCount - 1)) + this.car.angle

            let start = {
                x: this.car.x,
                y: this.car.y
            }

            let end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength

            }

            this.rays.push([start, end])

        }

    }

    draw(ctx) {

        for (let i = 0; i < this.rays.length; i++) {

            let end = this.rays[i][1]

            if (this.readings[i]) {

                end = this.readings[i]

            }

            ctx.save()
            ctx.strokeStyle = 'yellow'
            ctx.beginPath()
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()
            ctx.restore()

            ctx.save()
            ctx.strokeStyle = 'black'
            ctx.beginPath()
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()
            ctx.restore()

        }

    }

}