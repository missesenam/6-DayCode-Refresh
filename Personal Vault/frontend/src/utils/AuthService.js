// Example after successful login
localStorage.setItem("token", response.data.token);
//Get JWT token when making authenticated requests:
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

await axios.get("/api/secrets", config);
//Remove JWT on logout:
localStorage.removeItem("token");
