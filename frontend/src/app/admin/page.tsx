"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Sparkles, CheckCircle2, ShieldCheck, LogOut, AlertCircle, Loader2 } from "lucide-react";
import SGStudioEditor from "@/builder/SGStudioEditor";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState("harounchedli72@gmail.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("sg_admin_token");
      if (token) {
        try {
          const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const user = await res.json();
            setCurrentUser(user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("sg_admin_token");
            localStorage.removeItem("sg_admin_user");
          }
        } catch {
          // Keep offline session if token exists
          const cachedUser = localStorage.getItem("sg_admin_user");
          if (cachedUser) {
            setCurrentUser(JSON.parse(cachedUser));
            setIsAuthenticated(true);
          }
        }
      }
      setInitializing(false);
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Identifiants invalides.");
      }

      // Save token and user details in localStorage
      localStorage.setItem("sg_admin_token", data.access_token);
      localStorage.setItem("sg_admin_user", JSON.stringify(data.user));

      setCurrentUser(data.user);
      setIsAuthenticated(true);
      setNotification(`Bienvenue, ${data.user.name} (${data.user.role})`);
      setTimeout(() => setNotification(null), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion au serveur d'authentification.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sg_admin_token");
    localStorage.removeItem("sg_admin_user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setNotification("Vous avez été déconnecté avec succès.");
    setTimeout(() => setNotification(null), 3000);
  };

  if (initializing) {
    return (
      <div className="bg-forestGreen-dark text-ivory min-h-screen flex items-center justify-center font-inter">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 size={36} className="animate-spin text-softGold" />
          <span className="text-xs tracking-widest uppercase font-bold text-softGold">
            Initialisation de SG Studio CMS...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-forestGreen-dark text-ivory min-h-screen flex items-center justify-center px-6 py-24 font-inter">
        <div className="bg-forestGreen-dark/95 p-8 sm:p-12 rounded-3xl border-2 border-softGold/30 shadow-2xl max-w-md w-full space-y-8 text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ivory/10 text-softGold text-[10px] font-bold tracking-widest uppercase border border-softGold/30">
              <Sparkles size={14} />
              <span>SG Studio CMS — Production Auth</span>
            </div>
            <h1 className="font-playfair text-3xl font-extrabold text-ivory">
              SG Studio CMS
            </h1>
            <p className="text-xs text-ivory/70 font-inter">
              Plateforme d'administration sécurisée & édition en direct
            </p>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-bordeaux/30 border border-bordeaux/60 rounded-2xl flex items-center space-x-3 text-xs text-red-200 text-left"
            >
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-2">Email Administrateur</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-sm font-semibold focus:outline-none focus:border-softGold"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-sage mb-2">Mot de Passe</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-sage/30 bg-ivory text-forestGreen text-sm font-semibold focus:outline-none focus:border-softGold"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bordeaux hover:bg-bordeaux-dark text-ivory font-bold py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 border border-softGold/40 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <Key size={16} />
                  <span>Connexion Sécurisée</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-ivory/10 flex items-center justify-center space-x-2 text-[10px] text-sage">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Chiffrement Bcrypt & Authentification JWT active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-forestGreen-dark">
      {/* Super Admin Top Strip with Logout */}
      <div className="bg-[#152310] border-b border-softGold/20 px-6 py-2 flex justify-between items-center text-xs text-ivory">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-softGold">Connecté :</span>
          <span className="font-mono text-ivory/90">{currentUser?.email || loginEmail}</span>
          <span className="px-2 py-0.5 rounded-full bg-bordeaux text-[10px] font-bold uppercase tracking-wider text-ivory">
            {currentUser?.role || "ADMIN"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-1.5 text-xs text-ivory/75 hover:text-red-300 font-bold uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-white/5 transition-all"
          title="Se déconnecter"
        >
          <LogOut size={13} />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 right-6 z-[100] bg-bordeaux text-ivory px-6 py-3 rounded-full shadow-2xl font-semibold text-xs flex items-center space-x-2 border border-softGold/40"
          >
            <CheckCircle2 size={16} className="text-softGold" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <SGStudioEditor />
    </div>
  );
}
