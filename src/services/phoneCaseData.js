export const phoneModels = [
  'iPhone 15',
  'iPhone 14',
  'iPhone 13',
  'Samsung S23',
  'Samsung S22',
  'Samsung M14',
  'OnePlus 11',
  'OnePlus Nord',
  'Redmi Note 12',
  'Realme 11',
  'Vivo V29',
  'Google Pixel 8'
]

export const typeDescriptions = {
  Silicone: 'Soft-touch silicone case with a comfortable grip and precise cutouts for buttons and ports. Lightweight and flexible, it absorbs minor bumps and scratches while keeping your phone slim in the pocket.',
  Leather: 'Premium PU leather case with a refined finish that ages beautifully over time. Offers a firm grip, card-slot convenience on select models, and a professional look for everyday carry.',
  Clear: 'Crystal-clear case that shows off your phone\'s original design while adding a slim protective layer. Resists yellowing and keeps edges raised to protect the screen and camera from scratches.',
  Shockproof: 'Rugged, military-grade shockproof case built for drops and daily wear. Reinforced corners and a raised bezel protect the screen and camera without adding much bulk.'
}

export const typeImages = {
  Silicone: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400',
  Leather: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
  Clear: 'https://images.unsplash.com/photo-1601972602288-3be527b4f18a?w=400',
  Shockproof: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=400'
}

export const phoneCases = [
  // iPhone 15
  { id: 201, title: 'Silicone Case', type: 'Silicone', price: 179, model: 'iPhone 15', colors: ['#1a1a1a', '#0077b6', '#ff6f61', '#2d6a4f'] },
  { id: 202, title: 'Clear Case', type: 'Clear', price: 129, model: 'iPhone 15', colors: ['#e0e0e0'] },
  { id: 203, title: 'Leather Case', type: 'Leather', price: 349, model: 'iPhone 15', colors: ['#6f4e37', '#1a1a1a'] },
  { id: 204, title: 'Shockproof Case', type: 'Shockproof', price: 299, model: 'iPhone 15', colors: ['#2563eb', '#6c757d'] },

  // iPhone 14
  { id: 205, title: 'Silicone Case', type: 'Silicone', price: 169, model: 'iPhone 14', colors: ['#0077b6', '#9d4edd', '#f77f00'] },
  { id: 206, title: 'Clear Case', type: 'Clear', price: 119, model: 'iPhone 14', colors: ['#e0e0e0'] },
  { id: 207, title: 'Leather Case', type: 'Leather', price: 329, model: 'iPhone 14', colors: ['#a0785a', '#1a1a1a'] },
  { id: 208, title: 'Shockproof Case', type: 'Shockproof', price: 279, model: 'iPhone 14', colors: ['#1a1a1a', '#6c757d'] },

  // iPhone 13
  { id: 209, title: 'Silicone Case', type: 'Silicone', price: 159, model: 'iPhone 13', colors: ['#2d6a4f', '#ff6f61'] },
  { id: 210, title: 'Clear Case', type: 'Clear', price: 109, model: 'iPhone 13', colors: ['#e0e0e0'] },
  { id: 211, title: 'Shockproof Case', type: 'Shockproof', price: 259, model: 'iPhone 13', colors: ['#6c757d', '#2563eb'] },

  // Samsung S23
  { id: 212, title: 'Silicone Case', type: 'Silicone', price: 149, model: 'Samsung S23', colors: ['#ff6f61', '#2d6a4f', '#1a1a1a'] },
  { id: 213, title: 'Shockproof Case', type: 'Shockproof', price: 269, model: 'Samsung S23', colors: ['#1a1a1a', '#6c757d'] },
  { id: 214, title: 'Clear Case', type: 'Clear', price: 99, model: 'Samsung S23', colors: ['#e0e0e0'] },
  { id: 215, title: 'Leather Case', type: 'Leather', price: 319, model: 'Samsung S23', colors: ['#6f4e37'] },

  // Samsung S22
  { id: 216, title: 'Silicone Case', type: 'Silicone', price: 149, model: 'Samsung S22', colors: ['#2d6a4f', '#9d4edd'] },
  { id: 217, title: 'Leather Case', type: 'Leather', price: 299, model: 'Samsung S22', colors: ['#1a1a1a', '#6f4e37'] },
  { id: 218, title: 'Clear Case', type: 'Clear', price: 99, model: 'Samsung S22', colors: ['#e0e0e0'] },

  // Samsung M14
  { id: 219, title: 'Silicone Case', type: 'Silicone', price: 129, model: 'Samsung M14', colors: ['#0077b6', '#f77f00'] },
  { id: 220, title: 'Shockproof Case', type: 'Shockproof', price: 229, model: 'Samsung M14', colors: ['#6c757d'] },

  // OnePlus 11
  { id: 221, title: 'Silicone Case', type: 'Silicone', price: 159, model: 'OnePlus 11', colors: ['#9d4edd', '#0077b6'] },
  { id: 222, title: 'Shockproof Case', type: 'Shockproof', price: 269, model: 'OnePlus 11', colors: ['#6c757d', '#1a1a1a'] },
  { id: 223, title: 'Clear Case', type: 'Clear', price: 109, model: 'OnePlus 11', colors: ['#e0e0e0'] },

  // OnePlus Nord
  { id: 224, title: 'Silicone Case', type: 'Silicone', price: 139, model: 'OnePlus Nord', colors: ['#ff6f61', '#2d6a4f'] },
  { id: 225, title: 'Clear Case', type: 'Clear', price: 99, model: 'OnePlus Nord', colors: ['#e0e0e0'] },

  // Redmi Note 12
  { id: 226, title: 'Silicone Case', type: 'Silicone', price: 119, model: 'Redmi Note 12', colors: ['#f77f00', '#ff6f61'] },
  { id: 227, title: 'Clear Case', type: 'Clear', price: 89, model: 'Redmi Note 12', colors: ['#e0e0e0'] },
  { id: 228, title: 'Shockproof Case', type: 'Shockproof', price: 219, model: 'Redmi Note 12', colors: ['#6c757d', '#1a1a1a'] },

  // Realme 11
  { id: 229, title: 'Silicone Case', type: 'Silicone', price: 119, model: 'Realme 11', colors: ['#0077b6', '#9d4edd'] },
  { id: 230, title: 'Clear Case', type: 'Clear', price: 89, model: 'Realme 11', colors: ['#e0e0e0'] },

  // Vivo V29
  { id: 231, title: 'Silicone Case', type: 'Silicone', price: 129, model: 'Vivo V29', colors: ['#2d6a4f', '#ff6f61'] },
  { id: 232, title: 'Leather Case', type: 'Leather', price: 289, model: 'Vivo V29', colors: ['#1a1a1a', '#6f4e37'] },

  // Google Pixel 8
  { id: 233, title: 'Silicone Case', type: 'Silicone', price: 169, model: 'Google Pixel 8', colors: ['#0077b6', '#1a1a1a'] },
  { id: 234, title: 'Clear Case', type: 'Clear', price: 119, model: 'Google Pixel 8', colors: ['#e0e0e0'] },
  { id: 235, title: 'Shockproof Case', type: 'Shockproof', price: 279, model: 'Google Pixel 8', colors: ['#6c757d'] }
]