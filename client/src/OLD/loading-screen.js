export class LoadingScreen {
    constructor() {
        this.screen = document.getElementById('loading-screen');

        this.text = document.createElement('p');
        this.text.innerHTML = 'Loading...';
        this.screen.appendChild(this.text);
    }

    show() {
        this.screen.classList.remove('hidden');
    }

    update(text) {
        this.text.innerHTML = text;
    }

    hide() {
        this.screen.classList.add('hidden');
    }
}