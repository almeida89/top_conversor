import Converter from '../components/Converter';
import Head from 'next/head';

export default function HomePage() {
  return (
    // Este div agora só precisa centralizar o conteúdo na página.
    // O 'min-h-screen' aqui garante que o conteudo seja centralizado
    // verticalmente na tela inteira.
    <div className="flex justify-center items-center min-h-screen p-4">
      <Head>
        <title>Top Conversor - Início</title>
      </Head>

      <Converter />
    </div>
  );
}