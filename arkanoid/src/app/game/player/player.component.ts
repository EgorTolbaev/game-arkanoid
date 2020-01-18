import { Component, OnInit } from '@angular/core'
import { DataSounds } from '../data.service'

@Component({
    selector: 'player',
    template: ``,
    styles: ['']
})

export class PlayerComponent implements OnInit {

    //Начальная позиция игрока
    positionWidth: number = 770;
    positionheight: number = 760;

    //Размер игрока :)
    width: number = 260;
    height: number = 32;

    //Скорость игрока
    speedPlayer: number = 10;
    dx: number = 0;

    canvas = this.data.canvas;

    ball = { isOnPlayer: true };

    //Перемещение игрока до начала игра
    move() {
        if (((this.positionWidth + this.dx) > 0) && ((this.positionWidth + this.dx) < this.canvas.width - this.width)) {
            this.positionWidth += this.dx;
        }
    }

    stop() {
        this.dx = 0;
    }

    constructor(private data: DataSounds) { }

    ngOnInit() { }

}