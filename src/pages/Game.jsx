import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import Hero from '../components/Hero';
import Enemy from '../components/Enemy';
import { ItemList } from '../components/Item';
import { SkillPanel } from '../components/SkillButton';
import BattleLog from '../components/BattleLog';
import BattleArena from '../components/BattleArena';
import StageSelect from '../components/StageSelect';
import Shop from '../components/Shop';
import EquippedItems from '../components/EquippedItems';
import ImageComponent, { getImagePath } from '../components/ImageComponent';

const Game = () => {
  const {
    hero,
    currentEnemy,
    inventory,
    skills,
    gameState,
    currentScreen,
    isInBattle,
    battleLog,
    currentStage,
    initializeGame,
    startStage,
    endBattle,
    useSkill,
    performAttack,
    addLogMessage
  } = useGameStore();

  const [currentTab, setCurrentTab] = useState('battle');
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    // Initialize the game when component mounts
    if (gameState === 'uninitialized') {
      initializeGame();
    }
  }, [gameState, initializeGame]);

  // Handle navigation between screens
  const handleStageSelect = (stage) => {
    startStage(stage);
  };

  const handleBackToStageSelect = () => {
    useGameStore.setState({ currentScreen: 'stage-select' });
  };

  const handleBackToMain = () => {
    useGameStore.setState({ currentScreen: 'main' });
  };

  const handleSkillUse = (skill) => {
    if (isInBattle && currentEnemy) {
      useSkill(skill.id, currentEnemy.id);
      setSelectedAction({ type: 'skill', skill });
    }
  };

  const handleItemUse = (item) => {
    // This would be implemented in the game store
    addLogMessage({
      type: 'system',
      text: `ใช้ ${item.name}`,
      timestamp: Date.now()
    });
  };

  const handleAttack = () => {
    if (isInBattle && currentEnemy) {
      performAttack(currentEnemy.id);
      setSelectedAction({ type: 'attack' });
    }
  };

  const handleStartStageMode = () => {
    useGameStore.setState({ currentScreen: 'stage-select' });
  };

  const handleEndBattle = () => {
    endBattle();
    setSelectedAction(null);
  };

  const tabs = [
    { id: 'battle', name: 'การต่อสู้', icon: '⚔️' },
    { id: 'shop', name: 'ร้านค้า', icon: '🏪' },
    { id: 'inventory', name: 'กระเป๋า', icon: '🎒' },
    { id: 'skills', name: 'สกิล', icon: '✨' },
    { id: 'stats', name: 'สถิติ', icon: '📊' }
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'shop':
        return <Shop />;
        
      case 'battle':
        return (
          <div className="battle-content space-y-6 relative">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-10 left-10 text-8xl">⚔️</div>
              <div className="absolute top-20 right-20 text-6xl">🛡️</div>
              <div className="absolute bottom-20 left-20 text-7xl">💀</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
              {/* Character and Enemy Stats */}
              <div className="character-section space-y-4">
                <Hero />
                {isInBattle && <Enemy />}
              </div>
              
              {/* Battle Log */}
              <div className="battle-log-section">
                <BattleLog height="400px" />
              </div>
            </div>
            
            {/* Battle Actions */}
            {isInBattle ? (
              <div className="battle-actions bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl shadow-2xl border-4 border-amber-600 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-amber-100 text-center drop-shadow-lg">⚔️ การกระทำ ⚔️</h3>
                <div className="action-buttons grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleAttack}
                    className="action-btn bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 border-red-500 shadow-lg transform hover:scale-105"
                  >
                    ⚔️ โจมตีปกติ
                  </button>
                  <button
                    onClick={() => setCurrentTab('skills')}
                    className="action-btn bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 border-blue-500 shadow-lg transform hover:scale-105"
                  >
                    ✨ ใช้สกิล
                  </button>
                  <button
                    onClick={() => setCurrentTab('inventory')}
                    className="action-btn bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 border-green-500 shadow-lg transform hover:scale-105"
                  >
                    🎒 ใช้ไอเท็ม
                  </button>
                </div>
                
                <div className="battle-controls mt-6 text-center">
                  <button
                    onClick={handleEndBattle}
                    className="end-battle-btn bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-6 rounded-lg font-bold transition-all border-2 border-gray-500 shadow-lg"
                  >
                    🏃‍♂️ หนีจากการต่อสู้
                  </button>
                </div>
              </div>
            ) : (
              <div className="exploration-actions bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl shadow-2xl border-4 border-purple-600 text-center relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-purple-100 drop-shadow-lg">🌟 การสำรวจ 🌟</h3>
                <div className="space-y-4">
                  <button
                    onClick={handleStartStageMode}
                    className="stage-mode-btn bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all block w-full border-2 border-purple-500 shadow-lg transform hover:scale-105"
                  >
                    🏰 เข้าสู่โหมดด่าน
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'inventory':
        return (
          <div className="inventory-content relative space-y-6">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-10 left-10 text-8xl">🎒</div>
              <div className="absolute top-20 right-20 text-6xl">💎</div>
              <div className="absolute bottom-20 left-20 text-7xl">⚗️</div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Equipped Items Section */}
              <EquippedItems />
              
              {/* Inventory Items Section */}
              <div>
                <div className="inventory-header mb-6 text-center">
                  <div className="inline-block bg-gradient-to-r from-green-800 via-green-600 to-green-800 px-8 py-4 rounded-xl border-4 border-green-400 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">🎒 กระเป๋า 🎒</h2>
                    <p className="text-green-200 mt-2">จัดการไอเท็มของคุณ</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl shadow-2xl border-4 border-green-600">
                  <ItemList 
                    items={inventory} 
                    isInBattle={isInBattle}
                    onItemUse={handleItemUse}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="skills-content relative">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-10 left-10 text-8xl">✨</div>
              <div className="absolute top-20 right-20 text-6xl">🔮</div>
              <div className="absolute bottom-20 left-20 text-7xl">⚡</div>
            </div>

            <div className="relative z-10">
              <div className="skills-header mb-6 text-center">
                <div className="inline-block bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 px-8 py-4 rounded-xl border-4 border-blue-400 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">✨ สกิล ✨</h2>
                  <p className="text-blue-200 mt-2">สกิลและความสามารถพิเศษ</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl shadow-2xl border-4 border-blue-600">
                <SkillPanel 
                  skills={skills}
                  onSkillUse={handleSkillUse}
                  disabled={!isInBattle}
                />
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="stats-content min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-8xl">⚔️</div>
              <div className="absolute top-20 right-20 text-6xl">🛡️</div>
              <div className="absolute bottom-20 left-20 text-7xl">💎</div>
              <div className="absolute bottom-10 right-10 text-5xl">⭐</div>
            </div>

            {/* Stats Panel */}
            <div className="relative z-10 max-w-4xl mx-auto">
              {/* Header Banner */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 px-8 py-4 rounded-xl border-4 border-purple-400 shadow-2xl">
                  <h1 className="text-4xl font-bold text-white drop-shadow-lg">📊 STATS 📊</h1>
                </div>
              </div>

              {/* Main Stats Panel */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border-4 border-purple-500 shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative chains */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-purple-600 to-purple-800 opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-purple-600 to-purple-800 opacity-80"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Side - Skills & Achievements */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-4 py-2 rounded-lg border-2 border-amber-400 inline-block">
                        <h3 className="text-xl font-bold text-white">🏆 Skills</h3>
                      </div>
                    </div>
                    
                    {/* Skills List */}
                    <div className="space-y-3">
                      <div className="bg-red-900 bg-opacity-50 p-3 rounded-lg border-2 border-red-500">
                        <div className="flex items-center justify-between">
                          <span className="text-red-300 font-bold">💥 ระเบิด</span>
                          <span className="text-red-200">100</span>
                        </div>
                      </div>
                      <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg border-2 border-blue-500">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-300 font-bold">❄️ น้ำแข็ง</span>
                          <span className="text-blue-200">150</span>
                        </div>
                      </div>
                      <div className="bg-green-900 bg-opacity-50 p-3 rounded-lg border-2 border-green-500">
                        <div className="flex items-center justify-between">
                          <span className="text-green-300 font-bold">🌱 รักษา</span>
                          <span className="text-green-200">135</span>
                        </div>
                      </div>
                      <div className="bg-purple-900 bg-opacity-50 p-3 rounded-lg border-2 border-purple-500">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-300 font-bold">⚡ สายฟ้า</span>
                          <span className="text-purple-200">90</span>
                        </div>
                      </div>
                      <div className="bg-orange-900 bg-opacity-50 p-3 rounded-lg border-2 border-orange-500">
                        <div className="flex items-center justify-between">
                          <span className="text-orange-300 font-bold">🔥 ไฟ</span>
                          <span className="text-orange-200">10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center - Hero Portrait & Stats */}
                  <div className="text-center space-y-6">
                    {/* Hero Portrait */}
                    <div className="relative inline-block">
                      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl mx-auto bg-gradient-to-br from-slate-600 to-slate-800 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
                          <ImageComponent
                            src={getImagePath('characters', 'MC.png')}
                            fallback="🧙‍♂️"
                            alt="Hero"
                            width={176}
                            height={176}
                            className="w-full h-full object-cover scale-110 hover:scale-115 transition-transform duration-300"
                            style={{ objectPosition: 'center center' }}
                          />
                        </div>
                      </div>
                      {/* Outer glow effect */}
                      <div className="absolute inset-0 rounded-full bg-amber-400 opacity-25 blur-xl animate-pulse"></div>
                      {/* Inner shine */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 pointer-events-none"></div>
                      {/* Decorative rings */}
                      <div className="absolute -inset-3 rounded-full border border-amber-300 opacity-40 animate-pulse"></div>
                      <div className="absolute -inset-5 rounded-full border border-amber-400 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>

                    {/* Hero Name & Level */}
                    <div>
                      <h2 className="text-3xl font-bold text-amber-100 drop-shadow-lg">{hero.name}</h2>
                      <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-4 py-1 rounded-full border-2 border-amber-400 inline-block mt-2">
                        <span className="text-white font-bold">LV. {hero.level}</span>
                      </div>
                    </div>

                    {/* Main Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Life */}
                      <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg border-2 border-red-500">
                        <div className="text-red-300 text-sm font-bold mb-1">LIFE</div>
                        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full"
                            style={{ width: `${(hero.currentHp / hero.maxHp) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-red-200 font-bold">{hero.currentHp}/{hero.maxHp}</div>
                      </div>

                      {/* Mana */}
                      <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border-2 border-blue-500">
                        <div className="text-blue-300 text-sm font-bold mb-1">MANA</div>
                        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full"
                            style={{ width: `${(hero.currentMp / hero.maxMp) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-blue-200 font-bold">{hero.currentMp}/{hero.maxMp}</div>
                      </div>

                      {/* Attack */}
                      <div className="bg-orange-900 bg-opacity-50 p-4 rounded-lg border-2 border-orange-500">
                        <div className="text-orange-300 text-sm font-bold mb-1">ATTACK</div>
                        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="text-orange-200 font-bold">{hero.attack}</div>
                      </div>

                      {/* Defense */}
                      <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg border-2 border-gray-500">
                        <div className="text-gray-300 text-sm font-bold mb-1">DEFENSE</div>
                        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                          <div className="bg-gradient-to-r from-gray-500 to-gray-400 h-3 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <div className="text-gray-200 font-bold">{hero.defense}</div>
                      </div>
                    </div>

                    {/* XP Bar */}
                    <div className="bg-purple-900 bg-opacity-50 p-4 rounded-lg border-2 border-purple-500">
                      <div className="text-purple-300 text-sm font-bold mb-2">EXPERIENCE</div>
                      <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-400 h-4 rounded-full"
                          style={{ width: `${(hero.exp / hero.nextLevelExp) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-purple-200 font-bold">{hero.exp}/{hero.nextLevelExp}</div>
                    </div>
                  </div>

                  {/* Right Side - Kill Stats */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg border-2 border-red-400 inline-block">
                        <h3 className="text-xl font-bold text-white">💀 Kills</h3>
                      </div>
                    </div>

                    {/* Kill Stats */}
                    <div className="space-y-4">
                      <div className="bg-black bg-opacity-30 p-4 rounded-lg border-2 border-gray-500">
                        <div className="text-gray-300 text-sm font-bold mb-2">NORMAL ENEMIES</div>
                        <div className="text-3xl font-bold text-white text-right">{hero.enemiesDefeated || 0}</div>
                      </div>

                      <div className="bg-black bg-opacity-30 p-4 rounded-lg border-2 border-yellow-500">
                        <div className="text-yellow-300 text-sm font-bold mb-2">UNIQUE ENEMIES</div>
                        <div className="text-3xl font-bold text-white text-right">15</div>
                      </div>

                      <div className="bg-black bg-opacity-30 p-4 rounded-lg border-2 border-red-500">
                        <div className="text-red-300 text-sm font-bold mb-2">BOSS ENEMIES</div>
                        <div className="text-3xl font-bold text-white text-right">1</div>
                      </div>

                      {/* Additional Stats */}
                      <div className="bg-black bg-opacity-30 p-4 rounded-lg border-2 border-amber-500">
                        <div className="text-amber-300 text-sm font-bold mb-2">💰 GOLD</div>
                        <div className="text-2xl font-bold text-yellow-400 text-right">{hero.gold || 0}</div>
                      </div>

                      <div className="bg-black bg-opacity-30 p-4 rounded-lg border-2 border-green-500">
                        <div className="text-green-300 text-sm font-bold mb-2">⚔️ BATTLES</div>
                        <div className="text-2xl font-bold text-white text-right">{hero.totalBattles || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        );

      default:
        return <div>เลือกแท็บ</div>;
    }
  };

  if (gameState === 'loading') {
    return (
      <div className="game-loading flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⚔️</div>
          <div className="text-xl font-bold">กำลังโหลดเกม...</div>
        </div>
      </div>
    );
  }

  // Render different screens based on currentScreen
  if (currentScreen === 'battle') {
    return <BattleArena />;
  }

  if (currentScreen === 'stage-select') {
    return (
      <StageSelect 
        onStageSelect={handleStageSelect}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
      {/* Game Header */}
      <header className="game-header bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-2xl p-4 border-b-4 border-purple-500">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">⚔️</div>
            <h1 className="text-4xl font-bold text-amber-100 drop-shadow-lg">Path of Heroes</h1>
          </div>
          <div className="game-status flex items-center space-x-4">
            <span className={`status-indicator px-4 py-2 rounded-full text-sm font-bold border-2 ${
              isInBattle 
                ? 'bg-red-900 text-red-100 border-red-500 shadow-red-500/50 shadow-lg' 
                : 'bg-green-900 text-green-100 border-green-500 shadow-green-500/50 shadow-lg'
            }`}>
              {isInBattle ? '🔥 กำลังต่อสู้' : '🌿 สำรวจ'}
            </span>
            <div className="hero-info bg-amber-900 px-4 py-2 rounded-lg border-2 border-amber-500 shadow-lg">
              <span className="hero-name text-lg font-bold text-amber-100">{hero?.name || 'นักผจญภัย'}</span>
              <div className="text-amber-300 text-sm">LV. {hero?.level || 1}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="game-nav bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-4 border-purple-500">
        <div className="container mx-auto">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`nav-tab px-8 py-4 font-bold transition-all duration-300 border-b-4 relative overflow-hidden ${
                  currentTab === tab.id
                    ? 'border-amber-400 text-amber-100 bg-gradient-to-b from-amber-900 to-amber-800 shadow-xl'
                    : 'border-transparent text-slate-300 hover:text-amber-200 hover:bg-slate-700'
                }`}
              >
                {/* Active tab glow effect */}
                {currentTab === tab.id && (
                  <div className="absolute inset-0 bg-amber-400 opacity-10 blur-sm"></div>
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="game-main container mx-auto p-6">
        {renderTabContent()}
      </main>

      {/* Game Footer */}
      <footer className="game-footer bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 p-4 mt-8 border-t-4 border-purple-500">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">⚔️ Copyright © 2025 by Natithorn Srimee 🛡️</p>
        </div>
      </footer>
    </div>
  );
};

export default Game; 