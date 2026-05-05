import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nirfuougrlvurkaxmvyv.supabase.co'
const supabaseKey = 'sb_publishable_LM7YJd1qw-YQHb5p4jxJPw_Qtc3mqpj'

export const supabase = createClient(supabaseUrl, supabaseKey)
