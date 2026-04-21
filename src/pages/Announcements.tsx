import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Bell, ArrowRight, Filter, Plus, Edit2, Trash2, X, Save, Lock, LogIn, MapPin, Clock, ListChecks, Phone, Info, Tag, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

const initialAnnouncements = [
  {
    id: 1,
    title: 'Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025',
    date: '2024-04-10',
    description: 'Penerimaan siswa baru telah dibuka. Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik dengan kurikulum modern.',
    details: {
      location: 'Kantor Tata Usaha SDN KEJURON',
      time: '08:00 - 14:00 WIB',
      agenda: ['Pengambilan Formulir', 'Verifikasi Dokumen', 'Wawancara Orang Tua', 'Tes Kematangan Siswa'],
      contact: 'Ibu Ratna (0812-3456-7890)'
    },
    type: 'Penting',
    category: 'Akademik'
  },
  {
    id: 2,
    title: 'Libur Hari Raya Idul Fitri 1445 H',
    date: '2024-04-05',
    description: 'Sesuai dengan kalender pendidikan, kegiatan belajar mengajar akan diliburkan mulai tanggal 8 April hingga 15 April 2024.',
    details: {
      location: 'Rumah Masing-masing',
      time: 'Selama 8 Hari',
      agenda: ['Cuti Bersama', 'Libur Lebaran', 'Kembali Masuk: 16 April 2024'],
      contact: 'Sekretariat Sekolah'
    },
    type: 'Umum',
    category: 'Kegiatan'
  },
  {
    id: 3,
    title: 'Pengumuman Hasil Ujian Tengah Semester Genap',
    date: '2024-03-25',
    description: 'Hasil UTS Genap sudah dapat diakses melalui portal orang tua siswa. Silakan hubungi wali kelas untuk informasi lebih lanjut.',
    details: {
      location: 'Portal Parent SDN KEJURON',
      time: 'Dapat diakses 24 Jam',
      agenda: ['Login Portal', 'Unduh E-Rapor', 'Konsultasi Wali Kelas via WA'],
      contact: 'Wali Kelas Masing-masing'
    },
    type: 'Penting',
    category: 'Akademik'
  },
  {
    id: 4,
    title: 'Workshop Parenting: Mendidik Anak di Era Digital',
    date: '2024-03-20',
    description: 'Mengundang seluruh orang tua siswa untuk hadir dalam workshop parenting yang akan dilaksanakan pada hari Sabtu mendatang.',
    details: {
      location: 'Aula Utama SDN KEJURON',
      time: '09:00 - 12:00 WIB',
      agenda: ['Pembukaan', 'Materi Inti', 'Sesi Tanya Jawab', 'Ramah Tamah'],
      contact: 'Bapak Budi (0856-7812-3456)'
    },
    type: 'Umum',
    category: 'Parenting'
  },
  {
    id: 5,
    title: 'Lomba Kebersihan Kelas dan Lingkungan Sekolah',
    date: '2024-03-15',
    description: 'Dalam rangka memperingati Hari Bumi, sekolah mengadakan lomba kebersihan antar kelas dengan hadiah menarik.',
    details: {
      location: 'Lingkungan Sekolah',
      time: 'Selama 1 Minggu',
      agenda: ['Kerja Bakti', 'Penataan Taman Kelas', 'Penilaian Juri', 'Pengumuman Juara'],
      contact: 'OSIS / Panitia Lomba'
    },
    type: 'Umum',
    category: 'Kegiatan'
  }
];

export default function AnnouncementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Umum',
    category: 'Kegiatan',
    date: new Date().toISOString().split('T')[0],
    location: '',
    time: '',
    contact: '',
    agenda: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  // Filter and Sort
  const filteredAnnouncements = announcements.filter(item => 
    selectedCategory === 'Semua' || item.category === selectedCategory
  );

  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      type: 'Umum',
      category: 'Kegiatan',
      date: new Date().toISOString().split('T')[0],
      location: '',
      time: '',
      contact: '',
      agenda: ''
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      category: item.category,
      date: item.date,
      location: item.details?.location || '',
      time: item.details?.time || '',
      contact: item.details?.contact || '',
      agenda: item.details?.agenda?.join(', ') || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      showNotification('Pengumuman berhasil dihapus');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      date: formData.date,
      details: {
        location: formData.location,
        time: formData.time,
        contact: formData.contact,
        agenda: formData.agenda.split(',').map(s => s.trim()).filter(s => s !== '')
      }
    };

    if (editingItem) {
      setAnnouncements(announcements.map(a => 
        a.id === editingItem.id ? { ...a, ...submissionData } : a
      ));
      showNotification('Pengumuman berhasil diperbarui');
    } else {
      const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
      setAnnouncements([{ id: newId, ...submissionData }, ...announcements]);
      showNotification('Pengumuman baru berhasil diterbitkan');
    }
    setIsDialogOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // User requested specific credentials
    if (loginData.email === 'sdnkejuron13@gmail.com' && loginData.password === 'sdnkejuron041185') {
      setIsAdmin(true);
      setIsLoginDialogOpen(false);
      setLoginError(null);
      showNotification('Berhasil masuk sebagai Admin');
    } else {
      setLoginError('Email atau password salah');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    showNotification('Berhasil keluar dari Mode Admin');
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 space-y-12 relative">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="text-center space-y-4">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold"
          >
            <Bell className="w-4 h-4" />
            Pusat Informasi
          </motion.div>
          
          {/* Admin Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => isAdmin ? handleLogout() : setIsLoginDialogOpen(true)}
            className={cn(
              "text-[10px] font-black uppercase tracking-widest rounded-full px-4 gap-2",
              isAdmin ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            {isAdmin ? (
              <>
                <X className="w-3 h-3" />
                Matikan Mode Admin
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                Aktifkan Mode Admin
              </>
            )}
          </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Pengumuman <span className="text-emerald-600 dark:text-pink-500">Terbaru</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Dapatkan informasi terkini mengenai kegiatan, kebijakan, dan berita penting dari SDN KEJURON.
        </p>
      </section>

      {/* Filter & Admin Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl gap-2 border-slate-200 dark:border-slate-700 dark:text-slate-300">
            <Filter className="w-4 h-4" />
            Filter Kategori
          </Button>
          <div className="hidden sm:flex gap-2">
            {['Semua', 'Akademik', 'Kegiatan', 'Parenting'].map((cat) => (
              <Button 
                key={cat} 
                variant={selectedCategory === cat ? "default" : "ghost"}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-xl transition-all",
                  selectedCategory === cat 
                    ? "bg-emerald-600 dark:bg-pink-600 text-white shadow-lg shadow-emerald-100 dark:shadow-pink-900/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        
        {isAdmin && (
          <Button 
            onClick={handleOpenAdd}
            className="bg-emerald-600 hover:bg-emerald-700 rounded-xl gap-2 font-bold shadow-lg shadow-emerald-200"
          >
            <Plus className="w-4 h-4" />
            Tambah Pengumuman
          </Button>
        )}
        
        {!isAdmin && (
          <div className="text-sm text-slate-400 font-medium">
            Menampilkan {filteredAnnouncements.length} pengumuman
          </div>
        )}
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {sortedAnnouncements.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.01 }}
                onClick={() => {
                  setSelectedAnnouncement(item);
                  setIsDetailDialogOpen(true);
                }}
                className="group relative bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:border-emerald-200 dark:hover:border-emerald-500 transition-all cursor-pointer overflow-hidden"
              >
                {/* Decorative Background Blob */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors" />

                <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                  {/* Date Box */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300">
                    <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-white transition-colors">
                      {new Date(item.date).getDate()}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-100 transition-colors">
                      {new Date(item.date).toLocaleString('id-ID', { month: 'short' })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center flex-wrap gap-2">
                        <Badge 
                          variant="outline"
                          className={cn(
                            "rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider border-none",
                            item.type === 'Penting' 
                              ? "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" 
                              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          )}
                        >
                          {item.type}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className="rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-none"
                        >
                          {item.category}
                        </Badge>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 ml-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>

                      {isAdmin && (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {item.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Tag className="w-3.5 h-3.5" />
                          {item.category}
                        </div>
                        {item.details?.location && (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.details.location}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 px-5 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px] group/btn transition-all hover:bg-emerald-100 dark:hover:bg-emerald-800/50">
                        Baca Selengkapnya
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] p-8 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Lock className="w-6 h-6" />
              </div>
              Admin Login
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
              <Input 
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="sdnkejuron13@gmail.com"
                className="rounded-xl border-slate-200 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</Label>
              <Input 
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 focus:ring-emerald-500"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                {loginError}
              </p>
            )}

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsLoginDialogOpen(false)}
                className="rounded-xl font-bold"
              >
                Batal
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-8 font-bold shadow-lg shadow-emerald-200 gap-2"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Admin Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl rounded-[2.5rem] p-8 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">
              {editingItem ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Judul Pengumuman</Label>
              <Input 
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul..."
                className="rounded-xl border-slate-200 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-xs font-bold uppercase tracking-widest text-slate-400">Tipe</Label>
                <select 
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Umum">Umum</option>
                  <option value="Penting">Penting</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-slate-400">Kategori</Label>
                <select 
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Parenting">Parenting</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-slate-400">Tanggal</Label>
              <Input 
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="rounded-xl border-slate-200 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-widest text-slate-400">Deskripsi Utama</Label>
              <Textarea 
                id="desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tulis ringkasan isi pengumuman..."
                className="rounded-xl border-slate-200 focus:ring-emerald-500 min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600" />
                Informasi Detail (Opsional)
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lokasi</Label>
                  <Input 
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Contoh: Aula Sekolah"
                    className="rounded-xl border-slate-200 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Waktu</Label>
                  <Input 
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="Contoh: 08:00 - Selesai"
                    className="rounded-xl border-slate-200 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kontak Person</Label>
                <Input 
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Contoh: Bpk. Andi (0812...)"
                  className="rounded-xl border-slate-200 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agenda" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Agenda (Pisahkan dengan koma)</Label>
                <Textarea 
                  id="agenda"
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  placeholder="Contoh: Pembukaan, Inti, Penutup"
                  className="rounded-xl border-slate-200 focus:ring-emerald-500 min-h-[80px]"
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl font-bold"
              >
                Batal
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-8 font-bold shadow-lg shadow-emerald-200 gap-2"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Simpan Perubahan' : 'Terbitkan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Announcement Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950 rounded-[2rem] md:rounded-[3rem] w-[95vw] sm:w-full max-h-[95vh] flex flex-col">
          {selectedAnnouncement && (
            <div className="flex flex-col min-h-0 relative">
              {/* Vibrant School Header */}
              <div className="relative shrink-0 p-6 sm:p-10 md:p-14 bg-emerald-600 dark:bg-emerald-900 overflow-hidden text-white min-h-[160px] md:min-h-[280px] flex flex-col justify-end">
                {/* Background Patterns */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 opacity-90" />
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                
                {/* Decorative Blobs */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-64 h-32 bg-white/10 blur-2xl" />
                
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <Badge variant="secondary" className="rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-white text-emerald-700 hover:bg-white shadow-xl">
                      {selectedAnnouncement.type}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-white/40 text-white backdrop-blur-md">
                      {selectedAnnouncement.category}
                    </Badge>
                  </motion.div>
                  
                  <DialogHeader className="p-0 text-left min-w-0">
                    <DialogTitle className="sr-only">
                      {selectedAnnouncement.title}
                    </DialogTitle>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl sm:text-3xl md:text-5xl font-black leading-tight sm:leading-[1.1] tracking-tight text-white drop-shadow-xl break-words relative z-10 overflow-hidden"
                    >
                      {selectedAnnouncement.title}
                    </motion.h2>
                  </DialogHeader>
                </div>

                <Button
                  onClick={() => setIsDetailDialogOpen(false)}
                  variant="ghost"
                  className="absolute top-4 right-4 z-50 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all border border-white/20 flex items-center justify-center p-0"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              {/* Immersive Scrollable Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-950 p-5 sm:p-10 md:p-16">
                <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
                  
                  {/* Info Cards Row (Bento Style) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-5 group hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110 group-hover:rotate-6 shrink-0 shadow-inner">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Diterbitkan</p>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase italic break-words">
                          {new Date(selectedAnnouncement.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-5 group hover:shadow-xl hover:border-violet-100 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 transition-transform group-hover:scale-110 group-hover:rotate-6 shrink-0 shadow-inner">
                        <Filter className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Kanal Info</p>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase italic break-words">
                          {selectedAnnouncement.category}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-5 group hover:shadow-xl hover:border-rose-100 transition-all duration-300 sm:col-span-2 lg:col-span-1"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 transition-transform group-hover:scale-110 group-hover:rotate-6 shrink-0 shadow-inner">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Urgensi</p>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase italic break-words">
                          {selectedAnnouncement.type}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Body Content Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start text-left">
                    
                    {/* Left: Main text content (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                      <div className="relative group">
                        <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                              <Info className="w-4 h-4" />
                            </div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Pesan Pengumuman</h4>
                          </div>
                          
                          <p className="text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-200 leading-relaxed md:leading-[1.7] font-medium tracking-tight whitespace-pre-line break-words selection:bg-emerald-100 selection:text-emerald-900">
                            {selectedAnnouncement.description}
                          </p>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="pt-8 grid grid-cols-1 gap-5">
                        <div className="p-6 bg-slate-100/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 animate-pulse" />
                          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                            Informasi ini diterbitkan untuk memberikan panduan yang jelas bagi seluruh warga sekolah SDN KEJURON demi kepentingan bersama.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Event Logistics & Agenda (4 cols) */}
                    {(selectedAnnouncement.details) && (
                      <div className="lg:col-span-4 space-y-6">
                        {/* Event Details Card */}
                        {(selectedAnnouncement.details.location || selectedAnnouncement.details.time || selectedAnnouncement.details.contact) && (
                          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Detail Kejadian</h5>
                            
                            <div className="space-y-6">
                              {selectedAnnouncement.details.location && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-emerald-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Lokasi</span>
                                  </div>
                                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 pl-6">{selectedAnnouncement.details.location}</p>
                                </div>
                              )}

                              {selectedAnnouncement.details.time && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-violet-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Waktu</span>
                                  </div>
                                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 pl-6">{selectedAnnouncement.details.time}</p>
                                </div>
                              )}

                              {selectedAnnouncement.details.contact && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-rose-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Narahubung</span>
                                  </div>
                                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 pl-6">{selectedAnnouncement.details.contact}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Agenda Card */}
                        {selectedAnnouncement.details.agenda && selectedAnnouncement.details.agenda.length > 0 && (
                          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200/20 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                              <ListChecks className="w-6 h-6 text-emerald-200" />
                              <h5 className="text-xs font-black uppercase tracking-[0.2em]">Agenda Utama</h5>
                            </div>
                            <ul className="space-y-4">
                              {selectedAnnouncement.details.agenda.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-4 transition-transform hover:translate-x-1 duration-200">
                                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5 border border-white/10">
                                    {i + 1}
                                  </div>
                                  <span className="text-sm font-medium leading-relaxed opacity-95">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Certification Footer (Modern Styled) */}
                  <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
                    <div className="absolute inset-0 bg-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-rose-500/10 opacity-60 pointer-events-none" />
                    
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">Rilis Resmi Digital</span>
                        </div>
                        <p className="text-base md:text-lg text-slate-300 font-bold max-w-lg leading-relaxed">
                          Diterbitkan secara resmi oleh <span className="text-white font-black underline decoration-emerald-500 decoration-2 underline-offset-8">Sistem Informasi SDN KEJURON</span> untuk transparansi publik.
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-end gap-3 text-right">
                        <div className="font-mono text-[10px] text-emerald-500 bg-black/40 px-5 py-2.5 rounded-2xl backdrop-blur-md border border-white/5 shadow-inner flex items-center gap-3">
                          <span className="opacity-40 select-none">DOC-ID</span> 
                          <span className="font-black tracking-widest">{selectedAnnouncement.id.toString().padStart(5, '0')}-2024</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                          <Globe className="w-3 h-3" />
                          sdnkejuron.sch.id
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Large Action Button */}
                  <div className="flex justify-center pt-4 mb-4">
                    <Button 
                      onClick={() => setIsDetailDialogOpen(false)}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] px-8 md:px-14 h-14 md:h-20 text-base md:text-lg font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(16,185,129,0.3)] gap-4 border-b-4 md:border-b-8 border-emerald-800"
                    >
                      Selesai Membaca
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
