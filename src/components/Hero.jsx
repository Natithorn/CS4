import React from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';

const Hero = () => {
  const { hero } = useGameStore();

  return (
    <div className="hero-container relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-6 rounded-xl shadow-2xl border-4 border-amber-600 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 to-amber-600 opacity-30"></div>
        <div className="absolute top-4 right-4 text-6xl text-amber-300 opacity-40">⚔️</div>
        <div className="absolute bottom-4 left-4 text-4xl text-amber-300 opacity-40">🛡️</div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-amber-100 mb-4 text-center drop-shadow-lg">
          ⚔️ ตัวละครหลัก ⚔️
        </h2>
        
        {/* Hero Image - No Border */}
        <div className="hero-image flex justify-center mb-4">
          <div className="relative">
            <ImageComponent
              src={getImagePath('characters', 'MC.png')}
              fallback="🧙‍♂️"
              alt="Hero"
              width={400}
              height={400}
              className="rounded-full shadow-2xl drop-shadow-xl"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-lg -z-10"></div>
          </div>
        </div>

        {/* Hero Name */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-amber-100 drop-shadow-lg">{hero.name}</h3>
          <div className="text-amber-300 font-semibold">เลเวล {hero.level}</div>
        </div>
        
        {/* Stats Grid */}
        <div className="hero-stats space-y-3">
          {/* HP Bar */}
          <div className="stat-group">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-red-300 flex items-center">
                ❤️ HP:
              </span>
              <span className="text-red-200 font-bold">{hero.currentHp}/{hero.maxHp}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 border border-red-500">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-300 shadow-inner"
                style={{ width: `${(hero.currentHp / hero.maxHp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* MP Bar */}
          <div className="stat-group">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-300 flex items-center">
                💙 MP:
              </span>
              <span className="text-blue-200 font-bold">{hero.currentMp}/{hero.maxMp}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 border border-blue-500">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-300 shadow-inner"
                style={{ width: `${(hero.currentMp / hero.maxMp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* EXP Bar */}
          <div className="stat-group">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-purple-300 flex items-center">
                ⭐ EXP:
              </span>
              <span className="text-purple-200 font-bold">{hero.exp}/{hero.nextLevelExp}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 border border-purple-500">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full transition-all duration-300 shadow-inner"
                style={{ width: `${(hero.exp / hero.nextLevelExp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="stat-item bg-black bg-opacity-30 p-3 rounded-lg border border-amber-500">
              <div className="text-amber-300 text-sm font-semibold">⚔️ พลังโจมตี</div>
              <div className="text-amber-100 text-xl font-bold">{hero.attack}</div>
            </div>
            <div className="stat-item bg-black bg-opacity-30 p-3 rounded-lg border border-amber-500">
              <div className="text-amber-300 text-sm font-semibold">🛡️ ป้องกัน</div>
              <div className="text-amber-100 text-xl font-bold">{hero.defense}</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="additional-stats bg-black bg-opacity-30 p-3 rounded-lg border border-amber-500 mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-amber-300">💰 เหรียญ:</span>
              <span className="text-yellow-400 font-bold">{hero.gold || 0}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-amber-300">👹 ศัตรูที่เอาชนะ:</span>
              <span className="text-amber-100 font-bold">{hero.enemiesDefeated || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 