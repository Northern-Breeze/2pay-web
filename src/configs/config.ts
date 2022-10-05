
const devConfig = {
  SERVER_URL: process.env.REACT_APP_API_URL,
  PAY_STACK_PUBLIC: process.env.REACT_APP_PAY_STACK_PUBLIC,
};

const prodConfigs = {
    SERVER_URL: process.env.REACT_APP_API_URL,
    PAY_STACK_PUBLIC: process.env.REACT_APP_PAY_STACK_PUBLIC,
};

const configs = process.env.NODE_ENV === 'development' ? devConfig : prodConfigs;

export default configs;
