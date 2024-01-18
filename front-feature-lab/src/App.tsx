import VehicleListPage from "./components/VehicleList";
import Banner from "./components/Banner";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useFeatureFlags } from "./assets/hooks/useFeatureFlags";
import { useEffect, useState } from "react";
import { checkIsBlackFairActive, checkIsNewLayoutCardActive } from "./utils";
import { ThemeType, darkTheme, defaultTheme } from "./styles/themes";
import { LayoutType } from "./types";
import { LayoutProvider } from "./context/LayoutContext";
import Loading from "./components/Loading";

function App() {
  const [theme, setTheme] = useState<ThemeType | undefined>(undefined);
  const [layout, setLayout] = useState<LayoutType | undefined>(undefined);

  const { data: flags, isLoading, isError } = useFeatureFlags();

  useEffect(() => {
    if (flags) {
      setTheme(checkIsBlackFairActive(flags) ? darkTheme : defaultTheme);
      setLayout(checkIsNewLayoutCardActive(flags) ? "horizontal" : "vertical");
    }
  }, [flags]);

  if (isLoading || !theme || !layout) {
    return <Loading />;
  }

  if (isError) {
    return <div>Erro ao carregar as configurações.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LayoutProvider initialLayout={layout}>
        <div className="App">
          <Banner />
          <VehicleListPage />
        </div>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
