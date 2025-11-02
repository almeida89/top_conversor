// Nome do Arquivo: pages/index.js

import Converter from '../components/converter';
import Head from 'next/head';

export default function HomePage() {
  return (
    // Um contêiner de layout básico
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Top Conversor</title>
        <meta name="description" content="Conversor universal de medidas" />
      </Head>

      <main>
        {/* Aqui é onde o seu componente principal é renderizado */}
        <Converter />
      </main>
    </div>
  );
}