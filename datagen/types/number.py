import random

class Number:
    def __init__(self, config):
        self.min = config["type"]["min"]
        self.max = config["type"]["max"]
        self.step = config["type"]["step"] if "step" in config["type"] else 1

        dist = config["distribution"]
        self.random = dist["random"] if "random" in dist else False
        self.unique = dist["unique"] if "unique" in dist else False
        
        self.used = set()

    def next(self):
        num = self.randrange(self.min, self.max, self.step)
        if self.unique:
            while num in self.used:
                num = self.randrange(self.min, self.max, self.step)
            self.used.add(num)
        return num