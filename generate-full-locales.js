const fs = require('fs');

const fr = {
  "Navigation": {
    "about": "À propos",
    "history": "Histoire",
    "archive": "Archives",
    "culture": "Culture",
    "monitor": "Observatoire",
    "media": "Médias",
    "blog": "Blog",
    "join": "Rejoignez-nous",
    "protection": "Sécurité"
  },
  "Hero": {
    "badge": "Archives Numériques Disponibles",
    "title1": "Dévoiler la",
    "title_highlight": "Vérité.",
    "title2": "Restaurer l'Histoire.",
    "description": "Une plateforme internationale dédiée à la correction du récit historique et à la préservation de l'héritage intellectuel de la communauté alaouite avec rigueur académique.",
    "explore": "Explorer les Archives",
    "mission": "Lire Notre Mission",
    "scroll": "Défiler"
  },
  "Pillars": {
    "rigor_title": "Rigueur Académique",
    "rigor_desc": "Fournir des documents historiques vérifiés, des traductions et des études évaluées par des pairs pour contrer la désinformation.",
    "archive_title": "Archives Numériques",
    "archive_desc": "Un vaste dépôt consultable de manuscrits et de textes, préservés et numérisés pour les chercheurs du monde entier.",
    "legal_title": "Réponse Juridique",
    "legal_desc": "Surveiller les discours de haine et les distorsions systémiques, et répondre par des actions juridiques et académiques sur la scène mondiale."
  },
  "Archive": {
    "title": "Archives Numériques",
    "subtitle": "Un dépôt organisé de manuscrits historiques, d'études académiques et de documents vérifiés.",
    "search_placeholder": "Rechercher dans les archives...",
    "filters": "Filtres",
    "type": "Type de Document",
    "era": "Époque Historique",
    "types": {
      "manuscript": "Manuscrits",
      "study": "Études Académiques",
      "document": "Documents Officiels",
      "testimony": "Témoignages"
    },
    "eras": {
      "medieval": "Période Médiévale",
      "ottoman": "Époque Ottomane",
      "mandate": "Mandat Français",
      "modern": "Époque Moderne"
    },
    "view_document": "Voir le Document",
    "download": "Télécharger PDF"
  },
  "Monitor": {
    "title": "Observatoire des Discours de Haine",
    "subtitle": "Suivre, analyser et répondre à la distorsion systémique et aux discours de haine à l'échelle mondiale.",
    "report_incident": "Signaler un Incident",
    "legal_responses": "Réponses Juridiques",
    "incidents_map": "Incidents Récents",
    "categories": {
      "media": "Distorsion Médiatique",
      "political": "Rhétorique Politique",
      "cyber": "Cyber-harcèlement",
      "religious": "Incitation Religieuse"
    },
    "form": {
      "title": "Documenter un Nouvel Incident",
      "desc": "Aidez-nous à suivre la désinformation. Toutes les soumissions sont traitées avec la plus stricte confidentialité.",
      "link_label": "Lien Source / Preuve",
      "type_label": "Type d'Incident",
      "details_label": "Description",
      "submit": "Soumettre le Rapport"
    },
    "download_template": "Télécharger le Modèle d'Avis Juridique"
  },
  "Join": {
    "title": "Rejoignez Aletheia",
    "subtitle": "Nous recherchons des personnes passionnées pour nous aider à restaurer l'histoire et promouvoir la vérité académique.",
    "roles": {
      "translator": {
        "title": "Traducteur / Éditeur",
        "desc": "Aidez-nous à traduire des manuscrits et des études en anglais, français ou allemand."
      },
      "researcher": {
        "title": "Chercheur Académique",
        "desc": "Contribuer à des études évaluées par des pairs et à l'analyse historique."
      },
      "creator": {
        "title": "Créateur de Contenu",
        "desc": "Créer un contenu visuel attrayant pour atteindre un public mondial plus large."
      }
    },
    "form": {
      "name": "Nom Complet",
      "email": "Adresse Email",
      "role": "Rôle Souhaité",
      "portfolio": "Lien vers le Portfolio / CV",
      "submit": "Postuler Maintenant"
    }
  },
  "About": {
    "title": "À Propos",
    "subtitle": "Aletheia est une plateforme numérique indépendante et à but non lucratif dédiée à la correction du récit historique et à la présentation de l'héritage intellectuel de la communauté alaouite avec rigueur académique et objectivité.",
    "mission_title": "Notre Mission",
    "mission_desc": "Pendant des siècles, la communauté alaouite a été soumise à des distorsions historiques, à la marginalisation et à de fausses représentations. Notre mission est de construire des archives numériques centralisées et académiquement vérifiées qui corrigent ces récits, rendant l'histoire véritable et l'héritage philosophique accessibles aux chercheurs, aux universitaires et au grand public.",
    "vision_title": "Notre Vision",
    "vision_desc": "Nous envisageons un monde où l'histoire n'est pas écrite par les vainqueurs ou les oppresseurs, mais par des faits vérifiés, des textes originaux et une vérité objective. Aletheia sert de pont entre le passé et l'avenir, garantissant que le riche patrimoine culturel et intellectuel de la communauté soit préservé et respecté.",
    "values_title": "Nos Valeurs Fondamentales",
    "values": {
      "rigor_title": "Rigueur Académique",
      "rigor_desc": "Tous les documents et affirmations s'appuient sur des sources primaires vérifiées et des recherches évaluées par des pairs.",
      "objectivity_title": "Objectivité",
      "objectivity_desc": "Nous présentons l'histoire telle qu'elle est, dépouillée de tout parti pris idéologique ou sectaire.",
      "accessibility_title": "Accessibilité",
      "accessibility_desc": "Nos archives sont ouvertes à tous—traduisant d'anciens manuscrits dans des langues modernes pour atteindre un public mondial.",
      "protection_title": "Protection",
      "protection_desc": "Nous surveillons activement et controns légalement les discours de haine organisés et les campagnes de diffamation systémiques."
    },
    "quote": "Nous ne lisons pas l'histoire pour savoir où étaient nos ancêtres, mais pour comprendre pourquoi nous sommes ici aujourd'hui, et comment nous pouvons être meilleurs demain."
  },
  "History": {
    "title": "Histoire",
    "subtitle": "Explorez l'histoire chronologique, déconstruisez les mythes historiques et découvrez les véritables origines et l'évolution de la communauté à travers des documents vérifiés.",
    "eras": {
      "medieval_title": "Période Médiévale & Origines",
      "medieval_desc": "Retracer les racines de la communauté au Levant, examiner les premières formations philosophiques et théologiques, et aborder les premières vagues de déplacement.",
      "ottoman_title": "L'Époque Ottomane",
      "ottoman_desc": "Une période définie par la marginalisation et la persécution systémique. Documenter les fatwas, les sanctions économiques et la résilience des communautés de montagne pour préserver leur identité et leur patrimoine.",
      "mandate_title": "Le Mandat Français",
      "mandate_desc": "Déconstruire les récits coloniaux. Examiner les mouvements politiques, les chefs de la résistance (comme Saleh al-Ali) et la relation complexe avec les autorités du mandat à travers des archives authentiques.",
      "modern_title": "Époque Moderne & Construction de l'État",
      "modern_desc": "Analyser l'intégration dans l'État moderne, les transformations socio-économiques et la lutte continue pour une représentation égale et la justice historique dans le Moyen-Orient contemporain.",
      "future_title": "Notre avenir : Les Alaouites vers où ?",
      "future_desc": "L'idéologie de la survie."
    }
  },
  "Culture": {
    "title": "Culture & Société",
    "subtitle": "Découvrez les riches traditions, la profondeur philosophique, les arts et le tissu social résilient d'une communauté qui a survécu à des siècles de marginalisation.",
    "topics": {
      "philosophy_title": "Héritage Philosophique",
      "philosophy_desc": "Enraciné dans de profondes traditions ésotériques et des influences néoplatoniciennes, l'héritage philosophique met l'accent sur la liberté intellectuelle, les interprétations allégoriques et une connexion spirituelle profonde avec le cosmos.",
      "literature_title": "Littérature & Poésie",
      "literature_desc": "Des œuvres classiques d'Al-Makzun Al-Sinjari aux figures littéraires modernes. La poésie a historiquement été un outil pour préserver la théologie, exprimer la souffrance et maintenir l'identité communautaire en temps de persécution.",
      "ethics_title": "Tissu Social & Éthique",
      "ethics_desc": "Une société profondément égalitaire mettant l'accent sur la solidarité communautaire, l'entraide et des codes éthiques stricts. Historiquement, les femmes ont joué des rôles centraux dans l'éducation et le leadership spirituel.",
      "folk_title": "Traditions Folkloriques",
      "folk_desc": "Le mode de vie agraire de montagne a donné naissance à des traditions musicales uniques, des festivals agricoles et des rituels communautaires qui célèbrent les saisons et honorent les figures historiques."
    }
  }
};

const de = {
  "Navigation": {
    "about": "Über uns",
    "history": "Geschichte",
    "archive": "Archiv",
    "culture": "Kultur",
    "monitor": "Beobachtungsstelle",
    "join": "Mitmachen",
    "media": "Medien",
    "blog": "Blog",
    "protection": "Schutz"
  },
  "Hero": {
    "badge": "Digitales Archiv jetzt online",
    "title1": "Die",
    "title_highlight": "Wahrheit",
    "title2": "enthüllen. Geschichte wiederherstellen.",
    "description": "Eine internationale Plattform zur Korrektur des historischen Narrativs und zur Aufarbeitung des intellektuellen Erbes der alawitischen Gemeinschaft mit akademischer Strenge.",
    "explore": "Archiv durchsuchen",
    "mission": "Unsere Mission lesen",
    "scroll": "Scrollen"
  },
  "Pillars": {
    "rigor_title": "Akademische Strenge",
    "rigor_desc": "Bereitstellung verifizierter historischer Dokumente, Übersetzungen und peer-reviewter Studien zur Bekämpfung von Fehlinformationen.",
    "archive_title": "Digitales Archiv",
    "archive_desc": "Ein riesiges, durchsuchbares Repository von Manuskripten und Texten, die für globale Forscher bewahrt und digitalisiert wurden.",
    "legal_title": "Rechtliche Antwort",
    "legal_desc": "Überwachung von Hassreden und systematischen Verzerrungen sowie rechtliche und akademische Maßnahmen auf globaler Ebene."
  },
  "Archive": {
    "title": "Digitales Archiv",
    "subtitle": "Ein kuratiertes Repository von historischen Manuskripten, akademischen Studien und verifizierten Dokumenten.",
    "search_placeholder": "Archiv durchsuchen...",
    "filters": "Filter",
    "type": "Dokumenttyp",
    "era": "Historische Ära",
    "types": {
      "manuscript": "Manuskripte",
      "study": "Akademische Studien",
      "document": "Offizielle Dokumente",
      "testimony": "Zeugnisse"
    },
    "eras": {
      "medieval": "Mittelalter",
      "ottoman": "Osmanische Ära",
      "mandate": "Französisches Mandat",
      "modern": "Moderne Ära"
    },
    "view_document": "Dokument ansehen",
    "download": "PDF Herunterladen"
  },
  "Monitor": {
    "title": "Beobachtungsstelle für Hassrede",
    "subtitle": "Verfolgung, Analyse und Reaktion auf systematische Verzerrungen und Hassreden weltweit.",
    "report_incident": "Einen Vorfall melden",
    "legal_responses": "Rechtliche Reaktionen",
    "incidents_map": "Aktuelle Vorfälle",
    "categories": {
      "media": "Verzerrung in den Medien",
      "political": "Politische Rhetorik",
      "cyber": "Cyber-Mobbing",
      "religious": "Religiöse Aufhetzung"
    },
    "form": {
      "title": "Einen neuen Vorfall dokumentieren",
      "desc": "Helfen Sie uns, Fehlinformationen zu verfolgen. Alle Einreichungen werden streng vertraulich behandelt.",
      "link_label": "Quellenlink / Beweis",
      "type_label": "Art des Vorfalls",
      "details_label": "Beschreibung",
      "submit": "Bericht einreichen"
    },
    "download_template": "Vorlage für rechtliche Hinweise herunterladen"
  },
  "Join": {
    "title": "Schließen Sie sich Aletheia an",
    "subtitle": "Wir suchen leidenschaftliche Menschen, die uns helfen, Geschichte wiederherzustellen und die akademische Wahrheit zu fördern.",
    "roles": {
      "translator": {
        "title": "Übersetzer / Redakteur",
        "desc": "Helfen Sie uns, Manuskripte und Studien ins Englische, Französische oder Deutsche zu übersetzen."
      },
      "researcher": {
        "title": "Akademischer Forscher",
        "desc": "Tragen Sie mit peer-reviewten Studien und historischen Analysen bei."
      },
      "creator": {
        "title": "Content Creator",
        "desc": "Erstellen Sie ansprechende visuelle Inhalte, um ein breiteres globales Publikum zu erreichen."
      }
    },
    "form": {
      "name": "Vollständiger Name",
      "email": "E-Mail-Adresse",
      "role": "Gewünschte Rolle",
      "portfolio": "Link zum Portfolio / Lebenslauf",
      "submit": "Jetzt bewerben"
    }
  },
  "About": {
    "title": "Über uns",
    "subtitle": "Aletheia ist eine unabhängige, gemeinnützige digitale Plattform, die sich der Korrektur des historischen Narrativs und der Präsentation des intellektuellen Erbes der alawitischen Gemeinschaft mit akademischer Strenge widmet.",
    "mission_title": "Unsere Mission",
    "mission_desc": "Jahrhundertelang war die alawitische Gemeinschaft historischer Verzerrung, Marginalisierung und Falschdarstellung ausgesetzt. Unsere Mission ist es, ein zentrales, akademisch verifiziertes digitales Archiv aufzubauen, das diese Narrative korrigiert.",
    "vision_title": "Unsere Vision",
    "vision_desc": "Wir stellen uns eine Welt vor, in der Geschichte nicht von Siegern oder Unterdrückern geschrieben wird, sondern durch verifizierte Fakten und objektive Wahrheit. Aletheia dient als Brücke zwischen der Vergangenheit und der Zukunft.",
    "values_title": "Unsere Kernwerte",
    "values": {
      "rigor_title": "Akademische Strenge",
      "rigor_desc": "Alle Dokumente basieren auf verifizierten Primärquellen und peer-reviewter Forschung.",
      "objectivity_title": "Objektivität",
      "objectivity_desc": "Wir präsentieren Geschichte, wie sie ist, frei von ideologischen Voreingenommenheiten.",
      "accessibility_title": "Zugänglichkeit",
      "accessibility_desc": "Unsere Archive stehen allen offen – alte Manuskripte werden in moderne Sprachen übersetzt.",
      "protection_title": "Schutz",
      "protection_desc": "Wir überwachen und bekämpfen rechtlich organisierte Hassreden und systematische Diffamierungen."
    },
    "quote": "Wir lesen Geschichte nicht, um zu wissen, wo unsere Vorfahren waren, sondern um zu verstehen, warum wir heute hier sind und wie wir morgen besser sein können."
  },
  "History": {
    "title": "Geschichte",
    "subtitle": "Erkunden Sie die chronologische Geschichte, dekonstruieren Sie historische Mythen und entdecken Sie die wahren Ursprünge der Gemeinschaft durch verifizierte Dokumente.",
    "eras": {
      "medieval_title": "Mittelalter & Ursprünge",
      "medieval_desc": "Verfolgung der Wurzeln der Gemeinschaft in der Levante und Untersuchung früher philosophischer Formationen.",
      "ottoman_title": "Die osmanische Ära",
      "ottoman_desc": "Eine von Marginalisierung und Verfolgung geprägte Zeit. Dokumentation von Fatwas und wirtschaftlichen Sanktionen.",
      "mandate_title": "Das französische Mandat",
      "mandate_desc": "Dekonstruktion der kolonialen Narrative und Untersuchung der politischen Bewegungen und Widerstandsführer.",
      "modern_title": "Moderne Ära & Staatsaufbau",
      "modern_desc": "Analyse der Integration in den modernen Staat und des anhaltenden Kampfes für historische Gerechtigkeit.",
      "future_title": "Unsere Zukunft: Alawiten Wohin?",
      "future_desc": "Die Ideologie des Überlebens."
    }
  },
  "Culture": {
    "title": "Kultur & Gesellschaft",
    "subtitle": "Entdecken Sie die reichen Traditionen, die philosophische Tiefe und das widerstandsfähige soziale Gefüge einer Gemeinschaft, die Jahrhunderte der Marginalisierung überlebt hat.",
    "topics": {
      "philosophy_title": "Philosophisches Erbe",
      "philosophy_desc": "Verwurzelt in tiefen esoterischen Traditionen, betont das Erbe geistige Freiheit und eine Verbindung zum Kosmos.",
      "literature_title": "Literatur & Poesie",
      "literature_desc": "Von den klassischen Werken Al-Makzun Al-Sinjaris bis zu modernen literarischen Figuren.",
      "ethics_title": "Soziales Gefüge & Ethik",
      "ethics_desc": "Eine zutiefst egalitäre Gesellschaft, die Solidarität und strenge ethische Kodizes betont.",
      "folk_title": "Volkstraditionen",
      "folk_desc": "Die agrarische Lebensweise der Berge brachte einzigartige musikalische Traditionen und Feste hervor."
    }
  }
};

const es = {
  "Navigation": {
    "about": "Sobre nosotros",
    "history": "Historia",
    "archive": "Archivo",
    "culture": "Cultura",
    "monitor": "Observatorio",
    "join": "Únete",
    "media": "Medios",
    "blog": "Blog",
    "protection": "Protección"
  },
  "Hero": {
    "badge": "Archivo Digital Ya Disponible",
    "title1": "Desvelando la",
    "title_highlight": "Verdad.",
    "title2": "Restaurando la Historia.",
    "description": "Una plataforma internacional dedicada a corregir la narrativa histórica y presentar el legado intelectual de la comunidad alauita con rigor académico.",
    "explore": "Explorar el Archivo",
    "mission": "Leer Nuestra Misión",
    "scroll": "Desplazarse"
  },
  "Pillars": {
    "rigor_title": "Rigor Académico",
    "rigor_desc": "Proporcionando documentos históricos verificados, traducciones y estudios revisados por pares.",
    "archive_title": "Archivo Digital",
    "archive_desc": "Un enorme repositorio de manuscritos y textos, preservados y digitalizados para investigadores globales.",
    "legal_title": "Respuesta Legal",
    "legal_desc": "Monitoreo de discursos de odio y distorsiones sistémicas, respondiendo con acción legal."
  },
  "Archive": {
    "title": "Archivo Digital",
    "subtitle": "Un repositorio curado de manuscritos históricos, estudios académicos y documentos verificados.",
    "search_placeholder": "Buscar en el archivo...",
    "filters": "Filtros",
    "type": "Tipo de Documento",
    "era": "Época Histórica",
    "types": {
      "manuscript": "Manuscritos",
      "study": "Estudios Académicos",
      "document": "Documentos Oficiales",
      "testimony": "Testimonios"
    },
    "eras": {
      "medieval": "Período Medieval",
      "ottoman": "Época Otomana",
      "mandate": "Mandato Francés",
      "modern": "Época Moderna"
    },
    "view_document": "Ver Documento",
    "download": "Descargar PDF"
  },
  "Monitor": {
    "title": "Observatorio de Discursos de Odio",
    "subtitle": "Rastreando, analizando y respondiendo a la distorsión sistémica a nivel mundial.",
    "report_incident": "Reportar un Incidente",
    "legal_responses": "Respuestas Legales",
    "incidents_map": "Incidentes Recientes",
    "categories": {
      "media": "Distorsión en Medios",
      "political": "Retórica Política",
      "cyber": "Ciberacoso",
      "religious": "Incitación Religiosa"
    },
    "form": {
      "title": "Documentar un Nuevo Incidente",
      "desc": "Ayúdanos a rastrear la desinformación. Todos los envíos son estrictamente confidenciales.",
      "link_label": "Enlace de Origen / Evidencia",
      "type_label": "Tipo de Incidente",
      "details_label": "Descripción",
      "submit": "Enviar Reporte"
    },
    "download_template": "Descargar Plantilla Legal"
  },
  "Join": {
    "title": "Únete a Aletheia",
    "subtitle": "Buscamos personas apasionadas para ayudarnos a restaurar la historia y promover la verdad académica.",
    "roles": {
      "translator": {
        "title": "Traductor / Editor",
        "desc": "Ayúdanos a traducir manuscritos al inglés, francés o alemán."
      },
      "researcher": {
        "title": "Investigador Académico",
        "desc": "Contribuir con análisis históricos revisados por pares."
      },
      "creator": {
        "title": "Creador de Contenido",
        "desc": "Crear contenido visual para llegar a una audiencia global."
      }
    },
    "form": {
      "name": "Nombre Completo",
      "email": "Correo Electrónico",
      "role": "Rol Deseado",
      "portfolio": "Enlace al Portafolio / CV",
      "submit": "Aplicar Ahora"
    }
  },
  "About": {
    "title": "Sobre Nosotros",
    "subtitle": "Aletheia es una plataforma digital independiente dedicada a corregir la narrativa histórica de la comunidad alauita.",
    "mission_title": "Nuestra Misión",
    "mission_desc": "Durante siglos, la comunidad ha sido sometida a distorsión histórica. Nuestra misión es construir un archivo digital verificado.",
    "vision_title": "Nuestra Visión",
    "vision_desc": "Imaginamos un mundo donde la historia no sea escrita por los vencedores, sino por hechos verificados.",
    "values_title": "Nuestros Valores",
    "values": {
      "rigor_title": "Rigor Académico",
      "rigor_desc": "Todos los documentos están respaldados por fuentes primarias.",
      "objectivity_title": "Objetividad",
      "objectivity_desc": "Presentamos la historia tal como es, sin sesgos.",
      "accessibility_title": "Accesibilidad",
      "accessibility_desc": "Nuestros archivos están abiertos a todos.",
      "protection_title": "Protección",
      "protection_desc": "Contrarrestamos legalmente las campañas de difamación."
    },
    "quote": "No leemos la historia para saber dónde estuvieron nuestros antepasados, sino para comprender por qué estamos aquí hoy y cómo podemos ser mejores mañana."
  },
  "History": {
    "title": "Historia",
    "subtitle": "Explora la historia cronológica y deconstruye los mitos a través de documentos verificados.",
    "eras": {
      "medieval_title": "Período Medieval y Orígenes",
      "medieval_desc": "Rastreando las raíces de la comunidad en el Levante.",
      "ottoman_title": "La Época Otomana",
      "ottoman_desc": "Un período definido por la marginación y la persecución sistémica.",
      "mandate_title": "El Mandato Francés",
      "mandate_desc": "Deconstruyendo las narrativas coloniales.",
      "modern_title": "Época Moderna y Construcción del Estado",
      "modern_desc": "Analizando la integración en el estado moderno.",
      "future_title": "Nuestro futuro: ¿Alauitas hacia dónde?",
      "future_desc": "La ideología de la supervivencia."
    }
  },
  "Culture": {
    "title": "Cultura y Sociedad",
    "subtitle": "Descubre las ricas tradiciones, la profundidad filosófica y el tejido social resiliente.",
    "topics": {
      "philosophy_title": "Legado Filosófico",
      "philosophy_desc": "Arraigado en profundas tradiciones esotéricas e influencias neoplatónicas.",
      "literature_title": "Literatura y Poesía",
      "literature_desc": "Desde las obras clásicas hasta figuras literarias modernas.",
      "ethics_title": "Tejido Social y Ética",
      "ethics_desc": "Una sociedad profundamente igualitaria que enfatiza la solidaridad.",
      "folk_title": "Tradiciones Populares",
      "folk_desc": "Rituales y festivales que celebran las estaciones y honran figuras históricas."
    }
  }
};

fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/es.json', JSON.stringify(es, null, 2));

console.log('French, German, and Spanish translations fully generated.');
