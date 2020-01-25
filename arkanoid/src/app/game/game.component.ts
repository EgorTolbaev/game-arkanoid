import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BallComponent } from './ball/ball.component';
import { PlayerComponent } from './player/player.component';
import { DataGame } from './data.service';

@Component({
    selector: 'app-game',
    template: `
    <canvas #canvas width=1800 height=820></canvas>
    `,
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

    @ViewChild('canvas', { static: true }) canvas: ElementRef;
    ctx: CanvasRenderingContext2D;

    //Клавиши управления
    arrowLeft: number = 37;
    keyA: number = 65;
    arrowRight: number = 39;
    keyD: number = 68;
    space: number = 32;
    keyR: number = 82;

    //настройка игрового пространства
    width: number = this.data.canvas.width;
    height: number = this.data.canvas.height;
    rows: number = 5;
    cols: number = 10;
    running: boolean = true;
    restarting: boolean = false;

    private _sprites = {
        brick: undefined,
        ball: undefined,
        player: undefined,
        scoreTable: undefined
    };

    public get sprites() {
        return this._sprites;
    }

    public set sprites(value) {
        this._sprites = value;
    }

    ball = new BallComponent(this.data);
    player = new PlayerComponent(this.data);
    bricks = [];
    score = 0;

    ngOnInit() {
        this.fieldSetting();
        this.startGame();

        this.data.currentPoint.subscribe(score => this.score = score);

        this.renderer.listen('document', 'keydown', (e) => {
            if (e.keyCode === this.arrowLeft || e.keyCode === this.keyA) {
                this.player.dx = -this.player.speedPlayer;

                if (this.player.ball.isOnPlayer) {
                    this.ball.dx = this.player.dx;
                }
            } else if (e.keyCode === this.arrowRight || e.keyCode === this.keyD) {
                this.player.dx = this.player.speedPlayer;
                if (this.player.ball.isOnPlayer) {
                    this.ball.dx = this.player.dx;
                }
            }
        });

        this.renderer.listen('document', 'keyup', () => {
            this.player.stop();
            if (this.player.ball.isOnPlayer) {
                this.ball.stop();
            }
        });

        this.renderer.listen('document', 'keydown', (e) => {
            if (e.keyCode === this.space && this.running && this.player.ball.isOnPlayer) {
                this.ball.ballLaunch();

                // ball is not on player anymore
                this.player.ball.isOnPlayer = false;
                this.data.sounds.gameStart.play();
            }
        });

        this.renderer.listen('document', 'keydown', (e) => {
            if (e.keyCode === this.keyR && this.running === false) {
                this.restart();
            }
        });
    }

    /**
    * настройка игрового поля
    */
    private fieldSetting() {
        this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
        this.ctx.font = 'bold 40px Chakra Petch';
        this.ctx.fillStyle = '#fff';
    }

    /**
    * загрузка спрайтов
    */
    spritesLoading() {
        for (const sprite in this.sprites) {
            if (sprite) {
                this.sprites[sprite] = new Image();
                this.sprites[sprite].src = '../../assets/images/' + sprite + '.png';
            }
        }
    }

    /**
    * создание кирпичей
    * @var {number} x - задача расстояние между блоками по горизонтали
    * @var {number} y - задача расстояние между блоками по вертикали
    * @var {number} width - ширина блока
    * @var {number} height - длина блока
    */
    createBricks() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.bricks.push({
                    x: 173 * col + 40,
                    y: 50 * row + 30,
                    width: 163,
                    height: 40,
                    isAlive: true
                });
            }
        }
    }

    startGame() {
        this.spritesLoading();
        this.createBricks();
        this.runGame();
    }

    /**
     * отрисовка спринтов
     */
    renderSprites() {

        this.ctx.clearRect(0, 0, this.width, this.height);

        //this.ctx.drawImage(this.sprites.scoreTable, -5, this.height - 885);
        this.ctx.fillText('Очки: ' + this.score, 20, this.height - 840);

        this.ctx.drawImage(this.sprites.player, this.player.x, this.player.y);

        this.bricks.forEach(function (e) {
            if (e.isAlive) {
                this.ctx.drawImage(this.sprites.brick, e.x, e.y + 50);
            }
        }, this);

        this.ctx.drawImage(this.sprites.ball, this.ball.widthBall, this.ball.heightBall);

        if (this.player.ball.isOnPlayer) {
            this.ctx.fillText('Нажмите пробел для старта игры', this.width / 2 - 280, this.height / 2);
        }
    }

    /**
     * реакция на изменения на поле
     */
    detectСhanges() {
        if (this.score >= this.bricks.length) {
            this.over('Вы победили :)');
            this.ball.stop();
        }

        if (this.ball.heightBall >= this.height + this.ball.height) {
            this.over('Игра закончена');

            this.ball.heightBall -= 10;
            this.ball.dy = 0;
        }

        if (this.ball.dx || this.ball.dy) {
            this.ball.ballMovement();
        }

        this.bricks.forEach((el) => {
            if (el.isAlive) {
                if (this.ball.ballCollision(el)) {
                    this.ball.destroyBrick(el);
                }
            }
        });

        this.ball.collisionsWithBorders();

        if (this.player.dx) {
            this.player.movePlayer();
        }

        if (this.ball.ballCollision(this.player)) {
            this.ball.playerBump(this.player);
        }
    }

    restart() {
        this.score = 0;
        this.bricks.forEach((el) => {
            if (el.isAlive) {
                this.ball.resettingPoints(el);

            }
        });
        this.restarting = true;
        this.runGame();

        this.ball.widthBall = 880;
        this.ball.heightBall = 715;
        this.ball.dx = 0;
        this.ball.dy = 0;

        this.player.x = 770;
        this.player.ball.isOnPlayer = true;

        this.bricks = [];
        this.spritesLoading();
        this.createBricks();
    }


    runGame() {
        if (this.running || this.restarting) {
            this.running = true;
            this.detectСhanges();
            this.spritesLoading();
            this.renderSprites();
            requestAnimationFrame(() => {
                this.runGame();
            });
        }

        this.restarting = false;
    }


    over(message: string) {
        if (message === 'Игра закончена') {
            this.data.sounds.gameOver.play();
        } else if (message === 'Вы победили :)') {
            this.data.sounds.youWin.play();
        }

        setTimeout(() => {
            this.ctx.font = 'bold 40px Chakra Petch';
            this.ctx.fillText('Нажмите R чтобы начать заново', this.width / 2 - 280, this.height / 2);
        }, 100);

        this.running = false;
    }

    constructor(private data: DataGame, private renderer: Renderer2) {
    }
}