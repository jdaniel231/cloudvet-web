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
      const { token, user } = await authService.login(formData);
      
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login VetCare</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Senha</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          © {new Date().getFullYear()} CloudVet. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
