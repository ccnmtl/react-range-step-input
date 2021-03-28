import React from 'react';
import { mount, configure } from 'enzyme';
import RangeStepInput from "../RangeStepInput";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import * as App from '../../docs/index.jsx';
import * as ReactDOM from "react-dom";

configure({ adapter: new Adapter() });

// jest.mock('../../docs/index');
// const onChange = App.onChange as jest.MockedFunction;

describe('<RangeStepInput>', () => {
  it('should render a RangeStepInput with a number as a value', () => {
    const onChange = jest.fn();
    const val = 5;
    const div = document.createElement('div');

    ReactDOM.render(<RangeStepInput onChange={onChange} step={1} value={val} />, div);

    let ReactWrapper = mount(<RangeStepInput onChange={onChange} step={1} value={val} />);
    console.log("INNER HTML", div.innerHTML);
    expect(div.querySelector('input').type).toBe('range');

    expect(ReactWrapper.find('input').prop('value')).toBeDefined();
    expect(ReactWrapper.find('input').prop('value')).toEqual(5);
    // expect(ReactWrapper.find('input').prop('value').type()).toBe('range'); wieso geht das nicht?
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
      // onChange.mockReturnValue(50);

      const testState = { step: 1, value: 5 };

      let ReactWrapper = mount(<RangeStepInput onChange={(e) => {
        testState.value = e.target.value;
      }} step={testState.step} value={testState.value} />);

      expect(ReactWrapper.find('input').prop('value')).toEqual(5);
      ReactWrapper.find('input').simulate('change', { target: { name: 'width', value: 50 } });
      expect(testState.value).toEqual(50);

      // wieso geht das nicht mit dem Mock? :
      // ReactWrapper.find('input').simulate('onChange');
      // expect(ReactWrapper.find('input').prop('value')).toEqual(newVal);
    });

    // dieser Test ist komplett komisch
    it('it changes state on mouse down', async () => {
      const onChange = jest.fn();
      const mockCallBack = jest.fn();

      let ReactWrapper = mount(<RangeStepInput
        onChange={onChange}
        onMouseDown={mockCallBack}
        step={1}
        value={5} />);

      await ReactWrapper.find('input').invoke(onMouseDown)(
        {
          isMouseDown: true
        }
      );

      expect(ReactWrapper.state(isMouseDown)).toEqual(false)
    })
  });

});
