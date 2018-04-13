export default interface SensorInterface {
    getReading(callback: Function) : number;
    getName() : string;
    setName(name: string): void;
    changeMonitorInterval(monitorIntervalInMillisecounds: number) : void; 
    stopMonitoring(): void;
}
