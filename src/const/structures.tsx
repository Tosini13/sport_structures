export enum structuresConst {
  groups = "GROUPS",
  playOffs = "PLAY_OFFS",
}

export let structuresConstString = new Map();
structuresConstString.set(structuresConst.groups, "Groups");
structuresConstString.set(structuresConst.playOffs, "Play offs");

export let placeMatchesTitle = new Map();
placeMatchesTitle.set(1, "Final");
placeMatchesTitle.set(3, "3rd place");

export let roundMatchesTitle = new Map();
roundMatchesTitle.set(2, "Semi-final");
roundMatchesTitle.set(4, "Quarter-final");
roundMatchesTitle.set(8, "1/16 final");
roundMatchesTitle.set(16, "1/32 final");
roundMatchesTitle.set(32, "1/64 final");
