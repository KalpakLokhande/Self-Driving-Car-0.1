class Controller {

    constructor() {

        this.left = false;
        this.right = false;
        this.forward = false;
        this.reverse = false;

        this.addKeyboardListenners()

    }

    addKeyboardListenners() {

        document.onkeydown = (e) => {

            switch (e.key) {

                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;

            }

        }
        document.onkeyup = (e) => {

            switch (e.key) {

                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;

            }

        }

    }

}