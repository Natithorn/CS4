export const skills = [
  // Basic Attack Skills
  {
    id: 'power_strike',
    name: 'การโจมตีทรงพลัง',
    icon: '⚔️',
    description: 'โจมตีด้วยพลังเพิ่ม สร้างความเสียหาย 150% ของการโจมตีปกติ',
    type: 'attack',
    damage: 1.5, // Multiplier
    mpCost: 8,
    cooldown: 0,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 1,
    effects: []
  },
  {
    id: 'critical_slash',
    name: 'การฟันอันตราย',
    icon: '🗡️',
    description: 'โจมตีที่มีโอกาสคริติคัลสูง สร้างความเสียหาย 120% และเพิ่มโอกาสคริติคัล 50%',
    type: 'attack',
    damage: 1.2,
    mpCost: 12,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 3,
    effects: [
      { type: 'critical_chance', value: 0.5 }
    ]
  },
  {
    id: 'whirlwind',
    name: 'ลมหมุน',
    icon: '🌪️',
    description: 'โจมตีหมุนรอบตัว สร้างความเสียหาย 80% แต่โจมตีศัตรูทุกตัว',
    type: 'attack',
    damage: 0.8,
    mpCost: 15,
    cooldown: 2,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 5,
    effects: [
      { type: 'area_attack', value: true }
    ]
  },
  
  // Healing Skills
  {
    id: 'heal',
    name: 'การรักษา',
    icon: '💚',
    description: 'ฟื้นฟูพลังชีวิต 60 จุด',
    type: 'heal',
    heal: 60,
    mpCost: 10,
    cooldown: 0,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 2,
    effects: []
  },
  {
    id: 'greater_heal',
    name: 'การรักษาขั้นสูง',
    icon: '💚',
    description: 'ฟื้นฟูพลังชีวิต 120 จุด',
    type: 'heal',
    heal: 120,
    mpCost: 20,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 6,
    effects: []
  },
  {
    id: 'regeneration',
    name: 'การฟื้นฟูต่อเนื่อง',
    icon: '🌿',
    description: 'ฟื้นฟูพลังชีวิต 25 จุดทุกเทิร์นเป็นเวลา 5 เทิร์น',
    type: 'heal',
    heal: 25,
    mpCost: 15,
    cooldown: 3,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 8,
    effects: [
      { type: 'regeneration', value: 25, duration: 5 }
    ]
  },
  
  // Buff Skills
  {
    id: 'strengthen',
    name: 'เสริมกำลัง',
    icon: '💪',
    description: 'เพิ่มพลังโจมตี 30% เป็นเวลา 5 เทิร์น',
    type: 'buff',
    mpCost: 12,
    cooldown: 2,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 4,
    effects: [
      { type: 'stat_buff', stat: 'attack', value: 0.3, duration: 5 }
    ]
  },
  {
    id: 'fortify',
    name: 'เสริมป้องกัน',
    icon: '🛡️',
    description: 'เพิ่มป้องกัน 40% เป็นเวลา 5 เทิร์น',
    type: 'buff',
    mpCost: 12,
    cooldown: 2,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 4,
    effects: [
      { type: 'stat_buff', stat: 'defense', value: 0.4, duration: 5 }
    ]
  },
  {
    id: 'haste',
    name: 'เร่งรีบ',
    icon: '💨',
    description: 'เพิ่มความเร็วและโอกาสหลบหลีก 25% เป็นเวลา 4 เทิร์น',
    type: 'buff',
    mpCost: 10,
    cooldown: 3,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 7,
    effects: [
      { type: 'stat_buff', stat: 'speed', value: 0.25, duration: 4 },
      { type: 'stat_buff', stat: 'dodge', value: 0.25, duration: 4 }
    ]
  },
  
  // Debuff Skills
  {
    id: 'weaken',
    name: 'ทำให้อ่อนแอ',
    icon: '📉',
    description: 'ลดพลังโจมตีของศัตรู 25% เป็นเวลา 4 เทิร์น',
    type: 'debuff',
    damage: 0,
    mpCost: 8,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 3,
    effects: [
      { type: 'stat_debuff', stat: 'attack', value: 0.25, duration: 4 }
    ]
  },
  {
    id: 'armor_break',
    name: 'ทำลายเกราะ',
    icon: '💥',
    description: 'ลดป้องกันของศัตรู 35% เป็นเวลา 4 เทิร์น',
    type: 'debuff',
    damage: 0,
    mpCost: 10,
    cooldown: 2,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 5,
    effects: [
      { type: 'stat_debuff', stat: 'defense', value: 0.35, duration: 4 }
    ]
  },
  {
    id: 'poison_dart',
    name: 'ลูกดอกพิษ',
    icon: '🧪',
    description: 'โจมตีและทำให้ศัตรูเป็นพิษ สูญเสีย HP 15 จุดทุกเทิร์นเป็นเวลา 3 เทิร์น',
    type: 'debuff',
    damage: 0.8,
    mpCost: 12,
    cooldown: 2,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 6,
    effects: [
      { type: 'poison', value: 15, duration: 3 }
    ]
  },
  
  // Magic Skills
  {
    id: 'fireball',
    name: 'ลูกไฟ',
    icon: '🔥',
    description: 'ปล่อยลูกไฟสร้างความเสียหาย 100 จุด และมีโอกาสทำให้เป็นไฟลุก',
    type: 'magic',
    damage: 100,
    mpCost: 18,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 7,
    effects: [
      { type: 'burn', value: 10, duration: 3, chance: 0.3 }
    ]
  },
  {
    id: 'lightning_bolt',
    name: 'สายฟ้า',
    icon: '⚡',
    description: 'เรียกสายฟ้าสร้างความเสียหาย 90 จุด และมีโอกาสทำให้เป็นอัมพาต',
    type: 'magic',
    damage: 90,
    mpCost: 16,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 8,
    effects: [
      { type: 'paralysis', duration: 2, chance: 0.25 }
    ]
  },
  {
    id: 'ice_shard',
    name: 'เศษน้ำแข็ง',
    icon: '❄️',
    description: 'ปล่อยเศษน้ำแข็งสร้างความเสียหาย 85 จุด และลดความเร็วศัตรู',
    type: 'magic',
    damage: 85,
    mpCost: 14,
    cooldown: 1,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 9,
    effects: [
      { type: 'stat_debuff', stat: 'speed', value: 0.3, duration: 3 }
    ]
  },
  
  // Ultimate Skills
  {
    id: 'berserker_rage',
    name: 'ความโกรธของนักรบ',
    icon: '😡',
    description: 'เข้าสู่สถานะโมโหะ เพิ่มพลังโจมตี 50% แต่ลดป้องกัน 20% เป็นเวลา 6 เทิร์น',
    type: 'ultimate',
    mpCost: 25,
    cooldown: 5,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 10,
    effects: [
      { type: 'stat_buff', stat: 'attack', value: 0.5, duration: 6 },
      { type: 'stat_debuff', stat: 'defense', value: 0.2, duration: 6 }
    ]
  },
  {
    id: 'meteor',
    name: 'อุกกาบาต',
    icon: '☄️',
    description: 'เรียกอุกกาบาตตกใส่ศัตรูทุกตัว สร้างความเสียหาย 200 จุด',
    type: 'ultimate',
    damage: 200,
    mpCost: 40,
    cooldown: 7,
    currentCooldown: 0,
    level: 1,
    unlockLevel: 15,
    effects: [
      { type: 'area_attack', value: true }
    ]
  }
];

// Helper functions
export const getSkillById = (id) => {
  return skills.find(skill => skill.id === id);
};

export const getSkillsByType = (type) => {
  return skills.filter(skill => skill.type === type);
};

export const getAvailableSkills = (heroLevel) => {
  return skills.filter(skill => skill.unlockLevel <= heroLevel);
};

export const getSkillsByLevel = (level) => {
  return skills.filter(skill => skill.unlockLevel === level);
};

// Skill categories
export const skillCategories = {
  attack: getSkillsByType('attack'),
  heal: getSkillsByType('heal'),
  buff: getSkillsByType('buff'),
  debuff: getSkillsByType('debuff'),
  magic: getSkillsByType('magic'),
  ultimate: getSkillsByType('ultimate')
};

// Default starting skills
export const defaultSkills = [
  'power_strike',
  'heal'
].map(id => {
  const skill = getSkillById(id);
  return skill ? { ...skill } : null;
}).filter(Boolean);

// Skill tree structure for UI
export const skillTree = {
  warrior: {
    name: 'นักรบ',
    skills: [
      'power_strike',
      'critical_slash',
      'whirlwind',
      'strengthen',
      'berserker_rage'
    ]
  },
  mage: {
    name: 'นักเวทย์',
    skills: [
      'fireball',
      'lightning_bolt',
      'ice_shard',
      'heal',
      'meteor'
    ]
  },
  support: {
    name: 'ผู้สนับสนุน',
    skills: [
      'heal',
      'greater_heal',
      'regeneration',
      'strengthen',
      'fortify',
      'haste'
    ]
  },
  assassin: {
    name: 'นักฆ่า',
    skills: [
      'critical_slash',
      'poison_dart',
      'weaken',
      'armor_break',
      'haste'
    ]
  }
};

export default skills; 