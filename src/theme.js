const common = {
  padding: '10px',
  margin: '10px',
  horMargin: '0 10px',
  verMargin: '10px 0',
  radius: '3px'
};

export const theme = {
  dark: {
    ...common,
    color: '#ffffff',
    bg: '#424250',
    primary: '#25282f',
    secondary: '#33333d',
    green: '#1eb97f',
    border: '2px solid #1eb97f'
  },
  light: {
    ...common,
    color: '#1d1f27',
    bg: '#B3D8D1',
    primary: '#0B2B28',
    secondary: '#FFEEE0',
    green: '#6BA0A6',
    border: '2px solid #6BA0A6'
  }
};
