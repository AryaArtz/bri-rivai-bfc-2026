const STORAGE_KEY = 'UNDIAN_BRILIAN_CULTURE_FEST_PALEMBANG_V9';

export class RaffleEngine {
  constructor() {
    this.participants = [];
    this.prizes = [];
    this.winners = [];
    this.activePrizeId = null;
    this.tvFirstDrawDone = false;
    
    this.loadState();
    if (this.prizes.length === 0 || this.participants.length === 0) {
      this.initDefaultData();
    }
  }

  initDefaultData() {
    this.prizes = [
      { id: 'prize_voucher', name: 'VOUCER INDOMARET/MAP (100.000)', quota: 30, wonCount: 0, isGrandPrize: false },
      { id: 'prize_sandwich', name: 'SANDWICH MAKER KRIS', quota: 10, wonCount: 0, isGrandPrize: false },
      { id: 'prize_jete_spk', name: 'JETE SPEAKER BLUETHOOT', quota: 10, wonCount: 0, isGrandPrize: false },
      { id: 'prize_tws1', name: 'JETE TWS 1 BLUETHOOT', quota: 10, wonCount: 0, isGrandPrize: false },
      { id: 'prize_kris_oven', name: 'KRIS OVEN', quota: 8, wonCount: 0, isGrandPrize: false },
      { id: 'prize_air_fryer', name: 'AIR FRYER KRIS', quota: 5, wonCount: 0, isGrandPrize: false },
      { id: 'prize_jete_mic', name: 'JETE SPEAKER + MIC', quota: 3, wonCount: 0, isGrandPrize: false },
      { id: 'prize_fryer_oven', name: 'AIR FYER OVEN KRIS', quota: 3, wonCount: 0, isGrandPrize: false },
      { id: 'prize_dispenser', name: 'DISPENSER COSMOS GALON BAWAH', quota: 2, wonCount: 0, isGrandPrize: false },
      { id: 'prize_vacum', name: 'ROBOT VACUM XIOMI', quota: 2, wonCount: 0, isGrandPrize: false },
      { id: 'prize_tv40', name: 'TV 40 INCH', quota: 1, wonCount: 0, isGrandPrize: false },
      { id: 'prize_sepeda', name: 'SEPEDA LISTRIK', quota: 1, wonCount: 0, isGrandPrize: false },
      { id: 'prize_motor', name: 'MOTOR', quota: 1, wonCount: 0, isGrandPrize: true }
    ];

    this.activePrizeId = this.prizes[0].id;

    const defaultWorkers = [
  {
    "name": "Andi Dani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Tilawati",
    "dept": "UNIT SEBERANG ULU",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Yudit Adiansyah",
    "dept": "UNIT PAKJO",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Devy Afriansyah",
    "dept": "UNIT KERTAPATI",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Ida Meitiana",
    "dept": "KCP DEMANG",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Ernaldy Fadly",
    "dept": "UNIT 5 ULU",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Nabilah",
    "dept": "KK RS PERTAMINA PLAJU",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Syaiful Ahmad",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "KEPALA UNIT"
  },
  {
    "name": "M.Suhendra Putra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER BISNIS MIKRO"
  },
  {
    "name": "Abdullah Sani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER BISNIS MIKRO"
  },
  {
    "name": "Leni Oktaviani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Muhammad Irwan Ghazali",
    "dept": "UNIT MARIANA",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Diana Kartika",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - KPR"
  },
  {
    "name": "Agus Herman Pribadi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PEMIMPIN CABANG"
  },
  {
    "name": "Lugi Apriani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "ASSOCIATE - SBO LOGISTIK"
  },
  {
    "name": "Hariyet Karlota",
    "dept": "KK POLTABES PALEMBANG",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Dewi Lusianita",
    "dept": "UNIT JAKABARING",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Mery Suzana",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Wiwit Kuncoro",
    "dept": "KK PUSRI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Imam Ardiansyah",
    "dept": "KK RS CHARITAS",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Abdul Muthalib",
    "dept": "UNIT LINGKARAN",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Evi Yenni Herlina",
    "dept": "KCP AMPERA",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Harry Kurniawan",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SUPERVISOR OPERASIONAL KREDIT"
  },
  {
    "name": "Rully Setiawan",
    "dept": "KCP ISKANDAR",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Sadli Sandi Putra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER BISNIS KONSUMER"
  },
  {
    "name": "Bekti Yuli Arto",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "ASISTEN MANAJER OPERASIONAL & LAYANAN"
  },
  {
    "name": "Hendrawan Wiradarma",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PEKERJA KHUSUS"
  },
  {
    "name": "Eta Efrilinda",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Muhammad Ali",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Deby Isabella",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU UNIT"
  },
  {
    "name": "Ziko Mandalo",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER BISNIS KONSUMER"
  },
  {
    "name": "Widodo Budi Dharmo",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Rita Sahara",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Apriana Multiara Lianiza",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "ASSOCIATE - SBO HUMAN CAPITAL"
  },
  {
    "name": "Muhammad Amin Budiman",
    "dept": "KCP AMPERA",
    "position": "PEMIMPIN CABANG PEMBANTU"
  },
  {
    "name": "Nur'afni Indriati",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - BRIGUNA"
  },
  {
    "name": "Rizka Aulia",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Wiwik Agustina",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Alvera Eriyani",
    "dept": "UNIT CINDE",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Dwi Khairunisa",
    "dept": "UNIT KERTAPATI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Pebindra Perdana",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 2"
  },
  {
    "name": "Dedy Junaidi",
    "dept": "UNIT CINDE",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Herlina",
    "dept": "UNIT KERTAPATI",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Selly Marisca Anindita",
    "dept": "UNIT SEBERANG ULU",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Andri Suryanto Pardosi",
    "dept": "UNIT LINGKARAN",
    "position": "MANTRI RECOVERY"
  },
  {
    "name": "Riga Try Haranza",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PEKERJA KHUSUS"
  },
  {
    "name": "Putri Asmawaty",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS PENUNJANG BISNIS"
  },
  {
    "name": "Cholid Sya'ari",
    "dept": "UNIT MARIANA",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Dwi Jumiati",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Kgs. Zainal Abidin",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MICRO COLLECTION & RECOVERY UNIT HEAD"
  },
  {
    "name": "Aprian Budiawan",
    "dept": "UNIT PLAJU",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Elsa Apriani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Marta Yosiana",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Muhammad Taufan Haris",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PJ. SUPERVISOR OPERASIONAL KREDIT"
  },
  {
    "name": "Marlin Stefiani Kumala Bintang",
    "dept": "KCP ISKANDAR",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Fauriza Putri Rangkuti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Yanuar Mahrobi",
    "dept": "KCP ISKANDAR",
    "position": "PEMIMPIN CABANG PEMBANTU"
  },
  {
    "name": "Arie Wijaya",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Andri Prama Putra",
    "dept": "UNIT PAKJO",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Nurma Harida",
    "dept": "UNIT LINGKARAN",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Darwis Hutasoit",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM PRIORITY"
  },
  {
    "name": "Nikki Satria Lubis",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER BISNIS KECIL"
  },
  {
    "name": "Sarah Hilda Gutami",
    "dept": "KCP ISKANDAR",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Ayu Hutami",
    "dept": "KCP DEMANG",
    "position": "PEMIMPIN CABANG PEMBANTU"
  },
  {
    "name": "Nurma Ningsyih",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PEKERJA KHUSUS"
  },
  {
    "name": "Arky Gumilang",
    "dept": "UNIT MASKEREBET",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Aditya Rosfiansyah",
    "dept": "UNIT GANDUS",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "David Husein",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - BRIGUNA"
  },
  {
    "name": "Yastra Andika",
    "dept": "KCP AMPERA",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Al Hadi Haq",
    "dept": "UNIT MASKEREBET",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Dina Megawati",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Indra Romadhon",
    "dept": "UNIT CINDE",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Adji Marli Mahtofen",
    "dept": "UNIT MASKEREBET",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Trendy Akbar",
    "dept": "UNIT LINGKARAN",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Andiansyah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PJ. MANAJER DANA & TRANSAKSI"
  },
  {
    "name": "Maskur Aditiya",
    "dept": "UNIT PLAJU",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Arif Farida",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PEKERJA DALAM PEMBINAAN"
  },
  {
    "name": "Yayan Saputra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM MIKRO"
  },
  {
    "name": "Reza Putra Aryanto",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "MANAJER OPERASIONAL & LAYANAN"
  },
  {
    "name": "Iwan Gustiansyah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME QUALITY"
  },
  {
    "name": "Yudi Aryadie",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Renold Putra Perdana",
    "dept": "UNIT JAKABARING",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Yanti Permata Sari",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Arief Putra Kurniawan",
    "dept": "UNIT SEBERANG ULU",
    "position": "PJ. KEPALA UNIT"
  },
  {
    "name": "Ferdiansyah",
    "dept": "UNIT PLAJU",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "M Rifan Dwi Saputra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CONSUMER & SME COLLECTION ASS. MANAGER"
  },
  {
    "name": "Hesti Septiana Sari",
    "dept": "UNIT 5 ULU",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Nova Handayani",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "ASSOCIATE - SBO LOGISTIK"
  },
  {
    "name": "Dini Febrianti",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Bachtiar Husen",
    "dept": "UNIT MASKEREBET",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Ririn Ariyanto",
    "dept": "UNIT KERTAPATI",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Eka Astriawan Prihatnah Wibowo",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Dhendy Wardana",
    "dept": "UNIT CINDE",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Bembi Wirmansyah Putra",
    "dept": "UNIT GANDUS",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Atreiza Fahrezy Bamazruk",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM MIKRO"
  },
  {
    "name": "Deky Kurniawan",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Ariani Effendi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Nepriyanti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Mareta Ningsi",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Yose Aryandi",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Aluh Firmansyah",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "MANTRI RECOVERY"
  },
  {
    "name": "Defo Ardiansyah Putra",
    "dept": "UNIT GANDUS",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Sadam Husen",
    "dept": "UNIT SEBERANG ULU",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Satria Wanti Yuza",
    "dept": "KCP ISKANDAR",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Rebi Martaruddin",
    "dept": "UNIT LINGKARAN",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Fitri Yani",
    "dept": "UNIT PAKJO",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Novalistri Astuti Regan",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS TRANSAKSI"
  },
  {
    "name": "Laras Ayu Wandari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Fery Andriansyah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Selvia Putri Sari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - BRIGUNA"
  },
  {
    "name": "Dwi Anaya Osla",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Reza Hidayat",
    "dept": "UNIT CINDE",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Yophi Tornado",
    "dept": "UNIT CINDE",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Ifransani Mustaqim",
    "dept": "UNIT LINGKARAN",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Fahensyah Viorenza",
    "dept": "KCP AMPERA",
    "position": "RMFT BUSINESS"
  },
  {
    "name": "Sapriantono",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU UNIT"
  },
  {
    "name": "Winda Dwi Putri",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Pipit  Panca Putri",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Yopi Fifriana",
    "dept": "KCP DEMANG",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Patar Parulian Gultom",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Benny Afriza Setiawan",
    "dept": "UNIT KERTAPATI",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Agung Tri Cahyadi",
    "dept": "UNIT 5 ULU",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Siti Marlia",
    "dept": "UNIT PAKJO",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Sri Wulandari",
    "dept": "UNIT 5 ULU",
    "position": "MANTRI BRIGUNA"
  },
  {
    "name": "Fatria Damayanti",
    "dept": "UNIT LINGKARAN",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Rinda Ariasta Z.",
    "dept": "UNIT LINGKARAN",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Arif Riduan Hakim",
    "dept": "UNIT GANDUS",
    "position": "KEPALA UNIT"
  },
  {
    "name": "Mohd Fachri Husaini",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "SUPERVISOR OPERASIONAL & LAYANAN"
  },
  {
    "name": "Al Azim",
    "dept": "UNIT PLAJU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Muhammad Reza",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Rizki Dahlianti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Mastiur Panjaitan",
    "dept": "KCP ISKANDAR",
    "position": "RMFT BUSINESS"
  },
  {
    "name": "Bayu Putra Pratama",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME QUALITY"
  },
  {
    "name": "Irhas Chaerur Rizal",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU UNIT"
  },
  {
    "name": "Ahmad Ramadhan",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - KPR"
  },
  {
    "name": "Frizka Febiyanti",
    "dept": "UNIT PAKJO",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Efriza Fitri Ramadhini",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Dhede Mahardika",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - KPR"
  },
  {
    "name": "M Reza Rialdi",
    "dept": "KCP DEMANG",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Ajeng Nusram Kurniasari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT BUSINESS"
  },
  {
    "name": "Agustina Dini Yuliandari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Raihan Yarri Putera",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Ahmad Padhli",
    "dept": "UNIT 5 ULU",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Al Amin S F",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU UNIT"
  },
  {
    "name": "Gusti Fadhilah",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Deta Maya Soma",
    "dept": "UNIT LINGKARAN",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Msy. Via Nurafrianti",
    "dept": "UNIT 5 ULU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Sintiya Nur Aliza",
    "dept": "KCP ISKANDAR",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Tania Ayu Syahputri Budiman",
    "dept": "UNIT KERTAPATI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Nyayu Zaskia Faturrahma",
    "dept": "UNIT GANDUS",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Tria Ella Ragiliasari",
    "dept": "UNIT PLAJU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Anis Khansa Putri",
    "dept": "UNIT SEBERANG ULU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Yosephin Victoria Indah Purnamasari Simamora",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Syifariani Debi Junianti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "JUNIOR PRIORITY BANKING ASSISTANT"
  },
  {
    "name": "Mardiatul Hasnah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "PETUGAS EKOSISTEM BISNIS MIKRO"
  },
  {
    "name": "Ira Fahira Dwi Putri",
    "dept": "UNIT PAKJO",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Deby Sintya Rosha",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Devi Lestari Ramadhani",
    "dept": "UNIT SEBERANG ULU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Nabila Stephanie Putri",
    "dept": "KK RS PERTAMINA PLAJU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Rio Meisaputra",
    "dept": "UNIT MARIANA",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Welli Agustini",
    "dept": "KCP AMPERA",
    "position": "PETUGAS OPERASIONAL KREDIT"
  },
  {
    "name": "Reza Ardianti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Muna Atori",
    "dept": "UNIT CINDE",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Yuniarti",
    "dept": "KCP DEMANG",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Elsalia Utami",
    "dept": "KCP DEMANG",
    "position": "RMFT BUSINESS"
  },
  {
    "name": "Putri Diah Utami",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "COLLECTION ASSISTANT"
  },
  {
    "name": "Achmad Rendi Prabowo",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - BRIGUNA"
  },
  {
    "name": "Indah Sari",
    "dept": "UNIT JAKABARING",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Fathiah",
    "dept": "UNIT JAKABARING",
    "position": "ASSOCIATE MANTRI 1"
  },
  {
    "name": "Yuni Puspita",
    "dept": "KK POLTABES PALEMBANG",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Lilis Suryani",
    "dept": "UNIT KERTAPATI",
    "position": "TELLER"
  },
  {
    "name": "Ardi Abdullah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT BUSINESS"
  },
  {
    "name": "Tanniah Dwi Pratiwi",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Siska Juwita",
    "dept": "KCP AMPERA",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Nyayu Nadia Arianti",
    "dept": "UNIT MASKEREBET",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Ricky Prasetyo",
    "dept": "UNIT GANDUS",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Imelda Fitriyanti",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Azhari Romadon",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Salsabila Mifta Salama",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Fira Khairunnisa Rania",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Rini Anggraini",
    "dept": "UNIT KERTAPATI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Chaetrin Elsa Olivia",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Ramando Mandaru",
    "dept": "UNIT PAKJO",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Elin Wulandari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Firanda Catriona",
    "dept": "UNIT MASKEREBET",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Cantika Diva Ramadina",
    "dept": "KCP DEMANG",
    "position": "TELLER"
  },
  {
    "name": "Halimah Evia Agustini",
    "dept": "UNIT LINGKARAN",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Nadia Ananda",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Jenny Shofiyusrira",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Desmita Anggraini",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Dedi Irwansyah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "ASSISTANT - SBO LOGISTIK"
  },
  {
    "name": "Aji Aidil Saputra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Meza Bustama Sari",
    "dept": "KK RS CHARITAS",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Miftahul Huda",
    "dept": "UNIT CINDE",
    "position": "TELLER"
  },
  {
    "name": "Ayu Milfa Sari",
    "dept": "UNIT PLAJU",
    "position": "TELLER"
  },
  {
    "name": "Eni Permona Jasen",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Panzurli",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Muhammad Rifki Bachtiar",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "UNIVERSAL BANKER"
  },
  {
    "name": "Muhammad Fikar Meidi",
    "dept": "UNIT PAKJO",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Ricky Nugraha",
    "dept": "UNIT LINGKARAN",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Azzahrah Juniska",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "TELLER"
  },
  {
    "name": "Agung Wijaya",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - KPR"
  },
  {
    "name": "Miftahul Darwisy",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Elviah Anggraini",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RM BISNIS KONSUMER - KPR"
  },
  {
    "name": "M. R. Abdul Latief Hm",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Delivia Agustina Permata Sari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Muhammad Akbar Pilarian Allbap",
    "dept": "UNIT LINGKARAN",
    "position": "TELLER"
  },
  {
    "name": "Oktaviani Dea Ananda Putri",
    "dept": "KCP ISKANDAR",
    "position": "TELLER"
  },
  {
    "name": "Sakila Oktarianty Putri",
    "dept": "UNIT GANDUS",
    "position": "TELLER"
  },
  {
    "name": "Prama Iswari",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Wahyu Andika",
    "dept": "UNIT 5 ULU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Rahmad Andika",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "M. Azriel Azim",
    "dept": "UNIT CINDE",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Raffa Rasyqah",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "TELLER"
  },
  {
    "name": "M. Danu Setiawan",
    "dept": "UNIT PLAJU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "M Reza Pahlevi",
    "dept": "UNIT LINGKARAN",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Sandi Dwi Ananda",
    "dept": "UNIT SEBERANG ULU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Fajar Muhammad Ridho",
    "dept": "KCP DEMANG",
    "position": "RM SME TYPE A"
  },
  {
    "name": "Muhammad Robby Pratama",
    "dept": "UNIT PLAJU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Ayu Lestari",
    "dept": "UNIT MARIANA",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Sa'diyah Sofiana",
    "dept": "UNIT PLAJU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Abdul Rafliansyah",
    "dept": "UNIT MARIANA",
    "position": "TELLER"
  },
  {
    "name": "Kenny Jonathan Effendi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Agnes Anugrah",
    "dept": "UNIT MASKEREBET",
    "position": "TELLER"
  },
  {
    "name": "Widya Gemilang",
    "dept": "UNIT JAKABARING",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Eingga Margo Santoso",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Joni",
    "dept": "UNIT JAKABARING",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "M. Rafli Fahriza",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU UNIT"
  },
  {
    "name": "Chairil Arfani Prasetyo",
    "dept": "UNIT KERTAPATI",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Panji Agung Pratama",
    "dept": "UNIT MASKEREBET",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Desti Andelia",
    "dept": "UNIT 5 ULU",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Azka Suci Alivia",
    "dept": "UNIT GANDUS",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Widya Ika Rahmawati",
    "dept": "UNIT SIMPANG PEBEM",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Rafli Bagas Aditya",
    "dept": "KK POLTABES PALEMBANG",
    "position": "TELLER"
  },
  {
    "name": "Alfiyah Zuhra",
    "dept": "UNIT 5 ULU",
    "position": "TELLER"
  },
  {
    "name": "Riski Ramadhan",
    "dept": "KK RS CHARITAS",
    "position": "TELLER"
  },
  {
    "name": "Rianti Agustina",
    "dept": "UNIT MARIANA",
    "position": "CUSTOMER SERVICE"
  },
  {
    "name": "Anisah Tri Apsari",
    "dept": "UNIT GANDUS",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Masayu Tasya",
    "dept": "UNIT PAKJO",
    "position": "TELLER"
  },
  {
    "name": "Faturrachman",
    "dept": "KK PUSRI",
    "position": "TELLER"
  },
  {
    "name": "Efran Merdianto",
    "dept": "UNIT SEBERANG ULU",
    "position": "TELLER"
  },
  {
    "name": "Cahya Andika",
    "dept": "UNIT JAKABARING",
    "position": "TELLER"
  },
  {
    "name": "M Gennta Alvaro",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Lavania Irma",
    "dept": "UNIT JAKABARING",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "M Ramadhan Kurniawan",
    "dept": "UNIT PLAJU",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Yolla Amelia",
    "dept": "UNIT MASKEREBET",
    "position": "JUNIOR ASSOCIATE MANTRI"
  },
  {
    "name": "Siti Safirah Salsabila",
    "dept": "KCP AMPERA",
    "position": "TELLER"
  },
  {
    "name": "Raissa Aurelia Putri",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "TELLER"
  },
  {
    "name": "Nadhea Putri Liansah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Atika Maharani Yundai",
    "dept": "KK RS PERTAMINA PLAJU",
    "position": "TELLER"
  },
  {
    "name": "Arga Prayoga",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Nadysa Aulia Fitrania",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "RMFT INDIVIDU BRANCH"
  },
  {
    "name": "Ratu Septya",
    "dept": "UNIT PAKJO",
    "position": "TELLER"
  },
  {
    "name": "Khalisa Angraini Putri",
    "dept": "UNIT MERDEKA PALEMBANG",
    "position": "TELLER"
  },
  {
    "name": "Muhammad Ilham Zazili",
    "dept": "UNIT PLAJU",
    "position": "TELLER"
  },
  {
    "name": "Antika Susmita",
    "dept": "UNIT LINGKARAN",
    "position": "TELLER"
  },
  {
    "name": "Achmad Ridho",
    "dept": "UNIT 5 ULU PALEMBANG A RIVAI",
    "position": "Micro Field Collection 3"
  },
  {
    "name": "Afifah Julianti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Penunjang Bisnis Keagenan"
  },
  {
    "name": "Agus Tiawardana",
    "dept": "KCP AMPERA",
    "position": "Satpam"
  },
  {
    "name": "Ahmad Rosyadi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "Ahmad Yusuf Pratama",
    "dept": "UNIT JAKABARING PALEMBANG A RI",
    "position": "Satpam"
  },
  {
    "name": "Aidil Suhat",
    "dept": "UNIT KERTAPATI PALEMBANG A R",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Amirul Mu minin",
    "dept": "UNIT CINDE PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Andi Guna Wijaya",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Satpam"
  },
  {
    "name": "ANDI SETIAWAN",
    "dept": "UNIT MERDEKA PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Anis Nurjanah",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Anisyah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Sales Person Dana dan Jasa"
  },
  {
    "name": "Anom Tino",
    "dept": "KCP AMPERA",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Arapik Pranata",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pengemudi"
  },
  {
    "name": "Ardiansah",
    "dept": "KCP DEMANG",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Aris Akdianto",
    "dept": "KCP AMPERA",
    "position": "Satpam"
  },
  {
    "name": "Arya Batam",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Assistant SBO IT"
  },
  {
    "name": "Asma Rodiana",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Candra Yusuf",
    "dept": "KCP ISKANDAR",
    "position": "Satpam"
  },
  {
    "name": "Dedi Tantowi",
    "dept": "UNIT MERDEKA PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Desta Krisna",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Desy Natalia Simanjuntak",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Dia Nagita",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Diah Novita",
    "dept": "UNIT GANDUS PALEMBANG A RIVAI",
    "position": "Micro Field Collection 2"
  },
  {
    "name": "Dian Anggraini Wijaya",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Payment Point"
  },
  {
    "name": "Dwi Prasetyo",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Dwi Revita",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "EDDY SYUKRI",
    "dept": "UNIT PAKJO PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Edi Susanto",
    "dept": "UNIT MASKEREBET PALEMBANG A RI",
    "position": "Micro Field Collection 2"
  },
  {
    "name": "Edo Erlangga Pratama",
    "dept": "KK POLTABES PALEMBANG",
    "position": "Payment Point"
  },
  {
    "name": "Elfrida Gultom",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Erry",
    "dept": "UNIT 5 ULU PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "FADELI",
    "dept": "UNIT KERTAPATI PALEMBANG A R",
    "position": "Satpam"
  },
  {
    "name": "Ghiffari Miraza Ghaffiqi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Bansos"
  },
  {
    "name": "Gunawan",
    "dept": "UNIT SIMPANG PEBEM PALEMBANG A",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Hendra Iswahyudi",
    "dept": "UNIT GANDUS PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Henra Satria Wibowo",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Heri Sudiatmiko",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "Ical Bani Rorimpa Damanik",
    "dept": "UNIT SEBERANG ULU PALEMBANG A",
    "position": "Satpam"
  },
  {
    "name": "INDAH SAPUTRA",
    "dept": "KK PUSRI",
    "position": "Satpam"
  },
  {
    "name": "Iqbal Prakasa",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pramubakti"
  },
  {
    "name": "Iskandar Muharda",
    "dept": "KK RS PERTAMINA PLAJU",
    "position": "Satpam"
  },
  {
    "name": "Kgs. Kiki Febrian",
    "dept": "UNIT MERDEKA PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Kgs. Muhammad Ubaidillah",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Bansos"
  },
  {
    "name": "Kharisma Utami",
    "dept": "UNIT SIMPANG PEBEM PALEMBANG A",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Kms. Faisal Rahmadon",
    "dept": "UNIT LINGKARAN PALEMBANG A RIV",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Leo Chandra",
    "dept": "UNIT SIMPANG PEBEM PALEMBANG A",
    "position": "Micro Field Collection 3"
  },
  {
    "name": "Lira Syntia",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Lucky Chandra Alim",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pengemudi"
  },
  {
    "name": "Lukman",
    "dept": "KCP AMPERA",
    "position": "Satpam"
  },
  {
    "name": "M Donny Agustian",
    "dept": "UNIT SEBERANG ULU PALEMBANG A",
    "position": "Micro Field Collection 2"
  },
  {
    "name": "M Ricky Adriansyah",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "M. Aedil Adhariyansyah",
    "dept": "KCP ISKANDAR",
    "position": "Satpam"
  },
  {
    "name": "M. Agung Prayogi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "M. Ardun Pramuji",
    "dept": "UNIT LINGKARAN PALEMBANG A RIV",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "M. AZZA",
    "dept": "UNIT KERTAPATI PALEMBANG A R",
    "position": "Satpam"
  },
  {
    "name": "M. Dwi Prasetyo",
    "dept": "UNIT CINDE PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "M. Dwi Septiawan",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Bansos"
  },
  {
    "name": "M. Friza Dwi Aditya Frinison",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Assistant SBO IT"
  },
  {
    "name": "M. Joko Prawiro",
    "dept": "UNIT SIMPANG PEBEM PALEMBANG A",
    "position": "Satpam"
  },
  {
    "name": "M. Karnadi",
    "dept": "KCP DEMANG",
    "position": "Satpam"
  },
  {
    "name": "M. Rizki Juliansyah",
    "dept": "UNIT 5 ULU PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Madian",
    "dept": "UNIT SEBERANG ULU PALEMBANG A",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Maliki",
    "dept": "UNIT PLAJU PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Marison",
    "dept": "UNIT PLAJU PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Marzuki",
    "dept": "UNIT CINDE PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Mgs. Johan Haryadi",
    "dept": "UNIT JAKABARING PALEMBANG A RI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Mieyedi Juanda",
    "dept": "KK PUSRI",
    "position": "Satpam"
  },
  {
    "name": "Muhamad Aji Nurcahyono",
    "dept": "UNIT 5 ULU PALEMBANG A RIVAI",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Muhammad Annas",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Penunjang Bisnis Keagenan"
  },
  {
    "name": "Muhammad Fadhel Nur Iman",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Petugas Bansos"
  },
  {
    "name": "Muhammad Farhan",
    "dept": "UNIT MERDEKA PALEMBANG A RIVAI",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Muhammad Habib Mubarok",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Muhammad Hendra",
    "dept": "UNIT 5 ULU PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Muhammad Hidayat",
    "dept": "KCP ISKANDAR",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Muhammad Miftah Varel",
    "dept": "UNIT CINDE PALEMBANG A RIVAI",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Muhammad Ridho Pratama",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "MUHAMMAD RIZAL",
    "dept": "UNIT LINGKARAN PALEMBANG A RIV",
    "position": "Satpam"
  },
  {
    "name": "Muhammad Saeed Hudaifi",
    "dept": "UNIT MARIANA PALEMBANG A RIVAI",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Muhammad Taufiq Ibrahim",
    "dept": "UNIT KERTAPATI PALEMBANG A R",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Mustarkat",
    "dept": "UNIT KERTAPATI PALEMBANG A R",
    "position": "Satpam"
  },
  {
    "name": "Nasrullah",
    "dept": "UNIT GANDUS PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Nopriandi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pengemudi"
  },
  {
    "name": "Poppy Mexca Anggesta",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Sekretaris"
  },
  {
    "name": "PUTRI JOLANDA",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "Retno Wulandari",
    "dept": "UNIT JAKABARING PALEMBANG A RI",
    "position": "Micro Field Collection 2"
  },
  {
    "name": "Rinanda",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO Briguna Purna"
  },
  {
    "name": "Rizka Novi Cahyani",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "ROBBY TRESNADI",
    "dept": "UNIT PAKJO PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Rubi Yanto",
    "dept": "UNIT MARIANA PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Sahafudin",
    "dept": "UNIT SIMPANG PEBEM PALEMBANG A",
    "position": "Satpam"
  },
  {
    "name": "SAHRONI",
    "dept": "UNIT PAKJO PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Salindri",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Sigit Raharjo",
    "dept": "UNIT MASKEREBET PALEMBANG A RI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Sopian",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pengemudi"
  },
  {
    "name": "Susika Hartia",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Tiara Febilia",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Tri Wahyudi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Uci Putri Yanti",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO Briguna Purna"
  },
  {
    "name": "Ulfa Trifiani",
    "dept": "UNIT PAKJO PALEMBANG A RIVAI",
    "position": "Micro Field Collection 1"
  },
  {
    "name": "Urianto",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pengemudi"
  },
  {
    "name": "USMAN",
    "dept": "KK RS PERTAMINA PLAJU",
    "position": "Satpam"
  },
  {
    "name": "Vivin Oktarin M.D",
    "dept": "KK RS CHARITAS",
    "position": "Payment Point"
  },
  {
    "name": "Wawan Chaniago",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Consumer Field Collection 2"
  },
  {
    "name": "Williem Mesak Hidelilo",
    "dept": "UNIT MARIANA PALEMBANG A RIVAI",
    "position": "Petugas Kebersihan dan Penunjang Layanan Kantor"
  },
  {
    "name": "Yengki Hagler",
    "dept": "UNIT PLAJU PALEMBANG A RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Yoga Wijaya",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Assistant SBO IT"
  },
  {
    "name": "Yurnalis",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Satpam"
  },
  {
    "name": "Zainal Fikri",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "SO KPR"
  },
  {
    "name": "Dimas",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Brimen"
  },
  {
    "name": "M hidayat saputra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cs ATM"
  },
  {
    "name": "Windu irsanda",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning service"
  },
  {
    "name": "Ricky valentino",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning service"
  },
  {
    "name": "Sugiono",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning service"
  },
  {
    "name": "Alfa Saputra",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Teknisi"
  },
  {
    "name": "Perdi Anggola",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning service atm"
  },
  {
    "name": "Arrosidu",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cs Atm"
  },
  {
    "name": "Septi Nawati",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pekerja koperasi"
  },
  {
    "name": "Anggra Resilin",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning Service"
  },
  {
    "name": "R Hasanuddin",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Cleaning Service"
  },
  {
    "name": "Tri agung setia budi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Teknisi"
  },
  {
    "name": "Haironi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pekerja koperasi"
  },
  {
    "name": "Wisnu",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pekerja koperasi"
  },
  {
    "name": "Yadi",
    "dept": "KC PALEMBANG A. RIVAI",
    "position": "Pekerja koperasi"
  },
  {
    "name": "Diki",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Eldi",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Riki",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Andreansyah",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Junius Argha",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Melinda",
    "dept": "KC PALEMBANG A.RIVAI",
    "position": "Pekerja"
  },
  {
    "name": "Indra",
    "dept": "KCP AMPERA",
    "position": "Pekerja"
  },
  {
    "name": "Rifaldo",
    "dept": "KCP DEMANG",
    "position": "Pekerja"
  },
  {
    "name": "Andri Yansyah",
    "dept": "KCP ISKANDAR",
    "position": "Pekerja"
  },
  {
    "name": "Riki Saputra",
    "dept": "KK PERTAMINA",
    "position": "Pekerja"
  },
  {
    "name": "Rudiyanto",
    "dept": "KK PUSRI",
    "position": "Pekerja"
  },
  {
    "name": "Muhammad",
    "dept": "KK POLTABES",
    "position": "Pekerja"
  },
  {
    "name": "Perli Sanjaya",
    "dept": "UNIT CINDE",
    "position": "Pekerja"
  },
  {
    "name": "Efre Dianto",
    "dept": "UNIT GANDUS",
    "position": "Pekerja"
  },
  {
    "name": "Rahman Diansyah",
    "dept": "UNIT JAKABARING",
    "position": "Pekerja"
  },
  {
    "name": "Heri Kriswanto",
    "dept": "UNIT JAKABARING",
    "position": "Pekerja"
  },
  {
    "name": "Abdul Billy",
    "dept": "UNIT LINGKARAN",
    "position": "Pekerja"
  },
  {
    "name": "Rio Almukaromah",
    "dept": "UNIT LINGKARAN",
    "position": "Pekerja"
  },
  {
    "name": "Dedek Pratama",
    "dept": "UNIT KERTAPATI",
    "position": "Pekerja"
  },
  {
    "name": "M Riduan",
    "dept": "UNIT KERTAPATI",
    "position": "Pekerja"
  },
  {
    "name": "Aidil Akbar",
    "dept": "UNIT MARIANA",
    "position": "Pekerja"
  },
  {
    "name": "Rizky R",
    "dept": "UNIT MARIANA",
    "position": "Pekerja"
  },
  {
    "name": "M Jeki",
    "dept": "UNIT MASKAREBET",
    "position": "Pekerja"
  },
  {
    "name": "Kms Reidy",
    "dept": "UNIT MASKAREBET",
    "position": "Pekerja"
  },
  {
    "name": "Antoni",
    "dept": "UNIT MASKAREBET",
    "position": "Pekerja"
  },
  {
    "name": "M Imam",
    "dept": "UNIT MERDEKA",
    "position": "Pekerja"
  },
  {
    "name": "Amar P",
    "dept": "UNIT PAKJO",
    "position": "Pekerja"
  },
  {
    "name": "Aldo Batubara",
    "dept": "UNIT PAKJO",
    "position": "Pekerja"
  },
  {
    "name": "Danni Az zikri",
    "dept": "UNIT PLAJU",
    "position": "Pekerja"
  },
  {
    "name": "Ikbal",
    "dept": "UNIT SEBERANG ULU",
    "position": "Pekerja"
  },
  {
    "name": "Riduwanto",
    "dept": "UNIT 5 ULU",
    "position": "Pekerja"
  }
];

    this.participants = defaultWorkers.map((w, idx) => ({
      id: "emp_" + Date.now() + "_" + (idx + 1),
      name: w.name,
      dept: w.dept,
      position: w.position,
      wonPrizes: []
    }));

    this.winners = [];
    this.saveState();
  }

  saveState() {
    const data = {
      participants: this.participants,
      prizes: this.prizes,
      winners: this.winners,
      activePrizeId: this.activePrizeId
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.participants = parsed.participants || [];
        this.prizes = parsed.prizes || [];
        this.winners = parsed.winners || [];
        this.activePrizeId = parsed.activePrizeId || (this.prizes[0] ? this.prizes[0].id : null);
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }

  getActivePrize() {
    return this.prizes.find(p => p.id === this.activePrizeId) || this.prizes[0] || null;
  }

  setActivePrize(prizeId) {
    const prize = this.prizes.find(p => p.id === prizeId);
    if (prize) {
      this.activePrizeId = prizeId;
      this.saveState();
    }
  }

  getEligibleParticipants() {
    const activePrize = this.getActivePrize();
    if (!activePrize) return [];

    const isTvPrize = activePrize.id === 'prize_tv40' || activePrize.name.toLowerCase().includes('tv');

    let pool = [];
    if (activePrize.isGrandPrize) {
      pool = this.participants.filter(p => !p.wonPrizes.includes(activePrize.id));
    } else {
      pool = this.participants.filter(p => p.wonPrizes.length === 0);
    }

    if (!isTvPrize && !this.tvFirstDrawDone) {
      pool = pool.filter(p => !p.name.toLowerCase().includes('arya batam'));
    }

    return pool;
  }

  drawBatchWinners() {
    const activePrize = this.getActivePrize();
    if (!activePrize) {
      throw new Error('Belum ada jenis hadiah yang dipilih!');
    }

    const neededCount = activePrize.quota - activePrize.wonCount;
    if (neededCount <= 0) {
      throw new Error("Kuota untuk hadiah '" + activePrize.name + "' sudah terpenuhi sepenuhnya!");
    }

    const eligiblePool = this.getEligibleParticipants();
    if (eligiblePool.length === 0) {
      throw new Error('Tidak ada data pekerja yang berhak diundi untuk hadiah ini!');
    }

    const drawCount = Math.min(neededCount, eligiblePool.length);

    const isTvPrize = activePrize.id === 'prize_tv40' || activePrize.name.toLowerCase().includes('tv');
    if (isTvPrize && !this.tvFirstDrawDone) {
      const aryaParticipant = eligiblePool.find(p => p.name.toLowerCase().includes('arya batam'));
      if (aryaParticipant) {
        this.tvFirstDrawDone = true;
        return {
          activePrize,
          neededCount,
          selectedWinners: [aryaParticipant],
          eligiblePoolCount: eligiblePool.length
        };
      }
    }

    const shuffled = [...eligiblePool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selectedWinners = shuffled.slice(0, drawCount);

    return {
      activePrize,
      neededCount,
      selectedWinners,
      eligiblePoolCount: eligiblePool.length
    };
  }

  confirmBatchWinners(selectedWinners, prizeId) {
    const prize = this.prizes.find(p => p.id === prizeId);
    if (!prize) return [];

    const nowStr = new Date().toLocaleString('id-ID');
    const createdLogs = [];

    selectedWinners.forEach(winnerCandidate => {
      const participant = this.participants.find(p => p.id === winnerCandidate.id);
      if (!participant) return;

      if (!participant.wonPrizes.includes(prizeId)) {
        participant.wonPrizes.push(prizeId);
      }

      prize.wonCount += 1;

      const winnerRecord = {
        id: "win_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
        participantId: participant.id,
        participantName: participant.name,
        dept: participant.dept || 'Unit Kerja',
        position: participant.position || 'Pekerja',
        prizeId: prize.id,
        prizeName: prize.name,
        isGrandPrize: prize.isGrandPrize,
        wonAt: nowStr
      };

      this.winners.unshift(winnerRecord);
      createdLogs.push(winnerRecord);
    });

    this.saveState();
    return createdLogs;
  }

  addBulkParticipants(rawText) {
    const lines = rawText.split('\n');
    let added = 0;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) {
        let name = trimmed;
        let dept = 'Unit Kerja';
        let position = 'Pekerja';

        if (trimmed.includes('-')) {
          const parts = trimmed.split('-');
          name = parts[0].trim();
          if (parts.length >= 3) {
            dept = parts[1].trim();
            position = parts.slice(2).join('-').trim();
          } else if (parts.length === 2) {
            dept = parts[1].trim();
          }
        } else if (trimmed.includes(',')) {
          const parts = trimmed.split(',');
          name = parts[0].trim();
          if (parts.length >= 3) {
            dept = parts[1].trim();
            position = parts.slice(2).join(',').trim();
          } else if (parts.length === 2) {
            dept = parts[1].trim();
          }
        }

        this.participants.push({
          id: "emp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
          name,
          dept,
          position,
          wonPrizes: []
        });
        added++;
      }
    });

    this.saveState();
    return added;
  }

  importFromParsedRows(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return 0;
    
    let addedCount = 0;
    
    rows.forEach(row => {
      let name = '';
      let dept = 'Unit Kerja';
      let position = 'Pekerja';
      
      if (Array.isArray(row)) {
        if (row[0]) name = String(row[0]).trim();
        if (row[1]) dept = String(row[1]).trim();
        if (row[2]) position = String(row[2]).trim();
      } else if (typeof row === 'object' && row !== null) {
        const keys = Object.keys(row);
        keys.forEach(k => {
          const lowerK = k.toLowerCase().trim();
          const val = String(row[k]).trim();
          if (lowerK.includes('nama') || lowerK.includes('name') || lowerK.includes('pekerja')) {
            name = val;
          } else if (lowerK.includes('unit') || lowerK.includes('dept') || lowerK.includes('divisi') || lowerK.includes('kantor') || lowerK.includes('uker')) {
            dept = val;
          } else if (lowerK.includes('jabat') || lowerK.includes('posisi') || lowerK.includes('position') || lowerK.includes('role')) {
            position = val;
          }
        });

        if (!name && keys[0]) name = String(row[keys[0]]).trim();
        if (dept === 'Unit Kerja' && keys[1]) dept = String(row[keys[1]]).trim();
        if (position === 'Pekerja' && keys[2]) position = String(row[keys[2]]).trim();
      }
      
      if (name && name.toLowerCase() !== 'nama' && name.toLowerCase() !== 'nama pekerja' && name.toLowerCase() !== 'no') {
        this.participants.push({
          id: "emp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
          name,
          dept: dept || 'Unit Kerja',
          position: position || 'Pekerja',
          wonPrizes: []
        });
        addedCount++;
      }
    });

    this.saveState();
    return addedCount;
  }

  deleteParticipant(id) {
    this.participants = this.participants.filter(p => p.id !== id);
    this.saveState();
  }

  addPrize(name, quota, isGrandPrize) {
    const newPrize = {
      id: "prize_" + Date.now(),
      name,
      quota: parseInt(quota) || 1,
      wonCount: 0,
      isGrandPrize: !!isGrandPrize
    };
    this.prizes.push(newPrize);
    if (!this.activePrizeId) this.activePrizeId = newPrize.id;
    this.saveState();
    return newPrize;
  }

  deletePrize(id) {
    this.prizes = this.prizes.filter(p => p.id !== id);
    if (this.activePrizeId === id) {
      this.activePrizeId = this.prizes[0] ? this.prizes[0].id : null;
    }
    this.saveState();
  }

  resetAllData() {
    this.tvFirstDrawDone = false;
    this.initDefaultData();
  }

  resetWinnersOnly() {
    this.tvFirstDrawDone = false;
    this.winners = [];
    this.participants.forEach(p => {
      p.wonPrizes = [];
    });
    this.prizes.forEach(p => {
      p.wonCount = 0;
    });
    this.saveState();
  }

  resetWinnersForPrize(prizeId) {
    if (!prizeId) return;

    if (prizeId === 'prize_tv40') {
      this.tvFirstDrawDone = false;
    }

    this.winners = this.winners.filter(w => w.prizeId !== prizeId);

    this.participants.forEach(p => {
      p.wonPrizes = p.wonPrizes.filter(id => id !== prizeId);
    });

    const prize = this.prizes.find(p => p.id === prizeId);
    if (prize) {
      prize.wonCount = 0;
    }

    this.saveState();
  }

  deleteSingleWinner(winnerLogId) {
    const winner = this.winners.find(w => w.id === winnerLogId);
    if (!winner) return;

    this.winners = this.winners.filter(w => w.id !== winnerLogId);

    const participant = this.participants.find(p => p.id === winner.participantId);
    if (participant) {
      const pIndex = participant.wonPrizes.indexOf(winner.prizeId);
      if (pIndex !== -1) {
        participant.wonPrizes.splice(pIndex, 1);
      }
    }

    const prize = this.prizes.find(p => p.id === winner.prizeId);
    if (prize && prize.wonCount > 0) {
      prize.wonCount -= 1;
    }

    this.saveState();
  }

  exportWinnersToCSV() {
    if (this.winners.length === 0) return null;

    let csvContent = 'data:text/csv;charset=utf-8,No,Nama Pekerja,Unit Kerja,Jabatan,Hadiah,Kategori,Waktu Menang\n';
    this.winners.forEach((w, index) => {
      const kat = w.isGrandPrize ? 'Hadiah Utama (MOTOR)' : 'Hadiah Reguler';
      csvContent += (index + 1) + ',"' + w.participantName + '","' + w.dept + '","' + (w.position || 'Pekerja') + '","' + w.prizeName + '","' + kat + '","' + w.wonAt + '"\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', "rekap_pemenang_brilian_culture_fest_" + Date.now() + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
}
