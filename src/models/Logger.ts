const winston = require('winston');

export default class Logger {
    private static _instance: {[key:string]: Logger} = {};
    logger: any;
    infoFilename: string;
    errorFilename: string;
    level: string = 'info';
    constructor(infoFilename?: string, errorFilename?: string) {
        if(Logger._instance[Logger.getInstanceKey(infoFilename, errorFilename)]) {
            throw new Error("Error: Instantiation failed: Use Logger.getInstance() instead of new.");
        }
        if(infoFilename) {
            this.infoFilename = infoFilename;
        }
        if(errorFilename) {
            this.errorFilename = errorFilename;
        }

        this.init();
        Logger._instance[Logger.getInstanceKey(infoFilename, errorFilename)] = this;
    }
    public static getInstance(infoFilename?: string, errorFilename?: string):Logger
    {
        if (typeof Logger._instance[Logger.getInstanceKey(infoFilename, errorFilename)] === 'undefined') {
            Logger._instance[Logger.getInstanceKey(infoFilename, errorFilename)] = new Logger(infoFilename, errorFilename);
        }
        return Logger._instance[Logger.getInstanceKey(infoFilename, errorFilename)];
    }

    public static getInstanceKey(infoFilename?: string, errorFilename?: string):string {
        return JSON.stringify([infoFilename, errorFilename]);
    }
    log (...args: any[]) {
        this.logger.log('info', ...args);
    }
    info (...args: any[]) {
        this.logger.info(...args);
    }
    error (...args: any[]) {
        this.logger.error(...args);
    }
    verbose (...args: any[]) {
        this.logger.verbose(...args);
    }
    init() {
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    level:'debug',
                    name: 'console',
                    handleExceptions: true,
                    prettyPrint: true,
                    silent:false,
                    timestamp: true,
                    colorize: true,
                    json: false
                })
            ]
        });
        this.logger.add(winston.transports.File, {
            name: 'all',
            filename: `logs/all.log`,
            level: 'info',
            handleExceptions: true,
            prettyPrint: true,
            silent:false,
            timestamp: true,
            json: false,
            colorize: false,
            tailable: true
        });
        this.logger.add(winston.transports.File, {
            name: 'all-error',
            filename: `logs/all.error.log`,
            level: 'error',
            handleExceptions: true,
            prettyPrint: true,
            silent: false,
            timestamp: true,
            json: false,
            showLevel: true,
            colorize: false,
            tailable: true
        });
        if(typeof this.infoFilename === 'string') {
            this.logger.add(winston.transports.File, {
                name: 'info-file',
                filename: `logs/${this.infoFilename}.log`,
                level: 'info',
                handleExceptions: true,
                prettyPrint: false,
                silent:false,
                timestamp: true,
                json: false,
                colorize: false,
                tailable: true
            });
        }

        if(typeof this.errorFilename === 'string') {
            this.logger.add(winston.transports.File, {
                name: 'error-file',
                filename: `logs/${this.errorFilename}.log`,
                level: 'error',
                handleExceptions: true,
                prettyPrint: false,
                silent: false,
                timestamp: true,
                json: false,
                showLevel: false,
                colorize: false,
                tailable: true
            });
        }
        this.logger.level = this.level;
    }
    setLogLevel(logLevel: string) {
        this.logger.level = logLevel;
    }
}