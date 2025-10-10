export const handleEmailPassLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name;
    const email = form.email;
    const password = form.password;
    console.log(name);
}