// Midgard: dragon camera fix (19 Nov 2026).
// Leawind's Third Person and Book of Dragons both try to control the camera while
// you ride a dragon, which leaves the view stuck underneath it. While you ride a
// Book of Dragons dragon, this switches Leawind off so the dragon's own camera
// takes over, and switches it back on when you get off. Horses and ships keep
// Leawind's camera. Does nothing if either mod is missing.
// To move into Midgard Tweaks later (rule: our code lives there).
// Note: KubeJS's script engine dislikes let/const inside the tick function,
// so everything lives in the outer variables below.

var midgardLeawind = null
var midgardTurnedLeawindOff = false
var midgardCfg = null
var midgardRider = null
var midgardMount = null
var midgardOnDragon = false

try {
  midgardLeawind = Java.loadClass('com.github.leawind.thirdperson.ThirdPerson')
} catch (e) {
  console.info('Midgard dragon camera: Leawind not installed, skipping')
}

ClientEvents.tick(function (event) {
  if (midgardLeawind == null) return
  try {
    midgardRider = Client.player
    midgardCfg = midgardLeawind.getConfig()
    midgardOnDragon = false
    if (midgardRider != null) {
      midgardMount = midgardRider.getVehicle()
      if (midgardMount != null) {
        midgardOnDragon = String(midgardMount.getType().toString()).indexOf('bookofdragons') !== -1
      }
    }
    if (midgardOnDragon && midgardCfg.is_mod_enabled) {
      midgardCfg.is_mod_enabled = false
      midgardTurnedLeawindOff = true
      console.info('Midgard dragon camera: on a dragon, Leawind off')
    } else if (!midgardOnDragon && midgardTurnedLeawindOff) {
      midgardCfg.is_mod_enabled = true
      midgardTurnedLeawindOff = false
      console.info('Midgard dragon camera: off the dragon, Leawind back on')
    }
  } catch (e) {
    console.warn('Midgard dragon camera disabled after an error: ' + e)
    midgardLeawind = null
  }
})
