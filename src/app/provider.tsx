'use client';
import { ThemeProvider } from '@/components/ui/theme-provides';
import store from '@/lib/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 12, // mantiene los datos en cache por 12 horas.
      
    },
  },
});
interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {



  return (

    <div>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <QueryClientProvider client={client}>
          <Provider store={store}>
            {children}
          </Provider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ThemeProvider>

    </div>
  );
};

export default Providers;