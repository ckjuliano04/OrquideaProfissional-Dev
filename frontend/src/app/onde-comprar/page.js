'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/services/api';

export default function OndeComprarPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState('RS');
  const [searchQuery, setSearchQuery] = useState('');

  const allowedStates = [
    { uf: 'RS', name: 'Rio Grande do Sul' },
    { uf: 'SC', name: 'Santa Catarina' },
    { uf: 'PR', name: 'Paraná' },
    { uf: 'SP', name: 'São Paulo' }
  ];

  useEffect(() => {
    fetchAPI('/content/stores/')
      .then(data => {
        setStores(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar lojas:", err);
        setLoading(false);
      });
  }, []);

  const filteredStores = stores.filter(store => {
    const matchState = store.state === activeState;
    const matchSearch = store.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       (store.city && store.city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchState && matchSearch;
  });

  const getMapLink = (store) => {
    if (store.latitude && store.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;
    }
    if (store.address_text) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address_text)}`;
    }
    return null;
  };

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    return `https://api.whatsapp.com/send?phone=${finalPhone}`;
  };

  const formatPhone = (phone) => {
    if (!phone) return 'Sem telefone';
    const clean = phone.replace(/\D/g, '');
    if (clean.length === 11) {
      return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
    } else if (clean.length === 10) {
      return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
    }
    return phone;
  };

  return (
    <div className="flex-grow flex flex-col bg-orquidea-cream/20">
      <div className="bg-orquidea-green text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Onde <span className="text-orquidea-cream">Comprar</span></h1>
          <p className="text-orquidea-cream/70 text-lg max-w-2xl font-medium">Encontre nossos fornecedores e vendedores autorizados por região.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Filtros e Busca */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          {/* Abas de Estados */}
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            {allowedStates.map(state => (
              <button
                key={state.uf}
                onClick={() => setActiveState(state.uf)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeState === state.uf ? 'bg-orquidea-green text-white shadow-lg shadow-orquidea-green/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {state.uf} - {state.name}
              </button>
            ))}
          </div>

          {/* Busca */}
          <div className="w-full lg:w-96 relative">
            <input 
              type="text" 
              placeholder="Buscar por nome ou cidade..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orquidea-green focus:border-transparent shadow-sm"
            />
            <svg className="w-6 h-6 text-slate-300 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white h-64 rounded-3xl animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum resultado para {activeState}</h3>
             <p className="text-slate-500">Tente ajustar sua busca ou selecionar outro estado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map(store => {
              const mapLink = getMapLink(store);
              const waLink = getWhatsAppLink(store.contact_info);
              
              return (
                <div key={store.id} className="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_25px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
                  <span className="text-orquidea-green font-bold text-sm mb-1">{store.city}</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight">{store.title}</h3>
                  
                  <div className="space-y-2 mb-8 text-slate-500 text-sm font-medium">
                    <p className="uppercase tracking-wide">{store.address_text || 'Consultar endereço'}</p>
                    <p>{formatPhone(store.contact_info)}</p>
                    <p className="lowercase">{store.email || 'sem@email.com.br'}</p>
                  </div>

                  <div className="flex flex-col w-full gap-3">
                    {mapLink && (
                      <a 
                        href={mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-orquidea-green hover:bg-orquidea-tech text-white px-6 py-4 rounded-full font-bold shadow-lg shadow-orquidea-green/20 transition-all hover:-translate-y-1 w-full"
                      >
                        + VER MAPA
                        <div className="w-6 h-6 bg-orquidea-tech/50 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </a>
                    )}
                    
                    {waLink && (
                      <a 
                        href={waLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full font-bold shadow-lg shadow-green-200 transition-all hover:-translate-y-1 w-full"
                      >
                        WHATSAPP
                        <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
