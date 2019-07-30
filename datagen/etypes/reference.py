
class Reference:
    def __init__(self, config):
        self.type = config["type"]
        self.dist = config["distribution"]
        self.vars = config["vars"]

        self.random = dist["random"] if "random" in dist else False
        self.unique = dist["unique"] if "unique" in dist else False
        self.reciprocal = dist["reciprocal"] if "reciprocal" in dist else False
        
        self.targetMin = self.vars["refMin"]
        self.targetMax = self.vars["refMax"]
        self.targetRange = range(targetMin, targetMax, 1)

        self.lastRef = self.refMin
        self.used = set()

    def next(self):
        ref = None
        if self.unique and not self.random:
            ref = self.lastRef
            self.lastRef += 1
            if ref > refMax:
                return None 
        elif self.random:
            if not self.unique:
                ref = random.choice(self.targetRange)
            else:
                ref = random.choice(self.targetRange-self.used)
                self.used.add(ref)
            return ref