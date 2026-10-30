import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Share2, Heart, Sparkles } from 'lucide-react';

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

// Custom Cauldron Component (SVG based on reference image)
const Cauldron = ({ count }) => {
  return (
    <div className="relative w-28 h-28 flex items-end justify-center">
      {/* Bubbles animation */}
      <AnimatePresence>
        {count > 0 && [...Array(Math.min(count, 5))].map((_, i) => (
          <motion.div
            key={`bubble-${i}-${count}`}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ y: -40, opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            className="absolute w-4 h-4 bg-orange-400 rounded-full blur-[2px]"
            style={{ left: `${20 + Math.random() * 60}%` }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </AnimatePresence>
      
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        {/* Pot Body */}
        <path d="M20,40 Q20,85 50,85 Q80,85 80,40 L20,40" fill="#1a1a1a" />
        {/* Rim */}
        <ellipse cx="50" cy="40" rx="35" ry="8" fill="#1a1a1a" />
        {/* Liquid */}
        <ellipse cx="50" cy="40" rx="30" ry="5" fill="#f97316" />
        {/* Drip Effect */}
        <path d="M22,40 Q35,65 45,40 M55,40 Q65,60 78,40" fill="#f97316" />
        {/* Handles */}
        <path d="M20,45 Q10,45 10,55 Q10,65 20,65" fill="none" stroke="#1a1a1a" strokeWidth="4" />
        <path d="M80,45 Q90,45 90,55 Q90,65 80,65" fill="none" stroke="#1a1a1a" strokeWidth="4" />
      </svg>
      
      {/* Counter Badge */}
      <motion.div 
        key={count}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-red-800 rounded-full border-2 border-[#d4af37] text-white text-xs font-bold flex items-center justify-center shadow-lg"
      >
        {count}
      </motion.div>
    </div>
  );
};

const FloatingKeyword = ({ text, index, onClick }) => {
  const [coords] = useState(() => {
    // Improved distribution logic
    const row = Math.floor(index / 2);
    const col = index % 2;
    
    return {
      left: col === 0 ? `${10 + Math.random() * 30}%` : `${60 + Math.random() * 30}%`,
      top: `${15 + row * 20 + Math.random() * 10}%`,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2,
      moveX: Math.random() * 30 - 15,
      moveY: Math.random() * 30 - 15,
    };
  });

  return (
    <motion.button
      onClick={() => onClick(text)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, coords.moveX, 0],
        y: [0, coords.moveY, 0]
      }}
      exit={{ scale: 0, y: 100, opacity: 0, rotate: 10 }}
      transition={{ 
        x: { duration: coords.duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: coords.duration * 1.3, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
      className="absolute px-5 py-2.5 bg-[#fdf6e3] border-2 border-[#d4af37]/30 rounded-full shadow-md text-[14px] text-[#4a0404] font-medium whitespace-nowrap active:scale-90 transition-all z-10 hover:border-[#d4af37] hover:bg-white"
      style={{
        left: coords.left,
        top: coords.top,
        transform: 'translateX(-50%)',
        fontFamily: 'serif'
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
    if (window.navigator.vibrate) window.navigator.vibrate(15);
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
    <div className="min-h-screen bg-[#f8f1e1] text-[#4a0404] font-serif selection:bg-red-100 overflow-hidden flex flex-col relative">
      
      {/* Decorative Borders */}
      <div className="absolute inset-0 border-[12px] border-[#4a0404] pointer-events-none z-50 m-2 opacity-10" />
      <div className="absolute top-0 left-0 w-full h-2 bg-[#4a0404] z-50" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#4a0404] z-50" />

      {/* Header */}
      <header className="pt-10 px-8 flex flex-col items-center z-10 space-y-1">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">
          <Sparkles size={10} /> Odd Casa Admission <Sparkles size={10} />
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-[#4a0404] border-b border-[#d4af37] pb-1">
          사전 체크 <span className="text-red-800">[BETA]</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-8 relative">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-12"
            >
              <div className="space-y-6">
                <div className="w-16 h-px bg-[#d4af37] mx-auto" />
                <h2 className="text-4xl font-bold leading-tight text-[#4a0404]">
                  요즘 진짜 어때요?
                </h2>
                <p className="text-[#8b4513] leading-relaxed italic">
                  "숨겨진 진심을 찾아가는 여정"<br />
                  말하지 못한 고민들을 항아리에 담아보세요.
                </p>
                <div className="w-16 h-px bg-[#d4af37] mx-auto" />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('collection')}
                className="px-10 py-4 bg-[#4a0404] text-[#f8f1e1] rounded-none border-2 border-[#d4af37] font-bold shadow-2xl tracking-widest flex items-center gap-3"
              >
                입장하기 (ADMIT ONE)
              </motion.button>
            </motion.div>
          )}

          {step === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col pt-6"
            >
              <div className="text-center space-y-1">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-[0.2em]">Chapter {currentChapter + 1}</span>
                <h2 className="text-2xl font-bold text-[#4a0404]">{CHAPTERS[currentChapter].title}</h2>
                <p className="text-[#8b4513] text-sm italic">{CHAPTERS[currentChapter].description}</p>
              </div>

              {/* Floating Area */}
              <div className="flex-1 relative mt-4">
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
                    className="absolute inset-0 flex items-center justify-center text-[#d4af37] italic text-sm"
                  >
                    이 챕터의 고민을 모두 담았습니다.
                  </motion.div>
                )}
              </div>

              {/* Bottom UI */}
              <div className="pb-12 flex flex-col items-center gap-8">
                <Cauldron count={selectedItems.length} />

                <button
                  onClick={nextChapter}
                  className="w-full py-4 bg-[#4a0404] text-[#f8f1e1] border-2 border-[#d4af37] font-bold tracking-widest hover:bg-[#5a0505] active:scale-95 transition-all"
                >
                  {currentChapter < CHAPTERS.length - 1 ? "NEXT CHAPTER" : "CLOSE JAR"}
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
              <div className="bg-[#fdf6e3] p-8 border-4 border-[#4a0404] shadow-2xl w-full max-w-sm flex flex-col items-center text-center space-y-8 relative">
                <div className="absolute -top-4 bg-[#4a0404] text-[#d4af37] px-4 py-1 text-xs font-bold tracking-widest">
                  RESULT
                </div>

                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-2 border-[#d4af37]">
                  <Heart className="text-red-800 fill-red-800" size={32} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#8b4513] font-medium text-sm tracking-widest">YOUR INNER LANDSCAPE</p>
                  <h2 className="text-3xl font-bold text-[#4a0404]">
                    {selectedItems.length}개의 조각
                  </h2>
                </div>

                <div className="p-6 bg-white/50 border border-[#d4af37]/30 text-left">
                  <p className="text-[#4a0404] leading-relaxed text-sm italic">
                    {selectedItems.length > 10 
                      ? "지금은 마음의 방어막이 조금 얇아진 상태군요. 괜찮은 척하느라 에너지를 많이 썼을 거예요. 오늘은 아무것도 증명하지 않아도 돼요."
                      : "생각보다 덤덤하게 잘 지나오고 있네요. 하지만 항아리에 담은 것만으로도 고민의 실체는 조금 더 선명해졌을 거예요."}
                  </p>
                </div>

                <div className="w-full space-y-3">
                  <button className="w-full py-4 bg-[#4a0404] text-white font-bold flex items-center justify-center gap-2 border-2 border-[#d4af37]">
                    <Share2 size={18} /> 이미지로 저장하기
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full py-4 bg-transparent text-[#4a0404] font-bold flex items-center justify-center gap-2 border-2 border-[#4a0404]/20"
                  >
                    <RefreshCcw size={18} /> 다시 비우기
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="pb-8 text-center">
        <p className="text-[9px] text-[#d4af37] tracking-[0.3em] uppercase">
          Void Youth Gathering • Odd Casa
        </p>
      </footer>
    </div>
  );
}
