import { afterEach, describe, expect, it, vi } from 'vitest';

import { logger } from '@/utils/logger';

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    logger.setLevel('debug');
  });

  it('writes messages at enabled levels', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    logger.setLevel('info');
    logger.info('ready');

    expect(spy).toHaveBeenCalledWith('[AuroraDataScreen][INFO]', 'ready', '');
  });

  it('suppresses messages below the active level', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => undefined);

    logger.setLevel('warn');
    logger.debug('hidden');

    expect(spy).not.toHaveBeenCalled();
  });
});
