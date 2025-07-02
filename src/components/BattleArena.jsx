import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';
import GameResult from './GameResult';

const BattleArena = () => {
  const {
    hero,
    currentStage,
    stageEnemies,
    currentTurn,
    isInBattle,
    gameState,
    gameResult,
    battleLog,
    performAttack,
    useSkill,
    useItem,
    skills,
    inventory,
    dismissGameResult
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  // Debug: ดูการเปลี่ยนแปลงของ stageEnemies
  useEffect(() => {
    console.log('stageEnemies updated:', stageEnemies);
    stageEnemies.forEach((enemy, index) => {
      console.log(`Enemy ${index + 1}: ${enemy.name} - HP: ${enemy.currentHp}/${enemy.maxHp}`);
    });
  }, [stageEnemies]);

  if (!isInBattle || !currentStage) {
    return null;
  }

  const aliveEnemies = stageEnemies.filter(enemy => enemy.currentHp > 0);
  
  const handleAction = (actionType, data) => {
    console.log('handleAction called with:', { actionType, data, currentTurn });
    console.log('Current gameState:', gameState);
    
    if (currentTurn !== 'player') return;

    if (actionType === 'attack') {
      // Basic attack
      if (gameState === 'stage') {
        // In stage mode, need to select target
        console.log('Setting selectedAction for attack in stage mode');
        setSelectedAction({ type: 'attack', data: null });
      } else {
        // Single battle mode
        console.log('Performing direct attack in single battle mode');
        performAttack();
      }
    } else if (actionType === 'skill') {
      console.log('Skill selected:', data);
      if (data.targetType === 'self' || data.type === 'heal') {
        // Self-targeting skills (heal, buffs)
        useSkill(data.id);
      } else {
        // Need target selection
        setSelectedAction({ type: actionType, data });
      }
    } else if (actionType === 'item') {
      console.log('Item selected:', data);
      // Check item effects to determine if it needs target
      const hasHealingEffect = data.effects?.some(e => e.type === 'heal' || e.type === 'restore_mp' || e.type === 'buff');
      const hasDamageEffect = data.effects?.some(e => e.type === 'damage' || e.type === 'debuff');
      
      console.log('Item effects analysis:', { hasHealingEffect, hasDamageEffect, effects: data.effects });
      
      if (hasHealingEffect && !hasDamageEffect) {
        // Self-use items (healing, MP restore, buffs)
        console.log('Using item directly on self:', data.id);
        useItem(data.id);
      } else {
        // Items that need target selection (damage items, debuffs)
        console.log('Item needs target selection');
        setSelectedAction({ type: actionType, data });
      }
    }
  };

  const handleTargetSelect = (targetId) => {
    console.log('handleTargetSelect called with:', { targetId, selectedAction });
    
    if (!selectedAction) return;
    
    switch (selectedAction.type) {
      case 'attack':
        console.log('Performing basic attack on target:', targetId);
        performAttack(targetId);
        break;
      case 'skill':
        console.log('Using skill on target:', selectedAction.data.id, targetId);
        useSkill(selectedAction.data.id, targetId);
        break;
      case 'item':
        console.log('Using item on target:', selectedAction.data.id, targetId);
        useItem(selectedAction.data.id, targetId);
        break;
    }
    
    setSelectedAction(null);
    setSelectedTarget(null);
  };

  const getActionButtons = () => {
    const usableSkills = skills.filter(skill => 
      hero.currentMp >= skill.mpCost && skill.currentCooldown === 0
    ).slice(0, 4); // แสดงสกิลได้สูงสุด 4 ตัว

    const usableItems = inventory.filter(item => 
      item.quantity > 0 && (!item.battleOnly || isInBattle)
    ).slice(0, 4); // แสดงไอเท็มได้สูงสุด 4 ตัว

    return [
      // Basic Attack
      {
        id: 'basic_attack',
        name: 'Attack',
        icon: '⚔️',
        type: 'attack',
        disabled: currentTurn !== 'player'
      },
      // Skills
      ...usableSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        icon: skill.icon,
        type: 'skill',
        data: skill,
        disabled: currentTurn !== 'player' || hero.currentMp < skill.mpCost,
        cost: skill.mpCost
      })),
      // Items
      ...usableItems.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        type: 'item',
        data: item,
        disabled: currentTurn !== 'player',
        quantity: item.quantity
      }))
    ].slice(0, 5); // จำกัดที่ 5 ปุ่ม
  };

  return (
    <>
      {/* Game Result Modal */}
      {gameResult && (
        <GameResult
          result={gameResult.type}
          rewards={gameResult.rewards}
          onContinue={dismissGameResult}
        />
      )}

      <div 
        className="battle-arena relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${currentStage.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-green-500 to-green-600 opacity-30"></div>
      
      {/* Top UI - Turn Indicator & Stage Info */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black bg-opacity-80 text-white px-6 py-2 rounded-lg flex items-center space-x-4">
          <span className="text-lg font-bold">{currentStage.name}</span>
          <div className="w-px h-6 bg-gray-400"></div>
          <span className={`text-lg font-bold ${
            currentTurn === 'player' ? 'text-green-400' : 'text-red-400'
          }`}>
            {currentTurn === 'player' ? 'ตาคุณ!' : 'ตาศัตรู!'}
          </span>
        </div>
      </div>

      {/* Target Selection Indicator */}
      {selectedAction && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-yellow-600 bg-opacity-90 text-white px-4 py-2 rounded-lg animate-pulse flex items-center space-x-3">
            <span className="text-sm font-bold">
              ✨ เลือกเป้าหมายสำหรับ {selectedAction.data?.name || 'การโจมตี'} ✨
            </span>
            <button 
              onClick={() => {setSelectedAction(null); setSelectedTarget(null);}}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-bold"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* Battle Field */}
      <div className="absolute inset-0 flex items-center justify-between px-8 py-16">
        {/* Hero Side */}
        <div className="hero-side flex flex-col items-center space-y-4">
          {/* Hero */}
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
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-lg -z-10"></div>
            {/* Hero HP/MP Bar */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded text-sm min-w-[120px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-400">HP</span>
                <span>{hero.currentHp}/{hero.maxHp}</span>
              </div>
              <div className="w-full bg-gray-600 rounded h-1 mb-1">
                <div 
                  className="bg-red-500 h-1 rounded transition-all"
                  style={{ width: `${(hero.currentHp / hero.maxHp) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-blue-400">MP</span>
                <span>{hero.currentMp}/{hero.maxMp}</span>
              </div>
              <div className="w-full bg-gray-600 rounded h-1">
                <div 
                  className="bg-blue-500 h-1 rounded transition-all"
                  style={{ width: `${(hero.currentMp / hero.maxMp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enemies Side */}
        <div className="enemies-side flex flex-col items-center space-y-6">
          {stageEnemies.map((enemy, index) => (
            <div 
              key={enemy.instanceId}
              className={`relative cursor-pointer transition-all ${
                selectedAction && (selectedAction.type === 'skill' || selectedAction.type === 'attack') && enemy.currentHp > 0 
                  ? 'hover:scale-110 ring-4 ring-yellow-400 ring-opacity-50 animate-pulse' 
                  : ''
              } ${enemy.currentHp <= 0 ? 'opacity-50 grayscale' : ''}`}
              onClick={() => {
                console.log('Enemy clicked:', enemy.instanceId, 'selectedAction:', selectedAction);
                if (selectedAction && enemy.currentHp > 0) {
                  handleTargetSelect(enemy.instanceId);
                }
              }}
            >
              <ImageComponent
                src={getImagePath('enemies', enemy.sprite)}
                fallback="👹"
                alt={enemy.name}
                width={150}
                height={150}
                className="rounded-full shadow-2xl drop-shadow-xl"
              />
              {/* Enemy Glow effect */}
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-lg -z-10"></div>
              {/* Enemy HP Bar */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs min-w-[80px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-red-400">HP</span>
                  <span>{enemy.currentHp}/{enemy.maxHp}</span>
                </div>
                <div className="w-full bg-gray-600 rounded h-1">
                  <div 
                    className="bg-red-500 h-1 rounded transition-all duration-300"
                    style={{ width: `${(enemy.currentHp / enemy.maxHp) * 100}%` }}
                  ></div>
                </div>
                {/* Debug info */}
                <div className="text-yellow-300 text-xs mt-1">
                  ID: {enemy.instanceId}
                </div>
              </div>
              {/* Enemy Name */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                {enemy.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom UI - Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4">
        <div className="flex justify-center space-x-2">
          {getActionButtons().map((action, index) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.type, action.data)}
              disabled={action.disabled}
              className={`
                relative flex flex-col items-center justify-center
                w-20 h-20 rounded-lg border-2 transition-all
                ${action.disabled 
                  ? 'bg-gray-600 border-gray-500 opacity-50 cursor-not-allowed' 
                  : 'bg-gray-800 border-gray-400 hover:border-white hover:bg-gray-700'
                }
                ${selectedAction?.data?.id === action.id ? 'border-yellow-400 bg-yellow-900' : ''}
              `}
            >
              {/* Action Icon */}
              <div className="text-2xl mb-1">
                {action.icon}
              </div>
              
              {/* Action Name */}
              <span className="text-xs text-white text-center leading-tight">
                {action.name}
              </span>
              
              {/* MP Cost */}
              {action.cost && (
                <span className="absolute top-1 right-1 text-xs text-blue-400">
                  {action.cost}
                </span>
              )}
              
              {/* Item Quantity */}
              {action.quantity && (
                <span className="absolute top-1 right-1 text-xs text-green-400">
                  {action.quantity}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Action Instruction */}
        {selectedAction && (
          <div className="text-center text-white mt-2 text-sm">
            {selectedAction.type === 'skill' && 'เลือกเป้าหมายที่จะใช้สกิล'}
            {selectedAction.type === 'item' && 'กดปุ่มอีกครั้งเพื่อใช้ไอเท็ม'}
          </div>
        )}
      </div>

      {/* Battle Log (Mini) */}
      <div className="absolute top-4 left-4 w-80 max-h-40 bg-black bg-opacity-80 rounded-lg p-3 overflow-y-auto z-10">
        <h4 className="text-white font-bold mb-2 text-sm">บันทึกการต่อสู้</h4>
        <div className="space-y-1">
          {battleLog.slice(-4).map((log, index) => (
            <div key={index} className="text-xs text-gray-300">
              <span className="text-yellow-400">[{new Date(log.timestamp).toLocaleTimeString('th-TH', { 
                minute: '2-digit', 
                second: '2-digit' 
              })}]</span> {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default BattleArena; 