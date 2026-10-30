import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, RefreshCcw, Share2, Heart } from 'lucide-react';

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
  // 화면을 3개 구역으로 나누되, 오른쪽 쏠림을 방지하기 위해 전체적으로 왼쪽으로 5% 시프트
  const [coords] = useState(() => {
    const section = index % 3; 
    let leftBase;
    
    // 왼쪽(12%), 중간(40%), 오른쪽(68%) 중심축으로 배치하고 랜덤 오차를 줘서 균형 잡기
    // 전체적으로 왼쪽으로 치우치게 하여 우측 공간을 확보
    const centers = [12, 40, 68];
    leftBase = centers[section] + (Math.random() * 10 - 5);





    return {
      left: `${leftBase}%`,
      top: `${(Math.floor(index / 3) * 22) + 12 + (Math.random() * 8)}%`,
      randomX: Math.random() * 20 - 10,
      randomY: Math.random() * 20 - 10,
      duration: 5 + Math.random() * 3,
      delay: Math.random() * 2
    };
  });

  return (
    <motion.button
      onClick={() => onClick(text)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, coords.randomX, 0],
        y: [0, coords.randomY, 0]
      }}
      exit={{ scale: 0, y: 100, opacity: 0 }}
      transition={{ 
        x: { duration: coords.duration, repeat: Infinity, ease: "easeInOut", delay: coords.delay },
        y: { duration: coords.duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: coords.delay },
        opacity: { duration: 0.3 }
      }}
      className="absolute px-5 py-3 bg-[#e8dec5] border-2 border-[#4a0404]/10 rounded-full shadow-sm text-[13px] font-medium text-[#4a0404] whitespace-nowrap active:bg-[#4a0404] active:text-white transition-all z-10"
      style={{
        left: coords.left,
        top: coords.top,
        transform: 'translateX(-50%)'
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
    setSelectedItems([...selectedItems, keyword]);
    setVisibleKeywords(visibleKeywords.filter(k => k !== keyword));
    if (window.navigator.vibrate) window.navigator.vibrate(10);
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
    <div className="min-h-screen bg-[#f8f1e1] text-[#4a0404] font-serif selection:bg-[#4a0404] selection:text-white overflow-hidden flex flex-col">
      
      {/* Header */}
      <header className="p-8 flex flex-col items-center z-10 space-y-2">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#4a0404]/60 uppercase font-bold">
          <span>✧ ODD CASA ADMISSION ✧</span>
        </div>
        <h1 className="text-2xl font-normal tracking-tight border-b border-[#4a0404]/20 pb-2">
          사전 체크 <span className="text-[#a61c1c] font-bold">[BETA]</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-6 relative max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight text-[#4a0404] font-serif">
                  요즘 진짜 어때요?<br />
                  <span className="text-[#a61c1c] font-black underline decoration-[#a61c1c]/10 decoration-8 underline-offset-4 italic">숨겨진 진심</span>을 찾아봐요.
                </h1>
                <p className="text-[#4a0404]/50 leading-relaxed font-medium">
                  내 마음을 스쳐 지나가는 말들을<br />
                  항아리에 툭, 담아보세요.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('collection')}
                className="px-12 py-5 bg-[#4a0404] text-[#f8f1e1] rounded-xl font-bold shadow-2xl flex items-center gap-2 uppercase tracking-[0.3em] text-sm"
              >
                항아리 챙기기
              </motion.button>
            </motion.div>
          )}

          {step === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >

              className="flex-1 flex flex-col"
            >
              <div className="mt-4 text-center">
                <span className="text-[#a61c1c] font-bold text-xs uppercase tracking-[0.2em]">Chapter {currentChapter + 1}</span>
                <h2 className="text-2xl font-bold mt-1 text-[#4a0404]">{CHAPTERS[currentChapter].title}</h2>
                <p className="text-[#4a0404]/50 text-sm mt-1 italic">{CHAPTERS[currentChapter].description}</p>
              </div>

              {/* Floating Area */}
              <div className="flex-1 relative mt-4 w-full overflow-visible">
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
                
                {visibleKeywords.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-[#4a0404]/30 italic text-sm"
                  >
                    이 챕터에서 더 담을 마음이 있나요?
                  </motion.div>
                )}
              </div>

              {/* Bottom UI - Cauldron Style */}
              <div className="py-10 flex flex-col items-center gap-8">
                <div className="relative group scale-110">
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#a61c1c] rounded-full flex items-center justify-center text-[#f8f1e1] text-[10px] font-bold shadow-lg border-2 border-[#f8f1e1] z-20 animate-bounce">
                    {selectedItems.length}
                  </div>
                  
                  {/* Cauldron Design */}
                  <div className="relative w-28 h-20 bg-slate-800 rounded-b-[40px] rounded-t-[10px] border-b-4 border-slate-900 shadow-xl overflow-hidden">
                    {/* Bubbling liquid */}
                    <motion.div 
                      animate={{ height: `${Math.min(selectedItems.length * 5, 85)}%` }}
                      className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 opacity-90 transition-all duration-700"
                    />
                    {/* Bubbles */}
                    <div className="absolute top-0 w-full h-full flex justify-around pointer-events-none">
                       {[1,2,3].map(i => (
                         <motion.div 
                           key={i}
                           animate={{ y: [-10, -40], opacity: [0, 1, 0] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                           className="w-2 h-2 bg-orange-200 rounded-full blur-[1px]"
                         />
                       ))}
                    </div>
                    {/* Cauldron rim */}
                    <div className="absolute top-0 w-full h-3 bg-slate-700 border-b border-slate-900 shadow-inner" />
                  </div>
                  {/* Cauldron Handles */}
                  <div className="absolute -left-3 top-6 w-5 h-8 border-4 border-slate-800 rounded-full -z-10" />
                  <div className="absolute -right-3 top-6 w-5 h-8 border-4 border-slate-800 rounded-full -z-10" />
                </div>

                <button
                  onClick={nextChapter}
                  className="w-full py-5 bg-[#4a0404] text-[#f8f1e1] rounded-xl font-bold tracking-[0.2em] shadow-lg active:scale-95 transition-all uppercase text-sm"
                >
                  {currentChapter < CHAPTERS.length - 1 ? "Next Chapter" : "Close Jar"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center py-10"
            >
              <div className="bg-[#e8dec5] p-8 rounded-3xl shadow-2xl border border-[#4a0404]/10 w-full max-w-sm flex flex-col items-center text-center space-y-8">
                <div className="w-20 h-20 bg-[#f8f1e1] rounded-full flex items-center justify-center shadow-inner">
                  <Heart className="text-[#a61c1c] fill-[#a61c1c]" size={36} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#4a0404]/40 font-bold uppercase tracking-widest text-[10px]">Your Heart Scene</p>
                  <h2 className="text-3xl font-bold text-[#4a0404]">
                    "{selectedItems.length} Pieces"
                  </h2>
                </div>

                <div className="p-6 bg-[#f8f1e1]/50 rounded-2xl text-left border border-[#4a0404]/5">
                  <p className="text-[#4a0404]/80 leading-relaxed text-sm italic">
                    {selectedItems.length > 10 
                      ? "지금은 마음의 방어막이 조금 얇아진 상태군요. 괜찮은 척하느라 에너지를 많이 썼을 거예요. 오늘은 아무것도 증명하지 않아도 돼요."
                      : "생각보다 덤덤하게 잘 지나오고 있네요. 하지만 항아리에 담은 것만으로도 고민의 실체는 조금 더 선명해졌을 거예요."}
                  </p>
                </div>

                <div className="w-full pt-4 space-y-4">
                  <button className="w-full py-5 bg-[#4a0404] text-[#f8f1e1] rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg tracking-widest uppercase text-xs">
                    <Share2 size={16} /> Save Image
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full py-4 text-[#4a0404]/60 font-bold flex items-center justify-center gap-2 hover:text-[#4a0404]"
                  >
                    <RefreshCcw size={16} /> Start Over
                  </button>
                </div>
              </div>
              
              <p className="mt-10 text-[10px] text-[#4a0404]/40 text-center leading-loose uppercase tracking-tighter">
                Today, you did a great job. <br />
                Your worries are valid.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="p-8 text-center">
        <p className="text-[9px] text-[#4a0404]/20 tracking-[0.2em] uppercase font-medium">
          ✧ odd casa: this record is only for your heart ✧
        </p>
      </footer>
    </div>
  );
}
