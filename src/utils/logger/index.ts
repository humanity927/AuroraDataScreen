type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const levelWeight: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 99,
};

const defaultLevel: LogLevel = import.meta.env.PROD ? 'warn' : 'debug';
let activeLevel: LogLevel = import.meta.env.VITE_LOG_LEVEL ?? defaultLevel;

const canWrite = (level: LogLevel) => levelWeight[level] >= levelWeight[activeLevel];
const formatPrefix = (level: LogLevel) => `[AuroraDataScreen][${level.toUpperCase()}]`;

export const logger = {
  setLevel(level: LogLevel) {
    activeLevel = level;
  },
  getLevel() {
    return activeLevel;
  },
  debug(message: string, context?: unknown) {
    if (canWrite('debug')) {
      console.debug(formatPrefix('debug'), message, context ?? '');
    }
  },
  info(message: string, context?: unknown) {
    if (canWrite('info')) {
      console.info(formatPrefix('info'), message, context ?? '');
    }
  },
  warn(message: string, context?: unknown) {
    if (canWrite('warn')) {
      console.warn(formatPrefix('warn'), message, context ?? '');
    }
  },
  error(message: string, context?: unknown) {
    if (canWrite('error')) {
      console.error(formatPrefix('error'), message, context ?? '');
    }
  },
};

export type { LogLevel };
