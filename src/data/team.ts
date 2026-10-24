export type TeamMember = {
  id: string;
  name: string;
  role: string;
  yearsAt: number;
  yearsExperience: number;
  bio: string;
  photoSeed: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "yusuf",
    name: "Yusuf Aslan",
    role: "Kurucu · Operasyon Şefi",
    yearsAt: 25,
    yearsExperience: 32,
    bio: "Yirmi beş yıl önce ilk kamyonla yolculuğa çıkan kurucumuz. Her keşif görüşmesini hâlâ kendisi yapar.",
    photoSeed: "yusuf-aslan",
  },
  {
    id: "mehmet",
    name: "Mehmet Demir",
    role: "Saha Şefi",
    yearsAt: 18,
    yearsExperience: 22,
    bio: "İstanbul'un her sokağını parmak izi gibi bilir. Asansörlü taşımalarda ekibi yönetir.",
    photoSeed: "mehmet-demir",
  },
  {
    id: "ayse",
    name: "Ayşe Kara",
    role: "Müşteri Deneyimi",
    yearsAt: 9,
    yearsExperience: 12,
    bio: "Telefonun diğer ucundaki sakin ses. Tüm teklif görüşmelerini koordine eder.",
    photoSeed: "ayse-kara",
  },
  {
    id: "burak",
    name: "Burak Yılmaz",
    role: "Şehirlerarası Sefer Şoförü",
    yearsAt: 12,
    yearsExperience: 19,
    bio: "Türkiye'nin 81 iline tekrar tekrar gitti. Yola çıkmadan hava durumunu üç kez kontrol eder.",
    photoSeed: "burak-yilmaz",
  },
  {
    id: "selin",
    name: "Selin Erbaş",
    role: "Paketleme Uzmanı",
    yearsAt: 7,
    yearsExperience: 11,
    bio: "Cam, porselen ve sanat eseri için ambalaj stratejisini kuran kişi.",
    photoSeed: "selin-erbas",
  },
  {
    id: "okan",
    name: "Okan Yıldız",
    role: "Depo Sorumlusu",
    yearsAt: 6,
    yearsExperience: 10,
    bio: "Klimalı depolarda her parçanın hangi raftaki paletin hangi kutusunda olduğunu bilir.",
    photoSeed: "okan-yildiz",
  },
];
