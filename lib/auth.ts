import { supabase } from './supabase'

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password })
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getProfile() {
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user) return null

  return supabase
    .from('profiles')
    .select('*')
    .eq('id', user.user.id)
    .single()
}
