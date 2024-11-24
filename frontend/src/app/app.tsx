// App.tsx
import React from 'react';
import { ApolloClientProvider } from './apollo/client';
import WeatherApp from './components/WeatherView';

const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <WeatherApp />
    </ApolloClientProvider>
  );
};

export default App;