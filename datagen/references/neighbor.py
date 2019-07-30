import random

def getRefList(counts):
    numPeople = counts["person"]

    start = 1
    end = numPeople+1
    refList = range(start, end, 1)

    minNeighbors = 1
    maxNeighbors = 10

    neighbors = []
    for ct in range(counts["neighbor"]):
        p = random.choice(refList)
        refs = []
        pn = random.randrange(minNeighbors, maxNeighbors, 1)
        for n in range(pn):
            refc = p
            while refc == p:
                refc = random.choice(refList)
            neighbors.append((p, refc))
    
    unique = list(set(neighbors))
    recip = [(b, a) for a, b in unique]
    return unique + recip
        
        



