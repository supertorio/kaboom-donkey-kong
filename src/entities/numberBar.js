import k from "../game";
import { clamp } from "../utils/math";

export const NUMBER_BAR_TYPE = {
  TIMER: 0,
  SCORE: 10,
};

const getNumberDigits = (num) => {
  return num
    .toString()
    .split("")
    .map((n) => parseInt(n));
};

export default function numberBar(startValue, barType, pos) {
  this.value = startValue;
  this.numberSprites = [];
  this.numDigits = getNumberDigits(startValue);
  this.numberSpriteWidth = 11;
  this.spriteSpacing = 5;

  for (let i = 0; i < this.numDigits.length; i++) {
    const nextSpriteOffset = this.numberSpriteWidth + this.spriteSpacing;
    const sprite = k.add([
      k.sprite("numbers"),
      k.pos(pos.x - i * nextSpriteOffset, pos.y),
      "numberDigit",
    ]);
    // Since we draw the sprites from right to left, we have to adjust the
    // number frames in reverse. We unshift them onto the array in state so
    // that we can address them left to right on update.
    const frameNumber = this.numDigits[this.numDigits.length - 1 - i] + barType;
    sprite.frame = clamp(0, 19, frameNumber);
    this.numberSprites.unshift(sprite);
  }

  this.updateNumber = (nextNumber) => {
    this.numDigits = getNumberDigits(nextNumber);
    for (let i = 0; i < this.numDigits.length; i++) {
      const frameNumber = this.numDigits[i] + barType;
      this.numberSprites[i].frame = clamp(0, 19, frameNumber);
    }
  };
}
