'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, Logout01Icon, ShoppingCart01Icon, ArrowRight01Icon, PackageIcon } from 'hugeicons-react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function CuentaPage() {
  const { user, token, setAuth, logout, updateUser } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setEditFirstName(user.first_name || '');
      setEditLastName(user.last_name || '');
      setEditPhone(user.phone || '');
      if (user.address && typeof user.address === 'object') {
        setEditAddress(user.address.address || '');
        setEditCity(user.address.city || '');
      } else if (typeof user.address === 'string') {
        setEditAddress(user.address);
      }
    }
  }, [user, isEditingProfile]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/customer/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email, password } 
      : { email, password, first_name: firstName, last_name: lastName };

    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('El servidor no respondió correctamente.');
      }
      
      if (!res.ok) {
        throw new Error(data?.error || 'Error de autenticación');
      }

      setAuth(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsUpdating(true);
    
    const payload = {
      first_name: editFirstName,
      last_name: editLastName,
      phone: editPhone,
      address: {
        address: editAddress,
        city: editCity,
      }
    };

    try {
      const res = await fetch('http://localhost:3001/api/auth/me', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Error al actualizar perfil');
      const updatedUser = await res.json();
      updateUser(updatedUser);
      setIsEditingProfile(false);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-zinc-400 pt-32 pb-20 px-6 flex justify-center items-center relative overflow-hidden">
        {/* Orbes de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff66]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-[#0a0a0a]/80 border border-white/10 p-10 rounded-2xl backdrop-blur-xl shadow-2xl relative z-10"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              {isLogin ? 'Acceso' : 'Registro'}
            </h1>
            <p className="text-zinc-500 text-sm mt-2 font-mono tracking-widest uppercase">
              {isLogin ? 'Portal de Clientes' : 'Crea tu cuenta B2B'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono p-3 rounded text-center uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within:text-[#00ff66] transition-colors">Nombre</label>
                    <input required value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-3 text-white outline-none focus:border-[#00ff66] focus:bg-white/10 transition-all font-mono text-sm" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within:text-[#00ff66] transition-colors">Apellido</label>
                    <input required value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-3 text-white outline-none focus:border-[#00ff66] focus:bg-white/10 transition-all font-mono text-sm" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within:text-[#00ff66] transition-colors">Email</label>
              <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-white/5 border-b-2 border-white/10 p-3 text-white outline-none focus:border-[#00ff66] focus:bg-white/10 transition-all font-mono text-sm" />
            </div>
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 group-focus-within:text-[#00ff66] transition-colors">Contraseña</label>
              <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full bg-white/5 border-b-2 border-white/10 p-3 text-white outline-none focus:border-[#00ff66] focus:bg-white/10 transition-all font-mono text-sm" />
            </div>
            
            <button type="submit" disabled={loading} className="w-full mt-8 bg-[#00ff66] text-black font-black uppercase tracking-widest py-4 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex justify-center items-center gap-2">
              {loading ? 'Procesando...' : (isLogin ? 'Ingresar' : 'Registrarse')}
              {!loading && <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Fondo Ambient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00ff66]/5 to-transparent pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
              Panel<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ff66]">Cliente</span>
            </h1>
            <p className="mt-6 text-xl font-mono text-zinc-500 uppercase tracking-widest">
              Bienvenido, <span className="text-[#00ff66]">{user.first_name || user.email}</span>
            </p>
          </div>
          <button onClick={logout} className="group flex items-center gap-3 border border-white/10 px-6 py-4 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all">
            <Logout01Icon size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-widest">Cerrar Sesión</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna Izquierda: Datos */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff66]/5 rounded-full blur-2xl group-hover:bg-[#00ff66]/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 text-[#00ff66]">
                    <UserIcon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Identidad</h2>
                </div>
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-[#00ff66] transition-colors border border-white/10 hover:border-[#00ff66]/30 px-3 py-1"
                  >
                    Editar
                  </button>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {isEditingProfile ? (
                  <motion.form 
                    key="edit"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleUpdateProfile} 
                    className="space-y-4 font-mono text-sm overflow-hidden relative z-10"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Nombre</label>
                        <input value={editFirstName} onChange={e => setEditFirstName(e.target.value)} required type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-2 text-white outline-none focus:border-[#00ff66] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Apellido</label>
                        <input value={editLastName} onChange={e => setEditLastName(e.target.value)} required type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-2 text-white outline-none focus:border-[#00ff66] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Teléfono</label>
                      <input value={editPhone} onChange={e => setEditPhone(e.target.value)} type="tel" className="w-full bg-white/5 border-b-2 border-white/10 p-2 text-white outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Dirección (Calle y Número)</label>
                      <input value={editAddress} onChange={e => setEditAddress(e.target.value)} type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-2 text-white outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Ciudad</label>
                      <input value={editCity} onChange={e => setEditCity(e.target.value)} type="text" className="w-full bg-white/5 border-b-2 border-white/10 p-2 text-white outline-none focus:border-[#00ff66] transition-colors" />
                    </div>
                    
                    <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
                      <button type="submit" disabled={isUpdating} className="flex-1 bg-[#00ff66] text-black font-black uppercase tracking-widest py-3 text-xs hover:bg-white transition-all disabled:opacity-50">
                        {isUpdating ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button type="button" onClick={() => setIsEditingProfile(false)} disabled={isUpdating} className="flex-1 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest py-3 text-xs hover:bg-white/10 transition-all">
                        Cancelar
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 font-mono text-sm relative z-10"
                  >
                    <div>
                      <span className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Nombre Completo</span>
                      <span className="text-white text-base">{user.first_name} {user.last_name}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Email</span>
                      <span className="text-zinc-300">{user.email}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Teléfono</span>
                      <span className="text-zinc-300">{user.phone || 'No especificado'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Dirección Registrada</span>
                      <span className="text-zinc-300">
                        {user.address 
                          ? (typeof user.address === 'string' 
                              ? user.address 
                              : `${user.address.address || ''} ${user.address.city || ''}`.trim() || 'Datos incompletos') 
                          : 'No especificada'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Estado de Cuenta</span>
                      <span className="inline-flex items-center gap-2 text-[#00ff66] bg-[#00ff66]/10 px-3 py-1 uppercase text-xs tracking-widest border border-[#00ff66]/20">
                        <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-pulse" /> Activo
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Banner Soporte */}
            <div className="bg-gradient-to-br from-[#00ff66]/10 to-transparent border border-[#00ff66]/20 p-8 flex flex-col justify-center items-start">
              <h3 className="text-white font-bold uppercase tracking-wider mb-2">¿Necesitas Ayuda?</h3>
              <p className="text-xs text-zinc-400 font-mono mb-6 leading-relaxed">Contacta a nuestro equipo de soporte B2B para cotizaciones especiales o problemas con tus pedidos.</p>
              <a href="mailto:soporte@glastor.es" className="text-[#00ff66] font-mono text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
                Soporte Técnico <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Pedidos */}
          <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 p-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 border border-white/10 text-[#00ff66]">
                  <ShoppingCart01Icon size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Historial de Pedidos</h2>
              </div>
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{orders.length} Registros</span>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-20 px-6 border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center">
                <PackageIcon size={48} className="text-zinc-600 mb-6" />
                <h3 className="text-white font-bold uppercase tracking-widest mb-2">Sin actividad</h3>
                <p className="text-zinc-500 font-mono text-sm mb-8">Aún no has realizado ninguna compra en la plataforma B2B.</p>
                <Link href="/tienda" className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-[#00ff66] transition-colors flex items-center gap-2 group">
                  Explorar Catálogo <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="group border border-white/10 bg-black p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#00ff66]/50 transition-colors relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#00ff66] transition-colors" />
                    
                    <div>
                      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span>ID Pedido</span>
                        <span className="text-zinc-300 bg-white/10 px-2 py-0.5">{order.id.toUpperCase()}</span>
                      </div>
                      <div className="text-white text-2xl font-black">${order.total_amount.toLocaleString()}</div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full md:w-auto">
                      <div className="flex flex-col gap-1 max-w-[150px]">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Envío a</span>
                        <span className="text-xs font-mono text-zinc-300 truncate" title={
                          order.shipping_address 
                            ? `${order.shipping_address.address || ''}, ${order.shipping_address.city || ''} ${order.shipping_address.postalCode ? `(${order.shipping_address.postalCode})` : ''}`
                            : 'No especificado'
                        }>
                          {order.shipping_address 
                            ? `${order.shipping_address.address || ''}, ${order.shipping_address.city || ''}`
                            : 'No especificado'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Estado</span>
                        <span className="bg-[#00ff66]/10 border border-[#00ff66]/20 px-3 py-1 text-xs uppercase tracking-widest text-[#00ff66] text-center">
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 md:text-right">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Fecha de Emisión</span>
                        <span className="text-sm font-mono text-zinc-300">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
