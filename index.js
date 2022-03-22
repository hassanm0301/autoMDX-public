const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();
const fs = require("fs");

const checkInterval = 40;
const pathToChrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

function promptUserCreds() {
    const email = prompt("Enter your email address: ");
    const password = prompt("Enter your password: ");

    return email, password;
}

async function puppetMdxPlay(email, password, link){

    const browser = await puppeteer.launch({
        headless:false,
        executablePath: pathToChrome
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});

    await page.goto(link);

    await page.waitForSelector("#userNameInput");

    await page.type("#userNameInput", email);
    await page.type("#passwordInput", password);

    await page.click("#submitButton");
}

async function checkTimeTable(email, password){
    const rawTimeTable = fs.readFileSync("timeTable.json");
    const timeTable = JSON.parse(rawTimeTable);

    while (true){
        let currentTime = Date.now();
        let currentTimeObj = new Date(currentTime);
        let currentTimeStr = currentTimeObj.getHours()+":"+currentTimeObj.getMinutes()+" "+currentTimeObj.getDay();
        for(element in timeTable){
            let elemTime = timeTable[element]["time"];
            let elemDay = timeTable[element]["day"];
            let elemLink = timeTable[element]["link"];
            let elemName = timeTable[element]["name"];
            let elemStr = elemTime + " " + elemDay;

            if(elemStr == currentTimeStr){
                try{
                    puppetMdxPlay(email, password, elemLink);
                }
                catch{
                    console.log("Error with puppeteer! Ignore if you closed the browser manually");
                }
                break;
            }
            else{
                console.log(`course: ${elemName} declined at ${currentTimeStr}`);

            }
        }
        console.log(`\nNo matches! Waiting for ${checkInterval} seconds\n\n`);
        await new Promise(resolve => setTimeout(resolve, checkInterval*1000));
    }
}


function Main(){
    let email, password = promptUserCreds();
    checkTimeTable(email, password);
}

Main()