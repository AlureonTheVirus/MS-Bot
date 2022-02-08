const puppeteer = require('puppeteer'); // headless browser for fetching


// fetch raw html
module.exports = async function fetch(url, html_main, debugbool) {
    if (debugbool) console.log('starting fetch()...');
    const minimal_args = [ // these arguments are used to configure puppeteer on startup to reduce overall proccessing requirements and make fetching faster
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
    ];
    console.log('Starting Browser...');
    const browser = await puppeteer.launch({ // launch pupeteer 
        headless: true, // booleen, if false chromium browser will be open in order to see what puppeteer is doing (useful for debugging)
        args: minimal_args,
        userDataDir: './scraper/puppeteer-data' // forces use of a local cache to reduce requests
    });
    console.log('Browser started.');
    const page = await browser.newPage();
    if (debugbool) console.log('aquiring page...');

    await page.goto(url, {
        waitUntil: 'networkidle0'
    }); // go to predefined url and wait for the page to load fully
    html_main = await page.evaluate(() => document.body.innerHTML); // grab the served html from the website

    if (debugbool) console.log('fetched html.');
    await browser.close(); // end the puppeteer session
    if (debugbool) console.log('Browser closed.');
    if (debugbool) console.log("Done fetching!");

    return html_main;
}