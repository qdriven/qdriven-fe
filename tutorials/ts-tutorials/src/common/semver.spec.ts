import { semverCompare } from './semver';

describe('semver.ts', () => {
  it('semverCompare', () => {
    const list = [
      // equal
      ['1.0.0', '1.0.0', 0],
      ['1.0.0-20220901120202', '1.0.0-20220901120202', 0],

      // patch
      ['1.0.1', '1.0.0', 1],
      ['1.0.0', '1.0.1', -1],

      // major
      ['2.0.0', '1.0.0', 1],
      ['1.0.0', '2.0.0', -1],

      // minor
      ['1.1.0', '1.0.0', 1],
      ['1.0.0', '1.1.0', -1],
      ['1.10.0', '1.9.0', 1],
      ['1.9.0', '1.10.0', -1],

      // snapshot
      ['1.0.0-20220901120202', '1.0.0-20220901120202', 0],
      ['1.0.1-20220901120202', '1.0.0-20220901120202', 0],
      ['1.0.0-20220901120202', '1.0.1-20220901120202', 0],
    ] as const;

    for (const [a, b, r] of list) {
      if (semverCompare(a, b) !== r) console.log(a, b, r);
      expect(semverCompare(a, b)).toBe(r);
    }
  });
  it('semverCompare-loose', () => {
    const list = [
      // equal
      ['1.0.0', '1.0.0', 0],

      // snapshot
      ['1.0.0-20220901120202', '1.0.0-20220901120202', 0],
      ['1.0.1-20220901120202', '1.0.0-20220901120202', 1],
      ['1.0.0-20220901120202', '1.0.1-20220901120202', -1],
    ] as const;

    for (const [a, b, r] of list) {
      expect(semverCompare(a, b, false)).toBe(r);
    }
  });
});
