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

const FloatingKeyword = ({ text, onClick }) => {
  // 랜덤 시작 위치 및 애니메이션 경로 생성
  const randomX = Math.random() * 60 - 30; // -30 ~ 30
  const randomY = Math.random() * 40 - 20; // -20 ~ 20
  const duration = 3 + Math.random() * 2;

  return (
    <motion.button
      onClick={() => onClick(text)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, randomX, 0],
        y: [0, randomY, 0]
      }}
      exit={{ scale: 0, y: 200, opacity: 0 }}
      transition={{ 
        x: { duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
      className="absolute px-4 py-2 bg-white/80 backdrop-blur-sm border border-white rounded-full shadow-sm text-sm text-slate-700 whitespace-nowrap active:bg-blue-50"
      style={{
        left: `${Math.random() * 60 + 10}%`,
        top: `${Math.random() * 60 + 10}%`,
      }}
    >
      {text}
    </motion.button>
  );
};

export default function App() {
  const [step, setStep] = useState('intro'); // intro, collection, result
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
    
    // 햅틱 피드백 (지원되는 기기에서)
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-slate-900 font-sans selection:bg-blue-100 overflow-hidden flex flex-col">
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          odd casa 사전 체크 <span className="text-blue-500">[beta]</span>
        </span>
      </header>

      <main className="flex-1 flex flex-col px-6 relative">
        <AnimatePresence mode="wait">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight text-slate-800">
                  요즘 진짜 어때요?<br />
                  <span className="text-blue-600 font-extrabold underline decoration-blue-200 decoration-8 underline-offset-4">숨겨진 진심</span>을 찾아봐요.
                </h1>
                <p className="text-slate-500 leading-relaxed">
                  내 마음을 스쳐 지나가는 말들을<br />
                  항아리에 툭, 담아보세요.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('collection')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 flex items-center gap-2"
              >
                항아리 챙기기
              </motion.button>
            </motion.div>
          )}

          {/* STEP: COLLECTION */}
          {step === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="mt-4">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Chapter {currentChapter + 1}</span>
                <h2 className="text-2xl font-bold mt-1">{CHAPTERS[currentChapter].title}</h2>
                <p className="text-slate-500 text-sm mt-1">{CHAPTERS[currentChapter].description}</p>
              </div>

              {/* Floating Area */}
              <div className="flex-1 relative mt-4 overflow-hidden">
                <AnimatePresence>
                  {visibleKeywords.map((keyword) => (
                    <FloatingKeyword 
                      key={keyword} 
                      text={keyword} 
                      onClick={handleKeywordClick} 
                    />
                  ))}
                </AnimatePresence>
                
                {visibleKeywords.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-sm"
                  >
                    이 챕터에서 더 담을 마음이 있나요?
                  </motion.div>
                )}
              </div>

              {/* Bottom UI */}
              <div className="py-8 flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white animate-bounce">
                    {selectedItems.length}
                  </div>
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-inner border-2 border-slate-100 flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute bottom-0 w-full bg-blue-100 transition-all duration-500 ease-out`} style={{ height: `${Math.min(selectedItems.length * 5, 100)}%` }} />
                    <ShoppingBasket size={40} className="text-slate-400 relative z-10" />
                  </div>
                </div>

                <button
                  onClick={nextChapter}
                  className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  {currentChapter < CHAPTERS.length - 1 ? "다음 챕터로" : "항아리 닫기"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: RESULT */}
          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center py-10"
            >
              <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-blue-100 border border-blue-50 w-full max-w-sm flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Heart className="text-blue-500 fill-blue-500" size={32} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-slate-400 font-medium">오늘 당신의 마음 풍경</p>
                  <h2 className="text-2xl font-bold text-slate-800">
                    "{selectedItems.length}개의 마음 조각"
                  </h2>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl text-left">
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedItems.length > 10 
                      ? "지금은 마음의 방어막이 조금 얇아진 상태군요. 괜찮은 척하느라 에너지를 많이 썼을 거예요. 오늘은 아무것도 증명하지 않아도 돼요."
                      : "생각보다 덤덤하게 잘 지나오고 있네요. 하지만 항아리에 담은 것만으로도 고민의 실체는 조금 더 선명해졌을 거예요."}
                  </p>
                </div>

                <div className="w-full pt-4 space-y-3">
                  <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                    <Share2 size={18} /> 이미지로 저장하기
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={18} /> 다시 비우기
                  </button>
                </div>
              </div>
              
              <p className="mt-8 text-xs text-slate-400 text-center leading-loose">
                고민이 있다는 건, 더 나아지고 싶다는 증거이기도 해요.<br />
                오늘 정말 수고 많았어요.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="p-6 text-center">
        <p className="text-[10px] text-slate-300 tracking-tighter uppercase">
          This record is not stored anywhere. only for your heart.
        </p>
      </footer>
    </div>
  );
}