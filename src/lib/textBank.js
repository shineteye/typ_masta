/**
 * Practice text, organised by level.
 *
 * Beginner and intermediate are drills: short, repetitive, aimed at a specific
 * group of keys. Advanced is prose, where the point is reading ahead and
 * keeping rhythm over a longer passage.
 */

const BEGINNER = [
  "asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj asdf jkl; fdsa ;lkj",
  "sad lad fall dad half ask glass all salad flask lads add",
  "a sad lad had a flask; dad fills a glass; all lads ask dad",
  "jak lak dak fal jal kal sad fad lad had gal sal dal fall",
  "gh gh fgh jhg hjk ghj hgf kjh gash high sigh flash slash",
  "the she her had his was and for that they them this with",
  "he had a flat; she has the last half; they ask all the lads",
];

const INTERMEDIATE = [
  "qwer uiop qwer uiop poiu rewq poiu rewq quit wire your trip",
  "we type quick reports; you require proper output; quite right",
  "zxcv m,./ zxcv m,./ vcxz /.,m zoom move exact vocal maximize",
  "the box, the van, the zoo; move it once, move it exactly now",
  "Pack my box with five dozen liquor jugs. The quick brown fox jumps over the lazy dog.",
  "How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack.",
  "The wolves stopped in their tracks, sizing up the mother and her cubs. It had been over a week since their last meal and they were getting desperate.",
  "He hid under the covers hoping that nobody would notice him there. He heard footsteps coming down the hall and stop in front of the bedroom door.",
  "Josh had spent year after year accumulating the information. He knew it inside out, and if anyone was ever looking for an expert in the field, Josh would be the one to call.",
];

const ADVANCED = [
  "The tree missed the days the kids used to come by and play. It still wore the tire swing the kids had put up in its branches years ago although both the tire and the rope had seen better days. The tree had watched all the kids in the neighborhood grow up and leave, and it wondered if there would ever be a time when another child played and laughed again under its branches.",
  "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft serve ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
  "Brenda never wanted to be famous. While most of her friends dreamed about being famous, she could see the negative aspects that those who wanted to be famous seemed to ignore. The fact that you could never do anything in public without being mobbed and the complete lack of privacy was something that she never wanted to experience.",
  "It was so great to hear from you today and it was such weird timing, he said. This is going to sound funny and a little strange, but you were in a dream I had just a couple of days ago. I'd love to get together and tell you about it if you're up for a cup of coffee, he continued, laying the trap he'd been planning for years.",
  "He scolded himself for being so tentative. He knew he shouldn't be so cautious, but there was a sixth sense telling him that things weren't exactly as they appeared. It was that weird chill that rolls up your neck and makes the hair stand on end. He knew that being so tentative could end up costing him the job.",
  "It was their first date and she had been looking forward to it the entire week. She had her eyes on him for months, and it had taken a convoluted scheme with several friends to make it happen, but he'd finally taken the hint and asked her out. It goes without saying that things didn't work out quite as she expected.",
  "Sleep deprivation causes all sorts of challenges and problems. When one doesn't get enough sleep one's mind doesn't work clearly. Studies have shown that after staying awake for twenty-four hours one's ability to do simple math is greatly impaired. Driving tired has been shown to be as bad as driving drunk.",
  "I guess we could discuss the implications of the phrase meant to be. That is if we wanted to drown ourselves in a sea of backwardly referential semantics and other mumbo-jumbo. Maybe such a discussion would result in the determination that the phrase is exactly as meaningless as it seems to be.",
];

const BANK = {
  begin: BEGINNER,
  adv: INTERMEDIATE,
  pro: ADVANCED,
};

/**
 * Pick a passage for a level, avoiding `exclude` so a retry gives you something
 * new rather than the same text twice in a row.
 */
export function getPassage(levelId, exclude) {
  const pool = BANK[levelId] ?? BEGINNER;
  const candidates =
    pool.length > 1 ? pool.filter((text) => text !== exclude) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function passageCount(levelId) {
  return (BANK[levelId] ?? BEGINNER).length;
}

export default BANK;
