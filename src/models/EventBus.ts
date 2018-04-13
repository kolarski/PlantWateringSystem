const EventEmitter = require('events');

export default class EventBus {
    private static _instance: {[key:string]: EventBus} = {};
    EventBus: any;
    name: string;
    emitter: any;
    constructor(name: string) {
        if(EventBus._instance[name]) {
            throw new Error("Error: Instantiation failed: Use EventBus.getInstance() instead of new.");
        }
        this.name = name;
        this.init();
        EventBus._instance[name] = this;
    }
    public static getInstance(name: string):EventBus
    {
        if (typeof EventBus._instance[name] === 'undefined') {
            EventBus._instance[name] = new EventBus(name);
        }
        return EventBus._instance[name];
    }
    init() {
        class MyEmitter extends EventEmitter {}
        this.emitter = new MyEmitter();
    }
}