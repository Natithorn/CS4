import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

const BattleLog = ({ maxMessages = 100, height = '200px' }) => {
  const { battleLog } = useGameStore();
  const logEndRef = useRef(null);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLog]);

  const getMessageStyle = (message) => {
    switch (message.type) {
      case 'damage':
        return 'text-red-600 font-medium';
      case 'heal':
        return 'text-green-600 font-medium';
      case 'buff':
        return 'text-blue-600';
      case 'debuff':
        return 'text-purple-600';
      case 'critical':
        return 'text-orange-600 font-bold';
      case 'miss':
        return 'text-gray-500 italic';
      case 'system':
        return 'text-yellow-700 font-medium';
      case 'victory':
        return 'text-green-700 font-bold';
      case 'defeat':
        return 'text-red-700 font-bold';
      default:
        return 'text-gray-700';
    }
  };

  const getMessageIcon = (message) => {
    switch (message.type) {
      case 'damage':
        return '⚔️';
      case 'heal':
        return '💚';
      case 'buff':
        return '📈';
      case 'debuff':
        return '📉';
      case 'critical':
        return '💥';
      case 'miss':
        return '💨';
      case 'system':
        return '🔔';
      case 'victory':
        return '🏆';
      case 'defeat':
        return '💀';
      default:
        return '•';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  if (!battleLog || battleLog.length === 0) {
    return (
      <div className="battle-log bg-gray-50 border border-gray-300 rounded-lg p-4" style={{ height }}>
        <h3 className="text-lg font-bold mb-3 text-gray-700">บันทึกการต่อสู้</h3>
        <div className="text-center text-gray-500 mt-8">
          ยังไม่มีประวัติการต่อสู้
        </div>
      </div>
    );
  }

  // Keep only the latest messages to prevent performance issues
  const recentMessages = battleLog.slice(-maxMessages);

  return (
    <div className="battle-log bg-gray-50 border border-gray-300 rounded-lg p-4" style={{ height }}>
      <h3 className="text-lg font-bold mb-3 text-gray-700">บันทึกการต่อสู้</h3>
      
      <div className="log-messages overflow-y-auto h-full">
        {recentMessages.map((message, index) => (
          <div key={index} className="log-message mb-2 p-2 bg-white rounded border-l-4 border-gray-200">
            <div className="message-content flex items-start">
              <span className="message-icon mr-2 text-lg">
                {getMessageIcon(message)}
              </span>
              <div className="message-body flex-1">
                <span className={`message-text ${getMessageStyle(message)}`}>
                  {message.text}
                </span>
                {message.timestamp && (
                  <span className="message-time ml-2 text-xs text-gray-400">
                    {formatTimestamp(message.timestamp)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Additional message data */}
            {message.damage && (
              <div className="message-details text-xs text-gray-500 mt-1 ml-8">
                ความเสียหาย: {message.damage}
              </div>
            )}
            {message.heal && (
              <div className="message-details text-xs text-gray-500 mt-1 ml-8">
                การรักษา: {message.heal}
              </div>
            )}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      
      {/* Log Controls */}
      <div className="log-controls mt-3 flex justify-between items-center">
        <span className="message-count text-xs text-gray-500">
          {recentMessages.length} ข้อความ
        </span>
        <button
          onClick={() => {
            // This would be implemented in the game store
            // clearBattleLog();
          }}
          className="clear-log text-xs text-red-500 hover:text-red-700 underline"
        >
          ล้างบันทึก
        </button>
      </div>
    </div>
  );
};

// Helper component for creating log messages
export const LogMessage = {
  damage: (attacker, target, damage, isCritical = false) => ({
    type: isCritical ? 'critical' : 'damage',
    text: `${attacker} โจมตี ${target} สร้างความเสียหาย ${damage} ${isCritical ? '(Critical!)' : ''}`,
    damage,
    timestamp: Date.now()
  }),
  
  heal: (healer, target, amount) => ({
    type: 'heal',
    text: `${healer} รักษา ${target} ฟื้นฟู HP ${amount}`,
    heal: amount,
    timestamp: Date.now()
  }),
  
  miss: (attacker, target) => ({
    type: 'miss',
    text: `${attacker} โจมตี ${target} แต่พลาด!`,
    timestamp: Date.now()
  }),
  
  buff: (caster, target, buffName) => ({
    type: 'buff',
    text: `${caster} ใช้ ${buffName} กับ ${target}`,
    timestamp: Date.now()
  }),
  
  debuff: (caster, target, debuffName) => ({
    type: 'debuff',
    text: `${caster} ใช้ ${debuffName} กับ ${target}`,
    timestamp: Date.now()
  }),
  
  system: (text) => ({
    type: 'system',
    text,
    timestamp: Date.now()
  }),
  
  victory: (winner) => ({
    type: 'victory',
    text: `${winner} ชนะ!`,
    timestamp: Date.now()
  }),
  
  defeat: (loser) => ({
    type: 'defeat',
    text: `${loser} แพ้!`,
    timestamp: Date.now()
  })
};

export default BattleLog; 