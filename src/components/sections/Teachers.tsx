import { motion } from 'motion/react';
import { Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const teachers = [
  {
    name: 'Juli Sugianingsih, S.Pd',
    role: 'Kepala Sekolah',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    bio: 'Memimpin dengan visi global dan kehangatan hati.',
    email: 'juli@kejuron.sch.id',
    whatsapp: '6281234567890'
  },
  {
    name: 'Angga Wida Witdiyanto, S.Pd',
    role: 'Guru Kelas 6',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    bio: 'Membimbing tantangan masa depan dengan semangat.',
    email: 'angga@kejuron.sch.id',
    whatsapp: '6281234567891'
  }
];

export function Teachers() {
  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="bento-section-title mb-0">Tokoh Pendidik</div>
        <Link to="/guru" className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest hover:underline flex items-center gap-1">
          Lihat Semua Guru <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {teachers.map((teacher, idx) => (
          <div key={idx} className="flex flex-col gap-3 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 group hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight truncate">{teacher.name}</div>
                <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{teacher.role}</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic font-medium line-clamp-2">"{teacher.bio}"</p>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <a 
                href={`https://wa.me/${teacher.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:text-emerald-600 transition-colors border border-slate-100 dark:border-slate-700" 
                title="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a 
                href={`mailto:${teacher.email}`}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:text-emerald-600 transition-colors border border-slate-100 dark:border-slate-700" 
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
