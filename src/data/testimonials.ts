export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  neighborhood: string;
  rating: 4 | 5;
  highlight?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Annemin piyanosunu hiç korkmadan teslim ettim. Geldiğinde tek bir çiziği bile yoktu.",
    name: "Selin K.",
    neighborhood: "Beşiktaş → Bahçeşehir",
    rating: 5,
    highlight: true,
  },
  {
    id: "t2",
    quote: "Üç çocukla taşınmak kabus gibi gelmişti. Ekip sabah dokuzda geldi, akşam yedide her şey yerindeydi.",
    name: "Mert A.",
    neighborhood: "Kadıköy → Ataşehir",
    rating: 5,
    highlight: true,
  },
  {
    id: "t3",
    quote: "Şehirlerarası taşımada yedi saat boyunca ekiple iletişim kurabildim. Eşyalarım benden önce yeni eve vardı.",
    name: "Aylin D.",
    neighborhood: "Şişli → İzmir",
    rating: 5,
    highlight: true,
  },
  {
    id: "t4",
    quote: "Üç firmadan teklif aldım. Yusufoğlu en uygun değildi ama detaylara verdikleri önem fark yarattı.",
    name: "Burak T.",
    neighborhood: "Ümraniye → Maltepe",
    rating: 5,
  },
  {
    id: "t5",
    quote: "Ofis taşıdık, pazartesi sabahı tek bir kabloya dokunmamıza gerek kalmadı.",
    name: "Ezgi B.",
    neighborhood: "Levent ofis taşıma",
    rating: 5,
  },
  {
    id: "t6",
    quote: "Asansörlü servis sayesinde dördüncü kattan inip çıkmadık. Komşular bile rahat etti.",
    name: "Ahmet Y.",
    neighborhood: "Beyoğlu → Ataköy",
    rating: 5,
  },
  {
    id: "t7",
    quote: "Paketlemeyi onlara bıraktım. Açtığımda her kutu hangi odaya gideceği etiketliydi.",
    name: "Deniz M.",
    neighborhood: "Sarıyer → Sarıyer içi",
    rating: 5,
  },
  {
    id: "t8",
    quote: "Sigortayı kullandığım tek nakliyat oldu, talebim aynı hafta sonuçlandı.",
    name: "Pelin Ç.",
    neighborhood: "Bakırköy → Beylikdüzü",
    rating: 4,
  },
  {
    id: "t9",
    quote: "Üniversite eşyamı tek başıma taşıyacağımı sanmıştım. Bir gün önce arayıp halletiler.",
    name: "Cem U.",
    neighborhood: "Üsküdar → Eskişehir",
    rating: 5,
  },
  {
    id: "t10",
    quote: "Yedi yaşındaki kızıma rahat hissettiren tek ekip oldular. Eşyalarına dokunmadan önce izin istediler.",
    name: "Selma N.",
    neighborhood: "Çekmeköy → Çekmeköy içi",
    rating: 5,
  },
  {
    id: "t11",
    quote: "Yedek anahtarımı bile unuttuğumu iki saat sonra haber verdiler. Bu özen başka yerde yok.",
    name: "İlker O.",
    neighborhood: "Fatih → Eyüpsultan",
    rating: 5,
  },
  {
    id: "t12",
    quote: "Depoda altı ay tuttuk eşyaları. Geldiğinde toz dahi yoktu, tüm bilgileri fotoğrafla paylaştılar.",
    name: "Hande K.",
    neighborhood: "Avcılar → Yurt dışı dönüş",
    rating: 5,
  },
];
