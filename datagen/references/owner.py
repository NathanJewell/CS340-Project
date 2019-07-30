import random

def getRefList(counts):
    numDeeds = counts["owner"]

    minHouses = 0
    maxHouses = 3

    peopleRefs = range(1, counts["person"], 1)
    houseRefs = range(1, counts["house"], 1)

    deeds = []
    for ct in range(numDeeds):
        p = random.choice(peopleRefs)
        refs = []
        pn = random.randrange(minHouses, maxHouses, 1)
        for n in range(pn):
            refc = p
            while refc == p:
                refc = random.choice(houseRefs)
            deeds.append((p, refc))
    
    return list(set(deeds))