import { render, screen } from '@testing-library/react';
import WeatherForecast from '../page/WeatherForecast';

test('should render logo', () => {
  render(<WeatherForecast></WeatherForecast>);

  const logo = screen.getByText('Weathered');
  const subtext = screen.getByText('A simple and free weather app');

  expect(logo).toBeInTheDocument();
  expect(subtext).toBeInTheDocument();
});
