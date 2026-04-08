async function run() {
    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'service_xn79iw9',
                template_id: 'template_xetd0oo',
                user_id: 'E0y1n-5yyxI0sQuls',
                template_params: {
                    to_email: 'test@example.com',
                    subject: 'Test Subject',
                    message: 'Test Message'
                }
            })
        });
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Response:', text);
    } catch (err) {
        console.error(err);
    }
}
run();
