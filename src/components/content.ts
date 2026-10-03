export type Lang = "en" | "th";

type Entry = { title: string; body: string };
type Station = { title: string; body: string };

export type Copy = {
  nav: { record: string; grades: string; route: string; mission: string; enquire: string; neo: string; shop: string };
  langLabel: string;
  enquire: string;
  openBook: string;
  coverLabel: string;
  tagline: string;
  intro: string;
  sampleNote: string;
  plateNote: string;
  aboutTitle: string;
  aboutFields: { label: string; value: string }[];
  recordTitle: string;
  recordLead: string;
  stampTop: string;
  stampBottom: string;
  entries: Entry[];
  gradesTitle: string;
  gradesBody: string;
  marketCol: string;
  criteria: string[];
  markets: string[];
  gradesCaption: string;
  routeTitle: string;
  routeLead: string;
  stations: Station[];
  missionTitle: string;
  mission: string;
  goal: string;
  enquireTitle: string;
  enquireLead: string;
  form: {
    name: string;
    company: string;
    country: string;
    type: string;
    types: string[];
    message: string;
    messageHint: string;
    submit: string;
    sending: string;
    demoNote: string;
    received: string;
    receivedBody: string;
    again: string;
    errors: { name: string; company: string; country: string; message: string };
  };
  credential: string;
  neoTitle: string;
  neoLead: string;
  neoLines: { title: string; body: string }[];
  neoLinesNote: string;
  neoRecordTitle: string;
  neoRecord: { label: string; value: string }[];
  neoStampTop: string;
  neoStampBottom: string;
  neoCertSlot: string;
  shopTitle: string;
  shopLead: string;
  shopOpen: string;
  shopNote: string;
  channelsTitle: string;
  channelsTbc: string;
  credits: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    nav: { record: "Record", grades: "Grades", route: "Route", mission: "Mission", enquire: "Enquire", neo: "NEO-HELIOS", shop: "Shop" },
    langLabel: "ภาษาไทย",
    enquire: "Enquire",
    openBook: "Open the record",
    coverLabel: "Book of record · Thai goldfish for export",
    tagline: "Professional Goldfish Farm from Thailand",
    intro:
      "We are a goldfish farm in Thailand, breeding and developing quality goldfish for overseas markets, with a pond system built for large numbers of fish and hands-on experience preparing fish for long-distance shipping.",
    sampleNote: "Sample photo",
    plateNote: "Oranda, for reference",
    aboutTitle: "About the farm",
    aboutFields: [
      { label: "Farm", value: "Nana Goldfish Farm" },
      { label: "Origin", value: "Thailand" },
      { label: "Markets", value: "Asia & overseas" },
      { label: "Work", value: "Breeding · selection · export preparation" },
    ],
    recordTitle: "What we keep on record",
    recordLead: "Seven standards behind every batch that leaves the farm.",
    stampTop: "CHECKED",
    stampBottom: "ตรวจแล้ว",
    entries: [
      {
        title: "A large farm, ready for volume orders",
        body: "Our many ponds let us raise several generations and sizes at once, so business and export customers can be supplied continuously.",
      },
      {
        title: "Selected to the farm’s own standard",
        body: "Every batch is selected by our farm team, judged on body shape, structure, completeness, colour and overall quality, to keep the Nana Goldfish Farm standard.",
      },
      {
        title: "Many grades for many markets",
        body: "From fish for the general market to high-quality fish for collectors, shops and export markets.",
      },
      {
        title: "Experienced in export",
        body: "Nana Goldfish Farm has shipped goldfish to customers in many countries across Asia and overseas, with set routines for preparing, packing and handling fish before the journey.",
      },
      {
        title: "Systematic care for fish health and water",
        body: "Water quality, fish health, quarantine and pre-shipment preparation come first, so the fish are as ready as they can be when they reach you.",
      },
      {
        title: "Long-term business with customers and agents",
        body: "We are not after a single sale. We want lasting relationships with shops, importers and partners, built on consistent quality and a fair allocation of fish.",
      },
      {
        title: "A farm that keeps improving",
        body: "Quality has no finish line. We keep developing our bloodlines, rearing systems, farm management and export standards.",
      },
    ],
    gradesTitle: "One farm, many grades",
    gradesBody:
      "We raise fish across a range of grades, so each market gets the fish that fits it, from everyday stock to fish chosen for collectors.",
    marketCol: "Market",
    criteria: ["Body shape", "Structure", "Completeness", "Colour", "Overall quality"],
    markets: ["General market", "Shops", "Collectors", "Export markets"],
    gradesCaption: "Every batch, for every market, is judged on the same five points by the farm team.",
    routeTitle: "From our ponds to your tanks",
    routeLead: "One continuous line of care, from the day a fish is raised to the day it departs.",
    stations: [
      { title: "Raised in farm ponds", body: "Many batches and sizes, grown side by side." },
      { title: "Selected by the farm team", body: "Shape, structure, completeness, colour, overall quality." },
      { title: "Quarantine & water care", body: "Water quality and fish health, monitored as a system." },
      { title: "Conditioned for travel", body: "Fish are prepared before they are packed." },
      { title: "Packed for the journey", body: "Packing routines built for long-distance shipping." },
      { title: "Departure", body: "To shops, importers and partners abroad." },
    ],
    missionTitle: "Our Mission",
    mission: "To produce quality Thai goldfish and bring them to customers around the world.",
    goal: "Our goal is to grow Nana Goldfish Farm into one of the goldfish farms from Thailand trusted by customers worldwide.",
    enquireTitle: "Write to the farm",
    enquireLead:
      "Importers, distributors, shops and agents: tell us what you are looking for and the farm team will reply.",
    form: {
      name: "Your name",
      company: "Company",
      country: "Country",
      type: "Your business",
      types: ["Importer / distributor", "Aquarium shop", "Agent", "Collector", "Other"],
      message: "What are you looking for?",
      messageHint: "Varieties, sizes, quantity, destination airport",
      submit: "Send enquiry",
      sending: "Recording…",
      demoNote: "Demo form: enquiries are not sent anywhere yet.",
      received: "Recorded",
      receivedBody: "This is a demo, so nothing was sent. In the live site your enquiry would go straight to the farm team.",
      again: "Write another enquiry",
      errors: {
        name: "Add your name so we know who to reply to.",
        company: "Add your company or shop name.",
        country: "Add the country you import into.",
        message: "Tell us briefly what you need, at least 10 characters.",
      },
    },
    credential: "Official Distributor in Thailand",
    neoTitle: "Official Distributor of NEO-HELIOS in Thailand",
    neoLead:
      "Nana Goldfish Farm is the official Thai distributor of NEO-HELIOS aquarium LED lighting. Buying through us means buying through the brand’s official channel in Thailand.",
    neoLines: [
      { title: "Lights that show fish colour", body: "Lighting designed to bring out the colour of goldfish and other display fish." },
      { title: "Full-spectrum aquarium lights", body: "For fish tanks and planted aquariums." },
      { title: "Slim fixtures in several sizes", body: "From nano tanks to larger display aquariums." },
    ],
    neoLinesNote: "Product lines in general terms. Ask the farm for current models.",
    neoRecordTitle: "Record of appointment",
    neoRecord: [
      { label: "Brand", value: "NEO-HELIOS" },
      { label: "Products", value: "Aquarium LED lighting" },
      { label: "Territory", value: "Thailand" },
      { label: "Distributor", value: "Nana Goldfish Farm" },
    ],
    neoStampTop: "OFFICIAL",
    neoStampBottom: "ตัวแทนจำหน่าย",
    neoCertSlot: "Certificate of appointment: image to be added",
    shopTitle: "Buy online",
    shopLead: "Order from Nana Goldfish Farm on the platforms you already use.",
    shopOpen: "Open",
    shopNote: "Direct shop links to be added. For now each button searches the platform.",
    channelsTitle: "LINE · WhatsApp · Email",
    channelsTbc: "Contact details to be added",
    credits: "Sample photographs from Wikimedia Commons",
  },
  th: {
    nav: { record: "จุดเด่น", grades: "เกรดปลา", route: "เส้นทาง", mission: "พันธกิจ", enquire: "ติดต่อ", neo: "NEO-HELIOS", shop: "ช่องทางซื้อ" },
    langLabel: "English",
    enquire: "ติดต่อสอบถาม",
    openBook: "เปิดสมุดบันทึก",
    coverLabel: "สมุดบันทึกฟาร์ม · ปลาทองไทยเพื่อการส่งออก",
    tagline: "Professional Goldfish Farm from Thailand",
    intro:
      "เราคือฟาร์มปลาทองจากประเทศไทย ที่มุ่งเน้นการเพาะเลี้ยงและพัฒนาปลาทองคุณภาพสำหรับตลาดต่างประเทศ ด้วยระบบการเลี้ยงที่รองรับปลาจำนวนมาก และประสบการณ์ในการจัดเตรียมปลาสำหรับการขนส่งระยะไกล",
    sampleNote: "ภาพตัวอย่าง",
    plateNote: "ออรันดา ภาพอ้างอิง",
    aboutTitle: "เกี่ยวกับฟาร์ม",
    aboutFields: [
      { label: "ฟาร์ม", value: "Nana Goldfish Farm" },
      { label: "แหล่งที่มา", value: "ประเทศไทย" },
      { label: "ตลาด", value: "เอเชียและต่างประเทศ" },
      { label: "งานของเรา", value: "เพาะเลี้ยง · คัดเลือก · เตรียมส่งออก" },
    ],
    recordTitle: "จุดเด่นของเรา",
    recordLead: "มาตรฐาน 7 ข้อ ที่อยู่เบื้องหลังปลาทุกชุดที่ออกจากฟาร์ม",
    stampTop: "CHECKED",
    stampBottom: "ตรวจแล้ว",
    entries: [
      {
        title: "ฟาร์มขนาดใหญ่ รองรับออเดอร์จำนวนมาก",
        body: "เรามีระบบบ่อเลี้ยงจำนวนมาก ทำให้สามารถดูแลปลาได้หลายรุ่น หลายขนาด และรองรับความต้องการของลูกค้าธุรกิจและลูกค้าส่งออกได้อย่างต่อเนื่อง",
      },
      {
        title: "คัดเลือกปลาด้วยมาตรฐานของฟาร์ม",
        body: "ปลาแต่ละชุดผ่านการคัดเลือกจากทีมงานของฟาร์ม โดยพิจารณาจากทรงปลา โครงสร้าง ความสมบูรณ์ สี และคุณภาพโดยรวม เพื่อรักษามาตรฐานของ Nana Goldfish Farm",
      },
      {
        title: "มีหลายเกรดสำหรับหลายตลาด",
        body: "เรามีปลาหลากหลายระดับ ตั้งแต่ปลาสำหรับตลาดทั่วไป ไปจนถึงปลาคุณภาพสูงสำหรับนักสะสม ร้านค้า และตลาดส่งออก",
      },
      {
        title: "มีประสบการณ์ด้านการส่งออก",
        body: "Nana Goldfish Farm มีประสบการณ์จัดส่งปลาทองให้ลูกค้าในหลายประเทศทั่วเอเชียและตลาดต่างประเทศ พร้อมระบบเตรียมปลา แพ็กปลา และจัดการก่อนการเดินทาง",
      },
      {
        title: "ระบบดูแลสุขภาพปลาและคุณภาพน้ำอย่างเป็นระบบ",
        body: "เราให้ความสำคัญกับคุณภาพน้ำ สุขภาพปลา การกักปลา และการเตรียมปลาก่อนส่ง เพื่อให้ปลามีความพร้อมมากที่สุดก่อนถึงมือลูกค้า",
      },
      {
        title: "เน้นธุรกิจระยะยาวกับลูกค้าและตัวแทน",
        body: "เราไม่ได้มุ่งเน้นเพียงการขายครั้งเดียว แต่ต้องการสร้างความสัมพันธ์ระยะยาวกับร้านค้า ผู้นำเข้า และคู่ค้าของเรา ด้วยคุณภาพที่สม่ำเสมอและการจัดสรรปลาอย่างเหมาะสม",
      },
      {
        title: "พัฒนาฟาร์มอย่างต่อเนื่อง",
        body: "เราเชื่อว่าคุณภาพไม่มีจุดสิ้นสุด จึงพัฒนาทั้งสายพันธุ์ ระบบเลี้ยง การจัดการฟาร์ม และมาตรฐานการส่งออกอย่างต่อเนื่อง",
      },
    ],
    gradesTitle: "หลายเกรด สำหรับหลายตลาด",
    gradesBody:
      "เราเลี้ยงปลาหลายระดับคุณภาพ เพื่อให้แต่ละตลาดได้ปลาที่เหมาะสม ตั้งแต่ปลาสำหรับตลาดทั่วไป ไปจนถึงปลาที่คัดมาเพื่อนักสะสม",
    marketCol: "ตลาด",
    criteria: ["ทรงปลา", "โครงสร้าง", "ความสมบูรณ์", "สี", "คุณภาพโดยรวม"],
    markets: ["ตลาดทั่วไป", "ร้านค้า", "นักสะสม", "ตลาดส่งออก"],
    gradesCaption: "ปลาทุกชุด ทุกตลาด ผ่านการพิจารณา 5 ด้านเดียวกันโดยทีมงานของฟาร์ม",
    routeTitle: "จากบ่อของเรา ถึงตู้ของคุณ",
    routeLead: "การดูแลที่ต่อเนื่องเป็นเส้นเดียว ตั้งแต่วันที่เลี้ยงจนถึงวันที่ปลาออกเดินทาง",
    stations: [
      { title: "เลี้ยงในบ่อของฟาร์ม", body: "หลายรุ่น หลายขนาด เลี้ยงคู่กันไป" },
      { title: "คัดเลือกโดยทีมงานฟาร์ม", body: "ทรงปลา โครงสร้าง ความสมบูรณ์ สี คุณภาพโดยรวม" },
      { title: "กักปลาและดูแลคุณภาพน้ำ", body: "ดูแลคุณภาพน้ำและสุขภาพปลาอย่างเป็นระบบ" },
      { title: "เตรียมความพร้อมก่อนส่ง", body: "เตรียมปลาให้พร้อมก่อนแพ็ก" },
      { title: "แพ็กปลาสำหรับการเดินทาง", body: "ขั้นตอนการแพ็กสำหรับการขนส่งระยะไกล" },
      { title: "ออกเดินทาง", body: "สู่ร้านค้า ผู้นำเข้า และคู่ค้าในต่างประเทศ" },
    ],
    missionTitle: "Our Mission",
    mission: "To produce quality Thai goldfish and bring them to customers around the world.",
    goal: "เป้าหมายของเราคือการพัฒนา Nana Goldfish Farm ให้เป็นหนึ่งในฟาร์มปลาทองจากประเทศไทยที่ได้รับความเชื่อถือจากลูกค้าทั่วโลก",
    enquireTitle: "เขียนถึงฟาร์ม",
    enquireLead: "ผู้นำเข้า ผู้จัดจำหน่าย ร้านค้า และตัวแทน บอกเราว่าคุณกำลังมองหาอะไร แล้วทีมงานฟาร์มจะติดต่อกลับ",
    form: {
      name: "ชื่อของคุณ",
      company: "บริษัท / ร้าน",
      country: "ประเทศ",
      type: "ประเภทธุรกิจ",
      types: ["ผู้นำเข้า / ผู้จัดจำหน่าย", "ร้านปลาสวยงาม", "ตัวแทน", "นักสะสม", "อื่น ๆ"],
      message: "คุณกำลังมองหาอะไร",
      messageHint: "สายพันธุ์ ขนาด จำนวน สนามบินปลายทาง",
      submit: "ส่งคำถาม",
      sending: "กำลังบันทึก…",
      demoNote: "แบบฟอร์มตัวอย่าง: ยังไม่ได้ส่งข้อมูลไปที่ใด",
      received: "บันทึกแล้ว",
      receivedBody: "นี่คือเว็บตัวอย่าง จึงยังไม่มีการส่งข้อมูล ในเว็บจริงคำถามของคุณจะส่งถึงทีมงานฟาร์มโดยตรง",
      again: "เขียนคำถามใหม่",
      errors: {
        name: "กรุณากรอกชื่อ เพื่อให้เราติดต่อกลับได้",
        company: "กรุณากรอกชื่อบริษัทหรือร้าน",
        country: "กรุณากรอกประเทศที่นำเข้า",
        message: "กรุณาบอกความต้องการสั้น ๆ อย่างน้อย 10 ตัวอักษร",
      },
    },
    credential: "ตัวแทนจำหน่ายอย่างเป็นทางการในประเทศไทย",
    neoTitle: "ตัวแทนจำหน่ายอย่างเป็นทางการของ NEO-HELIOS ในประเทศไทย",
    neoLead:
      "Nana Goldfish Farm เป็นตัวแทนจำหน่ายอย่างเป็นทางการของไฟ LED ตู้ปลา NEO-HELIOS ในประเทศไทย ซื้อผ่านเรา คือซื้อผ่านช่องทางทางการของแบรนด์ในประเทศไทย",
    neoLines: [
      { title: "ไฟสำหรับโชว์สีปลา", body: "ออกแบบมาเพื่อดึงสีของปลาทองและปลาสวยงามให้เด่นชัด" },
      { title: "ไฟฟูลสเปกตรัมสำหรับตู้ปลา", body: "สำหรับตู้ปลาและตู้ไม้น้ำ" },
      { title: "โคมบางหลายขนาด", body: "ตั้งแต่ตู้นาโนไปจนถึงตู้โชว์ขนาดใหญ่" },
    ],
    neoLinesNote: "แสดงไลน์สินค้าโดยรวม สอบถามรุ่นปัจจุบันได้ที่ฟาร์ม",
    neoRecordTitle: "บันทึกการแต่งตั้ง",
    neoRecord: [
      { label: "แบรนด์", value: "NEO-HELIOS" },
      { label: "สินค้า", value: "ไฟ LED ตู้ปลา" },
      { label: "พื้นที่", value: "ประเทศไทย" },
      { label: "ตัวแทนจำหน่าย", value: "Nana Goldfish Farm" },
    ],
    neoStampTop: "OFFICIAL",
    neoStampBottom: "ตัวแทนจำหน่าย",
    neoCertSlot: "หนังสือแต่งตั้งตัวแทนจำหน่าย: รอใส่ภาพ",
    shopTitle: "สั่งซื้อออนไลน์",
    shopLead: "สั่งซื้อจาก Nana Goldfish Farm ได้บนแพลตฟอร์มที่คุณใช้อยู่แล้ว",
    shopOpen: "เปิด",
    shopNote: "รอใส่ลิงก์ร้านโดยตรง ตอนนี้ปุ่มจะค้นหาร้านบนแพลตฟอร์มให้ก่อน",
    channelsTitle: "LINE · WhatsApp · Email",
    channelsTbc: "รอเพิ่มข้อมูลติดต่อ",
    credits: "ภาพตัวอย่างจาก Wikimedia Commons",
  },
};

/**
 * Online shops. Replace `href` with the farm's real shop URLs and set `final: true`;
 * until then the buttons search each platform.
 */
export const shopLinks = [
  {
    id: "tiktok",
    name: "TikTok Shop",
    href: "https://www.tiktok.com/search?q=Nana%20Goldfish%20Farm",
    final: false,
  },
  {
    id: "shopee",
    name: "Shopee",
    href: "https://shopee.co.th/search?keyword=nana%20goldfish%20farm",
    final: false,
  },
] as const;

/** NEO-HELIOS logo / certificate supplied by the farm (paths under /public). Null until received. */
export const neoAssets: { logo: string | null; certificate: string | null } = {
  logo: null,
  certificate: null,
};

export const photoCredits = [
  { file: "Red Oranda goldfish in outdoor pond", author: "Lawrence Khoo", license: "CC BY-SA 4.0" },
  { file: "Goldfish Ranchu 2", author: "Lerdsuwa", license: "CC BY-SA 4.0" },
  { file: "Gold red and white Lionhead", author: "Lawrence Khoo", license: "CC BY-SA 4.0" },
  { file: "WhiteFaced Oranda (side)", author: "Lawrence Khoo", license: "CC BY-SA 4.0" },
  { file: "Three Ranchu Goldfish", author: "Humanfeather", license: "CC BY-SA 3.0" },
  { file: "Giant Oranda Goldfish", author: "Humanfeather", license: "CC BY-SA 3.0" },
  { file: "Oranda shishigashira & Ranchu goldfish plates", author: "Shinnosuke Matsubara", license: "Public domain" },
  { file: "Linen, Texture (cover grain)", author: "Flickr user via Wikimedia Commons", license: "CC BY 2.0" },
];
