import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kapmbejkanywhiumgerv.supabase.co'
const supabaseKey = 'sb_publishable_89b3-V76LC1hb3FlcZ4Zag_uJIz1dyT'

export const supabase = createClient(supabaseUrl, supabaseKey)