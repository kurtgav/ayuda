import React, { useState } from 'react';
import { registerUser } from '@/api/auth-service';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';

interface RegisterScreenProps {
  navigation?: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: regError } = await registerUser(
      email,
      password,
      fullName,
      isProvider
    );

    if (regError) {
      setError(regError);
    } else {
      alert('Success: Account created! Please log in.');
      navigation?.navigate?.('Login');
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="mb-8 mt-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p className="text-base text-slate-600">Join Ayuda today</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900"
          />
        </div>

        {/* Provider Toggle */}
        <label className="flex items-center gap-3 py-3">
          <input
            type="checkbox"
            checked={isProvider}
            onChange={(e) => setIsProvider(e.target.checked)}
            className="w-6 h-6 border-2 border-slate-300 rounded"
          />
          <span className="text-sm text-slate-700">I want to be a service professional</span>
        </label>

        <Button
          title={loading ? 'Creating Account...' : 'Create Account'}
          onPress={handleRegister}
          disabled={loading}
        />
      </div>

      <div className="flex justify-center gap-1">
        <p className="text-sm text-slate-600">Already have an account?</p>
        <button
          onClick={() => navigation?.navigate?.('Login')}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
