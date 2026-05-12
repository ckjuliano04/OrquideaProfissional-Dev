'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/services/api';
import { normalizeProductList, normalizeCategories } from '@/services/normalizers';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ProductSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { Search, Filter, ChevronRight, PackageSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function CatalogoPage() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({ id: 'all', type: 'all', name: 'Todos' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchAPI('/products/categories/'),
      fetchAPI('/products/')
    ])
      .then(([catsData, prodsData]) => {
        setCategories(normalizeCategories(catsData));
        setProducts(normalizeProductList(prodsData));
      })
      .catch(err => console.error("Erro ao carregar catálogo:", err))
      .finally(() => setLoading(false));
  }, []);

  // Reset scroll on filter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory, searchQuery]);

  const mainDivisions = categories
    .filter(c => !c.parent)
    .sort((a, b) => a.name.localeCompare(b.name));
    
  const subcategories = categories
    .filter(c => c.parent)
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredProducts = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.short_description && p.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (activeCategory.type === 'all') return matchSearch;
      
      if (activeCategory.type === 'division') {
        const childCatIds = subcategories.filter(s => s.parent === activeCategory.id).map(s => s.id);
        return (childCatIds.includes(p.category) || p.category === activeCategory.id) && matchSearch;
      }
      
      if (activeCategory.type === 'subcategory') {
        return p.category === activeCategory.id && matchSearch;
      }
      
      return matchSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const FilterContent = () => (
    <div className="flex flex-col gap-2">
      <motion.button 
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setActiveCategory({ id: 'all', type: 'all', name: 'Todos' }); setDrawerOpen(false); }}
        className={cn(
          "text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
          activeCategory.type === 'all' 
            ? "bg-orquidea-green text-white shadow-lg shadow-orquidea-green/20" 
            : "text-slate-600 hover:bg-slate-50"
        )}
      >
        Todos os Produtos
      </motion.button>

      {mainDivisions.map(division => (
        <div key={division.id} className="space-y-1">
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setActiveCategory({ id: division.id, type: 'division', name: division.name }); setDrawerOpen(false); }}
            className={cn(
              "w-full text-left px-4 py-3 rounded-xl text-sm font-black transition-all border-l-4",
              activeCategory.id === division.id 
                ? "bg-orquidea-cream text-orquidea-green border-orquidea-green" 
                : "text-slate-800 border-transparent hover:bg-slate-50"
            )}
          >
            {division.name}
          </motion.button>
          
          <div className="pl-4 flex flex-col gap-1 border-l border-slate-100 ml-4 mt-1">
            {subcategories.filter(sub => sub.parent === division.id).map(sub => (
              <motion.button 
                key={sub.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setActiveCategory({ id: sub.id, type: 'subcategory', name: sub.name }); setDrawerOpen(false); }}
                className={cn(
                  "text-left px-4 py-2 rounded-lg text-[13px] font-bold transition-all",
                  activeCategory.id === sub.id 
                    ? "text-orquidea-green bg-orquidea-green/5" 
                    : "text-slate-500 hover:text-orquidea-green hover:bg-slate-50"
                )}
              >
                {sub.name}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-28">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-2">Categorias</h3>
            <FilterContent />
          </div>
        </aside>

        <main className="flex-grow">
          {/* Header & Mobile Toolbar */}
          <div className="mb-10 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">
                  <span className="hover:text-orquidea-green cursor-pointer">Catálogo</span>
                  <ChevronRight size={12} className="text-slate-300" />
                  <span className="text-orquidea-green">{activeCategory.name}</span>
                </nav>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                  {activeCategory.name}
                </h2>
              </motion.div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button 
                  variant="secondary" 
                  className="md:hidden flex-1 rounded-2xl border border-slate-200"
                  onClick={() => setDrawerOpen(true)}
                >
                  <Filter size={18} className="mr-2" />
                  Filtros
                </Button>
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="O que você procura?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orquidea-green/20 focus:border-orquidea-green shadow-sm text-sm font-medium transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[3rem] border border-slate-100 p-20 text-center shadow-sm flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <PackageSearch size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Tente ajustar seus filtros ou mude o termo de busca.</p>
                  <Button variant="ghost" className="mt-8" onClick={() => { setActiveCategory({ id: 'all', type: 'all', name: 'Todos' }); setSearchQuery(''); }}>
                    Limpar tudo
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  key={activeCategory.id + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.5 }}
                    >
                      <Card className="group overflow-hidden flex flex-col border-none bg-white shadow-md hover:shadow-2xl h-full">
                        <div className="h-64 bg-orquidea-cream/50 flex items-center justify-center relative p-8 group-hover:bg-orquidea-cream transition-colors duration-500">
                          {product.image_url ? (
                            <Image 
                              src={product.image_url} 
                              alt={product.name} 
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" 
                            />
                          ) : (
                            <PackageSearch size={48} className="text-slate-200" />
                          )}
                          <Badge className="absolute top-6 left-6" variant="secondary">
                            {product.category_name}
                          </Badge>
                        </div>
                        
                        <CardHeader className="flex-grow">
                          <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-orquidea-green transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed font-medium">
                            {product.short_description || 'Produto desenvolvido com alta tecnologia para performance profissional superior.'}
                          </p>
                        </CardHeader>
                        
                        <div className="px-8 pb-8">
                          {isAuthenticated ? (
                            <Link href={`/catalogo/${product.slug}`} className="block">
                              <Button className="w-full group/btn" size="lg">
                                Ficha Técnica
                                <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          ) : (
                            <Badge variant="outline" className="w-full justify-center py-3 border-dashed opacity-60">
                              Login necessário para detalhes
                            </Badge>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Filtrar Produtos">
        <FilterContent />
      </Drawer>
    </div>
  );
}

