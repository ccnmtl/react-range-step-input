import React from 'react';
import { configure, mount } from 'enzyme';
import RangeStepInput from "../RangeStepInput";
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

describe('<RangeStepInput>', () => {
  it('should render a RangeStepInput with a number as a value', () => {
    const onChange = jest.fn();
    const val = 5;
    let ReactWrapper = mount(<RangeStepInput onChange={onChange} step={1} value={val} />);

    expect(ReactWrapper.find('input').prop('value')).toBeDefined();
    expect(ReactWrapper.find('input').prop('value')).toEqual(5);
    expect(ReactWrapper.find('input').prop('type')).toBe('range');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('behavior', () => {
    it('renders a range setter input', () => {
      const onChange = jest.fn();
      let ReactWrapper = mount(<RangeStepInput onChange={onChange} step={1} value={5} />);

      expect(ReactWrapper.find('input').length).toEqual(1);
    });

    it('should set value to a new value on change', () => {
      const testState = { step: 1, value: 5 };
      let ReactWrapper = mount(<RangeStepInput onChange={(e) => {
        testState.value = e.target.value;
      }} step={testState.step} value={testState.value} />);

      expect(ReactWrapper.find('input').prop('value')).toEqual(5);
      ReactWrapper.find('input').simulate('change', { target: { value: 50 } });
      expect(testState.value).toEqual(50);
    });

    it('it changes state on mouse down', () => {
      const onChange = jest.fn();

      let ReactWrapper = mount(<RangeStepInput
        onChange={onChange}
        step={1}
        value={5} />);

      ReactWrapper.find('input').simulate('mouseDown');

      expect(ReactWrapper.state().isMouseDown).toEqual(true);
      ReactWrapper.find('input').simulate('mouseUp');
      expect(ReactWrapper.state().isMouseDown).toEqual(false);
    });
  });

});
