import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

it('Кнопка рендерися без ошибок', () => {
  const buttonWithText = renderer.create(<Button text='test'/>).toJSON();
  const buttonWithOutText = renderer.create(<Button text=''/>).toJSON();
  const lockedButton = renderer.create(<Button text='test' disabled/>).toJSON();
  const buttonIsLoading = renderer.create(<Button isLoader={true}/>).toJSON();

  expect(buttonWithText).toMatchSnapshot();
  expect(buttonWithOutText).toMatchSnapshot();
  expect(lockedButton).toMatchSnapshot();
  expect(buttonIsLoading).toMatchSnapshot();
})

it('Нажатие на кнопку вызывает корректный alert', () => {
  window.alert = jest.fn();

  render(<Button text='test' type='button' isLoader={false} onClick={()=> alert('test was complited')}/>)

  const button = screen.getByText("test");
  fireEvent.click(button);

  expect(window.alert).toHaveBeenCalledWith('test was complited');
}); 