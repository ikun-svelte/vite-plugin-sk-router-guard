import { describe, it, expect } from 'vitest'
import type { ParsePageScriptRes } from '../parse-page-script'
import { parsePageScript } from '../parse-page-script'
describe('parsePageScript', () => {
  it('should parse script tags without lang attribute', () => {
    const input = `<script>console.log("Script 1");</script>
    `;
    const expected: ParsePageScriptRes = [
      {
        start: 8,
        end: 32,
        lang: undefined,
      },
    ];
    const result = parsePageScript(input);
    expect(result).toEqual(expected);
  });

  it('should parse script tags with lang attribute', () => {
    const input = `<script lang="ts"     >console.log("Script 2");</script>
    `;
    const expected: ParsePageScriptRes = [
      {
        start: 23,
        end: 47,
        lang: 'ts',
      },
    ];
    const result = parsePageScript(input);
    expect(result).toEqual(expected);
  });

  it('should parse multiple script tags', () => {
    const input = `
      <script>
        console.log("Script 1");
      </script>
      <script lang="ts">
        console.log("Script 2");
      </script>
    `;
    const expected: ParsePageScriptRes = [
      {
        start: 15,
        end: 55,
        lang: undefined,
      },
      {
        start: 89,
        end: 129,
        lang: 'ts',
      },
    ];
    const result = parsePageScript(input);
    expect(result).toEqual(expected);
  });
});
