import { World } from "../../types/levels";
import { WORLD1_ARRAYS } from "./world1-arrays";

export const WORLDS: World[] = [
  {
    id: "arrays",
    name: "Array Kingdom",
    description: "Master the fundamentals of array manipulation",
    icon: "apps-outline",
    color: "#FF6B6B",
    dataStructure: "array",
    levels: WORLD1_ARRAYS,
    isLocked: false,
    requiredStars: 0,
    isBossWorld: false,
  },
  {
    id: "strings",
    name: "String Valley",
    description: "Navigate the world of string manipulation",
    icon: "text-outline",
    color: "#4ECDC4",
    dataStructure: "string",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 10,
    isBossWorld: false,
  },
  {
    id: "stackQueue",
    name: "Stack & Queue Fortress",
    description: "LIFO and FIFO adventures await",
    icon: "layers-outline",
    color: "#45B7D1",
    dataStructure: "stack",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 25,
    isBossWorld: false,
  },
  {
    id: "linkedList",
    name: "Linked Realm",
    description: "Chain your way through node connections",
    icon: "link-outline",
    color: "#96CEB4",
    dataStructure: "linkedList",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 45,
    isBossWorld: false,
  },
  {
    id: "trees",
    name: "Tree Canopy",
    description: "Branch out into hierarchical structures",
    icon: "git-network-outline",
    color: "#FFEAA7",
    dataStructure: "tree",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 70,
    isBossWorld: false,
  },
  {
    id: "graphs",
    name: "Graph Nexus",
    description: "Connect the nodes, find the paths",
    icon: "share-social-outline",
    color: "#DDA0DD",
    dataStructure: "graph",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 100,
    isBossWorld: false,
  },
  {
    id: "dp",
    name: "DP Dimension",
    description: "The ultimate challenge - Dynamic Programming",
    icon: "cube-outline",
    color: "#FF8C00",
    dataStructure: "array",
    levels: [], // To be implemented
    isLocked: true,
    requiredStars: 140,
    isBossWorld: true,
  },
];

export function getWorld(worldId: string): World | undefined {
  return WORLDS.find((w) => w.id === worldId);
}

export function getLevel(worldId: string, levelId: string) {
  const world = getWorld(worldId);
  return world?.levels.find((l) => l.id === levelId);
}

export function getNextLevel(worldId: string, currentLevelId: string) {
  const world = getWorld(worldId);
  if (!world) return null;

  const currentIndex = world.levels.findIndex((l) => l.id === currentLevelId);
  if (currentIndex === -1 || currentIndex >= world.levels.length - 1) {
    return null;
  }

  return world.levels[currentIndex + 1];
}

export function isWorldUnlocked(worldId: string, totalStars: number): boolean {
  const world = getWorld(worldId);
  return world ? totalStars >= world.requiredStars : false;
}
