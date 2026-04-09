import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Trophy, 
  AlertCircle, 
  Lightbulb, 
  BookOpen, 
  Target,
  PenTool,
  Sword
} from 'lucide-react';

const App = () => {
  const [fase, setFase] = useState(0);
  const [dados, setDados] = useState({
    tema: '',
    problema: '',
    resumo: '',
    causa1: '',
    causa2: '',
    repertorio: '',
    teseFinal: ''
  });

  const fases = [
    {
      titulo: "FASE 1: O Ponto de Partida",
      instrucao: "Transcreva o tema da redação no campo abaixo.",
      placeholder: "Ex: A persistência da violência contra a mulher no Brasil",
      campo: "tema",
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      titulo: "FASE 2: Abra o Debate",
      instrucao: "Transforme o tema em um problema: crie uma pergunta a partir da frase temática.",
      placeholder: "Ex: Por que a violência contra a mulher ainda persiste na sociedade brasileira?",
      campo: "problema",
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />
    },
    {
      titulo: "FASE 3: O Raio-X da Coletânea",
      instrucao: "Leia os textos de apoio e resuma a ideia principal deles em uma frase curta.",
      placeholder: "Em poucas palavras, os textos dizem que...",
      campo: "resumo",
      icon: <BookOpen className="w-6 h-6 text-green-500" />
    },
    {
      titulo: "FASE 4: A Escolha do Caminho",
      instrucao: "Sua tese deve focar em por que o problema acontece (Causa) ou no que ele gera (Consequência).",
      camposDuplos: true,
      labels: ["Causa ou Consequência 1", "Causa ou Consequência 2"],
      campos: ["causa1", "causa2"],
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />
    },
    {
      titulo: "FASE 5: O Baú de Conhecimento",
      instrucao: "Qual fato histórico, livro, filme ou citação se encaixa aqui? (Seu Repertório)",
      placeholder: "Meu repertório de abertura será...",
      campo: "repertorio",
      icon: <PenTool className="w-6 h-6 text-purple-500" />
    },
    {
      titulo: "O GRANDE BOSS: A Tese Final",
      instrucao: "Hora da verdade! Junte as peças e construa sua introdução (até 7 linhas e 2 períodos).",
      placeholder: "Escreva aqui o seu parágrafo de introdução completo...",
      campo: "teseFinal",
      isBoss: true,
      icon: <Sword className="w-6 h-6 text-red-600" />
    }
  ];

  const handleNext = () => {
    if (fase < fases.length) setFase(fase + 1);
  };

  const handlePrev = () => {
    if (fase > 0) setFase(fase - 1);
  };

  const progresso = ((fase) / (fases.length)) * 100;

  const renderFase = () => {
    if (fase === fases.length) {
      return (
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 p-6 rounded-full shadow-inner">
              <Trophy className="w-20 h-20 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 uppercase tracking-tighter">Você Conseguiu!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Você agora é oficialmente um <strong>Problematizador de Sucesso</strong>!<br/>
            Sua tese está pronta para enfrentar qualquer corretor.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300 text-left mb-8 shadow-sm">
            <h3 className="font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1 uppercase text-xs">Sua Introdução Final:</h3>
            <p className="italic text-gray-800 whitespace-pre-wrap leading-relaxed">{dados.teseFinal}</p>
          </div>
          <button 
            onClick={() => {setFase(0); setDados({tema:'',problema:'',resumo:'',causa1:'',causa2:'',repertorio:'',teseFinal:''})}}
            className="bg-green-600 text-white px-10 py-4 rounded-full font-black hover:bg-green-700 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            NOVO TEMA
          </button>
        </div>
      );
    }

    const f = fases[fase];

    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">{f.icon}</div>
          <h2 className={`text-2xl font-black uppercase tracking-tighter ${f.isBoss ? 'text-red-600' : 'text-gray-800'}`}>
            {f.titulo}
          </h2>
        </div>
        
        <div className="bg-blue-50 p-5 rounded-xl border-l-8 border-blue-500 shadow-sm">
          <p className="text-blue-900 font-medium italic">
            "{f.instrucao}"
          </p>
        </div>

        {f.camposDuplos ? (
          <div className="space-y-4">
            {f.campos.map((c, i) => (
              <div key={c}>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">{f.labels[i]}</label>
                <input
                  type="text"
                  value={dados[c]}
                  onChange={(e) => setDados({...dados, [c]: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all shadow-sm font-medium"
                  placeholder="Escreva aqui..."
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {f.isBoss && (
              <div className="bg-gray-900 p-4 rounded-xl mb-4 border border-gray-700">
                <p className="text-white text-xs font-bold mb-3 uppercase tracking-widest text-center opacity-60">Seu Inventário (Use estas peças):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  {Object.keys(dados).filter(k => k !== 'teseFinal' && dados[k]).map(k => (
                    <div key={k} className="bg-gray-800 p-2 rounded border border-gray-700 text-blue-300">
                      <span className="font-bold text-white opacity-80 uppercase">{k}:</span> {dados[k].substring(0, 40)}{dados[k].length > 40 ? '...' : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <textarea
              value={dados[f.campo]}
              onChange={(e) => setDados({...dados, [f.campo]: e.target.value})}
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all shadow-sm font-medium leading-relaxed ${f.isBoss ? 'h-56 border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'h-32 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`}
              placeholder={f.placeholder}
            />
          </div>
        )}

        <div className="flex justify-between items-center pt-6">
          <button 
            onClick={handlePrev}
            disabled={fase === 0}
            className={`flex items-center gap-1 px-5 py-2 rounded-lg font-bold transition-all ${fase === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={20} /> VOLTAR
          </button>
          
          <button 
            onClick={handleNext}
            disabled={f.camposDuplos ? (!dados.causa1 || !dados.causa2) : !dados[f.campo]}
            className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white transition-all shadow-lg transform hover:scale-105 active:scale-95 ${
              f.isBoss ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            } disabled:bg-gray-300 disabled:shadow-none disabled:scale-100`}
          >
            {f.isBoss ? "DESAFIAR O BOSS" : "PRÓXIMA FASE"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans selection:bg-blue-200">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
        {/* Header Gamer */}
        <div className="bg-gray-900 p-8 text-white relative">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Missão: Problematizador <span className="text-blue-500">Pro</span>
            </h1>
            <div className="bg-gray-800 px-4 py-1 rounded-full border border-gray-700 text-xs font-mono font-bold text-blue-400">
              LVL {fase + 1} / {fases.length}
            </div>
          </div>
          
          <div className="w-full bg-gray-800 h-4 rounded-full p-1 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progresso}%` }}
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-white opacity-20 skew-x-12 animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-3 text-[10px] uppercase font-black tracking-widest text-gray-500">
            <span>Start</span>
            <span className="text-blue-400">Progresso do Guerreiro: {Math.round(progresso)}%</span>
            <span>Final Boss</span>
          </div>
        </div>

        {/* Área de Jogo */}
        <div className="p-8 md:p-12">
          {renderFase()}
        </div>

        {/* Barra de Status Inferior */}
        {fase < fases.length && (
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex flex-wrap gap-6 justify-center">
            <StatusIcon active={!!dados.tema} label="TEMA" />
            <StatusIcon active={!!dados.problema} label="PROBLEMA" />
            <StatusIcon active={!!dados.resumo} label="RESUMO" />
            <StatusIcon active={!!(dados.causa1 && dados.causa2)} label="ARGUMENTOS" />
            <StatusIcon active={!!dados.repertorio} label="BAGAGEM" />
          </div>
        )}
      </div>
      
      <p className="text-center text-gray-400 text-xs mt-8 font-bold uppercase tracking-widest">
        Inspirado no Projeto de Tese: "Descubra se você é um Problematizador!"
      </p>
    </div>
  );
};

const StatusIcon = ({ active, label }) => (
  <div className="flex items-center gap-2">
    <div className={`transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
      <CheckCircle2 size={16} className={active ? 'text-green-500' : 'text-gray-300'} />
    </div>
    <span className={`text-[10px] font-black tracking-tighter ${active ? 'text-gray-700' : 'text-gray-300'}`}>{label}</span>
  </div>
);

export default App;