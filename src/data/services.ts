export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  bullets: string[];
  process: { title: string; body: string }[];
  pricingFactors: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "evden-eve-nakliyat",
    title: "Evden Eve Nakliyat",
    short: "Stüdyodan dört odaya, kapıdan kapıya bütün taşıma süreci.",
    long: "Yirmi beş yılı aşkın tecrübemizle stüdyo dairelerden dört odalı evlere kadar her ölçekte taşımayı uzman ekiplerimizle tamamlıyoruz. Ön keşif, paketleme, yükleme, taşıma ve yerleştirmeyi tek bir ekiple yönetiyoruz; eşyalarınız bir saat bile sahipsiz kalmaz.",
    bullets: [
      "1+1, 2+1, 3+1, 4+1 ve daha büyük konutlar",
      "Ön keşif ve detaylı planlama",
      "Sigortalı taşıma, hasar durumunda tam tazminat",
      "Mobilya sökme ve yerinde kurulum dahil",
    ],
    process: [
      { title: "Keşif", body: "Online görüşme veya yerinde ücretsiz keşif ile eşya hacmi belirlenir." },
      { title: "Paketleme", body: "Profesyonel ambalaj malzemesiyle her parça etiketlenerek paketlenir." },
      { title: "Taşıma", body: "Uzman ekip, tam donanımlı araçla rotanızı sigortalı şekilde tamamlar." },
      { title: "Yerleştirme", body: "Yeni evinizde mobilyalar kurulur, kutular istenen odalara yerleştirilir." },
    ],
    pricingFactors: [
      "Ev tipi ve eşya yoğunluğu",
      "Çıkış ve varış arasındaki mesafe",
      "Asansör veya vinç ihtiyacı",
      "Paketleme ve depolama gibi ek hizmetler",
    ],
  },
  {
    slug: "asansorlu-nakliyat",
    title: "Asansörlü Nakliyat",
    short: "Yüksek katlardan vinçle güvenli, hızlı ve eşyaya zarar vermeyen taşıma.",
    long: "Dar merdivenlerin, hassas eşyaların ve yüksek katların çözümü asansörlü taşımadır. Mobil dış cephe asansörlerimizle eşyalarınızı pencereden indirir, taşıma süresini ortalama yarıya düşürürüz.",
    bullets: [
      "32 metreye kadar mobil dış cephe asansörü",
      "Piyano, kasa, büyük gardırop için özel donanım",
      "Apartman yönetimi ve trafik izinleri tarafımızdan",
      "Standart taşımaya göre %50 daha kısa süre",
    ],
    process: [
      { title: "Yer keşfi", body: "Asansör konumlandırılacak alanı önceden inceler, izinleri biz alırız." },
      { title: "Kurulum", body: "Mobil asansör konuşlandırılır, pencere açıklığı paspaslarla korumaya alınır." },
      { title: "İndirme", body: "Eşyalar paletlerle pencere yüksekliğine indirilir, ekip içeride yönlendirir." },
      { title: "Yükleme", body: "Aracın kasasına ergonomik düzende istiflenir, yola çıkılır." },
    ],
    pricingFactors: [
      "Kat sayısı ve cephe yüksekliği",
      "Asansör kullanım süresi",
      "Trafik kapatma izni gerektiren bölgeler",
      "Hassas eşya sayısı",
    ],
  },
  {
    slug: "sehirlerarasi-nakliyat",
    title: "Şehirlerarası Nakliyat",
    short: "İstanbul'dan 81 ile, sigortalı ve takip edilebilir taşıma.",
    long: "Türkiye'nin tüm illerine kapıdan kapıya taşıma. Sefere çıkan her aracımız GPS ile izlenir, ekipler aynı gün içinde varış noktasına ulaşır. Uzun mesafe taşımalarda ekstra ambalaj ve sabitleme uygulanır.",
    bullets: [
      "81 il, kapıdan kapıya teslim",
      "GPS takibi ve ekip iletişim numarası",
      "Geniş kasalı kamyonlar ve TIR",
      "Yol sigortası ve hasar tazminatı",
    ],
    process: [
      { title: "Planlama", body: "Tarih, rota ve ara duraklar belirlenir; izin ve mola süreleri ayarlanır." },
      { title: "Yükleme", body: "Eşyalar darbe emici ekipmanlarla araca sabitlenir." },
      { title: "Yolculuk", body: "Şoför ve ekip lideri yolculuk boyunca sizinle iletişimde kalır." },
      { title: "Teslim", body: "Varış noktasında karşılama, indirme ve yerleştirme aynı ekiple tamamlanır." },
    ],
    pricingFactors: [
      "Şehirler arası mesafe",
      "Yük hacmi ve araç tipi",
      "Otoyol ve geçiş ücretleri",
      "Hızlı teslim talebi",
    ],
  },
  {
    slug: "parca-esya-tasima",
    title: "Parça Eşya Taşıma",
    short: "Tek bir koltuktan tek bir piyanoya — küçük taşımalarda da aynı özen.",
    long: "Tüm eviniz değil sadece birkaç parça mı taşıyorsunuz? Parça eşya servisimiz, küçük taşımaları büyük taşıma kalitesinde tamamlar. Yeni alınan beyaz eşya, antika mobilya ya da öğrenci taşıması için idealdir.",
    bullets: [
      "Tek koltuk, beyaz eşya, piyano taşıma",
      "Aynı gün ve ertesi gün servis",
      "Konumdan konuma minimum hasar garantisi",
      "Apartman ve site içi izinli taşıma",
    ],
    process: [
      { title: "Ölçü", body: "Parçanın boyutu, ağırlığı ve hassasiyeti telefonda belirlenir." },
      { title: "Ambalaj", body: "Kabarcıklı naylon, köpük ve battaniye ile koruma sağlanır." },
      { title: "Taşıma", body: "Küçük taşımalara uygun panelvan veya kamyonet aracımızla rotaya çıkılır." },
      { title: "Teslim", body: "Eşya istenen odaya kurulur, ambalaj malzemeleri toplanır." },
    ],
    pricingFactors: [
      "Eşya sayısı ve hacmi",
      "Çıkış ve varış katları",
      "Mesafe",
      "Ambalaj ihtiyacı",
    ],
  },
  {
    slug: "paketleme-hizmeti",
    title: "Paketleme Hizmeti",
    short: "Bardaktan kitaplığa, her parça müzeye gider gibi paketlenir.",
    long: "Profesyonel paketleme, taşımanın gerçek sigortasıdır. Her odaya özel ambalaj stratejisi uygular, mutfaktaki bir bardak ile salondaki tabloyu aynı titizlikle hazırlarız. Paketleme bittiğinde yapılması gereken tek şey kapıyı kilitlemektir.",
    bullets: [
      "Mutfak, gardırop, çocuk odası özel paketlemesi",
      "Tablo, ayna, sanat eseri için ahşap kasa",
      "Her kutuya QR kodlu içerik etiketi",
      "Ambalaj malzemesi taşımaya dahil",
    ],
    process: [
      { title: "Sınıflandırma", body: "Eşyalar oda ve hassasiyetlerine göre gruplanır." },
      { title: "Ambalaj", body: "Cam, porselen, elektronik ve mobilya için ayrı ayrı koruma uygulanır." },
      { title: "Etiketleme", body: "Her kutu QR kodla etiketlenir; hangi odaya, ne yöne dik konacağı yazılır." },
      { title: "Teslim", body: "Yeni evinizde kutular doğru odalara taşınır ve istenen sırayla açılır." },
    ],
    pricingFactors: [
      "Paketlenecek oda sayısı",
      "Hassas eşya oranı",
      "Ambalaj malzemesi türü",
      "Açma ve yerleştirme talebi",
    ],
  },
  {
    slug: "depolama",
    title: "Eşya Depolama",
    short: "Kuru, güvenli, kameralı depolarımızda istediğiniz kadar süre.",
    long: "Yeni eviniz hazır olana kadar ya da uzun süreli yurt dışı için eşyalarınızı güvenli depolarımızda saklıyoruz. Klimalı, nem kontrollü ve 24 saat kameralı depolarımızda her parça palet üzerinde, etiketli ve sigortalıdır.",
    bullets: [
      "Klimalı ve nem kontrollü alan",
      "24 saat kamera ve hareket sensörü",
      "Aylık ve yıllık esnek paketler",
      "Depodan kapıya doğrudan teslim",
    ],
    process: [
      { title: "Stoklama", body: "Eşyalar paletlere yerleştirilir, hacim çıkarılır, sözleşme imzalanır." },
      { title: "Saklama", body: "Depo şartları sürekli izlenir, eşyalarınızın fotoğrafı paylaşılır." },
      { title: "İzleme", body: "İstediğiniz zaman depoya gelerek eşyalarınızı kontrol edebilirsiniz." },
      { title: "Teslim", body: "Yeni adresinize taşıma ve kurulum aynı ekiple yapılır." },
    ],
    pricingFactors: [
      "Saklanacak hacim",
      "Saklama süresi",
      "Sigorta tutarı",
      "Stoklama ve teslim sıklığı",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
