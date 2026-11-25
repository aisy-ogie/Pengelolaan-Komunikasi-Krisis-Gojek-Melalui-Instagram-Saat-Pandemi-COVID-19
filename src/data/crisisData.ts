import { ComplaintItem, CrisisInfoItem, FlowStep, NotificationItem } from '../types/crisis';

export const CRISIS_INFO_ITEMS: CrisisInfoItem[] = [
  {
    id: 'keg-1',
    category: 'kegiatan',
    categoryLabel: 'Kegiatan',
    authorHandle: '@gojekindonesia',
    timestamp: '1 jam',
    title: 'Penyaluran Bantuan Masker & Hand Sanitizer bagi Mitra Driver',
    summary:
      'Gojek mendistribusikan ratusan ribu masker kain dan cairan pembersih tangan secara bertahap di titik posko mitra.',
    fullContent:
      'Sebagai bagian dari informasi kegiatan perusahaan selama pandemi COVID-19, Gojek menyalurkan bantuan perlengkapan kesehatan berupa masker kain, hand sanitizer, dan vitamin kepada mitra driver GoRide, GoCar, serta GoFood di berbagai kota besar. Penyaluran dilakukan secara terjadwal untuk menghindari kerumunan.',
    urgency: 'Penting',
    instagramChannel: 'Instagram Feed & Story @gojekindonesia',
    targetAudience: 'Mitra Driver & Publik',
    actions: [
      'Cek jadwal pengambilan paket masker di aplikasi mitra sesuai zona kota masing-masing.',
      'Datang ke Posko Aman dengan wajib mengenakan masker dan menjaga jarak antrean minimal 1,5 meter.',
      'Laporkan kendala stok posko melalui menu Ajukan Pengaduan agar distribusi segera diperbaiki.',
    ],
    monitoringNote:
      'Tim komunikasi memantau kolom komentar Instagram @gojekindonesia untuk memastikan informasi titik posko menjangkau seluruh mitra.',
    reachStatus: 'Menjangkau 184 ribu pemangku kepentingan',
  },
  {
    id: 'keb-1',
    category: 'kebijakan',
    categoryLabel: 'Kebijakan',
    authorHandle: '@gojekindonesia',
    timestamp: '2 jam',
    title: 'Prosedur Layanan Tanpa Kontak (Contactless Delivery) GoFood & GoSend',
    summary:
      'Pembaruan standar operasional pengiriman makanan dan paket tanpa kontak fisik langsung selama masa pembatasan sosial.',
    fullContent:
      'Untuk menjaga keamanan pelanggan, mitra usaha, dan mitra pengemudi, Gojek menetapkan prosedur layanan tanpa kontak langsung. Pelanggan dapat memilih opsi pengiriman di depan pintu atau titik serah terima khusus serta menggunakan pembayaran non-tunai melalui GoPay.',
    urgency: 'Penting',
    instagramChannel: 'Instagram Carousel @gojekindonesia',
    targetAudience: 'Pelanggan, Mitra Driver & Merchant',
    actions: [
      'Pilih opsi "Taruh di depan pintu / lobi" pada catatan pengantaran pesanan GoFood atau GoSend.',
      'Utamakan transaksi non-tunai (GoPay) untuk meminimalkan kontak fisik.',
      'Mitra driver wajib mengambil foto bukti pengantaran pada titik serah terima yang disepakati.',
    ],
    monitoringNote:
      'Respons publik menunjukkan tingkat adopsi fitur pesan cepat tanpa kontak meningkat signifikan setelah publikasi infografis kebijakan.',
    reachStatus: 'Menjangkau 242 ribu pemangku kepentingan',
  },
  {
    id: 'j3k-1',
    category: 'j3k',
    categoryLabel: 'J3K',
    authorHandle: '@gojekindonesia',
    timestamp: '3 jam',
    title: 'Kampanye Protokol Kesehatan J3K: Jaga Kesehatan, Kebersihan & Keamanan',
    summary:
      'Edukasi standar J3K meliputi pengecekan suhu tubuh mitra di aplikasi, disinfeksi armada rutin, dan sekat pelindung.',
    fullContent:
      'Kampanye J3K (Jaga Kesehatan, Jaga Kebersihan, Jaga Keamanan) merupakan pilar utama komunikasi krisis Gojek melalui Instagram @gojekindonesia. Pelanggan kini dapat melihat status suhu tubuh mitra dan riwayat disinfeksi kendaraan langsung sebelum perjalanan atau pengantaran dimulai.',
    urgency: 'Penting',
    instagramChannel: 'Instagram Reels & Highlights J3K @gojekindonesia',
    targetAudience: 'Seluruh Pengguna & Mitra Ekosistem',
    actions: [
      'Periksa indikator status kesehatan dan disinfeksi mitra pada layar pemesanan layanan.',
      'Gunakan masker pribadi selama perjalanan GoRide/GoCar dan bawa helm pribadi bila memungkinkan.',
      'Manfaatkan layanan sekat pelindung pada armada GoCar dan GoRide yang tersedia di zona prioritas.',
    ],
    monitoringNote:
      'Evaluasi komunikasi J3K terus diperbarui berdasarkan masukan pengguna agar pesan protokol mudah dipahami semua lapisan masyarakat.',
    reachStatus: 'Menjangkau 310 ribu pemangku kepentingan',
  },
  {
    id: 'keg-2',
    category: 'kegiatan',
    categoryLabel: 'Kegiatan',
    authorHandle: '@gojekindonesia',
    timestamp: '5 jam',
    title: 'Program Paket Sembako & Dana Solidaritas Anak Bangsa Bisa',
    summary:
      'Kolaborasi Yayasan Anak Bangsa Bisa menyalurkan bantuan kebutuhan pokok harian kepada mitra terdampak pandemi.',
    fullContent:
      'Melalui inisiatif Yayasan Anak Bangsa Bisa, Gojek menginformasikan secara transparan kegiatan penyaluran voucher sembako dan bantuan tunai bagi mitra driver serta mitra UMKM yang mengalami penurunan pendapatan akibat pembatasan aktivitas luar ruang.',
    urgency: 'Normal',
    instagramChannel: 'Instagram Post @gojekindonesia',
    targetAudience: 'Mitra Driver, UMKM & Donatur Publik',
    actions: [
      'Mitra yang memenuhi kriteria dapat memantau notifikasi resmi penerimaan voucher sembako.',
      'Publik dapat berpartisipasi dalam kampanye solidaritas melalui kanal resmi GoPay Donasi.',
      'Waspadai penipuan yang mengatasnamakan bantuan Gojek dengan memverifikasi info hanya di @gojekindonesia.',
    ],
    monitoringNote:
      'Pertanyaan publik terkait kriteria penerima bantuan dijawab secara berkala pada kolom tanya jawab Instagram Story.',
    reachStatus: 'Menjangkau 156 ribu pemangku kepentingan',
  },
  {
    id: 'keb-2',
    category: 'kebijakan',
    categoryLabel: 'Kebijakan',
    authorHandle: '@gojekindonesia',
    timestamp: '1 hari',
    title: 'Penyesuaian Operasional Layanan Penumpang Mengikuti Aturan PSBB',
    summary:
      'Informasi penyesuaian fitur layanan GoRide dan kapasitas penumpang GoCar sesuai regulasi pemerintah daerah.',
    fullContent:
      'Gojek menyesuaikan ketersediaan layanan transportasi penumpang di wilayah yang menerapkan Pembatasan Sosial Berskala Besar (PSBB). Sementara layanan pengantaran logistik GoSend, GoFood, dan GoMart tetap beroperasi penuh guna memenuhi kebutuhan pokok warga dari rumah.',
    urgency: 'Normal',
    instagramChannel: 'Instagram Info Grafis @gojekindonesia',
    targetAudience: 'Pengguna Layanan Transportasi & Mitra',
    actions: [
      'Gunakan GoFood, GoMart, dan GoSend untuk memenuhi kebutuhan harian tanpa perlu keluar rumah.',
      'Cek pembaruan zona operasional harian sesuai kebijakan pemerintah daerah setempat.',
      'Mitra dapat mengaktifkan layanan pengantaran barang/makanan sebagai prioritas selama pembatasan.',
    ],
    monitoringNote:
      'Distribusi informasi kebijakan daerah diperkuat ketika terdapat revisi aturan PSBB agar tidak terjadi kebingungan di lapangan.',
    reachStatus: 'Menjangkau 198 ribu pemangku kepentingan',
  },
  {
    id: 'j3k-2',
    category: 'j3k',
    categoryLabel: 'J3K',
    authorHandle: '@gojekindonesia',
    timestamp: '2 hari',
    title: 'Layanan Posko Aman J3K untuk Penyemprotan Disinfektan Gratis',
    summary:
      'Tersedia puluhan titik Posko Aman Gojek untuk pemeriksaan suhu tubuh dan penyemprotan disinfektan kendaraan mitra.',
    fullContent:
      'Untuk menjaga standar kebersihan armada setiap hari, mitra driver dapat mengunjungi Posko Aman J3K terdekat. Petugas posko melakukan pengecekan suhu tubuh dan penyemprotan disinfektan pada helm, jaket, serta kabin mobil yang hasilnya tercatat otomatis di sistem.',
    urgency: 'Normal',
    instagramChannel: 'Instagram Story & Panduan Lokasi @gojekindonesia',
    targetAudience: 'Mitra Driver GoRide & GoCar',
    actions: [
      'Kunjungi Posko Aman J3K terdekat sebelum memulai aktivitas operasional harian.',
      'Pastikan stiker verifikasi kebersihan terbaru tertempel pada tas pengantaran atau kendaraan.',
      'Laporkan jika menemukan posko yang kehabisan cairan disinfektan melalui fitur pengaduan.',
    ],
    monitoringNote:
      'Umpan balik mitra mengenai jam buka posko dijadikan dasar penyesuaian jadwal operasional posko wilayah.',
    reachStatus: 'Menjangkau 129 ribu pemangku kepentingan',
  },
];

export const CRISIS_FLOW_STEPS: FlowStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Mengidentifikasi Krisis Pandemi COVID-19',
    description:
      'Memetakan dampak langsung pandemi terhadap keamanan pelanggan, keberlangsungan penghasilan mitra driver, dan operasional merchant.',
    stageType: 'identifikasi',
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Menentukan Strategi Komunikasi Krisis',
    description:
      'Menetapkan Instagram @gojekindonesia sebagai kanal komunikasi cepat, empatik, visual, dan mudah diakses oleh seluruh pemangku kepentingan.',
    stageType: 'strategi',
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Mengumpulkan Informasi & Kebutuhan Publik',
    description:
      'Menyerap pertanyaan, keluhan, serta kebutuhan mendesak masyarakat dan mitra terkait keselamatan layanan dan dukungan ekonomi.',
    stageType: 'strategi',
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Mengelompokkan Informasi ke 3 Pilar Layanan',
    description:
      'Menyaring dan mengklasifikasikan informasi krisis agar audiens memperoleh jawaban terstruktur sesuai kebutuhannya.',
    stageType: 'klasifikasi',
    highlightPillars: [
      'Informasi Kegiatan Perusahaan (misal: bantuan masker)',
      'Informasi Kebijakan Perusahaan (misal: prosedur layanan)',
      'Informasi Kampanye Protokol Kesehatan J3K',
    ],
  },
  {
    id: 'step-5',
    stepNumber: '05',
    title: 'Menyusun Konten Komunikasi',
    description:
      'Merancang materi visual carousel, infografis ringkas, dan keterangan (caption) Bahasa Indonesia yang jelas serta bebas ambiguitas.',
    stageType: 'distribusi',
  },
  {
    id: 'step-6',
    stepNumber: '06',
    title: 'Mengunggah Informasi Melalui Instagram @gojekindonesia',
    description:
      'Publikasi terjadwal melalui Feed, Story, dan Reels agar informasi krisis tersampaikan tepat waktu kepada pengguna dan mitra.',
    stageType: 'distribusi',
  },
  {
    id: 'step-7',
    stepNumber: '07',
    title: 'Memantau Respons Publik dan Mitra Kerja',
    description:
      'Mengamati sentimen komentar, pesan langsung (DM), tingkat pemahaman audiens, serta laporan kendala dari lapangan.',
    stageType: 'evaluasi',
  },
  {
    id: 'step-8',
    stepNumber: '08',
    title: 'Evaluasi Jangkauan Pemangku Kepentingan',
    description:
      'Menilai apakah informasi telah menjangkau seluruh pemangku kepentingan secara merata dan dipahami dengan benar.',
    stageType: 'evaluasi',
    decisionNote:
      'Jika belum menjangkau seluruh pihak: perbaiki distribusi informasi atau tinjau ulang strategi komunikasi krisis. Jika sudah merata: siklus komunikasi dinyatakan tuntas.',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pembaruan Protokol J3K & Masker',
    message:
      'Informasi baru mengenai jadwal penyaluran masker kain dan cek suhu mitra telah dipublikasikan di @gojekindonesia.',
    time: '1 jam lalu',
    read: false,
    linkedInfoId: 'keg-1',
  },
  {
    id: 'notif-2',
    title: 'Panduan Layanan Tanpa Kontak',
    message:
      'Pastikan Anda mengetahui langkah pengantaran aman GoFood & GoSend selama pembatasan sosial.',
    time: '2 jam lalu',
    read: true,
    linkedInfoId: 'keb-1',
  },
];

export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'aduan-1',
    category: 'kegiatan',
    urgency: 'Penting',
    username: '@mitra_jaksel',
    title: 'Permintaan penambahan titik pembagian masker di Posko Kemang',
    description:
      'Antrean pengambilan paket masker dan hand sanitizer cukup padat pada pukul 10.00 WIB, mohon penambahan kuota harian.',
    createdAt: 'Hari ini · 09:40 WIB',
    status: 'Sedang Ditindaklanjuti',
  },
  {
    id: 'aduan-2',
    category: 'j3k',
    urgency: 'Normal',
    username: '@nadia_putri',
    title: 'Pertanyaan cara verifikasi status disinfeksi armada GoCar',
    description:
      'Apakah pelanggan bisa melihat tanggal terakhir penyemprotan disinfektan sebelum driver tiba di titik jemput?',
    createdAt: 'Kemarin · 16:15 WIB',
    status: 'Selesai',
  },
];
