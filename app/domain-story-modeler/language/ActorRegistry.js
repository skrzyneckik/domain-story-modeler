import { registerIcon } from './iconRegistry';
import { getNameFromType } from './naming';
import { all_icons } from './all_Icons';
import { ACTOR } from './elementTypes';

'use strict';

var ActorTypes = require('collections/dict');
var actorRegistry = new ActorTypes();

export function getActorRegistry() {
  return actorRegistry;
}

export function getActorRegistryKeys() {
  return actorRegistry.keysArray();
}

export function allInActorRegistry(actors) {
  var allIn = true;
  actors.forEach(actor => {
    if (!actorRegistry.has(actor.type)) {
      allIn = false;
    }
  });
  return allIn;
}

export function registerActors(actors) {
  var allTypes=new ActorTypes();
  allTypes.addEach(all_icons);

  actors.forEach(actor => {
    if (!actorRegistry.has(actor.type)) {
      const name = getNameFromType(actor.type);
      registerActor(actor.type, allTypes.get(name));
      registerIcon(actor.type, 'icon-domain-story-' + name.toLowerCase());
    }
  });
}

export function registerActor(name, src) {
  if (!name.includes(ACTOR)) {
    name = ACTOR + name;
  }
  actorRegistry.set(name, src);
}

export function getActorSrc(name) {
  return actorRegistry.get(name);
}

export function initActorRegistry(actors) {
  var allTypes=new ActorTypes();
  allTypes.addEach(all_icons);

  for (var i=0; i < actors.length; i++) {
    const key = ACTOR + actors[i];
    actorRegistry.add(allTypes.get(actors[i]), key);
  }

  actorRegistry.keysArray().forEach(type => {
    var name = getNameFromType(type);
    registerIcon(type, 'icon-domain-story-' + name.toLowerCase());
  });
}