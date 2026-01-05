import React, { useState } from 'react';
import { loginUser } from '@/api/auth-service';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';

interface LoginScreenProps {
  navigation?: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: loginError } = await loginUser(email, password);

    if (loginError) {
      setError(loginError);
    } else {
      // Navigation happens automatically via auth context
      alert('Success: Logged in successfully!');
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="mb-8 mt-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-base text-slate-600">Sign in to Ayuda</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900"
          />
        </div>

        <Button title={loading ? 'Signing In...' : 'Sign In'} onPress={handleLogin} disabled={loading} />
      </div>

      <div className="flex justify-center gap-1">
        <p className="text-sm text-slate-600">Don't have an account?</p>
        <button
          onClick={() => navigation?.navigate?.('Register')}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
