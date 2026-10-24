export type Truck = {
  id: string;
  name: string;
  capacity: string;
  body: string;
  ideal: string;
};

export const FLEET: Truck[] = [
  {
    id: "k1",
    name: "Kapalı Kasa 6 Metre",
    capacity: "10 ton",
    body: "Çelik kapalı kasa, hidrolik lift",
    ideal: "Şehir içi 3+1 ve 4+1 taşıma için ideal.",
  },
  {
    id: "k2",
    name: "Kapalı Kasa 7,5 Metre",
    capacity: "12 ton",
    body: "Çift dingilli, alüminyum kapalı kasa",
    ideal: "Geniş hacimli ve ek hizmetli taşımalar için.",
  },
  {
    id: "k3",
    name: "TIR — 13 Metre",
    capacity: "24 ton",
    body: "Tenteli tır römork, yan açılır",
    ideal: "Şehirlerarası uzun mesafe ve ofis taşımaları için.",
  },
  {
    id: "k4",
    name: "Mobil Dış Cephe Asansörü",
    capacity: "32 metre",
    body: "Hidrolik, çift platformlu",
    ideal: "Yüksek katlı taşımalarda merdiven kullanmadan iniş.",
  },
  {
    id: "k5",
    name: "Panelvan Servis",
    capacity: "1,8 ton",
    body: "Hafif ticari, parça eşya servisi",
    ideal: "Tekli mobilya, beyaz eşya ve öğrenci taşımaları için.",
  },
  {
    id: "k6",
    name: "Kapalı Kasa 5 Metre",
    capacity: "8 ton",
    body: "Tek dingilli, ahşap iç döşeme",
    ideal: "Stüdyo, 1+1 ve 2+1 taşıma için ekonomik seçim.",
  },
];
