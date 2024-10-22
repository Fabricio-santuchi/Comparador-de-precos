/* eslint-disable react/prop-types */
import styled from "styled-components";

const Item = styled.a`
  text-decoration: none;
`;

const ContainerCard = styled.div`
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 4px 6pc var(--shadow-color);
  text-align: center;
  padding: 20px;
  transition: 0.4s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px var(--shadow-color);
  }
  img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  h3 {
    font-size: 1.1em;
    margin-bottom: 10px;
    color: var(--primary-color);
  }
  p.price {
    color: var(--secondary-color);
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 1.2em;
  }
  p.store {
    color: var(--text-color);
    margin-bottom: 5px;
  }
`;

const Cards = ({ item }) => {
  const imagemMedia = item.thumbnail.replace(/\.jpg/g, "W.jpg");
  if (!item) return null;

  return (
    <Item href={item.permalink} target="_blank" rel="noopener noreferrer">
      <ContainerCard>
        <img src={imagemMedia} alt={`Imagem do produto ${item.title}`} />
        <h3>{item.title}</h3>
        <p className="price">
          {item.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="store">Loja: {item.seller.nickname}</p>
      </ContainerCard>
    </Item>
  );
};

export default Cards;
