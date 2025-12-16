import React, { useState } from "react";
import { Lock, Mail, Cloud, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await authService.login(formData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      {/* Left Side: Brand Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 relative overflow-hidden items-center justify-center p-12">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-glass">
              <Cloud className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Cloud<span className="font-light text-accent">Vet</span></h1>
          </div>

          <h2 className="text-3xl font-light mb-6 leading-tight">
            Gestão Veterinária <br />
            <span className="font-semibold text-accent">Inteligente e Segura</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Acesse sua plataforma completa para gestão clínica, controle hospitalar e atendimento de excelência.
          </p>

          <div className="flex items-start space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Segurança de Dados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Alta Disponibilidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md bg-white p-8 lg:p-12 rounded-3xl shadow-premium border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-cyan-50 mb-4 lg:hidden">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo de volta</h2>
            <p className="text-slate-500">Insira suas credenciais para acessar o sistema.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Email Corporativo
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400"
                  placeholder="nome@clinica.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Senha de Acesso
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                Lembrar-me
              </label>
              <a href="#" className="font-medium text-cyan-700 hover:text-cyan-800 transition-colors">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Acessando...
                </span>
              ) : (
                <>
                  Acessar Sistema
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta? <a href="#" className="font-bold text-cyan-700 hover:text-cyan-900">Entre em contato</a>
            </p>
            <p className="text-[10px] text-slate-400 mt-8 uppercase tracking-widest">
              © {new Date().getFullYear()} CloudVet Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
