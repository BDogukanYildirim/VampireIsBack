export class LiveEntity {
    constructor(x, y, size = 200, type , color,  possession = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type; // hangi türde olduğunu belirtir: 'human', 'enfected-human', 'player', 'animal', 'enfected-animal', 'plant', 'enfected-plant'
        this.color = color;//hitbox rengi debug yaparken kullanılması için
        this.possession = possession; // true ise oyuncu kontrol ediyor, false ise kontrol etmiyor
        this.firstPossession = possession; // ilk sahiplenme durumu

        if (this.normalAnimIndex === undefined) {
            this.normalAnimIndex = Math.floor(Math.random() * 3); // 0-2
        }
        if (this.possessionAnimIndex === undefined) {
            this.possessionAnimIndex = Math.floor(Math.random() * 3); // 0-3
        }

        // Basit animasyon objesi örneği (her entity için farklı tanımlayabilirsin)
        this.animations = [
            {
            frames: './assets/entitesAssets/Live_entitie_1/Idle.png',
            frameCount: 6,
            width: 768 / 6,
            height: 128
            },
            {
            frames: './assets/entitesAssets/Live_entitie_2/Idle.png',
            frameCount: 4,
            width: 768 / 6,
            height: 128
            },
            {
            frames: './assets/entitesAssets/Live_entitie_3/Idle.png',
            frameCount: 4,
            width: 768 / 6,
            height: 128
            }
        ];
        this.possessionsAnim = [
            
            {
            frames: './assets/entitesAssets/Possession_2/Idle.png',
            frameCount: 6,
            width: 768 / 6,
            height: 128
            },
            {
            frames: './assets/entitesAssets/Possession_3/Idle.png',
            frameCount: 6,
            width: 768 / 6,
            height: 128
            },
            {
            frames: './assets/entitesAssets/Possession_4/Idle.png',
            frameCount: 6,
            width: 768 / 6,
            height: 128
            }
        ];
        this.currentFrame = 0;
        this.animationSpeed = 15;
        this.frameCounter = 0;
        this.direction = 1;
    }

    update(player) {
        if(this.possession) {
            this.x = player.x;
            this.y = player.y;
        }
        
    }

    draw(ctx) {
        var anim;
        // Eğer possession true ise hiç çizme
        if (this.possession) return;
        // Karakterin normal ve enfekte hali için animasyon indexlerini kullan
        // this.normalAnimIndex: 1-3 arası (0-2 index)
        // this.infectedAnimIndex: 1-4 arası (0-3 index)
        
        // Eğer daha önce hiç sahiplenilmediyse (firstPossession false)
        if (!this.firstPossession) {
            // animations içinden asset seç
            anim = this.animations[this.normalAnimIndex];
        } else {
            // firstPossession true ise possessionsAnim kullan
            anim = this.possessionsAnim[this.possessionAnimIndex];
        }

        // Frame güncelleme
        this.frameCounter++;
        if (this.frameCounter >= this.animationSpeed) {
            this.currentFrame = (this.currentFrame + 1) % anim.frameCount;
            this.frameCounter = 0;
        }

        
        const img = new Image();
        img.src = anim.frames;
        const sx = this.currentFrame * anim.width;
        const sy = 0;
        const sWidth = anim.width;
        const sHeight = anim.height;
        const dx = -this.size / 2;
        const dy = -this.size / 2;
        const dWidth = this.size;
        const dHeight = this.size;

        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.direction === -1) ctx.scale(-1, 1);

        
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        

        ctx.restore();
    }
 
    changePossession(player) {
        // Durum değişimi
        this.possession = !this.possession;
        player.possession = !player.possession;
        this.possessionSound();
        if (!this.firstPossession) {//ilerde hiç sahiplenilmediyse ve o an sahiplenmedeğine göre asset değişicek
                this.firstPossession = true;
            return;
        }
        return;

    }

    possessionSound(){//aksiyona bağlı ses
        const audio = new Audio('assets/Possession.mp3'); 
        audio.play().catch(e => console.error("Başaramadık abi", e));
    }
    setPossession(possession){
        this.possesssion = possession;
    }
    
}
