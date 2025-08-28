import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcnhgtfofuctsevwwurf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjbmhndGZvZnVjdHNldnd3dXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODI5MjksImV4cCI6MjA2OTQ1ODkyOX0.kn7h5JSVg_FUO1SV4yuunRlnZwuatSG7fRA-UqOR_w0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
