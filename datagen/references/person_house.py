import random 

def getRefList(counts):
    personRange = range(1, counts["person"]+1, 1)
    houseRange = range(1, counts["house"]+1, 1)

    houseRefs = []
    for person in personRange:
        house = random.choice(houseRange)
        houseRefs.append(house)
    
    return houseRefs
