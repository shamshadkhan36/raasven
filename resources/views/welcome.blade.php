<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raasven Premium Fragrances</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        gold: '#A67C52',
                        dark: '#1A1A1A',
                        offwhite: '#F5F3EF',
                        green: '#25D366'
                    },
                    fontFamily: {
                        serif: ['Playfair Display', 'serif'],
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-offwhite text-gray-800">

    <!-- Navbar -->
    <nav class="bg-white py-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div class="flex items-center">
            <h1 class="text-2xl font-serif font-bold tracking-widest text-dark">RAASVEN</h1>
        </div>
        <div class="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" class="text-gold border-b-2 border-gold pb-1">Home</a>
            <a href="#" class="hover:text-gold transition">About Us</a>
            <a href="#" class="hover:text-gold transition">Our Collection</a>
            <a href="#" class="hover:text-gold transition">Private Label</a>
            <a href="#" class="hover:text-gold transition">Export</a>
            <a href="#" class="hover:text-gold transition">Contact Us</a>
        </div>
        <div>
            <a href="#" class="bg-green hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center transition">
                <i class="fab fa-whatsapp mr-2 text-lg"></i> WhatsApp Us
            </a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-dark text-white min-h-[80vh] flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2070&auto=format&fit=crop');">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div class="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-8">
            <div class="flex flex-col justify-center">
                <p class="text-gold text-sm font-semibold tracking-widest mb-2">RAASVEN</p>
                <h2 class="text-5xl md:text-6xl font-serif leading-tight mb-6">The Signature<br>of Your Presence</h2>
                <p class="text-gray-300 text-lg mb-8 max-w-md">Premium Fragrances Crafted for a Lasting Impression.</p>
                
                <div class="flex flex-wrap gap-4">
                    <a href="#" class="bg-gold hover:bg-yellow-700 text-white px-6 py-3 rounded-full text-sm font-medium transition flex items-center">
                        Explore Collection <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    <a href="#" class="border border-white hover:bg-white hover:text-dark text-white px-6 py-3 rounded-full text-sm font-medium transition">
                        Become a Distributor
                    </a>
                    <a href="#" class="bg-green hover:bg-green-600 text-white px-6 py-3 rounded-full text-sm font-medium transition flex items-center">
                        <i class="fab fa-whatsapp mr-2 text-lg"></i> WhatsApp Us
                    </a>
                </div>
            </div>
            <!-- Mockup image placeholder for bottles -->
            <div class="hidden md:flex justify-end items-end">
                <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" alt="Perfume Bottles" class="h-96 object-cover rounded-lg shadow-2xl border-4 border-gold/30">
            </div>
        </div>
    </section>

    <!-- Signature Collection Section -->
    <section class="py-20 px-8 container mx-auto text-center">
        <div class="flex items-center justify-center mb-2">
            <div class="h-px bg-gold w-12 mr-4"></div>
            <h3 class="text-3xl font-serif text-dark">Our Signature Collection</h3>
            <div class="h-px bg-gold w-12 ml-4"></div>
        </div>
        <p class="text-gray-500 mb-12">Four Fragrances. Four Personalities.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <!-- Card 1 -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <div class="bg-gray-50 h-48 rounded flex items-center justify-center mb-4 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=500&auto=format&fit=crop" alt="Wild Edge" class="object-cover h-full w-full">
                </div>
                <p class="text-gold text-xs font-semibold tracking-widest mb-1">RAASVEN</p>
                <h4 class="text-xl font-serif mb-1">Wild Edge</h4>
                <p class="text-xs text-gray-400 mb-3">Fresh | Woody</p>
                <p class="text-sm text-gray-600 mb-4 h-10">A bold and energetic fragrance for the modern man.</p>
                <a href="#" class="text-gold text-sm font-medium flex items-center hover:underline">Explore <i class="fas fa-arrow-right ml-1 text-xs"></i></a>
            </div>
            <!-- Card 2 -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <div class="bg-gray-50 h-48 rounded flex items-center justify-center mb-4 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop" alt="Elan" class="object-cover h-full w-full">
                </div>
                <p class="text-gold text-xs font-semibold tracking-widest mb-1">RAASVEN</p>
                <h4 class="text-xl font-serif mb-1">Élan</h4>
                <p class="text-xs text-gray-400 mb-3">Floral | Woody</p>
                <p class="text-sm text-gray-600 mb-4 h-10">Elegant, sophisticated and timeless.</p>
                <a href="#" class="text-gold text-sm font-medium flex items-center hover:underline">Explore <i class="fas fa-arrow-right ml-1 text-xs"></i></a>
            </div>
            <!-- Card 3 -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <div class="bg-gray-50 h-48 rounded flex items-center justify-center mb-4 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=500&auto=format&fit=crop" alt="Ruby Mist" class="object-cover h-full w-full">
                </div>
                <p class="text-gold text-xs font-semibold tracking-widest mb-1">RAASVEN</p>
                <h4 class="text-xl font-serif mb-1">Ruby Mist</h4>
                <p class="text-xs text-gray-400 mb-3">Floral | Fruity</p>
                <p class="text-sm text-gray-600 mb-4 h-10">A graceful blend of femininity and charm.</p>
                <a href="#" class="text-gold text-sm font-medium flex items-center hover:underline">Explore <i class="fas fa-arrow-right ml-1 text-xs"></i></a>
            </div>
            <!-- Card 4 -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <div class="bg-gray-50 h-48 rounded flex items-center justify-center mb-4 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=500&auto=format&fit=crop" alt="Oud Royale" class="object-cover h-full w-full">
                </div>
                <p class="text-gold text-xs font-semibold tracking-widest mb-1">RAASVEN</p>
                <h4 class="text-xl font-serif mb-1">Oud Royale</h4>
                <p class="text-xs text-gray-400 mb-3">Woody | Amber</p>
                <p class="text-sm text-gray-600 mb-4 h-10">Rich, intense and unforgettable.</p>
                <a href="#" class="text-gold text-sm font-medium flex items-center hover:underline">Explore <i class="fas fa-arrow-right ml-1 text-xs"></i></a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-12 border-y border-gray-200">
        <div class="container mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div class="px-4">
                <i class="fas fa-gem text-gold text-3xl mb-4"></i>
                <h5 class="font-medium text-dark mb-2">Premium Fragrances</h5>
                <p class="text-xs text-gray-500">High-quality, long-lasting fragrances.</p>
            </div>
            <div class="px-4">
                <i class="fas fa-box-open text-gold text-3xl mb-4"></i>
                <h5 class="font-medium text-dark mb-2">Elegant Packaging</h5>
                <p class="text-xs text-gray-500">Designed for premium presentation.</p>
            </div>
            <div class="px-4">
                <i class="fas fa-handshake text-gold text-3xl mb-4"></i>
                <h5 class="font-medium text-dark mb-2">B2B Friendly</h5>
                <p class="text-xs text-gray-500">Wholesale & distributor enquiries welcome.</p>
            </div>
            <div class="px-4">
                <i class="fas fa-globe text-gold text-3xl mb-4"></i>
                <h5 class="font-medium text-dark mb-2">Global Focus</h5>
                <p class="text-xs text-gray-500">Built with international markets in mind.</p>
            </div>
        </div>
    </section>

    <!-- Grid Sections (Export & About / Private Label) -->
    <section class="grid md:grid-cols-2">
        <!-- Export Markets -->
        <div class="bg-dark text-white p-12 lg:p-20 relative bg-cover bg-center" style="background-image: linear-gradient(rgba(26,26,26,0.8), rgba(26,26,26,0.8)), url('https://images.unsplash.com/photo-1494412519320-aa313fc17d01?q=80&w=2070&auto=format&fit=crop');">
            <h3 class="text-3xl font-serif mb-4">Taking Indian Fragrances<br>to Global Markets</h3>
            <p class="text-gray-300 text-sm mb-8 max-w-sm">Kalpana Global Eximm connects premium Indian fragrances with customers and business partners across the world.</p>
            <a href="#" class="inline-block bg-gold hover:bg-yellow-700 text-white px-6 py-3 rounded text-sm font-medium transition mb-12">
                Explore Export Markets <i class="fas fa-arrow-right ml-2"></i>
            </a>
            
            <div class="flex space-x-6 text-xs text-center border-t border-gray-700 pt-6">
                <div><div class="w-6 h-6 rounded-full bg-gray-400 mx-auto mb-1 flex items-center justify-center text-[10px]">🇦🇪</div> UAE</div>
                <div><div class="w-6 h-6 rounded-full bg-gray-400 mx-auto mb-1 flex items-center justify-center text-[10px]">🇸🇦</div> Saudi Arabia</div>
                <div><div class="w-6 h-6 rounded-full bg-gray-400 mx-auto mb-1 flex items-center justify-center text-[10px]">🇴🇲</div> Oman</div>
                <div><div class="w-6 h-6 rounded-full bg-gray-400 mx-auto mb-1 flex items-center justify-center text-[10px]">🌍</div> Africa</div>
                <div><div class="w-6 h-6 rounded-full bg-gray-700 mx-auto mb-1 flex items-center justify-center text-white"><i class="fas fa-plus"></i></div> & More</div>
            </div>
        </div>
        
        <!-- About Us -->
        <div class="bg-offwhite p-12 lg:p-20 flex flex-col justify-center border-b md:border-b-0 border-gray-200">
            <p class="text-gold text-xs font-semibold tracking-widest mb-2 flex items-center"><span class="w-6 h-px bg-gold inline-block mr-2"></span> About Us</p>
            <h3 class="text-3xl font-serif text-dark mb-6">Kalpana Global Eximm</h3>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">
                Kalpana Global Eximm is an India-based import-export and merchant trading company focused on premium fragrances and selected lifestyle products. We aim to connect quality Indian products with customers and business partners across global markets.
            </p>
            <div class="flex space-x-8 mb-8 border-t border-gray-200 pt-6">
                <div>
                    <h6 class="font-medium text-dark text-sm">Quality</h6>
                    <p class="text-xs text-gray-500">Products</p>
                </div>
                <div>
                    <h6 class="font-medium text-dark text-sm">Global</h6>
                    <p class="text-xs text-gray-500">Partnerships</p>
                </div>
                <div>
                    <h6 class="font-medium text-dark text-sm">Trusted</h6>
                    <p class="text-xs text-gray-500">Trading Partner</p>
                </div>
            </div>
            <div>
                <a href="#" class="inline-block border border-gold text-gold hover:bg-gold hover:text-white px-6 py-2 rounded-full text-sm font-medium transition">
                    Know More <i class="fas fa-arrow-right ml-2 text-xs"></i>
                </a>
            </div>
        </div>

        <!-- Private Label Visual (Placeholder image area) -->
        <div class="bg-white p-12 lg:p-20 flex items-center justify-center border-t md:border-t-0 md:border-r border-gray-200 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" alt="Private Label Boxes" class="max-w-full h-auto rounded shadow-lg z-10 relative">
            <!-- Decorative background elements -->
            <div class="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48cGF0aCBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik00MCAwbDRwIDE2bDE2IDQtMTYgNGwtNCAxNmwtNC0xNmwtMTYtNGwxNi00eiIvPjwvc3ZnPg==')]"></div>
        </div>

        <!-- Private Label Text -->
        <div class="bg-white p-12 lg:p-20 flex flex-col justify-center border-t border-gray-200 md:border-t-0">
            <p class="text-gold text-xs font-semibold tracking-widest mb-2 flex items-center"><span class="w-6 h-px bg-gold inline-block mr-2"></span> Private Label</p>
            <h3 class="text-3xl font-serif text-dark mb-4">Build Your Own Fragrance Brand</h3>
            <p class="text-gray-600 text-sm mb-8">We offer end-to-end private label solutions for your fragrance brand.</p>
            
            <div class="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-700 mb-8">
                <div class="flex items-center"><i class="fas fa-check-circle text-gold mr-2 text-xs"></i> Custom Fragrance</div>
                <div class="flex items-center"><i class="fas fa-check-circle text-gold mr-2 text-xs"></i> Bulk Orders</div>
                <div class="flex items-center"><i class="fas fa-check-circle text-gold mr-2 text-xs"></i> Custom Packaging</div>
                <div class="flex items-center"><i class="fas fa-check-circle text-gold mr-2 text-xs"></i> Export-ready Solutions</div>
                <div class="flex items-center"><i class="fas fa-check-circle text-gold mr-2 text-xs"></i> Custom Branding</div>
            </div>
            
            <div>
                <a href="#" class="inline-block bg-gold hover:bg-yellow-700 text-white px-6 py-3 rounded-full text-sm font-medium transition">
                    Get a Quote <i class="fas fa-arrow-right ml-2 text-xs"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#111111] text-gray-400 py-16 px-8 text-sm border-t-4 border-gold">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand -->
            <div>
                <h2 class="text-2xl font-serif text-white tracking-widest mb-2">RAASVEN</h2>
                <p class="text-xs">A Brand by Kalpana Global Eximm</p>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h6 class="text-white font-medium mb-4">Quick Links</h6>
                <ul class="space-y-2">
                    <li><a href="#" class="hover:text-gold transition">Home</a></li>
                    <li><a href="#" class="hover:text-gold transition">About Us</a></li>
                    <li><a href="#" class="hover:text-gold transition">Our Collection</a></li>
                    <li><a href="#" class="hover:text-gold transition">Private Label</a></li>
                    <li><a href="#" class="hover:text-gold transition">Export</a></li>
                    <li><a href="#" class="hover:text-gold transition">Contact Us</a></li>
                </ul>
            </div>
            
            <!-- Stay Connected -->
            <div>
                <h6 class="text-white font-medium mb-4">Stay Connected</h6>
                <div class="flex space-x-4 mb-4">
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-instagram text-lg"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-facebook-f text-lg"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-linkedin-in text-lg"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-youtube text-lg"></i></a>
                </div>
                <div class="space-y-2 text-xs">
                    <p><i class="fab fa-whatsapp text-green mr-2"></i> WhatsApp: +91 98765 43210</p>
                    <p><i class="far fa-envelope mr-2"></i> Email: info@kalpanaglobaleximm.com</p>
                </div>
            </div>
            
            <!-- Global Presence -->
            <div>
                <h6 class="text-white font-medium mb-4">Our Global Presence</h6>
                <p class="leading-relaxed">UAE | Saudi Arabia | Oman<br>Africa | Mauritius | Kenya<br>Netherlands | & More</p>
            </div>
        </div>
        
        <!-- Copyright -->
        <div class="container mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2025 Kalpana Global Eximm. All Rights Reserved.</p>
            <div class="space-x-4 mt-4 md:mt-0">
                <a href="#" class="hover:text-white transition">Privacy Policy</a>
                <span>|</span>
                <a href="#" class="hover:text-white transition">Terms & Conditions</a>
            </div>
        </div>
    </footer>

</body>
</html>
