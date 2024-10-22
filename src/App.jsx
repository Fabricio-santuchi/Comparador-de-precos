import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import GraficoChart from "./components/GraficoChart";

// -CSS
const ContainerApp = styled.main`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const TituloApp = styled.h1`
  text-align: center;
  color: var(--primary-color);
  font-size: 2.5em;
  margin-bottom: 30px;
  text-shadow: 1px 1px 1px var(--shadow-color);
`;

const ContainerForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const InputText = styled.input`
  flex-grow: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  outline: none;
  &:focus {
    box-shadow: 0 0 5px var(--primary-color);
  }
`;

const ButtonBuscar = styled.button`
  padding: 12px 25px;
  background-color: var(--primary-color);
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: var(--background-color);
  border-radius: 25px;
  transition: 0.5s;
  &:hover {
    background-color: var(--secondary-button);
  }
`;

const ContainerDeProdutos = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

// -APP
function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?q=${search}`
      );
      const filtroDados = await response.data.results.slice(0, 10);
      setData(filtroDados);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setData([]);
      setIsDataLoaded(false);
    }
  };

  return (
    <ContainerApp>
      <TituloApp>Comparador de Preços</TituloApp>
      <ContainerForm onSubmit={handleSearch}>
        <InputText
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Digite o nome do Produto"
        />
        <ButtonBuscar type="submit">Buscar</ButtonBuscar>
      </ContainerForm>

      <ContainerDeProdutos>
        {data && data.map((item) => <Cards key={item.id} item={item} />)}
      </ContainerDeProdutos>

      {isDataLoaded && <GraficoChart items={data} />}
    </ContainerApp>
  );
}

export default App;
