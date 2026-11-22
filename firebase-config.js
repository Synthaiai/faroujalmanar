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

// Descriptions are transcribed by stable item ID below.
const menuDescriptions = {};

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
  const photoFile = photo.replace(/\.(?:png|jpe?g|webp)$/i, '') + '.webp';
  item.img = `assets/menu/farouj/optimized/${photoFile}`;
  item.hasImg = true;
});
const initialData = { categories, items };
// Printed menu, November 2026. Stable IDs preserve existing photographs.
const PRINTED_MENU_REVISION = 20261122;
const printedNames = {
  fm_001:'فروج', fm_002:'فروج', fm_003:'نصف فروج', fm_004:'نصف فروج',
  fm_005:'فروج المدخن', fm_006:'فروج المدخن',
  fm_009:'فروجة عالفحم', fm_010:'نصف فروجة عالفحم',
  fm_011:'نصف فروجة بالتبسي', fm_012:'تبسي أجنحة', fm_018:'سكالوب',
  fm_025:'نصف فروج بروستد', fm_035:'باذنجانية', fm_043:'ثومية سبايسي',
  fm_046:'صوص الهني ماستر'
};
const printedDescriptions = {
  fm_001:'فروج + ثومية + مخلل + فنكر + خبز',
  fm_002:'فروج + ثومية + مخلل + فنكر + خبز\nرز + مرق عدد 2',
  fm_003:'نصف فروج + ثومية + مخلل + فنكر + خبز',
  fm_004:'نصف فروج + ثومية + مخلل + فنكر + خبز\nرز + مرق عدد 1',
  fm_005:'فروجة + ثومية + مخلل + فنكر + خبز',
  fm_006:'فروجة + ثومية + مخلل + فنكر + خبز\nرز + مرق عدد 2',
  fm_007:'نصف فروج + ثومية + مخلل + فنكر + خبز',
  fm_008:'نصف فروج + ثومية + مخلل + فنكر + خبز\nرز + مرق عدد 1',
  fm_009:'رز + ثومية + مخلل + طماطة شوي + بصل شوي + كولسلو + فنكر + خبز + ثومية سبايسي',
  fm_010:'رز + ثومية + مخلل + طماطة شوي + بصل شوي + كولسلو + فنكر + خبز + ثومية سبايسي',
  fm_011:'رز + علبة ثومية + خبز',
  fm_013:'12 قطع طاووق + ثومية + كولسلو + مخلل + خبز',
  fm_019:'16 قطع أجنحة + ثومية + مخلل + خبز',
  fm_020:'4 قطع كرسبي + ثومية + كولسلو + فنكر + خبز + بيبسي صغير',
  fm_025:'4 قطع بروستد + ثومية + كولسلو + فنكر + خبز + بيبسي صغير'
};
categories.find(c => c.id === 'molasses').name = 'فروج بالتبسي';
categories.find(c => c.id === 'musakhan').name = 'بروستد';
categories.splice(7, 0, {id:'crispy',name:'كرسبي'});
categories.forEach((c, order) => { c.order = order; });
items.forEach(item => {
  item.name = printedNames[item.id] || item.name;
  item.desc = printedDescriptions[item.id] || '';
  item.badge = '';
  item.menuRevision = PRINTED_MENU_REVISION;
  if(item.id === 'fm_020') item.cat = 'crispy';
  if(item.id === 'fm_036') item.price = 5000;
});
function reconcilePrintedMenuItem(item) {
  const printed = items.find(entry => String(entry.id) === String(item.id));
  if (!printed || Number(item.menuRevision || 0) >= PRINTED_MENU_REVISION) return item;
  return {...item, name:printed.name, price:printed.price, desc:printed.desc,
    cat:printed.cat, badge:printed.badge, menuRevision:PRINTED_MENU_REVISION};
}
const MENU_PATH = "farouj_almanar_menu";
