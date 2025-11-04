// cria o contêiner principal da sua página, definindo o fundo escuro e o Head padrão
import Head from 'next/head';

// O componente Layout "abraça" o conteúdo de todas as páginas.
// A prop 'children' é o conteúdo da página atual (ex: pages/index.js).
export default function Layout({ children }) {
    return (
        // 'min-h-screen' garante que o layout ocupe pelo menos a altura total da tela.
        // 'bg-gray-900' define o fundo escuro padrão.
        // 'text-white' define o texto padrão como branco.
        <div className= "min-h-screen bg-gray-900 text-white">
            <Head>
                {/* 'Head' define tags no <head> do HTML. */}
                {/* Título padrão, pode ser sobrescrito em paginas especificas*/}
                <title>Top Conversor</title>
                <meta name="description" content="Conversor universal de medidas" />
                {/* Você pode adicionar um ícone (favicon) aqui */}
                    <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="p-4 bg-gray-800 shadow-md">
                <h1 className="text-xl font-bold">Top Conversor</h1>
            </header>

            <main>
                {/* 'children é onde o conteúdo da página será renderizado' */}
                {children}
            </main>

            <footer className="text-center p-4 text-gray-500 text-sm">
                @2025 - Fábio Almeida. Todos os direitos reservados.
            </footer>
        </div>
    );
}