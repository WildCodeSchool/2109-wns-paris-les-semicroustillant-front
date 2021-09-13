import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { CardRow, Container, Footer, Header } from './styles/elements';
import Wilder, { IWilderProps } from './Wilder';
import AddWilder from './AddWilder';

function App(): JSX.Element {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios('http://localhost:5000/api/wilders');
        setWilders(result.data.result);
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
    };

    fetchWilders();
  }, []);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <AddWilder />
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder
              key={wilder._id}
              city={wilder.city}
              name={wilder.name}
              skills={wilder.skills}
            />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2021 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
