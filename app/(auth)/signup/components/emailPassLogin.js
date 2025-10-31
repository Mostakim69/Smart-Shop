export const handleEmailPassLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    const userData = {
        name,
        email,
        password, // Note: For real applications, you should hash the password on the server.
        role,
        // Add other fields like a profile image URL if you have one.
    };

    try {
        const res = await fetch('https://smart-shop-server-three.vercel.app/users', { // change this url to your backend url
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json();
        
        if (res.ok) {
            alert('User created successfully!');
            // You can also redirect the user here using router.push('/')
        } else {
            alert(result.message || 'Signup failed');
        }

    } catch (err) {
        console.error("Signup failed:", err);
        alert('An error occurred during signup.');
    }
};