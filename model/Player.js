export class Player {
    constructor(x, y, size = 150, speed = 2, possession = false, dashForge = 4, color = 'rgb(67, 37, 150)') {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.size = size;
        this.dashForge = dashForge;
        this.possession = possession;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isOnGround = false;

        this.animation = {
            idle: {
                frames: './assets/playerAsset/Idle.png',
                frameCount: 5,
                width: 640/5,
                height: 128
            },
            walk: {
                frames: './assets/playerAsset/Walk.png',
                frameCount: 8,
                width: 1024/8,
                height: 128
            },
            jump: {
                frames: './assets/playerAsset/Jump.png',
                frameCount: 7,
                width: 896/7,
                height:128
            },
            head: {
                frames: './assets/playerAsset/head.png',
                frameCount: 3,
                width: 500,
                height: 500
            }
        };
        
        this.currentFrame = 0;
        this.animationSpeed = 10;
        this.frameCounter = 0;
        this.direction = 1;

        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            dash: false,
            jump: false
        };

        this.#setupControls();
        
        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }

    #setupControls() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') this.keys.up = true;
            if (e.key === 'ArrowDown') this.keys.down = true;
            if (e.key === 'ArrowLeft') this.keys.left = true;
            if (e.key === 'ArrowRight') this.keys.right = true;
            if (e.key === ' ') this.keys.jump = true; // Changed from 'Space' to ' '
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') this.keys.up = false;
            if (e.key === 'ArrowDown') this.keys.down = false;
            if (e.key === 'ArrowLeft') this.keys.left = false;
            if (e.key === 'ArrowRight') this.keys.right = false;
            if (e.key === ' ') this.keys.jump = false;
        });

        
    }

    handleMouseDown(e) {
        //burada normalde bir dokunuşta bırakması lazım ama bırakmıyor ve ben biraz 
        // özgünlük katıp böyle bırakıcağım artık karakter yaşam gücü emiyor ve 
        // bu sayede gerçek formuna bürünmeyi başarıyor tabi isterse ruh formuna tekrar bürünebilir
        // artık bir bug değil mekanik
        if (this.isOnGround && this.possession && e.button === 0) {
            // possession'u bırak ve bırakma zamanını güncelle
            this.possession = false;
            this.lastDropTime = Date.now();
            // canvas bilgisini alıyoruz
            const canvas = document.getElementById('gameCanvas');
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                const moveStep = 50;
                this.x += (dx / distance) * moveStep;
                this.y += (dy / distance) * moveStep;
            }
        }
    }

    setPossession(possession) {
        this.possession = !possession;
        return;
    }

    carpismaKontrolu(platforms) {
        
        for (const platform of platforms) {
            // Oyuncunun genişliğini azaltıyoruz
            const reducedWidth = this.size * 0.6;
            const reducedHalf = reducedWidth / 2;
            const half = this.size / 2;
            const platformInfo = platform.collidesWith(this);

            if (platformInfo.temas) {
            // Oyuncunun kenarları ile platformun kenarları arasındaki mesafeleri hesaplıyorum
            const leftDist   = Math.abs((this.x + reducedHalf) - platform.x); // sağ kenar - platform sol
            const rightDist  = Math.abs((this.x - reducedHalf) - (platform.x + platform.width)); // sol kenar - platform sağ
            const topDist    = Math.abs((this.y + half) - platform.y); // alt kenar - platform üst
            const bottomDist = Math.abs((this.y - half) - (platform.y + platform.height)); // üst kenar - platform alt

            // En küçük mesafe hesaplanıyor
            const minDist = Math.min(leftDist, rightDist, topDist, bottomDist);

            if (minDist === topDist) {
                // Oyuncunun alt kenarı platformun üstüne temas etti
                this.y = platform.y - half;
                this.velocityY = 0;
                this.isOnGround = true;
            } else if (minDist === bottomDist) {
                // Oyuncunun üst kenarı platformun altına temas etti
                this.y = platform.y + platform.height + half;
                this.velocityY = 0;
            } else if (minDist === leftDist) {
                // Oyuncunun sağ kenarı platformun soluna temas etti
                this.x = platform.x - reducedHalf- 10;
            } else if (minDist === rightDist) {
                // Oyuncunun sol kenarı platformun sağına temas etti
                this.x = platform.x + platform.width + reducedHalf+ 10;
            }
            }
        }
    }

    update(canvasWidth, canvasHeight,platforms) {
        let oldSize=this.size;
        this.size = 60;
        const half = this.size / 2;
        //hareket
        if (this.keys.left && this.x - half > 0) this.x -= this.speed;
        if (this.keys.right && this.x + half < canvasWidth) this.x += this.speed;
        if (this.keys.up && this.y - half > 0) this.y -= this.speed;
        if (this.keys.down && this.y + half < canvasHeight) this.y += this.speed;
        // kontrol
        this.carpismaKontrolu(platforms);
        this.size=oldSize;
        return;
    }

    updatePossession(canvasWidth,canvasHeight, platforms) {
       
        const half = this.size / 2;
        
        // hareket
        if (this.keys.left && this.x - half > 0) this.x -= this.speed;
        if (this.keys.right && this.x + half < canvasWidth) this.x += this.speed;

        // yerçekimi ivmesini her an ekliyorum
        // ve zaten carpısma kontrolü yaparken bir zemindeyse sıfırlanıyor
        this.velocityY += this.gravity;
        
        // pozisyonu güncelliyorum
        this.y += this.velocityY;

        // sıfırlıyorum
        this.isOnGround = false;
        
        // çarpıyor mu diye kontrol ediyorum
        this.carpismaKontrolu(platforms);

        // zıplama (jump)
        if (this.keys.jump && this.isOnGround) {
            this.velocityY = -10;
            this.isOnGround = false;
        }
    }

    draw(ctx) {
        // Hareket durumunu belirle
        let oldSize= this.size;
        this.size = 60;
        let anim = this.animation.head;
        const frameCount = anim.frameCount;
        const frameWidth = anim.width;
        const frameHeight = anim.height;

        let animSpeed = 100; // Animasyon hızını yavaşlatmak için artırıldı
        this.frameCounter++;

        if (this.frameCounter >= animSpeed) {
            this.currentFrame = (this.currentFrame + 1) % frameCount;
            this.frameCounter = 0;
        }

        // Karakterin yönünü belirle
        if (this.keys.left) this.direction = -1;
        if (this.keys.right) this.direction = 1;

        // Sprite sheet'i yükle
        if (!anim.image) {
            anim.image = new Image();
            anim.image.src = anim.frames;
        }
        const img = anim.image;
        const sx = this.currentFrame * frameWidth;
        const sy = 0;
        const sWidth = frameWidth;
        const sHeight = frameHeight;
        const dx = -this.size / 2;
        const dy = -this.size / 2;
        const dWidth = this.size-10;
        const dHeight = this.size;

        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.direction === -1) ctx.scale(-1, 1);

        if (img.complete && img.naturalWidth !== 0) {
            ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(dx, dy, dWidth, dHeight);
        }


        ctx.restore();
        this.size = oldSize;
    }

drawPossession(ctx) {
    // Hareket durumunu belirle
    let anim;
    if (!this.isOnGround) {
        anim = this.animation.jump;
    } else if (this.keys.left || this.keys.right) {
        anim = this.animation.walk;
    } else {
        anim = this.animation.idle;
    }
    const frameCount = anim.frameCount;
    const frameWidth = anim.width;
    const frameHeight = anim.height;

    // Frame counter'ı güncelle
    this.frameCounter++;
    if (this.frameCounter >= this.animationSpeed) {
        this.currentFrame = (this.currentFrame + 1) % frameCount;
        this.frameCounter = 0;
    }

    // Karakterin yönünü belirle
    if (this.keys.left) this.direction = -1;
    if (this.keys.right) this.direction = 1;

    // Sprite sheet'i yükle
    if (!anim.image) {
        anim.image = new Image();
        anim.image.src = anim.frames;
    }
    const img = anim.image;
    const sx = this.currentFrame * frameWidth;
    const sy = 0;
    const sWidth = frameWidth;
    const sHeight = frameHeight;
    const dx = -(this.size) / 2;
    const dy = -(this.size) / 2;
    const dWidth = this.size;
    const dHeight = this.size;

    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.direction === -1) ctx.scale(-1, 1);

    if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    } 

    ctx.restore();
}
}
