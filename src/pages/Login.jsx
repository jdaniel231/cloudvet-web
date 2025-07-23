import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // O authService agora retorna { token, user }
      const { token } = await authService.login(formData);
      
      // Armazena o token e os dados do usuário
      localStorage.setItem('token', token);
      // Como a API não retorna os dados do usuário no corpo, salvamos o email digitado
      localStorage.setItem('user', JSON.stringify({ email: formData.email })); 

      navigate('/dashboard');
    } catch (err) {
      // Exibe a mensagem de erro da API ou uma mensagem padrão
      setError(err.message || 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Login VetCare</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-lightText mb-1">Email</label>
            <div className="flex items-center border border-border rounded-lg px-3 py-2">
              <Mail className="h-5 w-5 text-lightText mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-text"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-lightText mb-1">Senha</label>
            <div className="flex items-center border border-border rounded-lg px-3 py-2">
              <Lock className="h-5 w-5 text-lightText mr-2" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none text-text"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-xs text-center text-lightText mt-4">
          © {new Date().getFullYear()} CloudVet. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
