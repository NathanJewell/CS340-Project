import random

def getRefList(counts):
    houseRange = range(1, counts["house"]+1, 1)
    addressRange = range(1, counts["address"]+1, 1)

    usedAddress = set()

    addressRefs = []
    for h in houseRange:
        add = random.choice(list(set(addressRange)-usedAddress))
        usedAddress.add(add)
        addressRefs.append(add)
    
    return addressRefs
