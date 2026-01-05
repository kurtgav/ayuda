import React from 'react';
import { useAuth } from '@/context/auth-context';
import { logoutUser } from '@/api/auth-service';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface ProfileScreenProps {
  navigation?: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { session, profile } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigation?.reset?.({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Sign in required</h1>
        <button
          onClick={() => navigation?.navigate?.('Login')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900">Profile</h1>
      </div>

      {profile && (
        <>
          <Card>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Name</p>
              <p className="text-base font-medium text-slate-900">{profile.full_name}</p>
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Email</p>
              <p className="text-base font-medium text-slate-900">{session.user.email}</p>
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Account Type</p>
              <p className="text-base font-medium text-slate-900">
                {profile.user_type === 'provider' ? 'Service Professional' : 'Homeowner'}
              </p>
            </div>
          </Card>

          {profile.is_provider && (
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Professional Info</h3>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Specialties</p>
                <p className="text-base font-medium text-slate-900">
                  {(profile as any).specialties?.join(', ') || 'Not set'}
                </p>
              </div>
            </Card>
          )}
        </>
      )}

      <div className="mt-8">
        <Button title="Sign Out" variant="secondary" onPress={handleLogout} />
      </div>
    </div>
  );
};
