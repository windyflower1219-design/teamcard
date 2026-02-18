// Parse PDF text into paragraphs with hierarchy
function parsePDFIntoParagraphs(text) {
    const paragraphs = [];
    let currentChapter = null;
    let currentSection = null;

    // Split by lines
    const lines = text.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        // Check for Chapter (e.g., "Chapter 1" or "CHAPTER 1")
        const chapterMatch = line.match(/^CHAPTER\s+(\d+)\s*(.*)$/i);
        if (chapterMatch) {
            currentChapter = {
                number: chapterMatch[1],
                title: lines[i + 1] ? lines[i + 1].trim() : chapterMatch[2]
            };
            currentSection = null;
            i += 2;
            continue;
        }

        // Check for Section (e.g., "SECTION I" or "Section II")
        const sectionMatch = line.match(/^SECTION\s+([IVX]+)\s*[-—]\s*(.*)$/i);
        if (sectionMatch) {
            currentSection = {
                number: sectionMatch[1],
                title: sectionMatch[2] || (lines[i + 1] ? lines[i + 1].trim() : '')
            };
            i += 2;
            continue;
        }

        // Check for numbered paragraph (e.g., "1-1." or "3-6 ")
        const paraMatch = line.match(/^(\d+-\d+)[.\s]+(.*)$/);
        if (paraMatch) {
            const paraNumber = paraMatch[1];
            let paraTitle = paraMatch[2].trim();

            // If title is empty, check next line
            if (!paraTitle && i + 1 < lines.length) {
                paraTitle = lines[i + 1].trim();
                i++;
            }

            // Collect content until next paragraph number
            const contentLines = [];
            i++;
            while (i < lines.length) {
                const nextLine = lines[i].trim();
                if (nextLine.match(/^\d+-\d+[.\s]+/) || nextLine.match(/^CHAPTER\s+\d+/i) || nextLine.match(/^SECTION\s+[IVX]+/i)) {
                    break;
                }
                if (nextLine) {
                    contentLines.push(nextLine);
                }
                i++;
            }

            const content = contentLines.join(' ').trim();

            if (content.length > 30) {
                const sentences = parseSentences(content);
                const keywords = extractKeywordsFromGlossary(content, sentences);
                const claims = generateClaims(sentences);
                const references = extractReferences(content, sentences);

                paragraphs.push({
                    paragraph_number: paraNumber,
                    paragraph_title: paraTitle.toLowerCase(),
                    raw_text: content,
                    sentences: sentences,
                    keywords: keywords,
                    claims: claims,
                    references: references,
                    summary: {
                        text_ko: generateSummary(sentences),
                        evidence_sids: sentences.slice(0, Math.min(3, sentences.length)).map(s => s.id)
                    },
                    metadata: {
                        chapter: currentChapter ? currentChapter.title : null,
                        chapter_number: currentChapter ? currentChapter.number : null,
                        section: currentSection ? currentSection.title : null,
                        section_number: currentSection ? currentSection.number : null,
                        sub: paraTitle
                    }
                });
            }
            continue;
        }

        i++;
    }

    console.log(`Parsed ${paragraphs.length} paragraphs with hierarchy`);
    return paragraphs;
}
