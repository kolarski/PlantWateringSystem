export default interface SensorInterface {
    lastMeasurement: any;
    getReading(callback: Function) : number;
    getName() : string;
    setName(name: string): void;
    changeMonitorInterval(monitorIntervalInMillisecounds: number) : void; 
    stopMonitoring(): void;
}
