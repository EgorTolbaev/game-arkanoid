import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Howl } from 'howler'

@Injectable({
    providedIn: 'root'
})

export class DataSounds {
    sounds = {
        backgroundMusic: new Howl({
            src: ['../assets/sounds/backgroundMusic.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.025
        }),
        gameStart: new Howl({
            src: ['../assets/sounds/gameStart.ogg']
        }),
        gameOver: new Howl({
            src: ['../assets/sounds/gameOver.wav']
        }),
        brickBump: new Howl({
            src: ['../assets/sounds/brickBump.wav']
        }),
        playerBump: new Howl({
            src: ['../assets/sounds/playerBump.wav']
        }),
        borderBump: new Howl({
            src: ['../assets/sounds/playerBump.wav']
        }),
        youWin: new Howl({
            src: ['../assets/sounds/youWin.wav']
        })
    };

    private point = new BehaviorSubject(0);
    currentPoint = this.point.asObservable();

    canvas = {
        width: 1800,
        height: 880
    };

    constructor() { }

    changePoint(point: number) {
        this.point.next(point);
    }
}





