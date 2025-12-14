import { Restaurant, Reservation } from '../types';

export const mockRestaurants: Restaurant[] = [
  // --- JAKARTA PUSAT ---
  {
    id: '1',
    name: 'Seribu Rasa Menteng',
    cuisine: 'Indonesian',
    rating: 4.8,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NjU1MTQzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. H. Agus Salim No. 128, Menteng, Jakarta Pusat',
    hours: 'Sen-Min: 11:00 - 22:00',
    description: 'Menyajikan kekayaan kuliner Indonesia dan Asia Tenggara dalam suasana elegan namun hangat. Nikmati hidangan laut segar dan bumbu otentik.',
    gallery: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NjU1MTQzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2NTYyNzY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1704743103071-42f0d84d8af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjU1MjQwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    menuHighlights: [
      {
        id: 'm1',
        name: 'Gulai Kepala Ikan',
        description: 'Kepala ikan kakap dimasak dalam kuah gulai yang kaya rempah',
        price: 180000,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NjU1MTQzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Utama',
      },
      {
        id: 'm2',
        name: 'Es Campur',
        description: 'Hidangan penutup segar dengan aneka buah dan agar-agar',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1704743103071-42f0d84d8af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NjU1MjQwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Penutup',
      },
    ],
    tables: [
      { id: 't1', number: 1, seats: 2, x: 50, y: 50, status: 'available', shape: 'round' },
      { id: 't2', number: 2, seats: 2, x: 200, y: 50, status: 'occupied', shape: 'round' },
      { id: 't3', number: 3, seats: 4, x: 350, y: 50, status: 'available', shape: 'square' },
      { id: 't4', number: 4, seats: 4, x: 50, y: 200, status: 'reserved', shape: 'square' },
      { id: 't5', number: 5, seats: 6, x: 200, y: 200, status: 'available', shape: 'rectangle' },
      { id: 't6', number: 6, seats: 2, x: 350, y: 200, status: 'cleaning', shape: 'round' },
      { id: 't7', number: 7, seats: 4, x: 50, y: 350, status: 'available', shape: 'square' },
      { id: 't8', number: 8, seats: 8, x: 200, y: 350, status: 'available', shape: 'rectangle' },
    ],
  },
  {
    id: '2',
    name: 'Sushi Tei Senayan',
    cuisine: 'Japanese',
    rating: 4.9,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1663334038419-71e6f82e333f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY1NTk2MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Plaza Senayan, Lt. 4, Jakarta Pusat',
    hours: 'Sel-Min: 11:00 - 22:00',
    description: 'Menyajikan sushi otentik dan kreasi modern dengan bahan-bahan segar berkualitas tinggi dalam suasana khas Jepang.',
    gallery: [
      'https://images.unsplash.com/photo-1663334038419-71e6f82e333f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY1NTk2MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2NTYyNzY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    menuHighlights: [
      {
        id: 'm3',
        name: 'Sushi Platter Spesial',
        description: '12 pilihan sushi dan sashimi premium pilihan chef',
        price: 350000,
        image: 'https://images.unsplash.com/photo-1663334038419-71e6f82e333f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY1NTk2MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Sushi',
      },
    ],
    tables: [
      { id: 't9', number: 1, seats: 2, x: 100, y: 100, status: 'available', shape: 'round' },
      { id: 't10', number: 2, seats: 4, x: 300, y: 100, status: 'available', shape: 'square' },
    ],
  },
  {
    id: '3',
    name: 'Skye Bar & Restaurant',
    cuisine: 'International',
    rating: 4.7,
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY1NjI3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Menara BCA Lt. 56, Jl. M.H. Thamrin, Jakarta Pusat',
    hours: 'Sen-Min: 16:00 - 01:00',
    description: 'Nikmati pemandangan kota Jakarta dari ketinggian sambil menyantap steak premium dan koktail eksklusif.',
    gallery: [
      'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY1NjI3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    menuHighlights: [
      {
        id: 'm4',
        name: 'Wagyu Ribeye',
        description: '200g Wagyu A5 Jepang, dimasak sempurna',
        price: 1500000,
        image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY1NjI3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Utama',
      },
    ],
    tables: [
      { id: 't11', number: 1, seats: 4, x: 150, y: 150, status: 'available', shape: 'square' },
    ],
  },
  
  // --- JAKARTA SELATAN ---
  {
    id: '4',
    name: 'Sofia at The Gunawarman',
    cuisine: 'European',
    rating: 4.8,
    priceRange: '$$$$',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjU1NzY1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Gunawarman No. 3, Kebayoran Baru, Jakarta Selatan',
    hours: 'Sen-Min: 06:00 - 23:00',
    description: 'Restoran mewah bergaya klasik Eropa dengan arsitektur memukau. Pilihan tepat untuk sarapan bisnis, makan siang santai, atau makan malam romantis.',
    gallery: [
      'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2',
    ],
    menuHighlights: [
      {
        id: 'm5',
        name: 'Truffle Pasta',
        description: 'Pasta segar buatan tangan dengan saus krim jamur truffle hitam',
        price: 220000,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRydWZmbGV8ZW58MXx8fHwxNzY1NTc2NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'Utama',
      },
    ],
    tables: [
      { id: 't4_1', number: 1, seats: 2, x: 50, y: 50, status: 'available', shape: 'round' },
      { id: 't4_2', number: 2, seats: 4, x: 150, y: 50, status: 'available', shape: 'square' },
      { id: 't4_3', number: 3, seats: 6, x: 250, y: 150, status: 'reserved', shape: 'rectangle' },
    ],
  },
  {
    id: '5',
    name: 'Plataran Dharmawangsa',
    cuisine: 'Indonesian',
    rating: 4.9,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU1NzY2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan',
    hours: 'Sen-Min: 11:00 - 22:00',
    description: 'Suasana kerajaan Jawa otentik di tengah kota Jakarta. Menyajikan hidangan Indonesia premium yang memanjakan lidah.',
    gallery: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641'],
    menuHighlights: [
      {
        id: 'm6',
        name: 'Dendeng Batokok',
        description: 'Daging sapi renyah dengan sambal hijau khas Padang',
        price: 165000,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
        category: 'Utama',
      }
    ],
    tables: [
      { id: 't5_1', number: 1, seats: 4, x: 50, y: 50, status: 'available', shape: 'round' },
      { id: 't5_2', number: 2, seats: 8, x: 150, y: 50, status: 'available', shape: 'rectangle' },
    ],
  },

  // --- JAKARTA BARAT ---
  {
    id: '6',
    name: 'Central Restaurant Tomang',
    cuisine: 'Chinese',
    rating: 4.6,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU1NzY3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Tomang Raya No. 29, Grogol Petamburan, Jakarta Barat',
    hours: 'Sen-Min: 10:00 - 22:00',
    description: 'Restoran keluarga legendaris dengan hidangan Chinese Food klasik yang tak lekang oleh waktu.',
    gallery: ['https://images.unsplash.com/photo-1552566626-52f8b828add9'],
    menuHighlights: [
       {
        id: 'm7',
        name: 'Bebek Peking',
        description: 'Bebek panggang dengan kulit renyah disajikan dengan saus hoisin',
        price: 280000,
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        category: 'Utama',
      }
    ],
    tables: [
      { id: 't6_1', number: 1, seats: 6, x: 50, y: 50, status: 'available', shape: 'round' },
      { id: 't6_2', number: 2, seats: 10, x: 150, y: 50, status: 'occupied', shape: 'round' },
    ],
  },
  
  // --- JAKARTA UTARA ---
  {
    id: '7',
    name: 'Bandar Djakarta Ancol',
    cuisine: 'Seafood',
    rating: 4.7,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1615141982880-1313d41813f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU1NzY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Pintu Timur Taman Impian Jaya Ancol, Jakarta Utara',
    hours: 'Sen-Min: 11:00 - 23:00',
    description: 'Nikmati hidangan laut segar dengan pemandangan laut Jakarta yang menenangkan. Pilih sendiri ikan, kepiting, dan udang hidup dari pasar ikan kami.',
    gallery: ['https://images.unsplash.com/photo-1615141982880-1313d41813f1'],
    menuHighlights: [
       {
        id: 'm8',
        name: 'Kepiting Saus Padang',
        description: 'Kepiting bakau besar dimasak dengan saus padang pedas manis',
        price: 320000,
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
        category: 'Utama',
      }
    ],
    tables: [
      { id: 't7_1', number: 1, seats: 4, x: 50, y: 50, status: 'available', shape: 'square' },
      { id: 't7_2', number: 2, seats: 8, x: 150, y: 50, status: 'available', shape: 'rectangle' },
    ],
  },

  // --- BOGOR ---
  {
    id: '8',
    name: 'Lemongrass Resto',
    cuisine: 'Asian Fusion',
    rating: 4.8,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZ2FyZGVufGVufDF8fHx8MTc2NTU3Njg4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Pajajaran No. 21, Bogor Utara, Bogor',
    hours: 'Sen-Min: 10:00 - 22:00',
    description: 'Konsep restoran modern tropis dengan taman yang asri. Menyajikan hidangan kopitiam modern dan dimsum favorit.',
    gallery: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'],
    menuHighlights: [
       {
        id: 'm9',
        name: 'Nasi Goreng Yang Chow',
        description: 'Nasi goreng klasik tanpa kecap dengan potongan ayam dan udang',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
        category: 'Utama',
      }
    ],
    tables: [
      { id: 't8_1', number: 1, seats: 2, x: 50, y: 50, status: 'available', shape: 'round' },
      { id: 't8_2', number: 2, seats: 4, x: 150, y: 50, status: 'available', shape: 'square' },
    ],
  },
  {
    id: '9',
    name: 'The Lake House',
    cuisine: 'Western',
    rating: 4.7,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NTU3Njk1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Taman Safari No. 101, Cisarua, Bogor',
    hours: 'Sen-Min: 11:00 - 20:00',
    description: 'Restoran unik di tengah hutan pinus dengan area makan outdoor yang dikelilingi kolam air jernih.',
    gallery: ['https://images.unsplash.com/photo-1587899897387-091ebd01a6b2'],
    menuHighlights: [],
    tables: [
       { id: 't9_1', number: 1, seats: 4, x: 50, y: 50, status: 'available', shape: 'square' },
    ],
  },

  // --- DEPOK ---
  {
    id: '10',
    name: 'Walking Drums Margonda',
    cuisine: 'Italian & Cafe',
    rating: 4.5,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwmodernfGVufDF8fHx8MTc2NTU3NzAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Margonda Raya No. 426, Depok',
    hours: 'Sen-Min: 08:00 - 23:00',
    description: 'Kafe dan restoran luas dengan desain industrial modern. Tempat nongkrong favorit di Depok dengan kopi artisan dan pizza.',
    gallery: ['https://images.unsplash.com/photo-1559339352-11d035aa65de'],
    menuHighlights: [
      {
        id: 'm10',
        name: 'Pepperoni Pizza',
        description: 'Pizza tipis renyah dengan topping pepperoni sapi berlimpah',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
        category: 'Utama',
      }
    ],
    tables: [
       { id: 't10_1', number: 1, seats: 2, x: 50, y: 50, status: 'available', shape: 'round' },
       { id: 't10_2', number: 2, seats: 4, x: 150, y: 50, status: 'available', shape: 'square' },
    ],
  },
  {
    id: '11',
    name: 'Mang Kabayan Depok',
    cuisine: 'Sundanese',
    rating: 4.6,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1626804475297-411d635e7c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5kYW5lc2UlMjBmb29kfGVufDF8fHx8MTc2NTU3NzA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Margonda Raya No. 488, Depok',
    hours: 'Sen-Min: 10:00 - 21:00',
    description: 'Restoran keluarga dengan menu khas Sunda yang otentik. Nasi timbel komplit dan gurame goreng terbang menjadi andalan.',
    gallery: ['https://images.unsplash.com/photo-1626804475297-411d635e7c95'],
    menuHighlights: [],
    tables: [
       { id: 't11_1', number: 1, seats: 6, x: 50, y: 50, status: 'available', shape: 'rectangle' },
    ],
  },

  // --- TANGERANG ---
  {
    id: '12',
    name: 'Kayu Kayu Restaurant',
    cuisine: 'Indonesian',
    rating: 4.7,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NTU3NzE1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Jalur Sutera No. 28A, Alam Sutera, Tangerang',
    hours: 'Sen-Min: 10:00 - 22:00',
    description: 'Restoran berkonsep ramah lingkungan dengan interior didominasi kayu daur ulang. Menyajikan masakan Indonesia berkelas.',
    gallery: ['https://images.unsplash.com/photo-1587899897387-091ebd01a6b2'],
    menuHighlights: [
       {
        id: 'm12',
        name: 'Iga Bakar Madu',
        description: 'Iga sapi panggang empuk dengan olesan madu hutan',
        price: 135000,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
        category: 'Utama',
      }
    ],
    tables: [
       { id: 't12_1', number: 1, seats: 4, x: 50, y: 50, status: 'available', shape: 'square' },
    ],
  },

  // --- TANGERANG SELATAN ---
  {
    id: '13',
    name: 'Talaga Sampireun Bintaro',
    cuisine: 'Sundanese',
    rating: 4.8,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1596627581134-297eb04a377d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU1NzcyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Kawasan Niaga Bintaro Jaya Sektor 7, Tangerang Selatan',
    hours: 'Sen-Min: 10:00 - 22:00',
    description: 'Makan di saung-saung di atas danau buatan yang tenang. Pengalaman makan lesehan yang nyaman dan menenangkan.',
    gallery: ['https://images.unsplash.com/photo-1596627581134-297eb04a377d'],
    menuHighlights: [],
    tables: [
       { id: 't13_1', number: 1, seats: 6, x: 50, y: 50, status: 'available', shape: 'rectangle' },
    ],
  },
  
  // --- BEKASI ---
  {
    id: '14',
    name: 'Double U Steak',
    cuisine: 'Steakhouse',
    rating: 4.6,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlfGVufDF8fHx8MTc2NTU3NzI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Jl. Wijaya Kusuma No. 183, Jaka Setia, Bekasi Selatan',
    hours: 'Sen-Min: 11:00 - 22:00',
    description: 'Steakhouse premium milik Chef Widhi. Menawarkan berbagai potongan daging sapi berkualitas dengan saus spesial.',
    gallery: ['https://images.unsplash.com/photo-1600891964092-4316c288032e'],
    menuHighlights: [
       {
        id: 'm14',
        name: 'Australian Rib Eye 200g',
        description: 'Daging sapi Australia juicy disajikan dengan kentang dan sayuran',
        price: 195000,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
        category: 'Utama',
      }
    ],
    tables: [
       { id: 't14_1', number: 1, seats: 2, x: 50, y: 50, status: 'available', shape: 'round' },
       { id: 't14_2', number: 2, seats: 4, x: 150, y: 50, status: 'available', shape: 'square' },
    ],
  },
  {
    id: '15',
    name: 'Tsambal Rujak',
    cuisine: 'Indonesian',
    rating: 4.5,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NjU1NzczNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: 'Ruko Grand Galaxy City, Bekasi Selatan',
    hours: 'Sen-Min: 10:00 - 21:00',
    description: 'Spesialis penyetan dan sambal rujak yang segar. Pilihan tepat untuk makan siang pedas dan nikmat.',
    gallery: ['https://images.unsplash.com/photo-1604382354936-07c5d9983bd3'],
    menuHighlights: [],
    tables: [
       { id: 't15_1', number: 1, seats: 4, x: 50, y: 50, status: 'available', shape: 'square' },
    ],
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'r_past_1',
    restaurantId: '2',
    customerName: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '081234567890',
    date: '2025-11-20',
    time: '19:00',
    guests: 2,
    tableId: 't9',
    status: 'completed',
    deposit: 300000,
  }
];

export const analyticsData = {
  dailyRevenue: [
    { date: 'Sen', revenue: 4500000 },
    { date: 'Sel', revenue: 3800000 },
    { date: 'Rab', revenue: 5200000 },
    { date: 'Kam', revenue: 6100000 },
    { date: 'Jum', revenue: 8900000 },
    { date: 'Sab', revenue: 9500000 },
    { date: 'Min', revenue: 7200000 },
  ],
  peakHours: [
    { hour: '11:00', bookings: 5 },
    { hour: '12:00', bookings: 12 },
    { hour: '13:00', bookings: 15 },
    { hour: '18:00', bookings: 20 },
    { hour: '19:00', bookings: 28 },
    { hour: '20:00', bookings: 25 },
    { hour: '21:00', bookings: 18 },
  ],
};
