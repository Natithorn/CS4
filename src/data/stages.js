export const stages = [
  {
    id: 1,
    name: "ป่าแกะกัน",
    description: "ด่านแรกสำหรับผู้เริ่มต้น",
    background: "/images/backgrounds/battleback1.png",
    enemies: [
      { id: 'goblin', count: 1 }
    ],
    rewards: {
      exp: 50,
      gold: 25,
      items: [
        { itemId: 'health_potion', quantity: 1, chance: 0.8 }
      ]
    },
    unlockLevel: 1
  },
  {
    id: 2,
    name: "ป่าลึก",
    description: "ก็อบลินเริ่มมากขึ้น",
    background: "/images/backgrounds/battleback2.png",
    enemies: [
      { id: 'goblin', count: 2 }
    ],
    rewards: {
      exp: 100,
      gold: 50,
      items: [
        { itemId: 'health_potion', quantity: 2, chance: 0.7 },
        { itemId: 'mana_potion', quantity: 1, chance: 0.5 }
      ]
    },
    unlockLevel: 2
  },
  {
    id: 3,
    name: "ถ้ำอ็อค",
    description: "อ็อคตัวแรกปรากฏตัว",
    background: "/images/backgrounds/battleback3.png",
    enemies: [
      { id: 'orc', count: 1 }
    ],
    rewards: {
      exp: 150,
      gold: 75,
      items: [
        { itemId: 'health_potion', quantity: 2, chance: 0.8 },
        { itemId: 'strength_potion', quantity: 1, chance: 0.3 },
        { itemId: 'rusty_dagger', quantity: 1, chance: 0.2 }
      ]
    },
    unlockLevel: 3
  },
  {
    id: 4,
    name: "ถ้ำลึก",
    description: "อ็อคเริ่มมากขึ้นและแข็งแกร่งขึ้น",
    background: "/images/backgrounds/battleback4.png",
    enemies: [
      { id: 'orc', count: 2 }
    ],
    rewards: {
      exp: 250,
      gold: 120,
      items: [
        { itemId: 'mega_health_potion', quantity: 1, chance: 0.6 },
        { itemId: 'defense_potion', quantity: 1, chance: 0.4 },
        { itemId: 'iron_sword', quantity: 1, chance: 0.15 }
      ]
    },
    unlockLevel: 4
  },
  {
    id: 5,
    name: "หอคอยจอมเวทย์",
    description: "จอมเวทย์กำลังรอคุณอยู่",
    background: "/images/backgrounds/battleback5.png",
    enemies: [
      { id: 'mage', count: 1 }
    ],
    rewards: {
      exp: 400,
      gold: 200,
      items: [
        { itemId: 'mega_mana_potion', quantity: 2, chance: 0.8 },
        { itemId: 'magic_gem', quantity: 1, chance: 0.3 },
        { itemId: 'mage_staff', quantity: 1, chance: 0.1 }
      ]
    },
    unlockLevel: 5
  }
];

// ข้อมูลศัตรูสำหรับด่าน
export const stageEnemies = {
  goblin: {
    id: 'goblin',
    name: 'ก็อบลิน',
    sprite: 'Goblin.png',
    level: 2,
    maxHp: 45,
    currentHp: 45,
    attack: 12,
    defense: 4,
    exp: 25,
    gold: 18,
    skills: ['stab', 'throw_rock'],
    dropItems: [
      { itemId: 'health_potion', chance: 0.2 },
      { itemId: 'rusty_dagger', chance: 0.1 },
      { itemId: 'goblin_ear', chance: 0.4 }
    ],
    statusEffects: []
  },
  orc: {
    id: 'orc',
    name: 'อ็อค',
    sprite: 'orc.png',
    level: 4,
    maxHp: 80,
    currentHp: 80,
    attack: 20,
    defense: 8,
    exp: 50,
    gold: 35,
    skills: ['smash', 'battle_cry'],
    dropItems: [
      { itemId: 'health_potion', chance: 0.4 },
      { itemId: 'iron_sword', chance: 0.15 },
      { itemId: 'orc_tusk', chance: 0.3 }
    ],
    statusEffects: []
  },
  mage: {
    id: 'mage',
    name: 'จอมเวทย์',
    sprite: 'Mage.png',
    level: 5,
    maxHp: 80,
    currentHp: 80,
    attack: 25,
    defense: 8,
    speed: 20,
    exp: 200,
    gold: 100,
    skills: ['fireball', 'magic_shield', 'teleport'],
    dropItems: [
      { itemId: 'mana_potion', chance: 0.7 },
      { itemId: 'magic_gem', chance: 0.3 },
      { itemId: 'spell_book', chance: 0.1 }
    ],
    statusEffects: [],
    magicResistance: 0.3 // ต้านทานเวทย์ 30%
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลด่าน
export const getStageById = (stageId) => {
  return stages.find(stage => stage.id === stageId);
};

export const getAvailableStages = (heroLevel) => {
  return stages.filter(stage => stage.unlockLevel <= heroLevel);
};

export const getCurrentStageEnemies = (stageId) => {
  const stage = getStageById(stageId);
  if (!stage) return [];
  
  return stage.enemies.map(enemyData => {
    const enemies = [];
    for (let i = 0; i < enemyData.count; i++) {
      // สร้างศัตรูตาม count
      const baseEnemy = stageEnemies[enemyData.id];
      if (baseEnemy) {
        enemies.push({
          ...baseEnemy,
          instanceId: `${enemyData.id}_${i + 1}`,
          currentHp: baseEnemy.maxHp
        });
      }
    }
    return enemies;
  }).flat();
};

// Balance การโจมตีตามด่าน
export const getStageBalanceMultiplier = (stageId) => {
  const multipliers = {
    1: { hp: 1.0, attack: 1.0, defense: 1.0 },
    2: { hp: 1.2, attack: 1.1, defense: 1.1 },
    3: { hp: 1.4, attack: 1.2, defense: 1.2 },
    4: { hp: 1.6, attack: 1.3, defense: 1.3 },
    5: { hp: 2.0, attack: 1.5, defense: 1.4 }
  };
  
  return multipliers[stageId] || multipliers[1];
};

export default stages; 