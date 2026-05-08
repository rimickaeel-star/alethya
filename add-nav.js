const fs = require('fs');

const enPath = 'messages/en.json';
const arPath = 'messages/ar.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

enData.Navigation.media = "Media";
enData.Navigation.blog = "Blog";

arData.Navigation.media = "الوسائط";
arData.Navigation.blog = "المدونة";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));

console.log('Added media and blog to EN and AR navigation.');
