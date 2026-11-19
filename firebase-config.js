/* Farouj Almanar - new, empty Firebase project.
   Never put administrator passwords in this file. */
const firebaseConfig = {
  apiKey: "AIzaSyCn9hQG3LkHpBHd5rxEZkC9lpXCf9-UZLg",
  authDomain: "frooj-mnar.firebaseapp.com",
  databaseURL: "https://frooj-mnar-default-rtdb.firebaseio.com",
  projectId: "frooj-mnar",
  storageBucket: "frooj-mnar.firebasestorage.app",
  messagingSenderId: "536129794013",
  appId: "1:536129794013:web:c7aa9409492666cfd55034",
  measurementId: "G-87948491P0"
};

if (typeof firebase !== "undefined" && !firebase.apps.length) firebase.initializeApp(firebaseConfig);

// Farouj Almanar menu transcribed from the approved printed menu.
const categories = [
  ['grilled','الفروج المشوي'], ['smoked','الفروج المدخن'],
  ['charcoal','فروج عالفحم'], ['molasses','فروج بالدبس'],
  ['tawook','شيش طاووق'], ['sandwiches','سندويش'],
  ['wings','الأجنحة'], ['rice','الريزو'], ['musakhan','المسخن'],
  ['fries','الفنكر'], ['appetizers','المقبلات'],
  ['extras','الإضافات'], ['drinks','المشروبات']
].map(([id,name], order) => ({ id, name, order }));

const menuRows = {
  grilled: [
    ['فروج مشوي',20000], ['فروج مشوي مع بطاطا',26000],
    ['نصف فروج مشوي',12000], ['نصف فروج مشوي مع بطاطا',14000]
  ],
  smoked: [
    ['فروج مدخن',22000], ['فروج مدخن مع بطاطا',28000],
    ['نصف فروج مدخن',14000], ['نصف فروج مدخن مع بطاطا',16000]
  ],
  charcoal: [['فروج عالفحم',28000], ['نصف فروج عالفحم',15000]],
  molasses: [['نصف فروجة بالدبس',15000], ['دبسي أجنحة',8000,'new']],
  tawook: [['شيش طاووق',12000]],
  sandwiches: [
    ['شيش طاووق',5000,'new'], ['كرسبي',6000], ['زنجر',6000],
    ['زنجر سبايسي',6000], ['ستكراب',6000]
  ],
  wings: [['الأجنحة',12000], ['كرسبي',7500,'new']],
  rice: [
    ['ريزو كرسبي أوريجنال',6500], ['ريزو كرسبي مدخن',6500],
    ['ريزو كرسبي أعشاب',6500], ['ريزو المنار',7500]
  ],
  musakhan: [['نصف فروج مسخن',12500,'new']],
  fries: [['فنكر صغير',2000], ['فنكر المنار',5000]],
  appetizers: [
    ['حمص',3000], ['متبل',3000], ['كولسلو',3000], ['بابا غنوج',3000],
    ['تبولة',3000], ['جاجيك',3000], ['معكرونة',3000], ['باذنجانية',3000],
    ['مقبلات S',3000], ['مقبلات M',8000], ['مقبلات L',12000]
  ],
  extras: [
    ['صحن رز',3500], ['علبة مرق',2000], ['ثومية S',1000], ['ثومية L',2000],
    ['ثومية دبس',1000], ['صوص أوريجنال',1000], ['صوص الرانش',1500],
    ['صوص العسل مسترد',1500], ['صوص الجبنة',1500], ['صوص مدخن',2500],
    ['صوص المنار',2500]
  ],
  drinks: [['بيبسي صغير',500], ['بيبسي كبير',1000], ['لبن',1000]]
};

// أوصاف قصيرة للبطاقات ونافذة التفاصيل — تظهر أيضاً إن كانت البيانات الأساسية من Firebase.
const menuDescriptions = {
  grilled: {
    'فروج مشوي': 'فروج كامل مشوي بتتبيلتنا الخاصة.',
    'فروج مشوي مع بطاطا': 'فروج مشوي كامل مع بطاطا ذهبية.',
    'نصف فروج مشوي': 'نصف فروج مشوي بطعم منزلي شهي.',
    'نصف فروج مشوي مع بطاطا': 'نصف فروج مشوي مع بطاطا مقرمشة.'
  },
  smoked: {
    'فروج مدخن': 'فروج كامل بنكهة تدخين غنية.',
    'فروج مدخن مع بطاطا': 'فروج مدخن كامل مع بطاطا ذهبية.',
    'نصف فروج مدخن': 'نصف فروج بطعم مدخن مميز.',
    'نصف فروج مدخن مع بطاطا': 'نصف فروج مدخن مع بطاطا مقرمشة.'
  },
  charcoal: {
    'فروج عالفحم': 'فروج كامل مشوي على الفحم.',
    'نصف فروج عالفحم': 'نصف فروج طازج بنكهة الفحم.'
  },
  molasses: {
    'نصف فروجة بالدبس': 'نصف فروج بلمسة دبس حلوة ومدخنة.',
    'دبسي أجنحة': 'أجنحة متبلة بصوص الدبس الغني.'
  },
  tawook: { 'شيش طاووق': 'قطع دجاج طرية ومتبلّة بعناية.' },
  sandwiches: {
    'شيش طاووق': 'شيش طاووق طري في خبز طازج.',
    'كرسبي': 'دجاج كرسبي مقرمش وخفيف.',
    'زنجر': 'زنجر مقرمش بطعم الدجاج الغني.',
    'زنجر سبايسي': 'زنجر مقرمش بلمسة حارة.',
    'ستكراب': 'راب دجاج شهي وسهل الأكل.'
  },
  wings: {
    'الأجنحة': 'أجنحة دجاج متبلة ومحمرة.',
    'كرسبي': 'قطع كرسبي مقرمشة ومتبلة.'
  },
  rice: {
    'ريزو كرسبي أوريجنال': 'أرز ريزو مع كرسبي أوريجنال.',
    'ريزو كرسبي مدخن': 'أرز ريزو مع كرسبي مدخن.',
    'ريزو كرسبي أعشاب': 'أرز ريزو بنكهة الأعشاب والكرسبي.',
    'ريزو المنار': 'خلطة ريزو المنار الخاصة.'
  },
  musakhan: { 'نصف فروج مسخن': 'نصف فروج مسخن بنكهة شرقية.' },
  fries: {
    'فنكر صغير': 'حصة فنكر مقرمشة وخفيفة.',
    'فنكر المنار': 'حصة فنكر المنار المميزة.'
  },
  appetizers: {
    'حمص': 'حمص كريمي بطعم أصيل.', 'متبل': 'متبل باذنجان ناعم وشهي.',
    'كولسلو': 'سلطة كولسلو طازجة وكريمية.', 'بابا غنوج': 'بابا غنوج مدخن بطعم غني.',
    'تبولة': 'تبولة طازجة ومنعشة.', 'جاجيك': 'جاجيك بارد ومنعش.',
    'معكرونة': 'معكرونة جانبية خفيفة.', 'باذنجانية': 'باذنجان متبل بلمسة منزلية.',
    'مقبلات S': 'تشكيلة مقبلات صغيرة.', 'مقبلات M': 'تشكيلة مقبلات متوسطة.',
    'مقبلات L': 'تشكيلة مقبلات كبيرة للمشاركة.'
  },
  extras: {
    'صحن رز': 'أرز أبيض طازج كطبق جانبي.', 'علبة مرق': 'مرق ساخن يكمل وجبتك.',
    'ثومية S': 'ثومية كريمية بحجم صغير.', 'ثومية L': 'ثومية كريمية بحجم كبير.',
    'ثومية دبس': 'ثومية بلمسة دبس مميزة.', 'صوص أوريجنال': 'صوص المنار الأصلي.',
    'صوص الرانش': 'صوص رانش كريمي وخفيف.', 'صوص العسل مسترد': 'مزيج عسل ومستردة متوازن.',
    'صوص الجبنة': 'صوص جبنة كريمي.', 'صوص مدخن': 'صوص بنكهة تدخين غنية.',
    'صوص المنار': 'صوص المنار الخاص.'
  },
  drinks: {
    'بيبسي صغير': 'بيبسي بارد بحجم صغير.', 'بيبسي كبير': 'بيبسي بارد بحجم كبير.',
    'لبن': 'لبن بارد ومنعش.'
  }
};

let itemNumber = 0;
const items = Object.entries(menuRows).flatMap(([cat, rows]) => rows.map(([name, price, badge]) => ({
  id: `fm_${String(++itemNumber).padStart(3, '0')}`,
  cat, name, price, desc: menuDescriptions[cat]?.[name] || '', img: '', hasImg: false, badge: badge || ''
})));

// Curated photo mapping. These local WebP files are the offline fallback;
// Firebase stores equivalent compressed data URLs under images/<item-id>.
const itemPhoto = {
  fm_001:'DSC_2595', fm_002:'DSC_2594', fm_003:'DSC_2598', fm_004:'DSC_2630',
  fm_005:'DSC_2573', fm_006:'DSC_2574', fm_007:'generated-fm_007', fm_008:'generated-fm_008',
  fm_009:'DSC_2579', fm_010:'DSC_2586', fm_011:'generated-fm_011', fm_012:'DSC_2617',
  fm_013:'DSC_2580', fm_014:'generated-v2-fm_014.png', fm_015:'generated-v2-fm_015.png', fm_016:'generated-v2-fm_016.png',
  fm_017:'generated-v2-fm_017.png', fm_018:'DSC_2614', fm_019:'crispy-wings-branded.png', fm_020:'generated-fm_020',
  fm_021:'rizo-unified.png', fm_022:'rizo-unified.png', fm_023:'rizo-herbs.png', fm_024:'rizo-unified.png',
  fm_025:'generated-fm_025', fm_026:'DSC_2581', fm_027:'DSC_2585', fm_028:'DSC_2608',
  fm_029:'generated-v2-fm_030.png', fm_030:'generated-v2-fm_029.png', fm_031:'generated-v2-fm_028.png', fm_032:'DSC_2607',
  fm_033:'jajeek-branded.png', fm_034:'pasta-appetizer.png', fm_035:'bazenjania-iraqi.png', fm_036:'appetizers-unified.png',
  fm_037:'appetizers-unified.png', fm_038:'appetizers-unified.png', fm_039:'DSC_2603', fm_040:'broth.png',
  fm_041:'garlic-s.png', fm_042:'garlic-l.png', fm_043:'garlic-molasses.png', fm_044:'sauce-original.png',
  fm_045:'sauce-ranch.png', fm_046:'sauce-honey-mustard.png', fm_047:'sauce-smoked.png', fm_048:'sauce-cheese.png',
  fm_049:'sauce-almanar.png', fm_050:'pepsi.webp', fm_051:'pepsi.webp', fm_052:'laban.jpg'
};
items.forEach(item => {
  const photo = itemPhoto[item.id];
  if (!photo) return;
  item.img = `assets/menu/farouj/${photo.includes('.') ? photo : `${photo}.webp`}`;
  item.hasImg = true;
});
const initialData = { categories, items };
const MENU_PATH = "farouj_almanar_menu";
