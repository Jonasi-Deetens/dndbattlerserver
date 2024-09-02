interface FieldType {
  type: string;
  isRoof: boolean;
  isFloor: boolean;
  isDestructible: boolean;
  passable: boolean;
  seeThrough: boolean;
}
type FieldTypes = Record<string, FieldType>;

export const fieldTypes: FieldTypes = {
  grass: {
    type: 'grass',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  path: {
    type: 'path',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'grass-2': {
    type: 'grass-2',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  water: {
    type: 'water',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-bottom': {
    type: 'water-bottom',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-top': {
    type: 'water-top',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-left': {
    type: 'water-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-right': {
    type: 'water-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-horizontal': {
    type: 'water-horizontal',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-vertical': {
    type: 'water-vertical',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-bottom-left': {
    type: 'water-corner-bottom-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-bottom-right': {
    type: 'water-corner-bottom-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-top-left': {
    type: 'water-corner-top-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-top-right': {
    type: 'water-corner-top-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-link-bottom-left': {
    type: 'water-corner-link-bottom-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-link-bottom-right': {
    type: 'water-corner-link-bottom-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-link-top-left': {
    type: 'water-corner-link-top-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-corner-link-top-right': {
    type: 'water-corner-link-top-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-top-right': {
    type: 'water-link-top-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-top-left': {
    type: 'water-link-top-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-bottom-right': {
    type: 'water-link-bottom-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-bottom-left': {
    type: 'water-link-bottom-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-all': {
    type: 'water-all',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-bottom-link-left': {
    type: 'water-bottom-link-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-bottom-link-right': {
    type: 'water-bottom-link-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-bottom-links': {
    type: 'water-bottom-links',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-left-link-bottom': {
    type: 'water-left-link-bottom',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-left-links': {
    type: 'water-left-links',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-left-link-top': {
    type: 'water-left-link-top',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-corner-bottom-left': {
    type: 'water-link-corner-bottom-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-corner-bottom-right': {
    type: 'water-link-corner-bottom-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-corner-top-left': {
    type: 'water-link-corner-top-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-link-corner-top-right': {
    type: 'water-link-corner-top-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-all': {
    type: 'water-links-all',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-bottom': {
    type: 'water-links-bottom',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-diagonal-down': {
    type: 'water-links-diagonal-down',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-diagonal-up': {
    type: 'water-links-diagonal-up',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-left': {
    type: 'water-links-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-right': {
    type: 'water-links-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-links-top': {
    type: 'water-links-top',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-right-link-bottom': {
    type: 'water-right-link-bottom',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-right-links': {
    type: 'water-right-links',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-right-link-top': {
    type: 'water-right-link-top',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-top-link-left': {
    type: 'water-top-link-left',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-top-link-right': {
    type: 'water-top-link-right',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-top-links': {
    type: 'water-top-links',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-top-end': {
    type: 'water-top-end',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-left-end': {
    type: 'water-left-end',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-right-end': {
    type: 'water-right-end',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  'water-bottom-end': {
    type: 'water-bottom-end',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  wall: {
    type: 'wall',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: false,
    seeThrough: false
  },
  mountain: {
    type: 'mountain',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: false,
    seeThrough: false
  },
  bush: {
    type: 'bush',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: false,
    seeThrough: true
  },
  tree: {
    type: 'tree',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: false,
    seeThrough: false
  },
  trap: {
    type: 'trap',
    isRoof: false,
    isFloor: true,
    isDestructible: true,
    passable: true,
    seeThrough: true
  },
  ceiling: {
    type: 'ceiling',
    isRoof: true,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  floor: {
    type: 'floor',
    isRoof: false,
    isFloor: true,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'top-left-corner': {
    type: 'top-left-corner',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'top-right-corner': {
    type: 'top-right-corner',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'bottom-left-corner': {
    type: 'bottom-left-corner',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'bottom-right-corner': {
    type: 'bottom-right-corner',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: true
  },
  'bottom-wall': {
    type: 'bottom-wall',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: false
  },
  'top-wall': {
    type: 'top-wall',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: false
  },
  'left-wall': {
    type: 'left-wall',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: false
  },
  'right-wall': {
    type: 'right-wall',
    isRoof: false,
    isFloor: false,
    isDestructible: false,
    passable: true,
    seeThrough: false
  }
};
