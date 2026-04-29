const formatMessage = (level, message, meta = {}) => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  ...meta,
});

const logInfo = (message, meta) => console.log(JSON.stringify(formatMessage("info", message, meta)));
const logWarn = (message, meta) => console.warn(JSON.stringify(formatMessage("warn", message, meta)));
const logError = (message, meta) => console.error(JSON.stringify(formatMessage("error", message, meta)));

module.exports = {
  logInfo,
  logWarn,
  logError,
};