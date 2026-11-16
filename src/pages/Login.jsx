import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isSignup ? 'Account created successfully!' : 'Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-white font-sans">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-soft">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black text-[#111111] mb-2">
            <span className="w-9 h-9 rounded-full bg-[#FF8A2B] text-white flex items-center justify-center text-base shadow-sm">
              🍔
            </span>
            <span>
              Hexovate <span className="text-[#FF8A2B]">Food</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            {isSignup ? 'Create an Account' : 'Welcome Back!'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isSignup ? 'Sign up to start ordering delicious food' : 'Login to your account to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A2B]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8A2B] text-white font-extrabold py-3.5 rounded-xl shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2 text-sm mt-2"
          >
            <span>{isSignup ? 'Sign Up' : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs font-bold text-gray-600 hover:text-[#FF8A2B] transition"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}