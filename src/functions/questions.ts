export default [
  {
    question: "What is parsed from the Wiki article?",
    answer:
      "All headings with the h2 tag, all paragraphs with the p tag, and all list items with the li tag are parsed from the Wiki. All this is taken from the main block, which has a JS path - '#mw-content-text > div.mw-content-ltr.mw-parser-output'",
  },
  {
    question: "Is any language supported?",
    answer:
      "Only English and articles from the English Wikipedia are supported.",
  },
  {
    question:
      'Where did the probabilities of the English letters appearing "from the Internet" come from?',
    answer:
      "The probabilities of English letters are taken from the Wikipedia article: https://en.wikipedia.org/wiki/English_alphabet",
  },
  {
    question:
      "Why is the article parsed anyway without providing a link to the Wikipedia article?",
    answer:
      "If you do not enter anything in the link field, the https://en.wikipedia.org/wiki/Cryptography article will be parsed",
  },
  {
    question: "Where can I see the source code of the parser?",
    answer:
      "It is available on GitHub at the link: https://github.com/FREDY129053/Cryptography/blob/main/parser_python/parser.py",
  },
];
