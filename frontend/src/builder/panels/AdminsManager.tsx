'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Edit2, Trash2, ShieldCheck, Mail, Key, 
  CheckCircle2, AlertCircle, Loader2, Search, X, Check, Shield, User
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'USER';
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminsManagerProps {
  onOpenToast: (msg: string) => void;
}

export const AdminsManager: React.FC<AdminsManagerProps> = ({ onOpenToast }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN' as 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'USER',
    status: 'Actif',
  });
  const [saving, setSaving] = useState(false);

  // Fetch token
  const getToken = () => localStorage.getItem('sg_admin_token') || '';

  // Get current logged-in user id or email
  const getCurrentUser = () => {
    try {
      const u = localStorage.getItem('sg_admin_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  // Load Users from Backend
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Impossible de charger les utilisateurs.');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open Create Modal
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'ADMIN',
      status: 'Actif',
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (u: AdminUser) => {
    setModalMode('edit');
    setSelectedUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role,
      status: u.status || 'Actif',
    });
    setShowModal(true);
  };

  // Submit Create or Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const token = getToken();

    try {
      if (modalMode === 'create') {
        const payload: any = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          status: formData.status,
        };
        if (formData.password) payload.password = formData.password;

        const res = await fetch(`${API_URL}/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Échec de la création.');
        }

        onOpenToast(`Administrateur ${data.name} créé avec succès !`);
      } else if (modalMode === 'edit' && selectedUser) {
        const payload: any = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          status: formData.status,
        };
        if (formData.password.trim()) {
          payload.password = formData.password.trim();
        }

        const res = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Échec de la mise à jour.');
        }

        onOpenToast(`Compte ${data.name} mis à jour avec succès !`);
      }

      setShowModal(false);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  // Handle Delete User
  const handleDelete = async (u: AdminUser) => {
    if (currentUser?.email === u.email) {
      alert('Vous ne pouvez pas supprimer votre propre compte connecté.');
      return;
    }

    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'administrateur "${u.name}" (${u.email}) ?`
    );
    if (!confirmDelete) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/users/${u.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Échec de la suppression.');
      }

      onOpenToast(`Utilisateur ${u.name} supprimé avec succès.`);
      await fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la suppression.');
    }
  };

  // Filtered list
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto space-y-6 w-full font-inter">
      {/* Header Banner */}
      <div className="bg-ivory dark:bg-forestGreen-dark p-6 sm:p-8 rounded-3xl border border-softGold/30 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forestGreen text-ivory text-[10px] font-bold tracking-widest uppercase mb-2 shadow-sm">
            <ShieldCheck size={12} className="text-softGold" />
            <span>Gestion des Accès & Rôles (RBAC)</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-forestGreen dark:text-ivory">
            Administrateurs & Gestion des Droits
          </h2>
          <p className="text-xs text-sage mt-1">
            Création, modification des rôles (Super Admin, Admin, Éditeur), réinitialisation de mot de passe et suppression.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-bordeaux hover:bg-bordeaux-dark text-ivory px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2 border border-softGold/30 transition-all hover:scale-105"
        >
          <UserPlus size={15} className="text-softGold" />
          <span>Ajouter un Administrateur</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-ivory dark:bg-forestGreen-dark/90 p-4 rounded-2xl border border-sage/20 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-sage/30 bg-ivory text-forestGreen dark:bg-forestGreen dark:text-ivory text-xs font-semibold outline-none focus:border-softGold"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'SUPER_ADMIN', 'ADMIN', 'EDITOR', 'USER'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-bordeaux text-ivory border border-softGold/30 shadow'
                  : 'bg-ivory/10 hover:bg-ivory/20 text-ivory/80'
              }`}
            >
              {r === 'ALL' ? 'Tous' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-bordeaux/20 border border-bordeaux/40 rounded-2xl flex items-center space-x-3 text-xs text-red-200">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Table / Grid */}
      {loading ? (
        <div className="bg-ivory dark:bg-forestGreen-dark p-12 rounded-3xl border border-sage/20 text-center">
          <Loader2 size={32} className="animate-spin text-softGold mx-auto mb-3" />
          <p className="text-xs text-sage font-bold uppercase tracking-wider">Chargement des comptes...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-ivory dark:bg-forestGreen-dark p-12 rounded-3xl border border-sage/20 text-center text-xs text-sage">
          Aucun utilisateur trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((u) => {
            const isSelf = currentUser?.email === u.email;
            return (
              <div
                key={u.id}
                className="bg-ivory dark:bg-forestGreen-dark border border-sage/30 p-5 rounded-2xl shadow-md space-y-4 hover:border-softGold/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-forestGreen dark:bg-forestGreen text-softGold border border-softGold/20">
                        {u.role === 'SUPER_ADMIN' ? (
                          <Shield size={16} className="text-amber-400" />
                        ) : u.role === 'ADMIN' ? (
                          <ShieldCheck size={16} className="text-emerald-400" />
                        ) : (
                          <User size={16} className="text-sage" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-forestGreen dark:text-ivory leading-snug">
                          {u.name}
                        </h4>
                        <span className="font-mono text-[11px] text-sage truncate block max-w-[180px]">
                          {u.email}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        u.status === 'Actif'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}
                    >
                      {u.status || 'Actif'}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-sage/15 flex items-center justify-between text-[11px]">
                    <span className="text-sage font-medium">Rôle :</span>
                    <span className="font-bold text-bordeaux dark:text-softGold uppercase tracking-wider">
                      {u.role}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-sage/15 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(u)}
                    className="p-2 hover:bg-ivory/20 rounded-lg text-sage hover:text-softGold transition-all"
                    title="Modifier ce compte"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(u)}
                    disabled={isSelf}
                    className={`p-2 rounded-lg transition-all ${
                      isSelf
                        ? 'opacity-30 cursor-not-allowed text-gray-500'
                        : 'hover:bg-red-500/20 text-red-400 hover:text-red-300'
                    }`}
                    title={isSelf ? 'Vous ne pouvez pas supprimer votre propre compte' : 'Supprimer'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forestGreen-dark border-2 border-softGold/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-ivory space-y-6">
            <div className="flex justify-between items-center border-b border-sage/20 pb-4">
              <h3 className="font-playfair text-xl font-bold text-ivory">
                {modalMode === 'create' ? 'Nouvel Administrateur' : 'Modifier le Compte'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-ivory/60 hover:text-ivory p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-sage mb-1.5">
                  Nom Complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Amina Mansour"
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-semibold outline-none focus:border-softGold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-sage mb-1.5">
                  Adresse Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@sufigarden.org"
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-semibold outline-none focus:border-softGold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-sage mb-1.5">
                  {modalMode === 'create' ? 'Mot de passe' : 'Nouveau Mot de passe (laisser vide pour ne pas changer)'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={modalMode === 'create' ? '••••••••' : 'Laisser vide pour conserver'}
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-semibold outline-none focus:border-softGold"
                  required={modalMode === 'create'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-sage mb-1.5">
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold outline-none focus:border-softGold"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="USER">USER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-sage mb-1.5">
                    Statut
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-xs font-bold outline-none focus:border-softGold"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-sage/20 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-sage/30 text-xs font-bold uppercase text-ivory/80 hover:bg-white/5"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-bordeaux hover:bg-bordeaux-dark text-ivory py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg border border-softGold/30 flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'create' ? 'Créer le Compte' : 'Sauvegarder'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
