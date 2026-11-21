// Recipes changed by the pack. Edit here; type /reload in a world to apply.

ServerEvents.recipes(event => {
  // Vanilla saddles cannot be crafted, and horses need one.
  // With villager trading removed and structures made rare, make them craftable.
  event.shaped('minecraft:saddle', ['LLL', 'SIS'], {
    L: 'minecraft:leather',
    S: 'minecraft:string',
    I: 'minecraft:iron_ingot'
  })
})
