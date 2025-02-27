import * as mammoth from "mammoth";

const readDocxFile = async (fileName: string): Promise<string> => {
  try {
    const response = await fetch(`/string_encoding/files/${fileName}`);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });

    return value.replace(/\s+/g, " ").trim();
  } catch (error) {
    console.error("Cannot find .docx file: ", error);
    return "Error!!!";
  }
};

export async function getDocxFreqs(
  fileName: string
): Promise<Record<string, number>> {
  const text = (await readDocxFile(fileName)).toLowerCase();

  const seqMap: Record<string, number | undefined> = {
    th: text.match(/th[^e]/g)?.length,  // the
    tion: text.match(/tion/g)?.length,
    ing: text.match(/ing/g)?.length,
    ed: text.match(/[^r]ed/g)?.length,  // compARED
    re: text.match(/[^a]re/g)?.length,
    are: text.match(/are/g)?.length,
    is: text.match(/is/g)?.length,
    an: text.match(/an/g)?.length,
    the: text.match(/the/g)?.length,
    to: text.match(/to/g)?.length,
  };
  
  let sum: number = 0;

  for (const key in seqMap) {
    sum += seqMap[key] ? seqMap[key] : 0;
  }

  const freqMap: Record<string, number> = {};

  Object.entries(seqMap).forEach(([key, value]) => {
    freqMap[key] = Number((value! / sum).toFixed(6));
  });


  return Object.fromEntries(
    Object.entries(freqMap).sort((a, b) => b[1] - a[1])
  );
}
