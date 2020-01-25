import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataGame } from '../data.service';

@Component({
    selector: 'app-ball',
    template: ``,
    styles: [``]
})

export class BallComponent implements OnInit {

    //Начальная позиция мача
    widthBall: number = 880;
    heightBall: number = 715;

    //Размер мача
    width: number = 45;
    height: number = 45;

    // скорость мяча
    speedBall: number = 6;
    dx: number = 0;
    dy: number = 0;

    /**Статус мяча запушен/на позиции*/
    isReleased = false;

    score = 0;
    canvas = this.data.canvas;

    /** Запуск мяча*/
    ballLaunch() {
        this.dy = -this.speedBall;
        this.dx = -this.speedBall;
        this.isReleased = true;
    }

    /** Движение мяча по canvas*/
    ballMovement() {
        this.widthBall += this.dx;
        this.heightBall += this.dy;
    }

    stop() {
        this.dx = 0;
        this.dy = 0;
    }

    /**Проверка на то что меч столкнулся*/
    ballCollision(e: any) {
        const x = this.widthBall + this.dx;
        const y = this.heightBall + this.dy;

        if (x + this.width > e.x &&
            x < e.x + e.width &&
            y + this.height > e.y &&
            y < e.y + e.height) {
            return true;
        }
        return false;
    }

    /**Разрушим кирпич и добавим отчку игроку*/
    destroyBrick(e: any) {
        this.dy *= -1;
        e.isAlive = false;
        this.data.changePoint(this.score += 1);
        this.data.sounds.destroyBrick.play();
    }

    /**Обнуляем очки*/
    resettingPoints(e: any) {
        this.data.changePoint(this.score = 0);
    }

    /**Действия при столкновении с границами поля */
    collisionsWithBorders() {
        const x = this.widthBall + this.dx;
        const y = this.heightBall + this.dy;

        if (x < 0) {
            this.widthBall = 0;
            this.dx = this.speedBall;
            this.data.sounds.borderBump.play();
        } else if (x + this.width > this.canvas.width) {
            this.widthBall = this.canvas.width - this.width;
            this.dx = -this.speedBall;
            this.data.sounds.borderBump.play();
        } else if (y < 0) {
            this.heightBall = 0;
            this.dy = this.speedBall;
            this.data.sounds.borderBump.play();
        }
    }

    onPlayerBumpSide(player: any) {
        return this.collisionWithPlayers(player);
    }

    private collisionWithPlayers(player: any) {
        return (this.widthBall + this.width / 2) < (player.x + player.width / 2);
    }

    playerBump(player: any) {
        this.dy = -this.speedBall;
        this.dx = this.onPlayerBumpSide(player) ? -this.speedBall : this.speedBall;
    }

    constructor(private data: DataGame) { }

    ngOnInit() {
        this.data.currentPoint.subscribe(score => this.score = score);
    }
}