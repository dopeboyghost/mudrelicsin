export type ArtifactRecord = {
  number: string;
  name: string;
  classification: string;
  origin: string;
  account: string;
  properties: string;
  note: string;
};

export const records: ArtifactRecord[] = [
  {
    number: "ARTIFACT //001",
    name: "SUNKEN PORTRAIT",
    classification: "Submerged likeness / sealed vessel",
    origin:
      "Pulled from a silt drawer marked only with a waterline. The face was already looking out when the lid was forced.",
    account:
      "The jar keeps a portrait from drying out. Whoever sat for it was painted after the room flooded, or the paint remembered water on its own. The features soften at the edges, as if the sitter kept turning toward a door that never opened. The cavity is ordinary enough for small things. That is a convenience, not the point. Leave a ring in overnight and the face can look more finished by morning: a trick of the light, or a reason to stop storing jewellery in a head.",
    properties: "A stash jar. The face is the fiction. Nothing inside it changes.",
    note: "It was watching before the lid came off.",
  },
  {
    number: "ARTIFACT //002",
    name: "THE EYE VOID",
    classification: "Binocular reliquary / ring well",
    origin:
      "Found nested in a coil of costume jewellery behind a shuttered stall. Both eyes were open. The rings were not its own.",
    account:
      "Two green eyes sit on a short neck above a shell like oil on black water. The hollow is the working part: bands and hoops settle into it and stay. The eyes aim slightly apart, one seeming to keep the rings, the other to keep you. Early notes called it a dish. That word was crossed out after a night clerk swore the shell warmed on the side facing the door. It does not. Sunken Portrait stores a whole likeness. This one stores only what the likeness would have worn.",
    properties: "A ring dish. It does not heat, blink, or hold anything the cavity cannot physically take.",
    note: "Count your rings when you take them back.",
  },
  {
    number: "ARTIFACT //004",
    name: "THREE HORNED SENTINEL",
    classification: "Threshold guardian / fire sleeve",
    origin:
      "Recovered from a stairwell where three scratches had been cut into the plaster at head height. The case was sitting on the third.",
    account:
      "Purple face, a gold ring like a collar, and three horns that do not match. One leans. One is blunt. One looks added later, as if a watchman failed a test and was given another point to make. It sleeves an ordinary flame, which is rude and appropriate. Guardians in the old files are meant to bar a door. This one only stands over a thumb. Cyclopean Watcher keeps a single aim. The Sentinel looks as if it has already been corrected twice and expects a third argument.",
    properties: "A lighter case. The horns are sculpture. The flame is the lighter's.",
    note: "Three horns means the record was revised twice.",
  },
  {
    number: "ARTIFACT //005",
    name: "JADE BANDIT",
    classification: "Petty idol / one-eyed sleeve",
    origin:
      "Turned up in a coat that was not supposed to have an inside pocket. The pocket had been sewn shut from the outside.",
    account:
      "A green face under a red cap, one gold eye, a blue mouth pleased with a theft it will not name. It was filed with the guardians for an afternoon, then moved. They face forward. This one is angled toward a second exit. The gold eye is the only part that catches light cleanly. The rest is too smooth, like a story told to too many night clerks. It carries a flame and looks as if it does not need one. Abyssal Tendrils holds chains in the open. The Bandit is the reason chains go missing before they get there.",
    properties: "A lighter case. It does not take objects from a room.",
    note: "If something small is missing, start with the cap.",
  },
  {
    number: "ARTIFACT //006",
    name: "BIO HAZARD MAW",
    classification: "Containment dish / open mouth",
    origin:
      "Logged after a purple residue was found on a worktable that had been wiped twice. The dish was the only thing still wet.",
    account:
      "A green basin holds a purple pool and a mouth of red teeth. The throat is yellow, the colour of warning labels and of old fruit. Purple hands grip the place a lighter can sit, so the object looks like both the hazard and the person told to carry it. Nothing in the sample was toxic. The file kept the word. The teeth are uneven in a way that feels bitten rather than arranged. Ash rests in the pool like any other dish. Venom shows one tongue. This mouth looks as if several appetites agreed to share a rim, which is We Are Venom's argument made green.",
    properties: "Ashtray, incense rest, or lighter stand. The purple does not consume what you put in it.",
    note: "Do not taste the purple. That warning is older than the object.",
  },
  {
    number: "ARTIFACT //007",
    name: "MIRROR MIRROR ON THE WALL",
    classification: "Reflexive sleeve / chain fetish",
    origin: "Lifted from a dressing room whose mirrors had all been turned to the wall. This one had not.",
    account:
      "Red, gold, blue, and purple crowd a sleeve set with small mirrors and a silver chain. The mirrors are too few to show a whole face and too many to ignore. Each returns a scrap: an eye, a collar, the chain itself. Hung once toward a blank board, the glass seemed darker than the paint. Nobody repeated the test. The chain suggests it was worn, or wanted to be. Ghostface is a scream with nothing behind it. These fragments insist a person is still in the room, just never all at once.",
    properties: "A lighter case set with mirror pieces. They reflect what is actually in front of them.",
    note: "Ask it nothing you would mind hearing twice.",
  },
  {
    number: "ARTIFACT //009",
    name: "COSMIC CARNAGE",
    classification: "Stacked omen / ringed sleeve",
    origin:
      "Found in a crate of festival bulbs, none of which matched its sockets. The red eye was already lit by a reflection.",
    account:
      "Pink rings climb the case until they run out of case. A red eye sits in the stack. Yellow dots read first as stars, then as a count somebody stopped keeping. The rings could be orbits or restraints. Orbits wander. These do not. The eye sits off center, which bothers anyone who likes a diagram. It sleeves a flame the way a flare sleeves a message: briefly, and for whoever happens to be looking up. Crimson Oracle counts in threes. This one lost count on purpose.",
    properties: "A lighter case. The dots are paint, not a working signal.",
    note: "The dots are not a map. They are what is left of one.",
  },
  {
    number: "ARTIFACT //010",
    name: "SPLITTING HEADACHE",
    classification: "Opened cranium / screw-eyed sleeve",
    origin: "Catalogued after it rolled out of a toolbox. The screws in its eyes matched none of the drivers.",
    account:
      "The head is yellow and wrong in the way of a joke told too close to the ear. Screw heads sit where eyes should focus. A red brain bulges at the side, unhidden and unashamed. The tongue is out, which nobody here will call playful. The screws are sculpture. They were never hardware. That red matches the little warning of a live nozzle, either by accident or as the only instruction the face intends. Melted Goblin lost its shape to heat. This one seems to have opened itself to show the thought that caused the trouble.",
    properties: "A lighter case. The screws do not turn. The brain is not a compartment.",
    note: "Stop trying to tighten the eyes.",
  },
  {
    number: "ARTIFACT //011",
    name: "SEA MUTANT",
    classification: "Littoral error / starred sleeve",
    origin:
      "Washed into the intake notes from a bag of dry packing that smelled faintly of rust and salt. No water came with it.",
    account:
      "An orange shell, two eyes that cannot agree on a direction, a blue starfish where a badge would sit, and a red back like a flare left in the sun. It is light in the hand, which earned the word \"hollow\" from one clerk and \"not finished drowning\" from another. The starfish grips rather than decorates. The eyes sit low, the look of something that lived under a pier and learned faces from the knees down. Eye Void keeps a clean pair of greens above a well. This one never made it out of the shallows, and it pocketed a flame on the way.",
    properties: "A lighter case. It does not hold water, and the starfish is fixed.",
    note: "If it smells like rain, check the ceiling anyway.",
  },
  {
    number: "ARTIFACT //012",
    name: "VOODOO VORTEX",
    classification: "Reversible fetish / two-faced sleeve",
    origin: "Entered the archive face-up. By morning it was face-down, and nobody had signed the handling slip.",
    account:
      "One side stacks two eyes in a gold ring, red at the center, a target that learned to look back. The other is a yellow skull, a red brain, and a black snake making a poor secret of itself. The unsigned slip is the whole haunting: face-up at intake, face-down at dawn, no hand on the log. Turning it still feels less like rotating a case than like being corrected. It remains one relic because the seam will not admit two. Splitting Headache shows the brain on purpose. Here the brain is what you get for looking at the wrong side.",
    properties:
      "A lighter case with two sculpted faces. It does not turn itself. The flame is the lighter's, from the nozzle, not from either eye.",
    note: "Do not store it between two mirrors.",
  },
  {
    number: "ARTIFACT //013",
    name: "TOXIC OVERGROWTH",
    classification: "Unfinished growth / metal-eating sleeve",
    origin: "Cut off a pipe that was not in the building plans. The pipe ended. The growth did not want to.",
    account:
      "Brown and blue matter has gone over the lighter the way ivy goes over a sign it disagrees with. The metal is still there if you look unkindly. The surface is not rotten. It is busy. A shine in the cracks reads as damp and is not. It spent a month in a dry drawer. A clerk thought the blue had crept. The measure said it had not. Toxic Melt is the same accident after it cooled. This one still looks mid-decision. The nozzle remains clear, which is either clever or the last part that remembers being a tool.",
    properties: "A lighter case. It does not grow, drip, or eat the metal underneath.",
    note: "Measure it if you must. It will not have moved.",
  },
  {
    number: "ARTIFACT //014",
    name: "BLOODLUST BITE",
    classification: "Many-eyed appetite / red sleeve",
    origin: "Recovered from a red cloth bundle tied with wire. The wire had tooth marks that did not match the teeth.",
    account:
      "A blood-red body, small horns, white teeth, and more eyes than a face needs if its only job is to be seen. The eyes are not arranged for beauty. They are arranged so that setting the case down does not end the looking. The bite is the honest part. The rest is surveillance with a humour that did not survive filing. Eye Void watches as a pair. The Cyclopean Watcher watches once. This one refuses to pick a direction, which is its own kind of hunger.",
    properties: "A lighter case. The eyes are paint. Ash from it is ordinary ash.",
    note: "Covering the eyes is a gesture. It will not change the sculpture.",
  },
  {
    number: "ARTIFACT //016",
    name: "PARASITE BLOOM",
    classification: "Host dish / ocular growth",
    origin:
      "Lifted from a blue ceramic that had cracked around it, as if the dish had tried to become a larger dish and failed.",
    account:
      "Orange tentacles have taken a blue basin and kept a gold eye as proof of terms. The eye is not in a face. It is in the bloom, so the whole piece feels like one organism that learned the shape of a plate because plates get left on tables. A mouth in the dish will hold a lighter. Ash and incense sit where you put them. The tentacles do not travel. They only move the felt center of a room. Cups get set beside it and then moved, which is the nearest thing it has to a reputation. The Eye Void's greens look outward. This gold one looks down into what it is holding.",
    properties: "Ashtray, lighter stand, or incense holder. The eye does not follow movement.",
    note: "The eye was gold before anyone thought of gilding it.",
  },
  {
    number: "ARTIFACT //017",
    name: "TOXIC MELT",
    classification: "Porous residue / coral sleeve",
    origin:
      "Chipped off a windowsill above a sink that had not been used for washing. The sink was full of the same pink.",
    account:
      "A porous crust of pink, green, and black, more reef than case, more melt than reef. A nail gets the dull answer of something that has already finished cooling. The holes are irregular. Some go nowhere. One, near the nozzle, goes exactly where a flame needs to leave. Overgrowth is the version still pretending to spread. This is the version that stopped, and kept the colours of the stopping. Nothing drips. The name was a clerk's guess that colour meant hazard. The colour stayed. The hazard never introduced itself.",
    properties: "A lighter case. The pores are surface. It does not seep or re-melt when used.",
    note: "Do not soak it to see what it was.",
  },
  {
    number: "ARTIFACT //020",
    name: "FLOWER TRINITY",
    classification: "Threefold offering / vined sleeve",
    origin:
      "Found tied to a railing with green florist wire. The wire was newer than the flowers, which were not real and not fresh.",
    account:
      "Three red flowers share one green vine on a blue sleeve. They are not a bouquet. A bouquet can lose a stem and remain a gesture. These three seem to be the whole agreement. The vine crosses the case as if it grew during a ceremony nobody stayed to finish. The blue is cloth left in a dark room, not sky. The flowers cannot wilt. They were never alive. Crimson Nirvana is the same red opened into a holder, after the vow. This one still carries the three witnesses, and the flame sits under them rather than in their throats.",
    properties: "A lighter case. The vine and flowers are fixed sculpture.",
    note: "Do not pick a favourite. That was the entire instruction.",
  },
  {
    number: "ARTIFACT //022",
    name: "MELTED GOBLIN",
    classification: "Collapsed mascot / silver-eyed sleeve",
    origin: "Came in clinging to a black wig that was not attached to it. The wig was returned. The face was not grateful.",
    account:
      "The green has slid. The hair stays black and too intact, a wig that survived the face it was bought for. Silver eyes do not match the melt. They look installed after the damage, the way a shop replaces the bulbs and leaves the crack. The red mouth is still trying to grin and has become a spill. It does not read as a creature born ugly. It reads as a cheerful thing that met heat and kept the smile out of spite. Splitting Headache opened its skull on purpose. The Goblin simply failed to hold a shape, and resents the comparison.",
    properties: "A lighter case. The hair is part of the sculpture, not a removable wig.",
    note: "The hair was never its hair. It kept it anyway.",
  },
  {
    number: "ARTIFACT //025",
    name: "CURSED FINGER",
    classification: "Pointing remain / coiled dish",
    origin:
      "Recovered from a gold-painted bowl wrapped in red cord. The cord was tied in a knot used for packages, not rituals. The finger did not care.",
    account:
      "Red coils wrap a gold dish. An orange finger rises from them, red at the tip, aimed at no one and therefore at whoever stands nearest. Turn the bowl and the finger turns with it. People still swear it finds them. That note got a clerk teased, then copied into the permanent file the third time someone refused to sit on its left. Ash, a stick, or a lighter can sit in the bowl. The finger is not a handle. Using it as one feels like agreeing to a signature the coils already made. Bio Hazard Maw bites. This one only accuses.",
    properties:
      "A dish for ash, incense, or a lighter. The finger does not track anyone. It points where it was sculpted to point.",
    note: "If it seems aimed at the door, you are standing in front of the door.",
  },
  {
    number: "ARTIFACT //028",
    name: "CRAWLING SUIT",
    classification: "Abandoned wearer / limb dish",
    origin: "Found on a red plate in a dressing cupboard. The suit was occupied by nothing the size of a person.",
    account:
      "A small red-and-blue body crosses a red dish on black legs, too many and too sure. A blue rim keeps the scene from spilling, like a stage mark. The back will hold a lighter, so the crawl looks like a job: cross the plate, bring the flame, do not discuss the wearer. There is no wearer. The suit is the whole animal, or the animal left during the act of becoming one. Voodoo Vortex hides a snake on its far side. This one never bothered to hide the legs. In photographs the joints look newly shifted. They are the same joints. The light is what moved.",
    properties: "Ashtray, lighter stand, or incense holder. The figure is fixed to the dish.",
    note: "It is not asking to be helped to the other side.",
  },
  {
    number: "ARTIFACT //033",
    name: "CYCLOPEAN WATCHER",
    classification: "Single-sight warden / horned sleeve",
    origin:
      "Taken from a niche above a door that had been bricked at the height of the eye and not at the height of the horns.",
    account:
      "Black and gold, one large eye, red horns, a snout that treats smelling as part of the duty. A single eye cannot pretend to watch the room while watching you. The gold only outlines, the way a rule outlines, and the black does the rest. The horns are red enough to look fresh and old enough to be paint. It holds its flame at the height where a minor guardian would have kept a lamp, after the temple work ran out. The Sentinel was revised until it had three horns. This one was trusted with one eye and told not to blink. The file has never found a lid.",
    properties: "A lighter case. The eye has no mechanism. It does not open, close, or glow.",
    note: "Do not stand in front of the snout unless you mean to be the subject.",
  },
  {
    number: "ARTIFACT //034",
    name: "VENOM",
    classification: "Black effusion / tongued sleeve",
    origin: "Logged from a glove compartment that contained no gloves. The tongue had left a pale mark on the manual.",
    account:
      "A black body, white eyes, bared teeth, and a tongue that has already decided to be outside. It is not the mask of a known saint or a known monster. It is the face a stain would wear if it wanted to be recognised in a crowd. The eyes are the only clean paint, which makes them feel quoted from somewhere else. The teeth are small and serious. The flame is plain, a disappointment if you expected the tongue to do the work. We Are Venom is the same mouth after it lay down and became a plate. This one is still on its feet, mid-sentence and mid-bite.",
    properties: "A lighter case. The tongue is not a wick, and it leaves no residue of its own.",
    note: "The pale mark on the manual was never matched to the paint.",
  },
  {
    number: "ARTIFACT //035",
    name: "GHOSTFACE",
    classification: "Screaming shell / borrowed mask",
    origin: "Found wrapped in a black sleeve inside a white one, as if two people had tried to hide it from each other.",
    account:
      "The white face is all mouth and absence, a scream shaped like a tool rather than a feeling. The shell around it is black, a hood that matches no coat in the building. A scream that famous is usually a costume. This one has the weight of a costume that started arriving before the person. The nozzle sits where a throat would be, unkind and accurate. Hellfire Mask grins with horns and gold, delighted to be seen. This face would rather the seeing hurt. The expression does not change when the flame is lit. People keep expecting it to.",
    properties:
      "A lighter case. The scream is a sculpted mask. The flame comes from the lighter nozzle, not from the mouth.",
    note: "If you think you heard it, you were listening to your own breathing.",
  },
  {
    number: "ARTIFACT //036",
    name: "WE ARE VENOM",
    classification: "Collective mouth / tooth basin",
    origin: "Recovered from a table set for one. The plate was this. The cutlery was missing.",
    account:
      "A black mouth, white teeth, a red tongue with nowhere to go but across the dish. \"We\" is the problem the file cannot settle. There is one mouth. The plural is a joke, a congregation, or several small hungers that agreed to share a plate. Ash sits between the teeth because the teeth are a rim, not because they chew. A lighter can rest on the tongue the way an offering rests after it has already been accepted. Venom still has somewhere to walk. This is what it looks like when that walk ends at the center of a table and the room gets quieter without being asked.",
    properties: "An ashtray. It does not chew, swallow, or stain beyond ordinary ash.",
    note: "Do not answer if the name on the card is suddenly plural.",
  },
  {
    number: "ARTIFACT //037",
    name: "ABYSSAL TENDRILS",
    classification: "Deep fastening / chain stand",
    origin:
      "Hauled up in a tangle of costume chains from a crate labelled PARTS. The label had been crossed out three times.",
    account:
      "Black, red, and gold limbs twist into a stand, and the chains on them are not a necklace's kind of decoration. They are how the thing seems to hold on. Watches and heavier chains can be hung from it, and they look detained rather than displayed. The colours are only abyssal if you have never seen a stage light: red for the heat, gold for a signature, black for the rest of the story. It keeps. It does not burn. Jade Bandit is the petty version of the same instinct, a single pocket and one gold eye. This one has limbs enough to keep a whole dressing room.",
    properties: "A stand for chains, watches, and similar objects. Nothing on it locks by itself.",
    note: "Unclasp only what you are prepared to ask for twice.",
  },
  {
    number: "ARTIFACT //038",
    name: "THE STRANGE GENTLEMAN",
    classification: "Sealed eccentric / lidded head",
    origin: "Arrived with a calling card that had no name, only a hat drawn in gold ink. The lid matched the drawing.",
    account:
      "Purple head, blue hair, green eyes, a pink mouth, and a gold lid that is a hat and also the way in. He is a jar. That fact feels like gossip about a person who would sue. The face is too composed for a container and too useful for a portrait. What goes inside is ordinary storage. The gold is brighter than the rest of him, a small vanity, or a lid that wants to be seen doing its job. Sunken Portrait drowned its sitter and kept the likeness. The Gentleman seems to have survived the sitting and charged for the hat.",
    properties: "A stash jar. The lid opens because it is a lid. He does not keep anything you did not put in.",
    note: "Lift the hat. Skip the apology. Do not forget to close it.",
  },
  {
    number: "ARTIFACT //039",
    name: "FIERY WORM",
    classification: "Cinder larva / gilded sleeve",
    origin: "Found curled around a pink lighter in a tin of spent matches. The matches were cold. The worm looked fed.",
    account:
      "Red and gold segments ride a black body, a worm that confused jewellery with appetite. The pink lighter at the center is the human part: a bright cheap flame dressed by something that thinks in embers. The worm does not circle the way trim circles. It grips, segment by segment, as if the lighter tried to leave and was talked out of it. Warm light makes the red look wetter. That is paint in the light, not a meal in progress. Toxic Melt cooled into a crust. This one stayed in the shape of the thing that was still hungry.",
    properties: "A lighter case. Use does not soften, feed, or alter the sculpture.",
    note: "Let the lighter cool before you decide the worm has finished.",
  },
  {
    number: "ARTIFACT //040",
    name: "CRIMSON ORACLE",
    classification: "Triple gaze / leaf-bound sleeve",
    origin: "Taken from a red cloth roll tied with a green stem that was real for about a day and then was not.",
    account:
      "Three eyes occupy a red sleeve, none quite aimed at the same future. Green leaves interrupt the red and keep it from becoming only a warning. Cheaper oracles speak. This one offers a flame and lets you misunderstand it. The eyes sit like a count: what you meant, what you said, what the room heard. Flower Trinity has three witnesses and no face. Here the witnesses are the face. The leaves are the part least trusted in the file. Leaves imply a season, and a lighter should not have one. It lights regardless. The eyes do not close to mark an answer.",
    properties: "A lighter case. The eyes do not move or answer. The leaves are sculpture.",
    note: "If all three seem to agree, check the question, not the relic.",
  },
  {
    number: "ARTIFACT //041",
    name: "BLUE SCARAB",
    classification: "Pressed insect / violet sleeve",
    origin:
      "Found stuck to the inside of a black case lined in purple. The lining had a scarab-shaped fade, older than the beetle on top.",
    account:
      "A blue scarab sits on a black and purple sleeve as if it chose the cloth and the cloth agreed to become a lighter. The shell is the blue of a thing that should have stayed in a tomb painting and instead ended in a pocket. There is no inscription. That is both a relief and a suspicion. Other people's scarabs roll a sun. This one rolls nothing. It pins an insect to a tool for fire, a reversal rude enough to feel chosen. The purple shows at the edges like a coat lining you were not supposed to open. Cosmic Carnage stacks false stars. The scarab refuses the sky entirely.",
    properties: "A lighter case. The scarab is fixed. It does not crawl, click, or open.",
    note: "Do not ask what it buried. The answer is not in the sleeve.",
  },
  {
    number: "ARTIFACT //042",
    name: "CRIMSON NIRVANA",
    classification: "Slow-burn bloom / incense throne",
    origin:
      "Recovered from a green base that had scorched a circle into a table. The flower was unburned. The table was not.",
    account:
      "A red flower opens around a gold center on a green foot. It looks like a rite simplified until only the pretty part remained. The gold takes the incense stick. Smoke can make the red look deeper. That is light and soot, not attention from the petals. Nirvana is a large word for a small holder. It stayed because \"ashtray with opinions\" was worse, and the flower had already survived Flower Trinity's three witnesses to become a single mouth for smoke. It does not promise calm. It offers a minute in which the room smells like a decision. Only the green foot looks willing to be furniture.",
    properties:
      "An incense holder. Any scorch belongs to a past table, not to a power of the flower. Ash stays where a burning stick leaves it.",
    note: "Let the stick finish. Blowing it out only makes the worse smell.",
  },
  {
    number: "ARTIFACT //043",
    name: "BLUBBERTOOTH",
    classification: "Single-eyed biter / soft armour",
    origin:
      "Came out of a blue plastic bag inside a yellow one. Neither bag had been sold in this city. The teeth had pink in the seams.",
    account:
      "One eye, a yellow tongue, pink teeth, a blue body that looks inflated and is not. The mouth is built to bite and then to grin about it. The eye is too calm for the teeth. That mismatch is the character: violence worn with the expression of someone watching a mild sport. The bite is theatrical unless a ring catches on the sculpted teeth, which is carpentry, not hunger. Bloodlust Bite has too many eyes to commit. This one committed to a single look and a bad mouth. Handlers with jewellery have learned to use the other hand. The file calls that superstition. It is also practical.",
    properties: "A lighter case. The teeth can snag a ring. They do not bite on their own.",
    note: "The eye is not the end that catches.",
  },
  {
    number: "ARTIFACT //044",
    name: "LITTLE HELLSPAWN",
    classification: "Minor infernal / pocket devil",
    origin: "Found in a child's lost-and-found box that the school insisted had been empty since the term before.",
    account:
      "Red face, blue horns, green eyes, a yellow snout, a pink tongue. Small enough to be a joke, detailed enough to have been dismissed from a larger hell. The features refuse one mood. The horns say threat, the tongue says taste, the eyes say it has already met the person who will pretend not to mind. As a lighter it is almost courteous. The flame is neat. The face is not. The word \"little\" stays in the name so nobody promotes it. Hellfire Mask is the version that got the gold and the audience. This one still fits in a pocket and resents the demotion.",
    properties: "A lighter case. It has no hearing and no rank. The flame is a normal lighter flame.",
    note: "\"Cute\" is a description of the size, not a name it answers to.",
  },
  {
    number: "ARTIFACT //045",
    name: "THE DOOM RELIC",
    classification: "Hooded memento / beaded sleeve",
    origin: "Taken from a green hood hung on a nail that had no corresponding hook on the other side of the wall.",
    account:
      "A white skull sits inside a green hood, yellow beads at the throat like a count of something already lost. An orange lighter is the living part, offensively bright against the bone. Doom here is rarely a trumpet. It is a hood pulled up indoors. The skull is not screaming. It is finished, which is quieter. The beads might be a prayer, or a tally of nights the hood was worn by someone who still had a face. Little Hellspawn is still campaigning. Hellfire Mask is still grinning. This one has already given it up, and lights when asked with the patience of a thing that expects the asking to continue.",
    properties: "A lighter case. The hood and beads are sculpture. The orange body is the lighter, not a separate fire.",
    note: "Leave the hood up. The skull is not improved by introduction.",
  },
  {
    number: "ARTIFACT //046",
    name: "HELLFIRE MASK",
    classification: "Horned grin / gilded muzzle",
    origin:
      "Last object in a crate that had been nailed shut from the inside, according to a note that the archive has chosen to call a joke.",
    account:
      "Red and gold, horns that catch the light before the face does, and green teeth that make the gold look like a mistake someone rich insisted on. The grin is wide enough to be a welcome and shaped enough to be a trap. Hellfire here is not a landscape. It is a mood pressed onto a sleeve, after which an ordinary flame looks guilty of more than it did. Ghostface screams and hides in black. This one arrives with gilt horns so you can see it coming. The teeth are the colour of something that should not be in a mouth and is proud of the job. People photograph it and crop the grin. The file calls that a flinch.",
    properties: "A lighter case. The horns do not heat. Green teeth do not stain a flame.",
    note: "Gold on the horns is not mercy. It is how you see them coming.",
  },
];

const byNumber = new Map(records.map((record) => [record.number, record]));

export function recordFor(number: string, name: string) {
  const record = byNumber.get(number);
  if (!record || record.name !== name) return undefined;
  return record;
}
