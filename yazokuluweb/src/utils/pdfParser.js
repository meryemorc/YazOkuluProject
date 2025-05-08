export const parseTranscriptLines = (lines) => {
    const courseRegex = /^([A-Z]{2,}\s*\d{3,})\s+(.+?)\s+(\d+)\s+(\d+)/;
  
    return lines
      .map((line) => {
        const match = line.match(courseRegex);
        if (match) {
          return {
            courseCode: match[1].trim(),
            courseName: match[2].trim(),
            kredi: parseInt(match[3]),
            akts: parseInt(match[4]),
          };
        }
        return null;
      })
      .filter(Boolean);
  };
  