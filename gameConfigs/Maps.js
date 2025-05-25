import { MapDesign } from './MapDesign.js';

export class Maps {
    
    constructor(){
        this.mapLevels = []; 
        // Maps sınıfında her lvl tasarlanır 
        // Ve bu sınıfı içerisinde leveller sabit şekilde saklanır
        //  Her bir mapLevel bir MapDesign nesnesi üzerine asset eklenmiş durumdur
        //  Bu class sadece levelleri saklamak ve oluşturma aşamasında kullanılır
        this.mapLevels.push(this.createMapDesign([
                    { x: 0, y: 850, w: 1200, h: 100, type: "zemin" }, 
                    { x: 700, y: 800, w: 800, h: 50, type: "zemin" }, 
                    { x: 800, y: 750, w: 600, h: 50, type: "zemin" }, 
                    { x: 900, y: 700, w: 400, h: 50, type: "zemin" }, 
                    { x: 1000, y: 650, w: 200, h: 50, type: "zemin" }, 
                    { x: 0, y: 450, w: 900, h: 50, type: "zemin" }, 
                ], "Code Zero",//Map ismi
                { x: 100, y: 800 },//Başlangıç konumu
                { x: 100, y: 400 }//bitiriş konumu
        ));
        
    }
    
    createMapDesign(platforms,mapName,startPoint,finishPoint) {
        // Burada bize gelen verilere göre map tasarımı yapılır.
        const mapDesign = new MapDesign(platforms);
        platforms.forEach(p => mapDesign.createPlatform(p.x, p.y, p.w, p.h, p.type));
        mapDesign.mapName = "Code Zero ";
        mapDesign.startPoint = { x: 100, y: 800 };
        mapDesign.finishPoint = { x: 1100, y: 800 };
        return mapDesign;
    } 

    drawMap(ctx, mapIndex) {
        this.mapLevels[mapIndex].draw(ctx);
        this.mapLevels[mapIndex].drawAssets(ctx);
        // Burada mapIndex. mapin çizimini yapar
    }
}