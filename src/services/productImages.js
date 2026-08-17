import { supabase } from './supabaseClient'

export async function getProductImageMap() {
  const { data, error } = await supabase.from('product_images').select('*')
  if (error) {
    console.error('Error fetching product images:', error)
    return {}
  }
  const map = {}
  data.forEach((row) => {
    map[row.phone_case_id] = row.image_url
  })
  return map
}