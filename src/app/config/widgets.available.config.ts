export const widgetsAvailable = [
  {
    key: 'STATS',
    name: 'Statistik',
    text: 'Ihr Text in Zahlen ausgedrückt',
    icon: 'view_module',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
  {
    key: 'GRAPH',
    name: 'Diagramm',
    text: 'Grafische Verteilung des Texts',
    icon: 'timeline',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
  {
    key: 'GRAPH_MULTI',
    name: 'Multi Diagramm',
    text: 'Vergleicht Dokumente',
    icon: 'graphic_eq',
    defaultSize: 'col-md-6',
    sizesAvailable: ['M', 'L', 'XL'],
    requiredDocuments: 3
  },
  {
    key: 'TEXT_VIEW',
    name: 'Text Viewer',
    text: 'Texte Anzeigen',
    icon: 'text_fields',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: -1
  },
  {
    key: 'SOURCE',
    name: 'Source',
    text: 'Source Code der Verarbeitung',
    icon: 'code',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
  {
    key: 'Pie_Grid_Chart',
    name: 'Torte Gitter Diagramm',
    text: 'Ihr Text grafisch dargestellt',
    icon: 'eject',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
  {
    key: 'LOCATION_MAP_WIDGET',
    name: 'Locations',
    text: 'Die Locations des Textes auf einer Map anzeigen',
    icon: 'eject',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
  {
    key: 'WORD_CLOUD_WIDGET',
    name: 'Word Cloud',
    text: 'Visualisierung der Wörter als Cloud',
    icon: 'eject',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
    {
    key: 'CHARACTER_FREQUENCY_WIDGET',
    name: 'Character Frequency',
    text: 'Die Häufigkeit der Buchstaben',
    icon: 'graphic_eq',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 1
  },
    {
    key: 'WORDS_LENGTH_WIDGET',
    name: 'Words/Sentences Length Graph',
    text: 'Die Länge der Wörter/Sätze eines Textes',
    icon: 'graphic_eq',
    defaultSize: 'col-md-6',
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    requiredDocuments: 3
  },
];
