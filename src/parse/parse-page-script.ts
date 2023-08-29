
export declare type ParsePageScriptRes = Array<{
  start: number
  end: number
  lang: string | undefined
}>
export function parsePageScript(input: string):ParsePageScriptRes {
  const scriptTags: ParsePageScriptRes = [];
  const scriptTagRegex = /<script\b[^>]*?(?:\slang=('|")(.*?)\1)?[^>]*>/gi;
  const endScriptTagRegex = /<\/script>/gi;
  let match;
  let lastIndex = 0;

  while ((match = scriptTagRegex.exec(input)) !== null) {
    const start = match.index + match[0].length; // Position after '>'
    const lang = match[2];

    endScriptTagRegex.lastIndex = lastIndex;
    const endMatch = endScriptTagRegex.exec(input);

    if (endMatch) {
      const end = endMatch.index; // Position before '<'
      const res = { start, end, lang }
      scriptTags.push(res);
      lastIndex = end + endMatch[0].length;
    }
  }
  return scriptTags;
}
