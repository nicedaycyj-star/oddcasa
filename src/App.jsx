import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Share2, Heart } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    title: "일상의 신호",
    description: "왠지 모르게 몸이 기억하는 것들",
    keywords: ["목적 없는 쇼츠 무한 스크롤", "침대 밖으로 나가기 싫음", "배달 음식으로 때우는 끼니", "연락 씹기 마스터", "\"그냥 그래\"라는 대답", "씻는 것조차 큰 결심이 필요함", "이유 없는 편두통"]
  },
  {
    id: 2,
    title: "미래와 진로",
    description: "내일이 오는 게 반갑지 않을 때",
    keywords: ["나만 멈춰있는 기분", "전공이 내 옷 같지 않음", "뭐라도 해야 할 것 같은 강박", "휴학/퇴사 시뮬레이션", "내 강점이 뭔지 진짜 모름", "성공한 동기 소식에 움찔함", "그냥 누가 정해줬으면 좋겠음"]
  },
  {
    id: 3,
    title: "관계의 무게",
    description: "사람들 사이에서 더 외로울 때",
    keywords: ["단톡방 알림 꺼두기", "약속 취소되면 느껴지는 안도감", "웃고 있지만 집에 가고 싶음", "남의 눈치 보는 나 자신이 싫음", "\"착하다\"는 말이 부담됨", "미움받을 용기 부족", "내 얘긴 아무에게도 안 함"]
  },
  {
    id: 4,
    title: "비교와 자존감",
    description: "화면 속 세상과 나 사이",
    keywords: ["인스타그램 삭제와 재설치 반복", "잘나가는 친구에 대한 묘한 질투", "거울 속 내가 낯선 날", "작은 실수도 밤새 복기함", "칭찬을 들으면 의심부터 함", "나만 빼고 다 행복해 보임", "갓생 살기 실패의 반복"]
  }
];

const FloatingKeyword = ({ text, index, onClick }) => {
  // 사용자가 만족한 '가로 중앙'을 유지하되, 겹치지 않게 지그재그 슬롯 배치
  const [coords] = useState(() => {
    const row = index; 
    const isLeft = index % 2 === 0;
    
    return {
      // 15%~45%(왼쪽열), 50%~80%(오른쪽열)로 분산
      left: isLeft ? `${15 + Math.random() * 15}%` : `${50 + Math.random() * 15}%`,
      top: `${(row * 12) + 6 + Math.random() * 4}%`,
      randomX: Math.random() * 20 - 10,
      randomY: Math.random() * 20 - 10,
      duration: 5 + Math.random() * 2
    };
  });

  return (
    <motion.button
      onClick={() => onClick(text)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, coords.randomX, 0],
        y: [0, coords.randomY, 0]
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        x: { duration: coords.duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: coords.duration * 1.1, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute px-4 py-2 bg-[#e8dec5] border border-[#4a0404]/20 rounded-full shadow-md text-[12px] font-medium text-[#4a0404] whitespace-nowrap active:scale-90 transition-transform z-10"
      style={{
        left: coords.left,
        top: coords.top,
      }}
    >
      {text}
    </motion.button>
  );
};

export default function App() {
  const [step, setStep] = useState('intro');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [visibleKeywords, setVisibleKeywords] = useState([]);

  useEffect(() => {
    if (step === 'collection') {
      setVisibleKeywords(CHAPTERS[currentChapter].keywords);
    }
  }, [step, currentChapter]);

  const handleKeywordClick = (keyword) => {
    setSelectedItems(prev => [...prev, keyword]);
    setVisibleKeywords(prev => prev.filter(k => k !== keyword));
  };

  const nextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else {
      setStep('result');
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentChapter(0);
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-[#f8f1e1] text-[#4a0404] font-serif selection:bg-[#4a0404] selection:text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="p-8 flex flex-col items-center shrink-0 border-b border-[#4a0404]/5">
        <div className="text-[10px] tracking-[0.4em] text-[#a61c1c] uppercase font-bold mb-2">
          ✧ ODD CASA ADMISSION ✧
        </div>
        <h1 className="text-xl font-normal tracking-tight">
          사전 체크 <span className="text-[#a61c1c] font-bold">[BETA]</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col relative max-w-md mx-auto w-full px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-12"
            >
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight text-[#4a0404]">
                  요즘 진짜 어때요?<br />
                  <span className="text-[#a61c1c] italic underline decoration-[#a61c1c]/20 underline-offset-8">숨겨진 진심</span>을 찾아봐요.
                </h1>
                <p className="text-[#4a0404]/40 leading-relaxed text-sm">
                  내 마음을 스쳐 지나가는 말들을<br />
                  항아리에 툭, 담아보세요.
                </p>
              </div>
              <button
                onClick={() => setStep('collection')}
                className="px-10 py-4 bg-[#a61c1c] text-[#f8f1e1] rounded-sm font-bold shadow-xl tracking-[0.3em] text-xs uppercase active:scale-95 transition-transform"
              >
                항아리 챙기기
              </button>
            </motion.div>
          )}

          {step === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="mt-8 text-center shrink-0">
                <span className="text-[#a61c1c] font-bold text-[10px] uppercase tracking-[0.3em]">Chapter {currentChapter + 1}</span>
                <h2 className="text-2xl font-bold mt-1 text-[#4a0404]">{CHAPTERS[currentChapter].title}</h2>
                <p className="text-[#4a0404]/30 text-xs mt-1 italic">{CHAPTERS[currentChapter].description}</p>
              </div>

              {/* Keyword Floating Area */}
              <div className="flex-1 relative w-full my-4">
                <AnimatePresence>
                  {visibleKeywords.map((keyword, idx) => (
                    <FloatingKeyword 
                      key={keyword} 
                      text={keyword} 
                      index={idx}
                      onClick={handleKeywordClick} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Cauldron & Button Section */}
              <div className="pb-10 flex flex-col items-center gap-6 shrink-0">
                
                {/* Cauldron UI (Fixed & Restored) */}
                <div className="relative w-32 h-24 mb-4">
                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#a61c1c] rounded-full flex items-center justify-center text-[#f8f1e1] text-[11px] font-bold z-30 shadow-md">
                    {selectedItems.length}
                  </div>
                  
                  {/* Cauldron Body */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#1a1a1a] rounded-b-[50px] rounded-t-[10px] border-2 border-[#4a0404]/30 shadow-2xl z-10 overflow-hidden">
                    {/* Liquid fill */}
                    <motion.div 
                      animate={{ height: `${Math.min(selectedItems.length * 8, 90)}%` }}
                      className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-1000"
                    />
                    {/* Bubbles */}
                    <div className="absolute inset-0 flex justify-around items-end">
                      {[1,2,3].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -60], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                          className="w-2 h-2 bg-orange-100 rounded-full blur-[1px]"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Cauldron Rim */}
                  <div className="absolute top-4 left-[-4px] right-[-4px] h-4 bg-[#2a2a2a] rounded-full border border-[#4a0404]/20 z-20" />
                  
                  {/* Cauldron Handles */}
                  <div className="absolute left-[-12px] top-10 w-6 h-8 border-4 border-[#1a1a1a] rounded-full z-0" />
                  <div className="absolute right-[-12px] top-10 w-6 h-8 border-4 border-[#1a1a1a] rounded-full z-0" />
                </div>

                <button
                  onClick={nextChapter}
                  className="w-full py-4 bg-[#a61c1c] text-[#f8f1e1] rounded-sm font-bold tracking-[0.3em] shadow-lg active:scale-95 transition-all uppercase text-xs"
                >
                  {currentChapter < CHAPTERS.length - 1 ? "Next Chapter" : "Close Jar"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center py-10"
            >
              <div className="bg-white p-8 rounded-sm shadow-2xl border border-[#4a0404]/5 w-full max-w-sm flex flex-col items-center text-center space-y-8">
                <div className="w-16 h-16 bg-[#f8f1e1] rounded-full flex items-center justify-center border border-[#a61c1c]/10">
                  <Heart className="text-[#a61c1c] fill-[#a61c1c]" size={28} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#4a0404]/30 font-bold uppercase tracking-widest text-[9px]">Admission Summary</p>
                  <h2 className="text-3xl font-bold text-[#4a0404]">
                    "{selectedItems.length} Pieces"
                  </h2>
                </div>

                <div className="p-5 bg-[#f8f1e1]/50 rounded border border-[#4a0404]/5 text-[#4a0404]">
                  <p className="leading-relaxed text-xs italic">
                    {selectedItems.length > 10 
                      ? "지금은 마음의 방어막이 조금 얇아진 상태군요. 괜찮은 척하느라 에너지를 많이 썼을 거예요. 오늘은 아무것도 증명하지 않아도 돼요."
                      : "생각보다 덤덤하게 잘 지나오고 있네요. 하지만 항아리에 담은 것만으로도 고민의 실체는 조금 더 선명해졌을 거예요."}
                  </p>
                </div>

                <div className="w-full pt-4 space-y-3">
                  <button className="w-full py-4 bg-[#4a0404] text-[#f8f1e1] rounded-sm font-bold flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px]">
                    <Share2 size={14} /> Save Record
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full py-2 text-[#4a0404]/40 font-bold flex items-center justify-center gap-2 hover:text-[#4a0404] text-[10px] uppercase tracking-widest"
                  >
                    <RefreshCcw size={12} /> Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="p-6 text-center shrink-0 border-t border-[#4a0404]/5">
        <p className="text-[8px] text-[#4a0404]/20 tracking-[0.3em] uppercase">
          ✧ odd casa: this record is for your heart only ✧
        </p>
      </footer>
    </div>
  );
}
