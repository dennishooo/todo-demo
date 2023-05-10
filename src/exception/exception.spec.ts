import { DefaultException } from './exception';

describe('DefaultException', () => {
  it('should be defined', () => {
    expect(new DefaultException()).toBeDefined();
  });
});
