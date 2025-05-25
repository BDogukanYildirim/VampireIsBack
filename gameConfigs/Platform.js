export class Platform {
    constructor(x, y, width, height, type) {//Plartform boyutu ve konumu
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height;
        this.type = type;// duvar/zemin(tavan) hangisi olduğu
    }

    //plartformun çarpışacak kısmını çizen kod
    draw(ctx) {
        ctx.fillStyle = "#444"; // Duvar rengi şimdilik önemli ama sonrasında bu asset tarafından kapanacak ve gözükmeyecek
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //Çarpışma kontrolü
    collidesWith(player) {
        const half = player.size / 2;
        const carpismaVar = (
            player.x - half < this.x + this.width &&
            player.x + half > this.x &&
            player.y - half < this.y + this.height &&
            player.y + half > this.y
        );//boolen tipinde çarpışma kontrolü
        const platformInfo = {
            type: this.type,
            temas: carpismaVar,
            x: this.x,
            y: this.y
        };//çarpışma olmuşsa platformun özelliklerini döndürür ve platformun özelliklerine göre çarpışma durumunda yapılacak işlem değişir.
        //örnek olarak zeminse oyuncunun ileri hareketi zemine değiyor diye engellenmesin duvar varsa engellensin
        //veya tam tersi oyuncu duvara değiyor diye aşağı hareketi iptal olmasın
            return platformInfo;
    }
}