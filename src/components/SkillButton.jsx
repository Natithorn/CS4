import React from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';

const SkillButton = ({ skill, onClick, disabled = false }) => {
  const { hero } = useGameStore();

  const canUseSkill = () => {
    if (disabled) return false;
    if (hero.currentMp < skill.mpCost) return false;
    if (skill.cooldown && skill.currentCooldown > 0) return false;
    return true;
  };

  const handleClick = () => {
    if (canUseSkill() && onClick) {
      onClick(skill);
    }
  };

  const getButtonStyle = () => {
    if (!canUseSkill()) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    
    switch (skill.type) {
      case 'attack':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'heal':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'buff':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'debuff':
        return 'bg-purple-500 hover:bg-purple-600 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!canUseSkill()}
      className={`skill-button p-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${getButtonStyle()}`}
    >
      <div className="skill-content text-center">
        {/* Skill Icon */}
        <div className="skill-icon flex justify-center mb-2">
          <ImageComponent
            src={getImagePath('skills', `${skill.id.replace(/_/g, '-')}.png`)}
            fallback={skill.icon}
            alt={skill.name}
            width={48}
            height={48}
          />
        </div>
        
        {/* Skill Name */}
        <div className="skill-name font-bold text-sm mb-1">{skill.name}</div>
        
        {/* MP Cost */}
        <div className="skill-cost text-xs opacity-90">
          MP: {skill.mpCost}
        </div>
        
        {/* Cooldown Display */}
        {skill.currentCooldown > 0 && (
          <div className="skill-cooldown text-xs text-red-300 mt-1">
            คูลดาวน์: {skill.currentCooldown}
          </div>
        )}
        
        {/* Insufficient MP Warning */}
        {hero.currentMp < skill.mpCost && (
          <div className="insufficient-mp text-xs text-red-300 mt-1">
            MP ไม่พอ
          </div>
        )}
      </div>
    </button>
  );
};

// Component for skill list/panel
export const SkillPanel = ({ skills, onSkillUse, disabled = false }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="skill-panel-empty text-center text-gray-500 py-8">
        ไม่มีสกิล
      </div>
    );
  }

  return (
    <div className="skill-panel">
      <h3 className="text-lg font-bold mb-4 text-center">สกิล</h3>
      <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-3">
        {skills.map((skill) => (
          <SkillButton
            key={skill.id}
            skill={skill}
            onClick={onSkillUse}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

// Skill tooltip component
export const SkillTooltip = ({ skill, isVisible, position }) => {
  if (!isVisible || !skill) return null;

  return (
    <div 
      className="skill-tooltip absolute z-50 bg-black text-white p-3 rounded-lg shadow-lg max-w-xs"
      style={{ left: position.x, top: position.y }}
    >
      <div className="tooltip-header flex items-center mb-2">
        <span className="text-xl mr-2">{skill.icon}</span>
        <span className="font-bold">{skill.name}</span>
      </div>
      
      <div className="tooltip-description text-sm mb-2">
        {skill.description}
      </div>
      
      <div className="tooltip-stats text-xs text-gray-300">
        <div>ค่าใช้ MP: {skill.mpCost}</div>
        {skill.damage && <div>ความเสียหาย: {skill.damage}</div>}
        {skill.heal && <div>การรักษา: {skill.heal}</div>}
        {skill.cooldown && <div>คูลดาวน์: {skill.cooldown} เทิร์น</div>}
      </div>
    </div>
  );
};

export default SkillButton; 