import { Platform } from "./Platform.js";

export class MapDesign {
    platforms = [];
    constructor() {
        this.startPoint = { x: 50, y: 800 }; // Başlangıç noktası
        this.finishPoint = { x: 1120, y: 600 }; // Bitiş noktası
        this.mapName = null;
        this.assetPaths = {
            // Sadece kullanılan assetler bırakıldı
            topLeft: "./assets/mapAsset/1 Tiles/Tile_01.png",
            top: "./assets/mapAsset/1 Tiles/Tile_02.png",
            topRight: "./assets/mapAsset/1 Tiles/Tile_04.png",
            topLeftCorner: "./assets/mapAsset/1 Tiles/Tile_38.png",
            right: "./assets/mapAsset/1 Tiles/Tile_13.png",
            left: "./assets/mapAsset/1 Tiles/Tile_10.png",
            bottomLeft: "./assets/mapAsset/1 Tiles/Tile_19.png",
            bottomRight: "./assets/mapAsset/1 Tiles/Tile_22.png",
            bottom: "./assets/mapAsset/1 Tiles/Tile_20.png",
            center: [
                "./assets/mapAsset/1 Tiles/Tile_11.png",
                "./assets/mapAsset/1 Tiles/Tile_12.png"
            ],
            grass: "./assets/mapAsset/1 Tiles/tile_05.png",
            stone3: "./assets/mapAsset/3 Objects/Stones/3.png",
            stone5: "./assets/mapAsset/3 Objects/Stones/5.png",
            stone6: "./assets/mapAsset/3 Objects/Stones/6.png",
            tree6: "./assets/mapAsset/3 Objects/Trees/6.png",
            tree9: "./assets/mapAsset/3 Objects/Trees/9.png",
            tree18: "./assets/mapAsset/3 Objects/Trees/18.png",
            pointer: "./assets/mapAsset/3 Objects/Other/Pointer1.png"
        };
    }

    createPlatform(x, y, width, height, type) {
        if(width > 0 && height > 0){
            if (!type) {
                if(width > height){
                    type = "duvar";
                }else if(width == height){
                    type = "belirsiz";
                }
                else{
                    type = "zemin";
                }
            }
            const platform = new Platform(x, y, width, height, type);
            this.platforms.push(platform);
        }else{
            console.error("createPlatform için geçersiz witdh ve height değerleri");
            return;
        }
    }

    draw(ctx){
        for (const platform of this.platforms){
            platform.draw(ctx);
        }
    }

    drawAssets(ctx){
        let topRight = new Image();
        topRight.src = this.assetPaths.topRight;

        let topLeft = new Image();
        topLeft.src = this.assetPaths.topLeft;

        let top = new Image();
        top.src = this.assetPaths.top;

        let right = new Image();
        right.src = this.assetPaths.right;

        let left = new Image();
        left.src = this.assetPaths.left;

        let bottomLeft = new Image();
        bottomLeft.src = this.assetPaths.bottomLeft;

        let bottomRight = new Image();
        bottomRight.src = this.assetPaths.bottomRight;

        let bottom =new Image();
        bottom.src = this.assetPaths.bottom;

        let center1 = new Image();
        center1.src = this.assetPaths.center[0];

        let center2 = new Image();
        center2.src = this.assetPaths.center[1];

        let topLeftCorner = new Image();
        topLeftCorner.src = this.assetPaths.topLeftCorner;

        let grass = new Image();
        grass.src = this.assetPaths.grass;

        let stone3 = new Image();
        stone3.src = this.assetPaths.stone3;

        let stone5 = new Image();
        stone5.src = this.assetPaths.stone5;
        
        let stone6 = new Image();
        stone6.src = this.assetPaths.stone6;

        let tree6 = new Image();
        tree6.src = this.assetPaths.tree6;

        let tree9 = new Image();
        tree9.src = this.assetPaths.tree9;

        let tree18 = new Image();
        tree18.src = this.assetPaths.tree18;

        let pointer = new Image();
        pointer.src = this.assetPaths.pointer;

        {//platform 1
            ctx.drawImage(topLeft, 0, 450,25,25);
            for (let dx = 25; dx <= 850; dx += 25) {
                ctx.drawImage(top, dx, 450, 25, 25);
            }
            ctx.drawImage(topRight,875,450,25,25);
            ctx.drawImage(bottomLeft, 0, 475, 25, 25);
            for (let dx = 25; dx <= 850; dx += 25) {
                ctx.drawImage(bottom, dx, 475, 25, 25);
            }
            ctx.drawImage(bottomRight,875,475,25,25);
        }
        
        {//alt platform
            ctx.drawImage(topLeft, 0, 850,25,25);
            for (let dx = 25; dx <= 675; dx += 25) {
                ctx.drawImage(top, dx, 850, 25, 25);
            }
            ctx.drawImage(topLeftCorner,700,850,25,25);
            ctx.drawImage(left,700,825,25,25);
            ctx.drawImage(topLeft, 700, 800,25,25);
            ctx.drawImage(top, 725, 800,25,25);
            ctx.drawImage(top, 750, 800,25,25);
            ctx.drawImage(top, 775, 800,25,25);
            ctx.drawImage(topLeftCorner, 800, 800,25,25);
            ctx.drawImage(left,800,775,25,25);
            ctx.drawImage(topLeft, 800, 750,25,25);
            ctx.drawImage(top, 825, 750,25,25);
            ctx.drawImage(top, 850, 750,25,25);
            ctx.drawImage(top, 875, 750,25,25);
            ctx.drawImage(topLeftCorner,900,750,25,25);
            ctx.drawImage(left,900,725,25,25);
            ctx.drawImage(topLeft, 900, 700,25,25);
            ctx.drawImage(top, 925, 700,25,25);
            ctx.drawImage(top, 950, 700,25,25);
            ctx.drawImage(top, 975, 700,25,25);
            ctx.drawImage(topLeftCorner,1000,700,25,25);
            ctx.drawImage(left,1000,675,25,25);
            ctx.drawImage(topLeft, 1000, 650,25,25);
            ctx.drawImage(top, 1025, 650,25,25);
            ctx.drawImage(top, 1050, 650,25,25);
            ctx.drawImage(top, 1075, 650,25,25);
            ctx.drawImage(top, 1100, 650,25,25);
            ctx.drawImage(top, 1125, 650,25,25);
            ctx.drawImage(top, 1150, 650,25,25);
            ctx.drawImage(topRight, 1175, 650,25,25);
            ctx.drawImage(bottomLeft, 0, 875,25,25);
            for (let dx = 25; dx <= 1150; dx += 25) {
                ctx.drawImage(bottom, dx, 875, 25, 25);
            }
            ctx.drawImage(bottomRight, 1175, 875,25,25);
            for (let dy = 850; dy > 650; dy -= 25) {
                ctx.drawImage(right, 1175, dy, 25, 25);
            }

            for (let i = 0, dx = 725; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 825, 25, 25);
            }
            for (let i = 0, dx = 725; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 850, 25, 25);
            }

            for (let i = 0, dx = 1025; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 825, 25, 25);
            }

            for (let i = 0, dx = 825; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 775, 25, 25);
            }
            for (let i = 0, dx = 825; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 800, 25, 25);
            }

            for (let i = 0, dx = 925; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 750, 25, 25);
            }
            for (let i = 0, dx = 925; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 725, 25, 25);
            }
            for (let i = 0, dx = 1025; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 700, 25, 25);
            }
            for (let i = 0, dx = 1025; dx <= 1150; i++, dx += 25) {
                const centerImg = (i % 2 === 0) ? center1 : center2;
                ctx.drawImage(centerImg, dx, 675, 25, 25);
            }
        }
        {
            ctx.drawImage(tree18, 1060, 650 - 98, 64, 98);
            ctx.drawImage(stone3, 600, 433 , 37, 17);
            ctx.drawImage(stone5, 400, 850-27 , 66, 27);
            ctx.drawImage(stone6, 50, 850-31*2 , 2*74, 2*31);
            ctx.drawImage(grass,90,800,25,50);
            ctx.drawImage(grass,150,400,25,50);
            ctx.drawImage(grass,350,800,25,50);
            ctx.drawImage(grass,750,750,25,50);
            ctx.drawImage(grass,1120,600,25,50);
            ctx.drawImage(tree6, 400, 450-107, 65, 107);
            ctx.drawImage(tree9, 200, 850 - 113, 68, 113);
            ctx.drawImage(pointer,50 ,450-42*2, 2*14 ,2*42 );
        }
        
        // // bitişi belirten tabela yukardaki pointer aslında bunu belirtecekti ama
        // // ufak bir sıkıntı oldu ve çizilmedi doğru bilgilere rağmen bende böyle 
        // // birşey çizdirdim ne olur olmaz dursun gene hata çıkarsa bu çizilevek
        // ctx.save();
        // const arrowX = 120;
        // const arrowY = 350; 
        // const arrowLength = 60;
        // const arrowWidth = 30;
        // ctx.beginPath();
        // ctx.moveTo(arrowX + arrowLength + 10, arrowY);
        // ctx.lineTo(arrowX + arrowLength + 10, 450);
        // ctx.strokeStyle = "#21618c";
        // ctx.lineWidth = 4;
        // ctx.stroke();

        // ctx.restore();

        // ctx.beginPath();
        // ctx.moveTo(arrowX, arrowY);
        // ctx.lineTo(arrowX + arrowLength, arrowY - arrowWidth / 2);
        // ctx.lineTo(arrowX + arrowLength, arrowY - arrowWidth / 4);
        // ctx.lineTo(arrowX + arrowLength + 20, arrowY - arrowWidth / 4);
        // ctx.lineTo(arrowX + arrowLength + 20, arrowY + arrowWidth / 4);
        // ctx.lineTo(arrowX + arrowLength, arrowY + arrowWidth / 4);
        // ctx.lineTo(arrowX + arrowLength, arrowY + arrowWidth / 2);
        // ctx.closePath();
        // ctx.fillStyle = "#3498db";
        // ctx.fill();
        // ctx.strokeStyle = "#21618c";
        // ctx.lineWidth = 2;
        // ctx.stroke();

        // ctx.fillStyle = "#fff";
        // ctx.font = "bold 16px Arial";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillText("Next", arrowX + arrowLength / 2 + 10, arrowY);

        
    }

    destroyPlatform(index) {
        if (index >= 0 && index < this.platforms.length) {
            this.platforms.splice(index, 1);
        } else {
            console.error("Hatalı platform indexi");
        }
    }
}
