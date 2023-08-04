class Player extends GameObject {

    constructor(x, y, width, height) {
        super(x, y, width, height)
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];
        this.cooldown = 5;
        this.healtPoints = 3;
        this.score = 0;
        this.isPlayer = true;


    }

    draw(ctx) {
        ctx.fillStyle = 'pink';
        super.draw(ctx);
        this.cooldown--;
        this.projectiles = this.projectiles.filter(p => p.isAlive);
        for (let i = 0; i < this.projectiles.length; i++) {
            const proj = this.projectiles[i];
            proj.draw(ctx);
            proj.move();

        }
      
    }

    control(canvasWidth, canvasHeight) {

        document.onkeydown = (keyevent => {

            this.controller[keyevent.key] = true;


        });

        document.onkeyup = (keyevent => {
            this.controller[keyevent.key] = false;


        })


        if (this.controller["ArrowLeft"]) {

            this.x = this.x > 0 ? this.x - this.speed : 0;

        }

        if (this.controller["ArrowRight"]) {

            this.x = (this.x + this.width) < canvasWidth ? this.x + this.speed : canvasWidth - this.width;

        }

        if (this.controller["ArrowUp"]) {

            this.y = this.y > 0 ? this.y - this.speed : 0;
        }

        if (this.controller["ArrowDown"]) {

            this.y = (this.y + this.height) < canvasHeight ? this.y + this.speed : canvasHeight - this.height;
        }


        if (this.controller[" "]) {
            this.baseAttack()


        }
    }

    baseAttack() {

        if (this.cooldown <= 0) {

            let proj = new Projectile(this.x + (this.width / 2) - 2.5, this.y, 5, 10);
            this.projectiles.push(proj);

            this.cooldown = 15;

        }
    }

    death(){

        if (this.healtPoints <= 0) {
           
            
        }
    }

  
}



// funzione per muovere la forma da inserire dentro la funzione control
 // switch (keyevent.key) {
            //     case 'ArrowLeft':
            //         this.x = this.x - this.speed;
            //         break;
            //     case 'ArrowRight':
            //         this.x = this.x + this.speed;
            //         break;
            //     case 'ArrowUp':
            //         this.y = this.y - this.speed;
            //         break;
            //     case 'ArrowDown':
            //         this.y = this.y + this.speed;
            //         break;

            //     default:
            //         break;
            // }