// Este componente importa a landing page original
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './Home';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>LIMPOW - Limpe seu nome e Reconquiste o seu Poder de Compra</title>
        <meta name="description" content="Seu nome limpo e sua vida financeira transformada em até 15 dias. Junte-se aos milhares de brasileiros que já recomeçaram com o LIMPOW!" />
      </Helmet>
      <div className="landing-page-container">
        <Home />
      </div>
    </>
  );
};

export default LandingPage;
