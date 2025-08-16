const API_URL = "http://localhost:3000"; // Se a porta for diferente, ajuste aqui.

const authService = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // O Devise espera as credenciais dentro de um objeto 'user'
      body: JSON.stringify({
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
    });

    if (!response.ok) {
      // Tenta extrair uma mensagem de erro do corpo da resposta
      const errorData = await response.json().catch(() => ({})); // Retorna {} se o corpo não for JSON
      throw new Error(errorData.message || "Falha na autenticação");
    }

    // O token JWT geralmente vem no cabeçalho 'Authorization'
    const authorizationHeader = response.headers.get("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Token não encontrado na resposta da API.");
    }
    const token = authorizationHeader.split(" ")[1];

    // O corpo da resposta geralmente contém os dados do usuário
    const user = await response.json();

    return { token, user };
  },

  // Você pode adicionar a função de logout aqui depois
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Lógica adicional de logout, se necessário
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  },
};

export default authService;
