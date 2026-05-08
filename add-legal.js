const fs = require('fs');
const files = ['en.json', 'ar.json', 'fr.json', 'de.json', 'es.json'];

files.forEach(file => {
  const path = `messages/${file}`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (file === 'en.json') {
    data.Join.roles.legal = { title: "Legal Expert", desc: "Help monitor and respond to systemic hate speech and defamation campaigns." };
  } else if (file === 'ar.json') {
    data.Join.roles.legal = { title: "خبير قانوني", desc: "المساعدة في رصد والرد على خطاب الكراهية وحملات التشهير الممنهجة." };
  } else if (file === 'fr.json') {
    data.Join.roles.legal = { title: "Expert Juridique", desc: "Aider à surveiller et à répondre aux discours de haine systémiques." };
  } else if (file === 'de.json') {
    data.Join.roles.legal = { title: "Rechtsexperte", desc: "Helfen Sie bei der Überwachung und Reaktion auf systematische Hassreden." };
  } else if (file === 'es.json') {
    data.Join.roles.legal = { title: "Experto Legal", desc: "Ayuda a monitorear y responder a los discursos de odio sistémicos." };
  }
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
});
console.log('Legal role added to all translation files.');
