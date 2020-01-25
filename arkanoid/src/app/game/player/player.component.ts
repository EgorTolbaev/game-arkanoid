import { Component, OnInit } from '@angular/core'
import { DataGame } from '../data.service'

@Component({
    selector: 'app-player',
    template: ``,
    styles: ['']
})

export class PlayerComponent implements OnInit {

    //Начальная позиция игрока
    x: number = 770;
    y: number = 760;

    //Размер игрока :)
    width: number = 260;
    height: number = 32;

    /**Скорость игрока*/
    speedPlayer: number = 10;
    dx: number = 0;

    canvas = this.data.canvas;

    ball = { isOnPlayer: true };

    /**Перемещение игрока до начала игра*/
    movePlayer() {
        if (((this.x + this.dx) > 0) && ((this.x + this.dx) < this.canvas.width - this.width)) {
            this.x += this.dx;
        }
    }

    stop() {
        this.dx = 0;
    }

    constructor(private data: DataGame) { }

    ngOnInit() { }

}