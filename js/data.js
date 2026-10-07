// js/data.js - Items, Worlds, Daily targets, and Titles (Chapter 6, 9.8)

export const ITEMS = [
  { id:'w1-1', world:'w1', name:'₹1 ka sikka', part:'diameter', mm:22.0, approx:false, hint:'₹1/2/5/10 mein sabse chhota.' },
  { id:'w1-2', world:'w1', name:'₹2 ka sikka', part:'diameter', mm:25.0, approx:false, hint:'₹5 ke sikke se bhi bada hai.' },
  { id:'w1-3', world:'w1', name:'₹5 ka sikka', part:'diameter', mm:23.0, approx:false, hint:'₹2 se chhota, ₹1 se bada.' },
  { id:'w1-4', world:'w1', name:'₹10 ka sikka', part:'diameter', mm:27.0, approx:false, hint:'In chaaron mein sabse bada sikka.' },
  { id:'w1-5', world:'w1', name:'Credit / Aadhaar PVC card', part:'lambi side', mm:85.6, approx:false, hint:'ATM card ki lambai jitna.' },
  { id:'w2-1', world:'w2', name:'CR2032 gol battery', part:'diameter', mm:20.0, approx:false, hint:'Ghadi wali battery; ₹10 sikke se chhoti.' },
  { id:'w2-2', world:'w2', name:'AAA battery', part:'lambai', mm:44.5, approx:true, hint:'AA se thodi chhoti.' },
  { id:'w2-3', world:'w2', name:'9V battery', part:'unchai', mm:48.5, approx:false, hint:'AA battery ke lagbhag barabar lambi.' },
  { id:'w2-4', world:'w2', name:'AA battery', part:'lambai', mm:50.5, approx:true, hint:'Lagbhag 5 cm ke aaspaas.' },
  { id:'w2-5', world:'w2', name:'Taash ka patta (playing card)', part:'lambi side', mm:88.9, approx:false, hint:'Credit card se thoda lamba.' },
  { id:'w3-1', world:'w3', name:'Nano SIM card', part:'lambi side', mm:12.3, approx:false, hint:'1.5 cm se bhi chhota.' },
  { id:'w3-2', world:'w3', name:'USB-A plug (metal hissa)', part:'chaudai', mm:12.0, approx:false, hint:'Pen drive ke metal ki chaudai.' },
  { id:'w3-3', world:'w3', name:'Rubik\'s cube (3x3)', part:'ek side', mm:56.0, approx:false, hint:'5 cm se thodi si zyada.' },
  { id:'w3-4', world:'w3', name:'CD / DVD', part:'diameter', mm:120.0, approx:false, hint:'Credit card ki lambai se bada.' },
  { id:'w3-5', world:'w3', name:'Credit card ki motai', part:'motai', mm:0.76, approx:false, hint:'Ek mm se bhi patla.' },
  { id:'w4-1', world:'w4', name:'A6 kaagaz', part:'chhoti side', mm:105.0, approx:false, hint:'Postcard jaisa chhota kaagaz.' },
  { id:'w4-2', world:'w4', name:'A6 kaagaz', part:'lambi side', mm:148.0, approx:false, hint:'A5 ki chhoti side ke barabar.' },
  { id:'w4-3', world:'w4', name:'A4 kaagaz', part:'chhoti side', mm:210.0, approx:false, hint:'A5 ki lambi side ke barabar.' },
  { id:'w4-4', world:'w4', name:'A4 kaagaz', part:'lambi side', mm:297.0, approx:false, hint:'A3 ki chhoti side ke barabar.' },
  { id:'w4-5', world:'w4', name:'A3 kaagaz', part:'lambi side', mm:420.0, approx:false, hint:'A4 ki lambi side ka lagbhag 1.4 guna.' },
  { id:'w5-1', world:'w5', name:'Golf ball', part:'diameter', mm:42.7, approx:false, hint:'Ping-pong ball se thodi badi.' },
  { id:'w5-2', world:'w5', name:'Table tennis (ping-pong) ball', part:'diameter', mm:40.0, approx:false, hint:'Golf ball se thodi si chhoti.' },
  { id:'w5-3', world:'w5', name:'Tennis ball', part:'diameter', mm:67.0, approx:true, hint:'Cricket ball se thodi chhoti.' },
  { id:'w5-4', world:'w5', name:'Cricket ball', part:'diameter', mm:72.0, approx:true, hint:'Tennis ball se thodi badi.' },
  { id:'w5-5', world:'w5', name:'Football (size 5)', part:'diameter', mm:220.0, approx:true, hint:'Cricket ball ka lagbhag teen guna.' },
  { id:'w6-1', world:'w6', name:'₹10 ka note', part:'lambai', mm:123.0, approx:false, hint:'Is set ka sabse chhota note.' },
  { id:'w6-2', world:'w6', name:'₹50 ka note', part:'lambai', mm:135.0, approx:false, hint:'₹10 se lamba, ₹100 se chhota.' },
  { id:'w6-3', world:'w6', name:'₹100 ka note', part:'lambai', mm:142.0, approx:false, hint:'₹50 se lamba, ₹500 se chhota.' },
  { id:'w6-4', world:'w6', name:'₹500 ka note', part:'lambai', mm:150.0, approx:false, hint:'₹100 note se lamba.' },
  { id:'w6-5', world:'w6', name:'1 US dollar ka note', part:'lambai', mm:156.0, approx:false, hint:'Is set ka sabse lamba note.' },
  { id:'w7-1', world:'w7', name:'Tennis racket (standard)', part:'lambai', mm:686.0, approx:true, hint:'Stump ki unchai ke lagbhag barabar.' },
  { id:'w7-2', world:'w7', name:'Cricket stump', part:'unchai', mm:711.0, approx:false, hint:'Bat se chhota.' },
  { id:'w7-3', world:'w7', name:'A1 kaagaz', part:'lambi side', mm:841.0, approx:false, hint:'A3 ki lambi side ka lagbhag 2 guna.' },
  { id:'w7-4', world:'w7', name:'Cricket bat (sabse lamba allowed)', part:'lambai', mm:965.0, approx:false, hint:'Stump se lamba, par ek meter se kam.' },
  { id:'w7-5', world:'w7', name:'Ghar ka darwaza (aam)', part:'unchai', mm:2100.0, approx:true, hint:'Lamba aadmi bina jhuke nikal sake.' },
  { id:'w8-1', world:'w8', name:'Basketball hoop', part:'zameen se unchai', mm:3048.0, approx:false, hint:'Ek manzil (floor) ki unchai ke aaspaas.' },
  { id:'w8-2', world:'w8', name:'Football goal', part:'chaudai', mm:7320.0, approx:false, hint:'Basketball hoop ki unchai ka lagbhag 2.4 guna.' },
  { id:'w8-3', world:'w8', name:'Badminton court', part:'lambai', mm:13400.0, approx:false, hint:'Cricket pitch se chhota.' },
  { id:'w8-4', world:'w8', name:'Cricket pitch', part:'lambai', mm:20120.0, approx:false, hint:'Tennis court ki lambai se chhota.' },
  { id:'w8-5', world:'w8', name:'Tennis court', part:'lambai', mm:23770.0, approx:false, hint:'Cricket pitch se lamba.' }
];

export const WORLDS = [
  { id:'w1', name:'Jeb ke Sikke', about:'Sikke aur card: sabse aasan shuruaat' },
  { id:'w2', name:'Battery Bazaar', about:'Chhoti batteries aur ek playing card' },
  { id:'w3', name:'Gadget Dabba', about:'SIM, USB, cube, CD aur ek bahut patla card' },
  { id:'w4', name:'Kaagaz Mela', about:'A6 se A3 tak ke kaagaz' },
  { id:'w5', name:'Khel ke Gole', about:'Alag alag khel ki gendein' },
  { id:'w6', name:'Note Ginti', about:'Paise ke note: sab ki size bahut paas paas' },
  { id:'w7', name:'Bade Naap', about:'Cricket, tennis aur darwaza' },
  { id:'w8', name:'Bahut Bade', about:'Maidan aur court ki lambai' }
];

export const DAILY = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 22, 33, 44, 58, 67, 72, 88, 97, 102, 28, 63];

export const TITLES = [
  [1, 'Andaaza Newbie', 0],
  [2, 'Inch Inch Seekhu', 100],
  [3, 'Cm ka Dost', 250],
  [4, 'Mm ka Shagird', 450],
  [5, 'Gaj Wala', 700],
  [6, 'Naap Ustaad', 1000],
  [7, 'Tape Guru', 1400],
  [8, 'Maap Maharaja', 2000]
];
