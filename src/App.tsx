import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PokemonListing from "./modules/PokemonListing";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PokemonDetails from "./modules/PokemonDetails";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<PokemonListing />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
