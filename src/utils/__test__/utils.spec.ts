import { describe, it, expect } from 'vitest'
import { parseSvelteRequest } from '../index'
describe('parseSvelteRequest', () => {
  it('should parse Svelte request without query parameters', () => {
    const id = 'example.svelte';
    const expected = {
      filePath: 'example.svelte',
      query: {},
    };
    const result = parseSvelteRequest(id);
    expect(result).toEqual(expected);
  });

  it('should parse Svelte request with query parameters', () => {
    const id = 'example.svelte?svelte=true&src=true&index=1&raw=true&lang=tsx';
    const expected = {
      filePath: 'example.svelte',
      query: {
        svelte: true,
        src: true,
        index: 1,
        raw: true,
        "lang": "tsx",
      },
    };
    const result = parseSvelteRequest(id);
    expect(result).toEqual(expected);
  });

  it('should handle various combinations of query parameters', () => {
    const id = 'example.svelte?svelte=true&src=true&index=1&lang=jsx';
    const expected = {
      filePath: 'example.svelte',
      query: {
        svelte: true,
        src: true,
        index: 1,
        "lang": "jsx",
      },
    };
    const result = parseSvelteRequest(id);
    expect(result).toEqual(expected);
  });
});
