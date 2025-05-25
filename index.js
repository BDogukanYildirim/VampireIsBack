import { Player } from './model/Player.js';
import { LiveEntity } from './model/LiveEntities.js';
import { Maps } from './gameConfigs/Maps.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
var gameStart = false;
canvas.width = 1200;
canvas.height = 900;
var player;
var entity;


const maps = new Maps(); 

// Arka plan görselini başta yükle
const backgroundImg0 = new Image();
backgroundImg0.src = './assets/background0.png';
const backgroundImg = new Image();
backgroundImg.src = './assets/mapAsset/background.png';

const backgroundImg2 = new Image();
backgroundImg2.src = './assets/mapAsset/background2.png';

function checkPossession(player, entity) {
    const dx = player.x - entity.x;
    const dy = player.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const playerRadius = (player.size-110) / 2;//sonraki ifte kullanırken kolaylık olsun ve esneklik sağlansın diye buraya aldım
    const entityRadius = (entity.size-110) / 2;

    if(!player.possession ){//Oyuncu da bu durum doğruysa gelmesin istedim ondan dolayı böyle kontrol ediverdim
        if( distance <= (playerRadius + entityRadius)){// Temas varsa çalışıp gerekli değeri döndürür
            return true;
        }
    }
}
function startGame(){
    document.getElementById("startButton").style.visibility = 'hidden';
    
    const backgroundAudio = document.getElementById("backgroundAudio");
    backgroundAudio.volume = 0.4;
    backgroundAudio.play();
    // Oyun başladığında müzik de başlar
    // Oyun döngüsünü başlat
    gameStart = true;
    
    
    player = new Player(50, 800);
    entity = [new LiveEntity(350,750), new LiveEntity(700,350)];
    requestAnimationFrame(gameLoop);
}
 
// Ses kontrolü için toggle fonksiyonu
function toggleAudio() {
    const backgroundAudio = document.getElementById("backgroundAudio");
    const muteButton = document.getElementById("muteButton");
    // Muted özelliğini tersine çevir
    backgroundAudio.muted = !backgroundAudio.muted;
    // İkona göre güncelleme yap
    muteButton.textContent = backgroundAudio.muted ? "🔇" : "🔊";
    //ikonlar direkt kopyalarakta çalışıyormuş unicode burada sıkıntılı
}

// Mute butonuna tıklanıldığında toggleAudio fonksiyonunun çalışması
document.getElementById("muteButton").addEventListener("click", toggleAudio);
function gameLoop() {
    // Arka planı çiz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg2, 0, 0, canvas.width, canvas.height-50);

    // Map'i çiz
    maps.drawMap(ctx, 0);
    entity.forEach(entity =>  {
        if(player.possession){
            player.updatePossession(canvas.width, canvas.height,maps.mapLevels[0].platforms);
            
        }else{
            player.update(canvas.width, canvas.height, maps.mapLevels[0].platforms);
            entity.setPossession(false);
        } 
        if(player.possession){
            player.drawPossession(ctx);
        }else{
            entity.setPossession(false);
            player.draw(ctx);
        } 

        entity.update(player);
        entity.draw(ctx);
        if (checkPossession(player, entity)) {
            entity.changePossession(player);
        }
    });
    if(player.possession && entitysAllPossession() && playerFinishPoint()){
        gameStart = false;
    }
    if(!gameStart){
        document.getElementById("startButton").style.visibility = 'visible';
        player = null;
        entity = null;
        drawBackground();
        document.getElementById("tebrikler").style.visibility = 'visible';
        const backgroundAudio = document.getElementById("backgroundAudio");
        backgroundAudio.pause();
        return;
    }
    requestAnimationFrame(gameLoop);
}
function playerFinishPoint(){
    if((player.x<100 )&&(player.y<400)&&(player.y>300)){
        return true;
    }
    return false;
}
function entitysAllPossession(){
    let bayrak =0;
    entity.forEach(e =>{
        if(e.firstPossession){
            bayrak++;
        }
    });
    return (bayrak == entity.length);
}
function drawBackground(){
    
    if(gameStart){}
    else{
        ctx.drawImage(backgroundImg0,0,0,canvas.width,canvas.height);
        requestAnimationFrame(drawBackground);
    }
}
if(!gameStart){
    requestAnimationFrame(drawBackground);
}

        document.getElementById("tebrikler").style.visibility = 'hidden';
document.getElementById("startButton").addEventListener("click", startGame);// oyunu başlatan butonun event listener burada etkinleştiriliyor
