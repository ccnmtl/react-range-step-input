import React from 'react';
import { configure, mount } from 'enzyme';
import { App } from "../index";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { forceNumber } from "../../lib/utils";

configure({ adapter: new Adapter() });

describe('App', () => {
  let ReactWrapper;
  beforeEach(() => {
    ReactWrapper = mount(<App />);
  });

  it('should render a div with a p tag and the RangeStepInput component', () => {
    expect(ReactWrapper.find('p').length).toEqual(1);
    expect(ReactWrapper.find(".input-group").length).toEqual(1);
  });

  it('should change the state when changing RangeStepInput', () => {
    expect(ReactWrapper.find(".input-group-text").text()).toEqual('50');
    ReactWrapper.find('input').simulate('change', { target: { value: 100 } });
    expect(ReactWrapper.find(".input-group-text").text()).toEqual('100');
  });
});

describe('forceNumber', () => {
  describe('input value is a number', () => {
    it('should return the provided value as a number', () => {
      expect(typeof forceNumber('10')).toEqual('number');
      expect(forceNumber('10')).toBe(10);
    });

    it('should return a negative value as a number', () => {
      expect(forceNumber('-10')).toBe(-10);
    });

    it('should return a floating value as a number', () => {
      expect(forceNumber('0.7')).toBe(0.7);
    });

    it('should return 0 value as a number', () => {
      expect(forceNumber('0')).toBe(0);
    });

    it('should return a value starting with 0 as a number not starting with 0', () => {
      expect(forceNumber('007')).toBe(7);
    });

    it('should return a value of type number as a number', () => {
      expect(forceNumber(20)).toBe(20);
    });
  });

  describe('input value is not a numbe', () => {
    it('should return 0 if input is a text', () => {
      expect(forceNumber('hello')).toBe(0);
      expect(forceNumber('5hello')).toBe(0);
      expect(forceNumber('5 hello')).toBe(0);
      expect(forceNumber('5 7')).toBe(0);
      expect(forceNumber('')).toBe(0);
      expect(forceNumber(undefined)).toBe(0);
      expect(forceNumber({})).toBe(0);
      expect(forceNumber(null)).toBe(0);
      expect(forceNumber([1, 2, 3])).toBe(0);
      expect(forceNumber(NaN)).toBe(0);
    });

    it('should return 0 if input contains a number and text', () => {
      expect(forceNumber('5hello')).toBe(0);
      expect(forceNumber('5 hello')).toBe(0);
    });

    it('should return 0 if input contains spaces', () => {
      expect(forceNumber('5 7')).toBe(0);
    });

    it('should return 0 if input is an empty string', () => {
      expect(forceNumber('')).toBe(0);
    });

    it('should return 0 if input is undefined or null', () => {
      expect(forceNumber(undefined)).toBe(0);
      expect(forceNumber(null)).toBe(0);
    });

    it('should return 0 if input is an empty object', () => {
      expect(forceNumber({})).toBe(0);
    });

    it('should return 0 if input is an array of numbers', () => {
      expect(forceNumber([1, 2, 3])).toBe(0);
    });

    it('should return 0 if input is NaN', () => {
      expect(forceNumber(NaN)).toBe(0);
    });
  })
});
