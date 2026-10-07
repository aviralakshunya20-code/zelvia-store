// js/data.js - Items, Worlds, Daily targets, and Titles (Chapter 6, 9.8)
import { getLang } from './strings.js';

export const ITEMS = [
  // World 1: Pocket Coins
  { id:'w1-1', world:'w1', name:'₹1 coin', part:'diameter', mm:22.0, approx:false, hint:'Smallest among ₹1, ₹2, ₹5, and ₹10 coins.', name_hi:'₹1 ka sikka', part_hi:'diameter', hint_hi:'₹1/2/5/10 mein sabse chhota.' },
  { id:'w1-2', world:'w1', name:'₹2 coin', part:'diameter', mm:25.0, approx:false, hint:'Larger than the ₹5 coin.', name_hi:'₹2 ka sikka', part_hi:'diameter', hint_hi:'₹5 ke sikke se bhi bada hai.' },
  { id:'w1-3', world:'w1', name:'₹5 coin', part:'diameter', mm:23.0, approx:false, hint:'Smaller than ₹2, larger than ₹1.', name_hi:'₹5 ka sikka', part_hi:'diameter', hint_hi:'₹2 se chhota, ₹1 se bada.' },
  { id:'w1-4', world:'w1', name:'₹10 coin', part:'diameter', mm:27.0, approx:false, hint:'Largest coin among the four.', name_hi:'₹10 ka sikka', part_hi:'diameter', hint_hi:'In chaaron mein sabse bada sikka.' },
  { id:'w1-5', world:'w1', name:'Credit / PVC ID card', part:'long side', mm:85.6, approx:false, hint:'Length of a standard ATM bank card.', name_hi:'Credit / Aadhaar PVC card', part_hi:'lambi side', hint_hi:'ATM card ki lambai jitna.' },

  // World 2: Battery Bazaar
  { id:'w2-1', world:'w2', name:'CR2032 button cell battery', part:'diameter', mm:20.0, approx:false, hint:'Watch battery; smaller than a ₹10 coin.', name_hi:'CR2032 gol battery', part_hi:'diameter', hint_hi:'Ghadi wali battery; ₹10 sikke se chhoti.' },
  { id:'w2-2', world:'w2', name:'AAA battery', part:'length', mm:44.5, approx:true, hint:'Slightly shorter than an AA battery.', name_hi:'AAA battery', part_hi:'lambai', hint_hi:'AA se thodi chhoti.' },
  { id:'w2-3', world:'w2', name:'9V battery', part:'height', mm:48.5, approx:false, hint:'Roughly the same height as an AA battery.', name_hi:'9V battery', part_hi:'unchai', hint_hi:'AA battery ke lagbhag barabar lambi.' },
  { id:'w2-4', world:'w2', name:'AA battery', part:'length', mm:50.5, approx:true, hint:'Around 5 cm long.', name_hi:'AA battery', part_hi:'lambai', hint_hi:'Lagbhag 5 cm ke aaspaas.' },
  { id:'w2-5', world:'w2', name:'Playing card', part:'long side', mm:88.9, approx:false, hint:'Slightly longer than a credit card.', name_hi:'Taash ka patta (playing card)', part_hi:'lambi side', hint_hi:'Credit card se thoda lamba.' },

  // World 3: Gadget Box
  { id:'w3-1', world:'w3', name:'Nano SIM card', part:'long side', mm:12.3, approx:false, hint:'Less than 1.5 cm long.', name_hi:'Nano SIM card', part_hi:'lambi side', hint_hi:'1.5 cm se bhi chhota.' },
  { id:'w3-2', world:'w3', name:'USB-A connector (metal plug)', part:'width', mm:12.0, approx:false, hint:'Width of a USB flash drive plug.', name_hi:'USB-A plug (metal hissa)', part_hi:'chaudai', hint_hi:'Pen drive ke metal ki chaudai.' },
  { id:'w3-3', world:'w3', name:'Rubik\'s cube (3x3)', part:'one side', mm:56.0, approx:false, hint:'Just over 5 cm on each edge.', name_hi:'Rubik\'s cube (3x3)', part_hi:'ek side', hint_hi:'5 cm se thodi si zyada.' },
  { id:'w3-4', world:'w3', name:'CD / DVD disc', part:'diameter', mm:120.0, approx:false, hint:'Larger than the length of a credit card.', name_hi:'CD / DVD', part_hi:'diameter', hint_hi:'Credit card ki lambai se bada.' },
  { id:'w3-5', world:'w3', name:'Credit card thickness', part:'thickness', mm:0.76, approx:false, hint:'Thinner than one millimeter.', name_hi:'Credit card ki motai', part_hi:'motai', hint_hi:'Ek mm se bhi patla.' },

  // World 4: Paper Stack
  { id:'w4-1', world:'w4', name:'A6 paper sheet', part:'short side', mm:105.0, approx:false, hint:'Small sheet size, similar to a postcard.', name_hi:'A6 kaagaz', part_hi:'chhoti side', hint_hi:'Postcard jaisa chhota kaagaz.' },
  { id:'w4-2', world:'w4', name:'A6 paper sheet', part:'long side', mm:148.0, approx:false, hint:'Equal to the short side of A5 paper.', name_hi:'A6 kaagaz', part_hi:'lambi side', hint_hi:'A5 ki chhoti side ke barabar.' },
  { id:'w4-3', world:'w4', name:'A4 paper sheet', part:'short side', mm:210.0, approx:false, hint:'Equal to the long side of A5 paper.', name_hi:'A4 kaagaz', part_hi:'chhoti side', hint_hi:'A5 ki lambi side ke barabar.' },
  { id:'w4-4', world:'w4', name:'A4 paper sheet', part:'long side', mm:297.0, approx:false, hint:'Equal to the short side of A3 paper.', name_hi:'A4 kaagaz', part_hi:'lambi side', hint_hi:'A3 ki chhoti side ke barabar.' },
  { id:'w4-5', world:'w4', name:'A3 paper sheet', part:'long side', mm:420.0, approx:false, hint:'About 1.4 times the long side of A4 paper.', name_hi:'A3 kaagaz', part_hi:'lambi side', hint_hi:'A4 ki lambi side ka lagbhag 1.4 guna.' },

  // World 5: Sports Spheres
  { id:'w5-1', world:'w5', name:'Golf ball', part:'diameter', mm:42.7, approx:false, hint:'Slightly larger than a table tennis ball.', name_hi:'Golf ball', part_hi:'diameter', hint_hi:'Ping-pong ball se thodi badi.' },
  { id:'w5-2', world:'w5', name:'Table tennis (ping-pong) ball', part:'diameter', mm:40.0, approx:false, hint:'Slightly smaller than a golf ball.', name_hi:'Table tennis (ping-pong) ball', part_hi:'diameter', hint_hi:'Golf ball se thodi si chhoti.' },
  { id:'w5-3', world:'w5', name:'Tennis ball', part:'diameter', mm:67.0, approx:true, hint:'Slightly smaller than a cricket ball.', name_hi:'Tennis ball', part_hi:'diameter', hint_hi:'Cricket ball se thodi chhoti.' },
  { id:'w5-4', world:'w5', name:'Cricket ball', part:'diameter', mm:72.0, approx:true, hint:'Slightly larger than a tennis ball.', name_hi:'Cricket ball', part_hi:'diameter', hint_hi:'Tennis ball se thodi badi.' },
  { id:'w5-5', world:'w5', name:'Soccer ball (size 5)', part:'diameter', mm:220.0, approx:true, hint:'Roughly three times the diameter of a cricket ball.', name_hi:'Football (size 5)', part_hi:'diameter', hint_hi:'Cricket ball ka lagbhag teen guna.' },

  // World 6: Banknotes
  { id:'w6-1', world:'w6', name:'₹10 banknote', part:'length', mm:123.0, approx:false, hint:'Shortest banknote in this set.', name_hi:'₹10 ka note', part_hi:'lambai', hint_hi:'Is set ka sabse chhota note.' },
  { id:'w6-2', world:'w6', name:'₹50 banknote', part:'length', mm:135.0, approx:false, hint:'Longer than ₹10, shorter than ₹100.', name_hi:'₹50 ka note', part_hi:'lambai', hint_hi:'₹10 se lamba, ₹100 se chhota.' },
  { id:'w6-3', world:'w6', name:'₹100 banknote', part:'length', mm:142.0, approx:false, hint:'Longer than ₹50, shorter than ₹500.', name_hi:'₹100 ka note', part_hi:'lambai', hint_hi:'₹50 se lamba, ₹500 se chhota.' },
  { id:'w6-4', world:'w6', name:'₹500 banknote', part:'length', mm:150.0, approx:false, hint:'Longer than the ₹100 banknote.', name_hi:'₹500 ka note', part_hi:'lambai', hint_hi:'₹100 note se lamba.' },
  { id:'w6-5', world:'w6', name:'1 US dollar bill', part:'length', mm:156.0, approx:false, hint:'Longest banknote in this set.', name_hi:'1 US dollar ka note', part_hi:'lambai', hint_hi:'Is set ka sabse lamba note.' },

  // World 7: Big Measures
  { id:'w7-1', world:'w7', name:'Standard tennis racket', part:'length', mm:686.0, approx:true, hint:'Roughly the height of a cricket stump.', name_hi:'Tennis racket (standard)', part_hi:'lambai', hint_hi:'Stump ki unchai ke lagbhag barabar.' },
  { id:'w7-2', world:'w7', name:'Cricket stump', part:'height', mm:711.0, approx:false, hint:'Shorter than a cricket bat.', name_hi:'Cricket stump', part_hi:'unchai', hint_hi:'Bat se chhota.' },
  { id:'w7-3', world:'w7', name:'A1 paper sheet', part:'long side', mm:841.0, approx:false, hint:'About twice the long side of A3 paper.', name_hi:'A1 kaagaz', part_hi:'lambi side', hint_hi:'A3 ki lambi side ka lagbhag 2 guna.' },
  { id:'w7-4', world:'w7', name:'Cricket bat (max legal size)', part:'length', mm:965.0, approx:false, hint:'Taller than a stump, but under one meter.', name_hi:'Cricket bat (sabse lamba allowed)', part_hi:'lambai', hint_hi:'Stump se lamba, par ek meter se kam.' },
  { id:'w7-5', world:'w7', name:'Standard interior doorway', part:'height', mm:2100.0, approx:true, hint:'Tall enough for a tall adult to walk through upright.', name_hi:'Ghar ka darwaza (aam)', part_hi:'unchai', hint_hi:'Lamba aadmi bina jhuke nikal sake.' },

  // World 8: Grand Distances
  { id:'w8-1', world:'w8', name:'Basketball hoop rim', part:'height from ground', mm:3048.0, approx:false, hint:'Approximately the height of one building storey.', name_hi:'Basketball hoop', part_hi:'zameen se unchai', hint_hi:'Ek manzil (floor) ki unchai ke aaspaas.' },
  { id:'w8-2', world:'w8', name:'Soccer goal', part:'width', mm:7320.0, approx:false, hint:'About 2.4 times the height of a basketball hoop.', name_hi:'Football goal', part_hi:'chaudai', hint_hi:'Basketball hoop ki unchai ka lagbhag 2.4 guna.' },
  { id:'w8-3', world:'w8', name:'Badminton court', part:'length', mm:13400.0, approx:false, hint:'Shorter than a cricket pitch.', name_hi:'Badminton court', part_hi:'lambai', hint_hi:'Cricket pitch se chhota.' },
  { id:'w8-4', world:'w8', name:'Cricket pitch (stump to stump)', part:'length', mm:20120.0, approx:false, hint:'Shorter than a tennis court.', name_hi:'Cricket pitch', part_hi:'lambai', hint_hi:'Tennis court ki lambai se chhota.' },
  { id:'w8-5', world:'w8', name:'Tennis court', part:'length', mm:23770.0, approx:false, hint:'Longer than a cricket pitch.', name_hi:'Tennis court', part_hi:'lambai', hint_hi:'Cricket pitch se lamba.' }
];

export const WORLDS = [
  { id:'w1', name:'Pocket Coins', about:'Coins and cards: the easiest start', name_hi:'Jeb ke Sikke', about_hi:'Sikke aur card: sabse aasan shuruaat' },
  { id:'w2', name:'Battery Bazaar', about:'Small batteries and a playing card', name_hi:'Battery Bazaar', about_hi:'Chhoti batteries aur ek playing card' },
  { id:'w3', name:'Gadget Box', about:'SIM, USB, Rubik\'s cube, CD, and a thin card', name_hi:'Gadget Dabba', about_hi:'SIM, USB, cube, CD aur ek bahut patla card' },
  { id:'w4', name:'Paper Stack', about:'Standard paper sizes from A6 to A3', name_hi:'Kaagaz Mela', about_hi:'A6 se A3 tak ke kaagaz' },
  { id:'w5', name:'Sports Spheres', about:'Balls from different sports', name_hi:'Khel ke Gole', about_hi:'Alag alag khel ki gendein' },
  { id:'w6', name:'Banknotes', about:'Currency notes: all very close in size', name_hi:'Note Ginti', about_hi:'Paise ke note: sab ki size bahut paas paas' },
  { id:'w7', name:'Big Measures', about:'Cricket, tennis gear, and a doorway', name_hi:'Bade Naap', about_hi:'Cricket, tennis aur darwaza' },
  { id:'w8', name:'Grand Distances', about:'Fields, courts, and athletic pitches', name_hi:'Bahut Bade', about_hi:'Maidan aur court ki lambai' }
];

export const DAILY = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 22, 33, 44, 58, 67, 72, 88, 97, 102, 28, 63];

export const TITLES = [
  [1, 'Estimate Novice', 0, 'Andaaza Newbie'],
  [2, 'Inch Apprentice', 100, 'Inch Inch Seekhu'],
  [3, 'Centimeter Friend', 250, 'Cm ka Dost'],
  [4, 'Millimeter Scholar', 450, 'Mm ka Shagird'],
  [5, 'Yard Master', 700, 'Gaj Wala'],
  [6, 'Precision Expert', 1000, 'Naap Ustaad'],
  [7, 'Tape Measure Guru', 1400, 'Tape Guru'],
  [8, 'Measurement Monarch', 2000, 'Maap Maharaja']
];

// Localization helper functions
export function getItemName(item) {
  if (!item) return '';
  return (getLang() === 'hinglish' && item.name_hi) ? item.name_hi : item.name;
}

export function getItemPart(item) {
  if (!item) return '';
  return (getLang() === 'hinglish' && item.part_hi) ? item.part_hi : item.part;
}

export function getItemHint(item) {
  if (!item) return '';
  return (getLang() === 'hinglish' && item.hint_hi) ? item.hint_hi : item.hint;
}

export function getWorldName(world) {
  if (!world) return '';
  return (getLang() === 'hinglish' && world.name_hi) ? world.name_hi : world.name;
}

export function getWorldAbout(world) {
  if (!world) return '';
  return (getLang() === 'hinglish' && world.about_hi) ? world.about_hi : world.about;
}

export function getTitleName(level) {
  const t = TITLES.find(x => x[0] === level) || TITLES[0];
  return (getLang() === 'hinglish' && t[3]) ? t[3] : t[1];
}
