import React from 'react';
import renderer from 'react-test-renderer';

import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";

it('Circle рендерися без ошибок', () => {
  const circleWithOutText = renderer.create(<Circle />).toJSON();
  const circleWithText = renderer.create(<Circle letter='Asd'/>).toJSON();
  const circleWithHead = renderer.create(<Circle head='TOP'/>).toJSON();
  const circleWithReactHead = renderer.create(<Circle head={<Circle />}/>).toJSON();
  const circleWithTail = renderer.create(<Circle tail='TOP'/>).toJSON();
  const circleWithReactTail = renderer.create(<Circle tail={<Circle />}/>).toJSON();
  const circleWithIndex = renderer.create(<Circle index={0}/>).toJSON();
  const smallCircle = renderer.create(<Circle isSmall={true}/>).toJSON();
  const circleWithDefaultState = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
  const circleWithChangingState = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
  const circleWithModifiedState = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();

  expect(circleWithOutText).toMatchSnapshot();
  expect(circleWithText).toMatchSnapshot();
  expect(circleWithHead).toMatchSnapshot();
  expect(circleWithReactHead).toMatchSnapshot();
  expect(circleWithTail).toMatchSnapshot();
  expect(circleWithReactTail).toMatchSnapshot();
  expect(circleWithIndex).toMatchSnapshot();
  expect(smallCircle).toMatchSnapshot();
  expect(circleWithDefaultState).toMatchSnapshot();
  expect(circleWithChangingState).toMatchSnapshot();
  expect(circleWithModifiedState).toMatchSnapshot();
})