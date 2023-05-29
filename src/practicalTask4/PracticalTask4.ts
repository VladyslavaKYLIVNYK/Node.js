import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import axios from 'axios';
import os from 'os';
import si from 'systeminformation';


//4 (Node.js basics)

//1

(async function () {
    async function runSequent<T, R>(
        array: T[],
        callback: (item: T, index: number) => Promise<R>
    ): Promise<R[]> {
        return await Promise.all(array.map(async (item, index) => await callback(item, index)));
    }

    const array: string[] = ["one", "two", "three"];
    const results = await runSequent(array, (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );
    console.log("1 task");
    console.log(results);
})();


//2
function arrayChangeDelete<T>(array: T[], rule: (item: T) => boolean): T[] {
    const deletedElements: T[] = [];
    for (let i = array.length - 1; i >= 0; i--) {
        if (rule(array[i])) {
            deletedElements.push(array.splice(i, 1)[0]);
        }
    }
    return deletedElements;
}
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log("2 task");
console.log(array);
console.log(deletedElements);

//3
console.log("Task3, result:")
const filename: string = process.argv[2];

fs.mkdir(path.join(__dirname, `${filename}_pages`), (err) => {
    if (err) throw err;
});

fs.readFile(path.join(__dirname, `${filename}.json`), 'utf8', (err, urldatastr) => {
    if (err) throw err;

    const urldata: string[] = JSON.parse(urldatastr);

    urldata.forEach((siteurl) => {
        const urlobj = new url.URL(siteurl);

        axios.get(siteurl)
            .then((response) => {
                fs.writeFile(
                    path.join(__dirname, `${filename}_pages`, `${urlobj.host}${urlobj.pathname.split('/').join('-')}`),
                    response.data,
                    (err) => {
                        if (err) throw err;
                    }
                );
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

//4
console.log("Task4, result:")
function printOperatingSystemInfo() {
    console.log(`Operating system:  ${os.release()} ${os.type()} (${os.arch()})`);
}

function printUserInfo() {
    console.log(`user name: ${os.userInfo().username}`);
}

function printCpuModels() {
    console.log('CPU cores models:');
    os.cpus().forEach((cpu, i) => {
        console.log(`CPU ${i + 1} core model: ${cpu.model}`);
    });
}

function printCpuTemperature() {
    si.cpuTemperature().then(data => {
        console.log(`CPU temperature: ${data.main}`);
    });
}

function printGraphicControllers() {
    si.graphics().then(data => {
        console.log('Graphic controllers vendors and models:');
        data.controllers.forEach(controller => {
            console.log(`- ${controller.vendor}: ${controller.model}`);
        });
    });
}

function printMemoryInfo() {
    si.mem().then(data => {
        const totalMemory = (data.total / (1024 * 1024 * 1024)).toFixed(2);
        const usedMemory = ((data.total - data.available) / (1024 * 1024 * 1024)).toFixed(2);
        const freeMemory = (data.available / (1024 * 1024 * 1024)).toFixed(2);
        console.log(`Total memory: ${totalMemory}GB`);
        console.log(`Used memory: ${usedMemory}GB`);
        console.log(`Free memory: ${freeMemory}GB`);
    });
}

function printBatteryInfo() {
    si.battery().then(data => {
        console.log(`Battery charging: ${data.isCharging ? 'yes' : 'no'}`);
        console.log(`Battery percent: ${data.percent}%`);
        console.log(`Battery remaining time: ${data.timeRemaining}`);
    });
}

function printSystemInfo() {
    printOperatingSystemInfo();
    printUserInfo();
    printCpuModels();
    printCpuTemperature();
    printGraphicControllers();
    printMemoryInfo();
    printBatteryInfo();
}

const frequency = parseInt(process.argv[2], 10);

if (isNaN(frequency)) {
    console.error('Invalid frequency parameter.');
    process.exit(1);
}

console.log(`Sys informat will be printed every ${frequency} seconds:`);

setInterval(printSystemInfo, frequency * 1000);

//5

console.log("Task5, result:")
type EventH = () => void;

class MyEventEmitter {
    private events: Record<string, EventH[]> = {};

    regHandler(Name: string, h: EventH) {

        this.events[Name] = this.events[Name] || [];
        this.events[Name].push(h);

    }

    emitEvent(eventName: string) {
        const hs = this.events[eventName];
        if (hs) {
            hs.forEach(h => h());
        }
    }
}
const emitter = new MyEventEmitter();

emitter.regHandler('userUpdated', () => console.log('Обліковий запис оновлено'));

emitter.emitEvent('userUpdated'); 