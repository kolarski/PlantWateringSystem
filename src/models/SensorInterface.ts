export default interface SensorInterface {
    getReading() : number;
    getName() : string;
    setName(name: string): void;
    changeMonitorInterval(monitorIntervalInMillisecounds: number) : void; 
    stopMonitoring(): void;
}
