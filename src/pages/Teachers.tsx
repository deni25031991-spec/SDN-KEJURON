import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, MessageCircle, GraduationCap, Search, UserX, Facebook, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const teachers = [
  {
    name: 'Juli Sugianingsih, S.Pd',
    role: 'Kepala Sekolah',
    subject: 'Manajemen Pendidikan',
    detailedSubjects: ['Kepemimpinan Sekolah', 'Manajemen Mutu', 'Supervisi Pendidikan'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    bio: 'Berpengalaman lebih dari 20 tahun dalam memimpin institusi pendidikan dasar dengan visi global.',
    whatsapp: '6281234567890',
    instagram: 'juli_sugianingsih',
    facebook: 'juli.sugianingsih',
    linkedin: 'juli-sugianingsih',
    email: 'juli@kejuron.sch.id'
  },
  {
    name: 'Angga Wida Witdiyanto, S.Pd',
    role: 'Guru Kelas 6',
    subject: 'Wali Kelas 6',
    detailedSubjects: ['Matematika', 'IPA', 'PPKn', 'Bahasa Indonesia'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    bio: 'Membimbing siswa tingkat akhir untuk persiapan matang melanjutkan ke jenjang menengah.',
    whatsapp: '6281234567891',
    instagram: 'angga_wida',
    facebook: 'angga.wida.witdiyanto',
    email: 'angga@kejuron.sch.id'
  },
  {
    name: 'Agus Wiyono, S.Pd',
    role: 'Guru Kelas 5',
    subject: 'Wali Kelas 5',
    detailedSubjects: ['Bahasa Inggris Dasar', 'IPS', 'Seni Budaya', 'IPA'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    bio: 'Berdedikasi dalam mengembangkan potensi akademik dan kecerdasan emosional siswa.',
    whatsapp: '6281234567892',
    instagram: 'agus_wiyono',
    email: 'agus_w@kejuron.sch.id'
  },
  {
    name: 'Siti Rahayu, S.Pd',
    role: 'Guru Kelas 4',
    subject: 'Wali Kelas 4',
    detailedSubjects: ['Matematika Dasar', 'Bahasa Indonesia', 'IPA', 'Prakarya'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    bio: 'Menerapkan metode pembelajaran eksploratif untuk menumbuhkan rasa kompetitif positif.',
    whatsapp: '6281234567893',
    instagram: 'siti_rahayu',
    facebook: 'siti.rahayu.edu',
    email: 'siti_r@kejuron.sch.id'
  },
  {
    name: 'Natalia Dwi Megasari, S.Pd',
    role: 'Guru Kelas 3',
    subject: 'Wali Kelas 3',
    detailedSubjects: ['Literasi', 'Numerasi Dasar', 'Seni Musik', 'Budi Pekerti'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    bio: 'Menciptakan suasana belajar yang ceria dan penuh warna bagi perkembangan anak.',
    whatsapp: '6281234567894',
    instagram: 'natalia_dwi',
    email: 'natalia@kejuron.sch.id'
  },
  {
    name: 'Sutini, S.Pd',
    role: 'Guru Kelas 2',
    subject: 'Wali Kelas 2',
    detailedSubjects: ['Calistung', 'Dongeng Karakter', 'Olahraga Dasar', 'Seni Rupa'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    bio: 'Fokus pada fondasi literasi dan kedisiplinan diri sejak dini.',
    whatsapp: '6281234567895',
    instagram: 'sutini_teacher',
    facebook: 'sutini.spd',
    email: 'sutini@kejuron.sch.id'
  },
  {
    name: 'Septyarini, S.Pd',
    role: 'Guru Kelas 1',
    subject: 'Wali Kelas 1',
    detailedSubjects: ['Pengenalan Lingkungan', 'Bahasa Ibu', 'Moral & Etika', 'Bernyanyi'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    bio: 'Memandu langkah pertama siswa di dunia pendidikan formal dengan kehangatan.',
    whatsapp: '6281234567896',
    instagram: 'septyarini_spd',
    email: 'septyarini@kejuron.sch.id'
  },
  {
    name: 'Endro Wilarsito, S.Pd',
    role: 'Guru Mapel PJOK',
    subject: 'Pendidikan Jasmani',
    detailedSubjects: ['Atletik', 'Sepak Bola', 'Senam Irama', 'Kesehatan Remaja'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    bio: 'Membangun karakter tangguh dan kerja sama tim melalui aktivitas fisik.',
    whatsapp: '6281234567897',
    instagram: 'endro_wilarsito',
    facebook: 'endro.wilarsito',
    email: 'endro@kejuron.sch.id'
  },
  {
    name: 'Untari, S.Pd.I',
    role: 'Guru Mapel PAI',
    subject: 'Pendidikan Agama Islam',
    detailedSubjects: ['Fiqih', 'Aqidah Akhlak', 'Sejarah Kebudayaan Islam', 'BTQ'],
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop',
    bio: 'Menanamkan nilai-nilai religius yang inklusif dan moderat bagi seluruh siswa.',
    whatsapp: '6281234567898',
    instagram: 'untari_pai',
    email: 'untari@kejuron.sch.id'
  },
  {
    name: 'Deni Angga Raja, S.Pd.K',
    role: 'Guru Mapel PAK',
    subject: 'Pendidikan Agama Kristen',
    detailedSubjects: ['Studi Alkitab Junior', 'Etika Kristen', 'Lagu Rohani', 'Pelayanan Kasih'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    bio: 'Memberikan bimbingan spiritual dengan pendekatan kasih dan kepedulian sosial.',
    whatsapp: '6281234567899',
    instagram: 'deni_angga',
    email: 'deni@kejuron.sch.id'
  },
  {
    name: 'Nuansa Wamagiska Ferry, S.Sos',
    role: 'Tendik Administrasi',
    subject: 'Dapodik & Administrasi',
    detailedSubjects: ['Sistem Informasi', 'Jaringan Dasar', 'Manajemen Data', 'Keamanan Cyber'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
    bio: 'Menjamin akurasi data sekolah serta integritas operasional sistem informasi digital sekolah.',
    whatsapp: '6281234567900',
    instagram: 'nuansa_wa',
    linkedin: 'nuansa-wamagiska',
    email: 'nuansa@kejuron.sch.id'
  },
  {
    name: 'Agung Baskara',
    role: 'Tendik Perpustakaan',
    subject: 'Manajemen Perpustakaan',
    detailedSubjects: ['Katalogisasi', 'Literasi Informasi', 'Literasi Digital', 'Storytelling'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    bio: 'Mendedikasikan diri untuk membangun budaya literasi yang kuat dan kritis bagi seluruh siswa.',
    whatsapp: '6281234567901',
    instagram: 'agung_baskara',
    email: 'agung@kejuron.sch.id'
  },
  {
    name: 'HAMIM',
    role: 'Tendik Kebersihan',
    subject: 'Fasilitas & Lingkungan',
    detailedSubjects: ['Pemeliharaan Gedung', 'Sanitasi Dasar', 'Taman & Lanskap', 'Logistik Gedung'],
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
    bio: 'Pilar utama di balik kenyamanan, kebersihan, dan keindahan aspek fisik SDN KEJURON.',
    whatsapp: '6281234567902',
    instagram: 'hamim_clean',
    email: 'hamim@kejuron.sch.id'
  }
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.detailedSubjects?.some(ds => ds.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Guru & Tenaga Kependidikan</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Bertemu dengan para profesional yang berdedikasi membimbing putra-putri Anda menuju masa depan yang cerah.</p>
      </section>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative group">
        <Search className={searchTerm ? "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" : "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"} />
        <Input 
          placeholder="Cari nama guru atau mata pelajaran..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-emerald-500 shadow-sm transition-all focus:border-emerald-500"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500"
          >
            Bersihkan
          </button>
        )}
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, idx) => (
              <motion.div
                key={teacher.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative h-full flex flex-col bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden border-2 border-slate-50 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 via-transparent to-pink-500/20 z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&sig=${idx}`} 
                    alt="School Decoration" 
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-800 via-white/20 dark:via-transparent to-transparent z-20" />
                </div>
                
                {/* Main Identity Section */}
                <div className="relative flex-1 px-8 pb-8 flex flex-col items-center">
                  {/* Floating Avatar */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                      <div className="relative w-32 h-32 rounded-[2.5rem] border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
                        <img 
                          src={teacher.image} 
                          alt={teacher.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info Body */}
                  <div className="pt-20 text-center flex-1 flex flex-col w-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-[1.2] group-hover:text-emerald-600 transition-colors">
                        {teacher.name}
                      </h3>
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.25em] mt-2 bg-emerald-50 dark:bg-emerald-900/30 py-1 px-3 rounded-full inline-block">
                        {teacher.role}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
                      <GraduationCap className="w-4 h-4 text-emerald-500" />
                      {teacher.subject}
                    </div>

                    {teacher.detailedSubjects && (
                      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        {teacher.detailedSubjects.slice(0, 3).map((det, sIdx) => (
                          <span key={sIdx} className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-[9px] font-black uppercase tracking-tight text-slate-400 border border-slate-100 dark:border-slate-800">
                            {det}
                          </span>
                        ))}
                        {teacher.detailedSubjects.length > 3 && (
                          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-[9px] font-black uppercase text-emerald-600">
                             +{teacher.detailedSubjects.length - 3}
                          </span>
                        )}
                      </div>
                    )}
      
                    <div className="relative flex-1 mb-8">
                       <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-[1.8] font-medium italic relative z-10 line-clamp-3 group-hover:line-clamp-none transition-all">
                        "{teacher.bio}"
                      </p>
                    </div>
      
                    {/* Social Hub */}
                    <div className="pt-6 flex items-center justify-center gap-3 border-t border-slate-50 dark:border-slate-700/50">
                      <a 
                        href={`https://wa.me/${teacher.whatsapp}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 active:scale-95" 
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      
                      {teacher.instagram && (
                        <a 
                          href={`https://instagram.com/${teacher.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-pink-600 hover:text-white transition-all hover:scale-110" 
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
  
                      {teacher.facebook && (
                        <a 
                          href={`https://facebook.com/${teacher.facebook}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110" 
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
  
                      {teacher.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${teacher.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-110" 
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
  
                      <a 
                        href={`mailto:${teacher.email}`} 
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all hover:scale-110" 
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
                <UserX className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Guru Tidak Ditemukan</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Maaf, kami tidak menemukan guru atau staf dengan kata kunci <span className="text-emerald-500 font-black">"{searchTerm}"</span>.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-4 rounded-xl border-slate-200 dark:border-slate-700 dark:text-slate-300"
              >
                Reset Pencarian
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
