import { Executor } from '../../../main/bootstrap/logic/Executor';
import { logger } from '../../../main/shared/utilities/LoggerUtility';

jest.mock('../../../main/shared/utilities/LoggerUtility', () => {
  return {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn()
    }
  };
});

describe('Executor', () => {

  it('logs invocation with provided arguments', () => {
    const executor = new Executor();
    const args = ['arg1', 'arg2'];

    executor.execute(args);

    expect(logger.info).toHaveBeenCalledWith({ args }, 'Executor invoked');
  });

});
