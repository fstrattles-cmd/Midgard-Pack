// End ships: the Elytra in the item frame is taken out, so the frame is empty.
//
// Why: the Elytra is removed from Midgard (travel is earned by horse, ship, train and dragon).
// This replaces end_city_eggs.js, which put Dragons of Berk Fury eggs in the frame; that mod
// left the pack on 19 Nov 2026 for Book of Dragons. What the End ship should hold instead is
// still to be decided (old script in _claude-backups/2026-11-19_dragon-swap/).
//
// How: two triggers, so it still works if one of them does not fire.
//   1. EntityEvents.spawned: when an item frame holding an Elytra enters the world.
//   2. PlayerEvents.tick: every 5 seconds, a player in the End empties any such frame within 48 blocks.
// Undo: delete this file and type /reload.

function emptyElytraFrame(entity) {
  if (entity.type !== 'minecraft:item_frame') return false
  if (entity.item.id !== 'minecraft:elytra') return false
  entity.mergeNbt({ Item: { id: 'minecraft:air', Count: 0 } })
  return true
}

EntityEvents.spawned(event => {
  try {
    emptyElytraFrame(event.entity)
  } catch (err) {
    console.warn('[end_ship_no_elytra] spawn check failed: ' + err)
  }
})

let scanTicks = 0
let scanWarned = false
PlayerEvents.tick(event => {
  scanTicks++
  if (scanTicks % 100 !== 0) return
  try {
    let level = event.player.level
    if (level.dimension.toString() !== 'minecraft:the_end') return
    let found = level.getEntitiesWithin(event.player.boundingBox.inflate(48, 32, 48))
    for (let i = 0; i < found.size(); i++) {
      emptyElytraFrame(found.get(i))
    }
  } catch (err) {
    if (!scanWarned) {
      scanWarned = true
      console.warn('[end_ship_no_elytra] scan failed (shown once): ' + err)
    }
  }
})
