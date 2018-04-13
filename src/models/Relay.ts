export default class Relay {
    open: boolean = true;
    on() {
        this.open = false;
        console.log('Turning the relay on');
    }
    off() {
        this.open = true;
        console.log('Turning the relay off');
    }
}