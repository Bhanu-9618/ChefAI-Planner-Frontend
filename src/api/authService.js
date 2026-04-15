import axiosClient from "./axiosClient";

const authService = {
  // Login method
  // Expects credentials like: { email: "user@example.com", password: "password123" }
  login: async (credentials) => {
    // 🔌 Real API Call (Uncomment when backend is ready)
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data; // Should return { token: "..." }

    // 🚧 MOCK RESPONSE (Remove when backend is ready)
    // console.log("Mocking API Login request to ASP.NET...");
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     // Generating a fake JWT token that has payload { name: "John Doe", email: "..." }
    //     // Format: header.payload.signature
    //     const payload = btoa(
    //       JSON.stringify({
    //         name: credentials.email.split("@")[0],
    //         email: credentials.email,
    //         role: "User",
    //         exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hr expiry
    //       })
    //     );
    //     resolve({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.Fakesignature` });
    //   }, 800);
    // });
  },

  // Register method
  register: async (userData) => {
    // 🔌 Real API Call (Uncomment when backend is ready)
    const response = await axiosClient.post("/auth/register", userData);
    return response.data;

    // 🚧 MOCK RESPONSE (Remove when backend is ready)
    // console.log("Mocking API Register request to ASP.NET...");
    // return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 800));
  },
};

export default authService;
