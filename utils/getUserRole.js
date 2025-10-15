export async function getUserRole(email) {
  if (!email) return null;

  try {
    const res = await fetch(`http://localhost:5000/users/${email}/role`);
    if (!res.ok) throw new Error("Failed to fetch role");
    const data = await res.json();
    return data.role; 
  } catch (err) {
    console.error("Error fetching user role:", err);
    return null;
  }
}
