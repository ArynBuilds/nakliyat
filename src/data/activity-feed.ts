export type ActivityEntry = {
  time: string;
  from: string;
  to: string;
  type: string;
};

// Deterministic, hand-curated. Mirrors the kind of moves an Istanbul-based
// company actually does — a mix of intra-Istanbul and intercity, mostly
// residential with the occasional office and specialty.
export const ACTIVITY_ENTRIES: ActivityEntry[] = [
  { time: "Az önce", from: "Kadıköy", to: "Üsküdar", type: "2+1" },
  { time: "12 dk önce", from: "Beşiktaş", to: "Ataşehir", type: "3+1" },
  { time: "47 dk önce", from: "Şişli", to: "Beyoğlu", type: "Stüdyo" },
  { time: "1 sa önce", from: "Bahçelievler", to: "İzmir", type: "Şehirlerarası" },
  { time: "2 sa önce", from: "Sarıyer", to: "Beykoz", type: "4+1" },
  { time: "Bugün 14:50", from: "Maltepe", to: "Kartal", type: "1+1" },
  { time: "Bugün 13:15", from: "Beylikdüzü", to: "Eyüpsultan", type: "2+1" },
  { time: "Bugün 11:30", from: "Levent", to: "Çekmeköy", type: "Ofis" },
  { time: "Bugün 10:45", from: "Bakırköy", to: "Bursa", type: "Şehirlerarası" },
  { time: "Bugün 08:20", from: "Üsküdar", to: "Şile", type: "Piyano" },
  { time: "Dün 17:50", from: "Beşiktaş", to: "Ankara", type: "Şehirlerarası" },
  { time: "Dün 16:10", from: "Bağcılar", to: "Avcılar", type: "Stüdyo" },
  { time: "Dün 14:40", from: "Ümraniye", to: "Pendik", type: "2+1" },
  { time: "Dün 11:00", from: "Esenyurt", to: "Kadıköy", type: "1+1" },
  { time: "Dün 09:30", from: "Fatih", to: "Eskişehir", type: "Şehirlerarası" },
  { time: "Pzt 17:30", from: "Şişli", to: "Beşiktaş", type: "Stüdyo" },
  { time: "Pzt 15:45", from: "Kartal", to: "Maltepe", type: "Depolama" },
  { time: "Pzt 13:00", from: "Esenler", to: "Antalya", type: "Şehirlerarası" },
  { time: "Pzt 10:30", from: "Beyoğlu", to: "Kağıthane", type: "Ofis" },
  { time: "Pzt 08:00", from: "Sancaktepe", to: "Sultanbeyli", type: "1+1" },
  { time: "Paz 16:20", from: "Pendik", to: "Tuzla", type: "3+1" },
  { time: "Paz 12:10", from: "Arnavutköy", to: "Eyüpsultan", type: "2+1" },
  { time: "Paz 09:50", from: "Başakşehir", to: "Konya", type: "Şehirlerarası" },
  { time: "Cmt 15:00", from: "Kadıköy", to: "Çekmeköy", type: "4+1" },
  { time: "Cmt 11:20", from: "Ataşehir", to: "Beykoz", type: "Piyano" },
  { time: "Cum 16:40", from: "Zeytinburnu", to: "Kartal", type: "2+1" },
  { time: "Cum 13:30", from: "Gaziosmanpaşa", to: "Tekirdağ", type: "Şehirlerarası" },
  { time: "Cum 09:15", from: "Bayrampaşa", to: "Esenyurt", type: "Ofis" },
];

export const WEEKLY_TOTAL = 47;
