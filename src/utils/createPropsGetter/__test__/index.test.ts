import createPropsGetter from '../';

test('createPropsGetter test module', function () {
  type DefaultProps = Readonly<typeof defaultProps>;

  type Props = {
    onClick(e: MouseEvent): any;
  } & Partial<DefaultProps>;

  const props: Props = {
    onClick: (e: MouseEvent) => console.info('click')
  };
  const defaultProps = {
    color: 'blur',
    type: 'button'
  };

  const mockCreater = jest.fn(createPropsGetter);
  const getProps = mockCreater(defaultProps);
  const mockGetter = jest.fn(getProps);
  const newProps = mockGetter(props);

  expect(mockCreater).toHaveReturned();
  expect(mockCreater).toHaveReturned();
  expect(mockCreater).toHaveBeenCalled();
  expect(mockCreater).toHaveBeenCalledTimes(1);

  expect(mockGetter).toHaveReturned();
  expect(mockGetter).toHaveReturnedWith(props);
  expect(mockGetter).toHaveBeenCalled();
  expect(mockGetter).toHaveBeenCalledTimes(1);

  expect(newProps).toBe(props);
});