import PlantWateringSystem from "../PlantWateringSystem";
import SensorInterface from "./sensors/SensorInterface";
import SensorMeasurement from "./sensors/SensorMeasurement";

const express = require("express");
const bodyParser = require("body-parser");
const glob = require("glob");

export default class API {
    pws: PlantWateringSystem;
    api: any;
    constructor(pws: PlantWateringSystem) {
        this.pws = pws;
       
        this.api = express();

        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: true }));

        this.api.get("/", function(req: any, res: any) {
            res.json({
                "name": "Plant Watering System 1.0",
                "author": "Alex Kolarski",
                "endpoints" : [
                    {
                        text: 'Get current sensor status information',
                        href : "/sensors"
                    },
                    {
                        text: 'Get logs',
                        href : "/logs"
                    },
                    {
                        text: 'Get historical measurements from sensors',
                        href : "/history"
                    }
                ]
            });
        });
        this.api.get("/sensors", function(req: any, res: any) {
            const data: {[key:string] : SensorMeasurement} = {};
            Object.values(this.pws.sensors).forEach((sensor: SensorInterface) => {
                data[sensor.getName()] = sensor.lastMeasurement;
            });
            res.json({ data });
        }.bind(this));
        this.api.get("/logs", function(req: any, res: any) {
            glob("logs/*.log", function (err: Error, files: Array<any>) {
                res.json({ data: files });
            });
        }.bind(this));
        this.api.get("/history", function(req: any, res: any) {
            glob("logs/*.csv", function (err: Error, files: Array<any>) {
                res.json({ data: files });
            });
        }.bind(this));
        this.api.use('/logs', express.static('logs'))
        this.api.use('/history', express.static('logs'))

        var server = this.api.listen(3000, function () {
            console.log("Listening on port %s...", server.address().port);
        });
    }
}