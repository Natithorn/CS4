import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getRandomEnemy } from '../data/enemies';
import { defaultInventory, getItemById } from '../data/items';
import { defaultSkills, getAvailableSkills } from '../data/skills';
import { getStageById, getCurrentStageEnemies, getStageBalanceMultiplier, stageEnemies as stageEnemyData } from '../data/stages';

const useGameStore = create(
  devtools(
    (set, get) => ({
      // Game State
      gameState: 'uninitialized', // 'uninitialized', 'loading', 'playing', 'paused'
      currentScreen: 'main', // 'main', 'stage-select', 'battle'
      isInBattle: false,
      currentEnemy: null,
      battleLog: [],
      currentTurn: 'player', // 'player', 'enemy'
      gameResult: null, // { type: 'victory'|'defeat', rewards: {...} }
      
      // Stage System
      currentStage: null,
      stageEnemies: [],
      stageProgress: {
        currentEnemyIndex: 0,
        enemiesDefeated: 0
      },
      
      // Hero Data
      hero: {
        name: 'นักผจญภัย',
        level: 1,
        maxHp: 100,
        currentHp: 100,
        maxMp: 50,
        currentMp: 50,
        attack: 20,
        defense: 10,
        speed: 15,
        exp: 0,
        nextLevelExp: 100,
        gold: 100,
        statusEffects: [],
        buffs: [],
        debuffs: [],
        enemiesDefeated: 0,
        totalBattles: 0,
        playTime: '0:00:00'
      },
      
      // Inventory & Skills
      inventory: [],
      skills: [],
      equippedItems: {
        weapon: null,
        armor: null,
        shield: null,
        accessory: null
      },
      
      // Game Actions
      initializeGame: () => {
        set({ gameState: 'loading' });
        
        // Simulate loading time
        setTimeout(() => {
          set({
            gameState: 'playing',
            inventory: [...defaultInventory],
            skills: [...defaultSkills],
            battleLog: [{
              type: 'system',
              text: 'ยินดีต้อนรับสู่เกม RPG!',
              timestamp: Date.now()
            }]
          });
        }, 1000);
      },
      
      // New Stage System Functions
      startStage: (stage) => {
        const stageEnemies = getCurrentStageEnemies(stage.id);
        const balanceMultiplier = getStageBalanceMultiplier(stage.id);
        
        // Apply balance multipliers to enemies
        const balancedEnemies = stageEnemies.map(enemy => ({
          ...enemy,
          maxHp: Math.floor(enemy.maxHp * balanceMultiplier.hp),
          currentHp: Math.floor(enemy.maxHp * balanceMultiplier.hp),
          attack: Math.floor(enemy.attack * balanceMultiplier.attack),
          defense: Math.floor(enemy.defense * balanceMultiplier.defense)
        }));
        
        set({
          gameState: 'stage',
          currentScreen: 'battle',
          currentStage: stage,
          isInBattle: true,
          stageEnemies: balancedEnemies,
          currentEnemy: balancedEnemies[0] || null,
          currentTurn: 'player',
          stageProgress: {
            currentEnemyIndex: 0,
            enemiesDefeated: 0
          }
        });
        
        get().addLogMessage({
          type: 'system',
          text: `เข้าสู่ ${stage.name}! เตรียมพบกับศัตรู ${balancedEnemies.length} ตัว!`,
          timestamp: Date.now()
        });
        
        // Update battle statistics
        set(state => ({
          hero: {
            ...state.hero,
            totalBattles: state.hero.totalBattles + 1
          }
        }));
      },

      startBattle: () => {
        const { hero } = get();
        const enemy = getRandomEnemy(hero.level);
        
        set({
          isInBattle: true,
          currentEnemy: enemy,
          currentTurn: 'player'
        });
        
        get().addLogMessage({
          type: 'system',
          text: `พบ ${enemy.name} เลเวล ${enemy.level}!`,
          timestamp: Date.now()
        });
        
        // Update battle statistics
        set(state => ({
          hero: {
            ...state.hero,
            totalBattles: state.hero.totalBattles + 1
          }
        }));
      },
      
      endBattle: (victory = false) => {
        const { currentEnemy, hero, currentStage, stageEnemies, stageProgress } = get();
        
        if (victory && currentEnemy) {
          // Give rewards
          const expGained = currentEnemy.exp;
          const goldGained = currentEnemy.gold;
          
          get().addLogMessage({
            type: 'victory',
            text: `ชนะ ${currentEnemy.name}! ได้รับ ${expGained} EXP และ ${goldGained} เหรียญ`,
            timestamp: Date.now()
          });
          
          set(state => ({
            hero: {
              ...state.hero,
              exp: state.hero.exp + expGained,
              gold: state.hero.gold + goldGained,
              enemiesDefeated: state.hero.enemiesDefeated + 1
            }
          }));
          
          // Check for level up
          get().checkLevelUp();
          
          // Handle item drops
          get().handleItemDrops(currentEnemy);
          
          // Check if stage is complete
          if (currentStage) {
            get().checkStageProgress();
            return;
          }
        }
        
        set({
          isInBattle: false,
          currentEnemy: null,
          currentScreen: 'main',
          currentStage: null,
          stageEnemies: [],
          stageProgress: {
            currentEnemyIndex: 0,
            enemiesDefeated: 0
          }
        });
      },

      checkStageProgress: () => {
        const { stageEnemies, stageProgress, currentStage } = get();
        const aliveEnemies = stageEnemies.filter(enemy => enemy.currentHp > 0);
        
        if (aliveEnemies.length === 0) {
          // Stage completed!
          get().completeStage();
        } else {
          // Continue to next enemy
          const nextEnemy = aliveEnemies[0];
          set({
            currentEnemy: nextEnemy,
            currentTurn: 'player',
            stageProgress: {
              ...stageProgress,
              currentEnemyIndex: stageProgress.currentEnemyIndex + 1,
              enemiesDefeated: stageProgress.enemiesDefeated + 1
            }
          });
          
          get().addLogMessage({
            type: 'system',
            text: `ถัดไป: ${nextEnemy.name}!`,
            timestamp: Date.now()
          });
        }
      },

      completeStage: () => {
        const { currentStage, hero } = get();
        
        if (!currentStage) return;
        
        // Give stage rewards
        const rewards = currentStage.rewards;
        
        set(state => ({
          hero: {
            ...state.hero,
            exp: state.hero.exp + rewards.exp,
            gold: state.hero.gold + rewards.gold
          }
        }));
        
        get().addLogMessage({
          type: 'victory',
          text: `ผ่าน ${currentStage.name} แล้ว! ได้รับ ${rewards.exp} EXP และ ${rewards.gold} เหรียญ`,
          timestamp: Date.now()
        });
        
        // Collect items that were actually obtained
        const obtainedItems = [];
        rewards.items.forEach(reward => {
          if (Math.random() < reward.chance) {
            get().addToInventory(reward.itemId, reward.quantity);
            const item = getItemById(reward.itemId);
            if (item) {
              obtainedItems.push({ name: item.name, quantity: reward.quantity });
              get().addLogMessage({
                type: 'system',
                text: `ได้รับ ${item.name} x${reward.quantity}!`,
                timestamp: Date.now()
              });
            }
          }
        });
        
        get().checkLevelUp();
        
        // Show victory screen
        set({
          gameResult: {
            type: 'victory',
            rewards: {
              exp: rewards.exp,
              gold: rewards.gold,
              items: obtainedItems
            }
          }
        });
      },

      handleDefeat: () => {
        get().addLogMessage({
          type: 'defeat',
          text: 'คุณแพ้แล้ว!',
          timestamp: Date.now()
        });
        
        // Show defeat screen
        set({
          gameResult: {
            type: 'defeat'
          }
        });
      },

      dismissGameResult: () => {
        const { gameResult } = get();
        
        if (gameResult?.type === 'victory') {
          // Return to stage select after victory
          set({
            gameResult: null,
            isInBattle: false,
            currentEnemy: null,
            currentScreen: 'stage-select',
            currentStage: null,
            stageEnemies: [],
            stageProgress: {
              currentEnemyIndex: 0,
              enemiesDefeated: 0
            }
          });
        } else if (gameResult?.type === 'defeat') {
          // Reset hero HP and return to stage select after defeat
          set(state => ({
            gameResult: null,
            isInBattle: false,
            currentEnemy: null,
            currentScreen: 'stage-select',
            currentStage: null,
            stageEnemies: [],
            stageProgress: {
              currentEnemyIndex: 0,
              enemiesDefeated: 0
            },
            hero: {
              ...state.hero,
              currentHp: state.hero.maxHp, // Restore full HP
              currentMp: state.hero.maxMp  // Restore full MP
            }
          }));
        }
      },
      
      performAttack: (targetId) => {
        const { hero, currentEnemy, stageEnemies, currentStage, gameState } = get();
        if (get().currentTurn !== 'player') return;
        
        let target = null;
        
        // Determine target based on game mode
        if (gameState === 'stage' && stageEnemies.length > 0) {
          // Stage mode: find target by ID or use first alive enemy
          if (targetId) {
            target = stageEnemies.find(enemy => enemy.instanceId === targetId && enemy.currentHp > 0);
          } else {
            target = stageEnemies.find(enemy => enemy.currentHp > 0);
          }
        } else if (currentEnemy && currentEnemy.currentHp > 0) {
          // Single battle mode
          target = currentEnemy;
        }
        
        if (!target) return;
        
        // Calculate damage
        const baseDamage = hero.attack;
        const enemyDefense = target.defense;
        const damage = Math.max(1, baseDamage - enemyDefense);
        
        // Check for critical hit
        const isCritical = Math.random() < 0.1; // 10% critical chance
        const finalDamage = isCritical ? Math.floor(damage * 1.5) : damage;
        
        // Apply damage to enemy
        const newEnemyHp = Math.max(0, target.currentHp - finalDamage);
        
        if (gameState === 'stage') {
          // Update enemy in stage enemies array
          console.log('Before update - stageEnemies:', get().stageEnemies);
          console.log('Updating enemy with targetId:', target.instanceId, 'newHp:', newEnemyHp);
          
          set(state => ({
            stageEnemies: state.stageEnemies.map(enemy => {
              if (enemy.instanceId === target.instanceId) {
                console.log('Found matching enemy, updating HP from', enemy.currentHp, 'to', newEnemyHp);
                return { ...enemy, currentHp: newEnemyHp };
              }
              return enemy;
            })
          }));
          
          console.log('After update - stageEnemies:', get().stageEnemies);
        } else {
          // Single battle mode
          set(state => ({
            currentEnemy: {
              ...state.currentEnemy,
              currentHp: newEnemyHp
            }
          }));
        }
        
        // Add to battle log
        get().addLogMessage({
          type: isCritical ? 'critical' : 'damage',
          text: `${hero.name} โจมตี ${target.name} สร้างความเสียหาย ${finalDamage} จุด${isCritical ? ' (Critical!)' : ''}`,
          damage: finalDamage,
          timestamp: Date.now()
        });
        
        // Change turn to enemy
        set({ currentTurn: 'enemy' });
        
        // Check win condition
        if (gameState === 'stage') {
          const aliveEnemies = get().stageEnemies.filter(enemy => enemy.currentHp > 0);
          if (aliveEnemies.length === 0) {
            setTimeout(() => get().completeStage(), 1000);
            return;
          }
          // Enemy turn for stage mode
          setTimeout(() => get().stageEnemyTurn(), 1000);
        } else {
          // Single battle mode
          if (newEnemyHp <= 0) {
            get().endBattle(true);
          } else {
            setTimeout(() => get().enemyTurn(), 1000);
          }
        }
      },
      
      enemyTurn: () => {
        const { currentEnemy, hero } = get();
        if (!currentEnemy || currentEnemy.currentHp <= 0 || get().currentTurn !== 'enemy') return;
        
        // Simple AI: just attack
        const damage = Math.max(1, currentEnemy.attack - hero.defense);
        const newHeroHp = Math.max(0, hero.currentHp - damage);
        
        set(state => ({
          hero: {
            ...state.hero,
            currentHp: newHeroHp
          }
        }));
        
        get().addLogMessage({
          type: 'damage',
          text: `${currentEnemy.name} โจมตี ${hero.name} สร้างความเสียหาย ${damage} จุด`,
          damage: damage,
          timestamp: Date.now()
        });
        
        // Change turn back to player
        set({ currentTurn: 'player' });
        
        // Check if hero is defeated
        if (newHeroHp <= 0) {
          get().handleDefeat();
        }
      },
      
      useSkill: (skillId, targetId = null) => {
        const { hero, skills, currentEnemy, stageEnemies, gameState } = get();
        const skill = skills.find(s => s.id === skillId);
        
        if (!skill || hero.currentMp < skill.mpCost) return;
        
        // Deduct MP
        set(state => ({
          hero: {
            ...state.hero,
            currentMp: Math.max(0, state.hero.currentMp - skill.mpCost)
          }
        }));
        
        // Apply skill effects
        if (skill.type === 'heal') {
          const healAmount = skill.heal || 0;
          const newHp = Math.min(hero.maxHp, hero.currentHp + healAmount);
          
          set(state => ({
            hero: {
              ...state.hero,
              currentHp: newHp
            }
          }));
          
          get().addLogMessage({
            type: 'heal',
            text: `${hero.name} ใช้ ${skill.name} ฟื้นฟู HP ${healAmount} จุด`,
            heal: healAmount,
            timestamp: Date.now()
          });
        } else if (skill.type === 'attack') {
          // Handle stage mode vs single battle mode
          if (gameState === 'stage' && stageEnemies.length > 0) {
            // Find target enemy in stage
            const targetEnemy = stageEnemies.find(enemy => enemy.instanceId === targetId);
            console.log('useSkill - targetId:', targetId, 'targetEnemy:', targetEnemy);
            
            if (targetEnemy && targetEnemy.currentHp > 0) {
              const baseDamage = hero.attack * (skill.damage || 1);
              const finalDamage = Math.max(1, baseDamage - targetEnemy.defense);
              const newEnemyHp = Math.max(0, targetEnemy.currentHp - finalDamage);
              
              console.log('Skill damage calculation:', { baseDamage, finalDamage, newEnemyHp });
              
              // Update stage enemies
              set(state => ({
                stageEnemies: state.stageEnemies.map(enemy =>
                  enemy.instanceId === targetId
                    ? { ...enemy, currentHp: newEnemyHp }
                    : enemy
                )
              }));
              
              get().addLogMessage({
                type: 'damage',
                text: `${hero.name} ใช้ ${skill.name} โจมตี ${targetEnemy.name} สร้างความเสียหาย ${finalDamage} จุด`,
                damage: finalDamage,
                timestamp: Date.now()
              });
              
              // Check if all enemies are defeated
              const aliveEnemies = get().stageEnemies.filter(enemy => enemy.currentHp > 0);
              if (aliveEnemies.length === 0) {
                setTimeout(() => get().completeStage(), 1000);
                return;
              }
            } else {
              console.log('Target enemy not found or dead:', { targetId, targetEnemy });
            }
          } else if (currentEnemy) {
            // Original single battle mode
            const baseDamage = hero.attack * (skill.damage || 1);
            const finalDamage = Math.max(1, baseDamage - currentEnemy.defense);
            const newEnemyHp = Math.max(0, currentEnemy.currentHp - finalDamage);
            
            set(state => ({
              currentEnemy: {
                ...state.currentEnemy,
                currentHp: newEnemyHp
              }
            }));
            
            get().addLogMessage({
              type: 'damage',
              text: `${hero.name} ใช้ ${skill.name} สร้างความเสียหาย ${finalDamage} จุด`,
              damage: finalDamage,
              timestamp: Date.now()
            });
            
            if (newEnemyHp <= 0) {
              get().endBattle(true);
              return;
            }
          }
        }
        
        // Apply skill cooldown
        set(state => ({
          skills: state.skills.map(s => 
            s.id === skillId 
              ? { ...s, currentCooldown: s.cooldown }
              : s
          )
        }));
        
        // Change turn to enemy
        set({ currentTurn: 'enemy' });
        
        // Enemy turn if in battle
        if (get().isInBattle) {
          if (gameState === 'stage') {
            const aliveEnemies = get().stageEnemies.filter(enemy => enemy.currentHp > 0);
            if (aliveEnemies.length > 0) {
              setTimeout(() => get().stageEnemyTurn(), 1000);
            }
          } else if (get().currentEnemy?.currentHp > 0) {
            setTimeout(() => get().enemyTurn(), 1000);
          }
        }
      },
      
      useItem: (itemId, targetId = null) => {
        console.log('useItem called with:', { itemId, targetId });
        
        const { inventory, hero, isInBattle, gameState, stageEnemies } = get();
        const itemIndex = inventory.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1 || inventory[itemIndex].quantity <= 0) {
          console.log('Item not found or quantity is 0');
          return;
        }
        
        const item = inventory[itemIndex];
        console.log('Using item:', item);
        
        // Check if item can be used
        // Only restrict truly battle-specific items like bombs and debuffs
        if (!isInBattle && item.battleOnly && (item.id === 'bomb' || item.id === 'poison_vial' || item.id === 'defense_potion')) {
          console.log('Cannot use battle-only item outside of battle');
          return;
        }
        if (isInBattle && item.outOfBattleOnly) {
          console.log('Cannot use out-of-battle item in battle');
          return;
        }
        
        // Handle permanent potions (apply stats immediately)
        if (item.type === 'permanent' && item.stats) {
          set(state => {
            const updatedHero = { ...state.hero };
            
            Object.entries(item.stats).forEach(([stat, value]) => {
              if (stat === 'maxHp') {
                updatedHero.maxHp += value;
                updatedHero.currentHp += value; // Also increase current HP
              } else if (stat === 'maxMp') {
                updatedHero.maxMp += value;
                updatedHero.currentMp += value; // Also increase current MP
              } else {
                updatedHero[stat] = (updatedHero[stat] || 0) + value;
              }
            });
            
            return { hero: updatedHero };
          });

          get().addLogMessage({
            type: 'system',
            text: `ใช้ ${item.name}`,
            timestamp: Date.now()
          });

          // Consume item
          set(state => ({
            inventory: state.inventory.map((invItem, index) => 
              index === itemIndex 
                ? { ...invItem, quantity: invItem.quantity - 1 }
                : invItem
            ).filter(invItem => invItem.quantity > 0)
          }));

          return;
        }

        // Apply item effects for regular consumables
        if (item.effects) {
          item.effects.forEach(effect => {
            console.log('Applying effect:', effect);
            
            switch (effect.type) {
              case 'heal':
                const healAmount = effect.value;
                const newHp = Math.min(hero.maxHp, hero.currentHp + healAmount);
                
                set(state => ({
                  hero: {
                    ...state.hero,
                    currentHp: newHp
                  }
                }));
                
                get().addLogMessage({
                  type: 'system',
                  text: `ใช้ ${item.name}`,
                  timestamp: Date.now()
                });
                console.log('Healed for:', healAmount);
                break;
                
              case 'restore_mp':
                const mpAmount = effect.value;
                const newMp = Math.min(hero.maxMp, hero.currentMp + mpAmount);
                
                set(state => ({
                  hero: {
                    ...state.hero,
                    currentMp: newMp
                  }
                }));
                
                get().addLogMessage({
                  type: 'system',
                  text: `ใช้ ${item.name}`,
                  timestamp: Date.now()
                });
                console.log('Restored MP for:', mpAmount);
                break;
                
              case 'damage':
                // Handle damage to target enemy
                if (targetId && gameState === 'stage') {
                  const targetEnemy = stageEnemies.find(enemy => enemy.instanceId === targetId);
                  if (targetEnemy && targetEnemy.currentHp > 0) {
                    const damage = effect.value;
                    const newEnemyHp = Math.max(0, targetEnemy.currentHp - damage);
                    
                    set(state => ({
                      stageEnemies: state.stageEnemies.map(enemy =>
                        enemy.instanceId === targetId
                          ? { ...enemy, currentHp: newEnemyHp }
                          : enemy
                      )
                    }));
                    
                    get().addLogMessage({
                      type: 'damage',
                      text: `${hero.name} ใช้ ${item.name} โจมตี ${targetEnemy.name} สร้างความเสียหาย ${damage} จุด`,
                      damage: damage,
                      timestamp: Date.now()
                    });
                    console.log('Dealt damage:', damage, 'to enemy:', targetEnemy.name);
                  }
                }
                break;
            }
          });
        }
        
        // Consume item
        set(state => ({
          inventory: state.inventory.map((invItem, index) => 
            index === itemIndex 
              ? { ...invItem, quantity: invItem.quantity - 1 }
              : invItem
          ).filter(invItem => invItem.quantity > 0)
        }));
        
        console.log('Item consumed');
        
        // If in battle, change turn to enemy (only for non-healing items or if required by game logic)
        if (get().isInBattle) {
          // Only change turn for items that should affect battle flow
          const shouldChangeTurn = item.effects?.some(effect => 
            effect.type === 'damage' || effect.type === 'debuff' || effect.type === 'buff'
          );
          
          if (shouldChangeTurn) {
            console.log('Changing turn to enemy');
            set({ currentTurn: 'enemy' });
            const { gameState } = get();
            if (gameState === 'stage') {
              const aliveEnemies = get().stageEnemies.filter(enemy => enemy.currentHp > 0);
              if (aliveEnemies.length > 0) {
                setTimeout(() => get().stageEnemyTurn(), 1000);
              }
            } else {
              setTimeout(() => get().enemyTurn(), 1000);
            }
          } else {
            console.log('Item used without changing turn (healing item)');
          }
        }
      },
      
      checkLevelUp: () => {
        const { hero } = get();
        
        if (hero.exp >= hero.nextLevelExp) {
          const newLevel = hero.level + 1;
          const hpIncrease = 20;
          const mpIncrease = 10;
          const attackIncrease = 3;
          const defenseIncrease = 2;
          
          set(state => ({
            hero: {
              ...state.hero,
              level: newLevel,
              maxHp: state.hero.maxHp + hpIncrease,
              currentHp: state.hero.currentHp + hpIncrease,
              maxMp: state.hero.maxMp + mpIncrease,
              currentMp: state.hero.currentMp + mpIncrease,
              attack: state.hero.attack + attackIncrease,
              defense: state.hero.defense + defenseIncrease,
              exp: state.hero.exp - state.hero.nextLevelExp,
              nextLevelExp: state.hero.nextLevelExp + (newLevel * 50)
            },
            skills: getAvailableSkills(newLevel).map(skill => ({
              ...skill,
              currentCooldown: 0
            }))
          }));
          
          get().addLogMessage({
            type: 'system',
            text: `เลเวลอัพ! ขณะนี้เป็นเลเวล ${newLevel}`,
            timestamp: Date.now()
          });
        }
      },
      
      handleItemDrops: (enemy) => {
        if (!enemy.dropItems) return;
        
        enemy.dropItems.forEach(drop => {
          if (Math.random() < drop.chance) {
            const item = getItemById(drop.itemId);
            if (item) {
              get().addToInventory(drop.itemId, 1);
              get().addLogMessage({
                type: 'system',
                text: `ได้รับ ${item.name}!`,
                timestamp: Date.now()
              });
            }
          }
        });
      },
      
      addToInventory: (itemId, quantity = 1) => {
        const { inventory } = get();
        const existingItemIndex = inventory.findIndex(item => item.id === itemId);
        
        if (existingItemIndex !== -1) {
          // Item already exists, increase quantity
          set(state => ({
            inventory: state.inventory.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }));
        } else {
          // New item, add to inventory
          const baseItem = getItemById(itemId);
          if (baseItem) {
            set(state => ({
              inventory: [...state.inventory, { ...baseItem, quantity }]
            }));
          }
        }
      },

      buyItem: (item) => {
        const { hero } = get();
        
        if (hero.gold < item.price) {
          console.log('เงินไม่พอ!');
          return false;
        }

        // Deduct gold
        set(state => ({
          hero: {
            ...state.hero,
            gold: state.hero.gold - item.price
          }
        }));

        // Apply effects based on item type
        if (item.type === 'permanent') {
          // Permanent stat boosts
          if (item.stats) {
            set(state => {
              const updatedHero = { ...state.hero };
              
              Object.entries(item.stats).forEach(([stat, value]) => {
                if (stat === 'maxHp') {
                  updatedHero.maxHp += value;
                  updatedHero.currentHp += value; // Also increase current HP
                } else if (stat === 'maxMp') {
                  updatedHero.maxMp += value;
                  updatedHero.currentMp += value; // Also increase current MP
                } else {
                  updatedHero[stat] = (updatedHero[stat] || 0) + value;
                }
              });
              
              return { hero: updatedHero };
            });
          }
          
          get().addLogMessage({
            type: 'system',
            text: `ซื้อ ${item.name} แล้ว! สถานะได้รับการปรับปรุง`,
            timestamp: Date.now()
          });
        } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'shield') {
          // Equipment items - add to inventory
          const { inventory } = get();
          const existingItemIndex = inventory.findIndex(invItem => invItem.id === item.id);
          
          if (existingItemIndex !== -1) {
            // Item already exists, increase quantity
            set(state => ({
              inventory: state.inventory.map((invItem, index) =>
                index === existingItemIndex
                  ? { ...invItem, quantity: invItem.quantity + 1 }
                  : invItem
              )
            }));
          } else {
            // New item, add to inventory
            set(state => ({
              inventory: [...state.inventory, { ...item, quantity: 1 }]
            }));
          }
          
          get().addLogMessage({
            type: 'system',
            text: `ซื้อ ${item.name} แล้ว! เพิ่มในกระเป๋าแล้ว`,
            timestamp: Date.now()
          });
        } else {
          // Consumable items - add to inventory
          const { inventory } = get();
          const existingItemIndex = inventory.findIndex(invItem => invItem.id === item.id);
          
          if (existingItemIndex !== -1) {
            // Item already exists, increase quantity
            set(state => ({
              inventory: state.inventory.map((invItem, index) =>
                index === existingItemIndex
                  ? { ...invItem, quantity: invItem.quantity + 1 }
                  : invItem
              )
            }));
          } else {
            // New item, add to inventory
            set(state => ({
              inventory: [...state.inventory, { ...item, quantity: 1 }]
            }));
          }
          
          get().addLogMessage({
            type: 'system',
            text: `ซื้อ ${item.name} แล้ว!`,
            timestamp: Date.now()
          });
        }

        return true;
      },

      equipItem: (item) => {
        const { inventory, equippedItems } = get();
        
        // Find the item in inventory
        const itemIndex = inventory.findIndex(invItem => invItem.id === item.id);
        if (itemIndex === -1 || inventory[itemIndex].quantity <= 0) {
          console.log('ไม่มีไอเท็มนี้ในกระเป๋า');
          return false;
        }

        // Determine equipment slot
        let equipSlot = item.type;
        if (item.type === 'weapon') equipSlot = 'weapon';
        else if (item.type === 'armor') equipSlot = 'armor';
        else if (item.type === 'shield') equipSlot = 'shield';
        else equipSlot = 'accessory';

        // If something is already equipped in this slot, unequip it first
        if (equippedItems[equipSlot]) {
          get().unequipItem(equipSlot);
        }

        // Apply stats to hero
        if (item.stats) {
          set(state => {
            const updatedHero = { ...state.hero };
            
            Object.entries(item.stats).forEach(([stat, value]) => {
              if (stat === 'maxHp') {
                updatedHero.maxHp += value;
                updatedHero.currentHp += value;
              } else if (stat === 'maxMp') {
                updatedHero.maxMp += value;
                updatedHero.currentMp += value;
              } else {
                updatedHero[stat] = (updatedHero[stat] || 0) + value;
              }
            });
            
            return { hero: updatedHero };
          });
        }

        // Equip the item
        set(state => ({
          equippedItems: {
            ...state.equippedItems,
            [equipSlot]: { ...item }
          }
        }));

        // Remove one from inventory
        set(state => {
          const newInventory = [...state.inventory];
          if (newInventory[itemIndex].quantity > 1) {
            newInventory[itemIndex] = {
              ...newInventory[itemIndex],
              quantity: newInventory[itemIndex].quantity - 1
            };
          } else {
            newInventory.splice(itemIndex, 1);
          }
          return { inventory: newInventory };
        });

        get().addLogMessage({
          type: 'system',
          text: `ใส่ ${item.name} แล้ว! สถานะเพิ่มขึ้น`,
          timestamp: Date.now()
        });

        return true;
      },

      unequipItem: (slot) => {
        const { equippedItems } = get();
        const item = equippedItems[slot];
        
        if (!item) return false;

        // Remove stats from hero
        if (item.stats) {
          set(state => {
            const updatedHero = { ...state.hero };
            
            Object.entries(item.stats).forEach(([stat, value]) => {
              if (stat === 'maxHp') {
                updatedHero.maxHp = Math.max(1, updatedHero.maxHp - value);
                updatedHero.currentHp = Math.min(updatedHero.currentHp, updatedHero.maxHp);
              } else if (stat === 'maxMp') {
                updatedHero.maxMp = Math.max(0, updatedHero.maxMp - value);
                updatedHero.currentMp = Math.min(updatedHero.currentMp, updatedHero.maxMp);
              } else {
                updatedHero[stat] = Math.max(0, (updatedHero[stat] || 0) - value);
              }
            });
            
            return { hero: updatedHero };
          });
        }

        // Add item back to inventory
        const { inventory } = get();
        const existingItemIndex = inventory.findIndex(invItem => invItem.id === item.id);
        
        if (existingItemIndex !== -1) {
          set(state => ({
            inventory: state.inventory.map((invItem, index) =>
              index === existingItemIndex
                ? { ...invItem, quantity: invItem.quantity + 1 }
                : invItem
            )
          }));
        } else {
          set(state => ({
            inventory: [...state.inventory, { ...item, quantity: 1 }]
          }));
        }

        // Remove from equipped
        set(state => ({
          equippedItems: {
            ...state.equippedItems,
            [slot]: null
          }
        }));

        get().addLogMessage({
          type: 'system',
          text: `ถอด ${item.name} แล้ว!`,
          timestamp: Date.now()
        });

        return true;
      },
       
      addLogMessage: (message) => {
        set(state => ({
          battleLog: [...state.battleLog, message]
        }));
      },
      
      clearBattleLog: () => {
        set({ battleLog: [] });
      },
      
      // Stage Enemy Turn for multiple enemies
      stageEnemyTurn: () => {
        const { stageEnemies, hero } = get();
        const aliveEnemies = stageEnemies.filter(enemy => enemy.currentHp > 0);
        
        if (aliveEnemies.length === 0) return;
        
        // Each alive enemy attacks
        aliveEnemies.forEach((enemy, index) => {
          setTimeout(() => {
            const baseDamage = enemy.attack;
            const finalDamage = Math.max(1, baseDamage - hero.defense);
            const newHeroHp = Math.max(0, hero.currentHp - finalDamage);
            
            set(state => ({
              hero: {
                ...state.hero,
                currentHp: newHeroHp
              }
            }));
            
            get().addLogMessage({
              type: 'damage',
              text: `${enemy.name} โจมตี ${hero.name} สร้างความเสียหาย ${finalDamage} จุด`,
              damage: finalDamage,
              timestamp: Date.now()
            });
            
            // Check if hero is defeated
            if (newHeroHp <= 0) {
              setTimeout(() => {
                get().handleDefeat();
              }, 1500);
              return;
            }
            
            // If this is the last enemy's attack, change turn back to player
            if (index === aliveEnemies.length - 1) {
              setTimeout(() => {
                set({ currentTurn: 'player' });
              }, 1000);
            }
          }, index * 800); // Stagger enemy attacks
        });
      },

      // Utility functions
      updateCooldowns: () => {
        set(state => ({
          skills: state.skills.map(skill => ({
            ...skill,
            currentCooldown: Math.max(0, skill.currentCooldown - 1)
          }))
        }));
      },
      
      resetGame: () => {
        set({
          gameState: 'uninitialized',
          isInBattle: false,
          currentEnemy: null,
          battleLog: [],
          hero: {
            name: 'นักผจญภัย',
            level: 1,
            maxHp: 100,
            currentHp: 100,
            maxMp: 50,
            currentMp: 50,
            attack: 20,
            defense: 10,
            speed: 15,
            exp: 0,
            nextLevelExp: 100,
            gold: 100,
            statusEffects: [],
            buffs: [],
            debuffs: [],
            enemiesDefeated: 0,
            totalBattles: 0,
            playTime: '0:00:00'
          },
          inventory: [],
          skills: []
        });
      }
    }),
    {
      name: 'game-store'
    }
  )
);

export { useGameStore }; 