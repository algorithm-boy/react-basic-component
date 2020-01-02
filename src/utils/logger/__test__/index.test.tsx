import logger from '../';

test('logger test module', function () {
  expect(logger).toHaveProperty('log');
  expect(logger).toHaveProperty('logInfo');
  expect(logger).toHaveProperty('logWarn');
  expect(logger).toHaveProperty('logErr');

  const jestLog = jest.fn(msg => logger.log(msg));
  const jestlogInfo = jest.fn(msg => logger.logInfo(msg));
  const jestlogWarn = jest.fn(msg => logger.logWarn(msg));
  const jestlogErr = jest.fn(msg => logger.logErr(msg));
  jestLog('jest - log');
  jestlogInfo('jest - logInfo');
  jestlogWarn('jest - logWarn');
  jestlogErr('jest - logErr');

  expect(jestLog).toHaveBeenCalled();
  expect(jestlogInfo).toHaveBeenCalled();
  expect(jestlogWarn).toHaveBeenCalled();
  expect(jestlogErr).toHaveBeenCalled();
});