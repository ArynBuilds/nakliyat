export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ: FaqItem[] = [
  {
    q: "Taşıma ücretleri nasıl belirlenir?",
    a: "Ücreti belirleyen üç şey var: ev tipi (1+1, 3+1 gibi) ve eşya yoğunluğu, çıkış ile varış arası mesafe, ek hizmetlerin kapsamı (paketleme, asansör, depolama, sigorta tutarı). Online keşif veya yerinde keşif sonrası net fiyat sunarız; sürpriz kalem çıkarmayız.",
  },
  {
    q: "Eşyalarım nasıl paketleniyor ve korunuyor?",
    a: "Her oda kendi stratejisiyle paketlenir. Mutfakta cam ve porselen için ayrı kalınlıkta ambalaj, gardıropta askıda taşıma kutuları, salonda tablo ve ayna için ahşap kasa kullanırız. Her kutu QR kodla etiketlenir; hangi odaya gideceği ve ne yöne dik durması gerektiği yazılır.",
  },
  {
    q: "Taşıma sigortası nedir, neden önemli?",
    a: "Sigorta, taşıma sırasında oluşabilecek hasarın tam tazminatla karşılanmasıdır. Tüm taşımalarımız sigortalıdır; eşyalarınızın değerine göre ek sigorta poliçesi de düzenlenebilir. Hasar durumunda tutanak tutarız ve süreç birkaç gün içinde sonuçlanır.",
  },
  {
    q: "Taşıma günü ne gibi hazırlıklar yapmalıyım?",
    a: "Çok az şey: kişisel evrak, takı ve ilaçları yanınıza alın. Buzdolabını taşımadan en az 6 saat önce fişten çekin. Apartman yönetimi izinlerini biz alırız, asansör ihtiyacı varsa siz uğraşmazsınız. Geri kalanı bizim işimiz.",
  },
  {
    q: "Asansörlü taşıma nedir, ne zaman gerekiyor?",
    a: "Mobil dış cephe asansörü, eşyaların pencereden ya da balkondan paletlerle indirilip yüklenmesini sağlar. Üçüncü kattan yukarısı, dar merdivenli binalar ve hassas eşyalar (piyano, büyük gardırop, kasa) için süreyi yarıya düşürür ve eşyalarınızı güvende tutar.",
  },
  {
    q: "Şehirlerarası taşımada teslim süresi ne kadar?",
    a: "İstanbul'dan İç Anadolu için 1 gün, Ege ve Marmara için aynı gün, Doğu Anadolu için 2 güne kadar uzayan rotalar. Yola çıktığımız andan itibaren GPS takibi aktif, ekip lideri yolculuk boyunca sizinle iletişimde kalır.",
  },
];
