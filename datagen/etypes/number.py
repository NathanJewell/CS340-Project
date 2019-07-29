import random
import decimal

class Number:
    def __init__(self, config):
        self.min = config["type"]["min"]
        self.max = config["type"]["max"]
        if self.max == 0:
            self.max = 1000000000
        self.step = config["type"]["step"] if "step" in config["type"] else 1

        dist = config["distribution"]
        self.random = dist["random"] if "random" in dist else False
        self.unique = dist["unique"] if "unique" in dist else False
        
        self.used = set()

        self.stepratio = 1 / self.step
        self.min *= self.stepratio
        self.max *= self.stepratio

    def next(self):
        num = random.randrange(self.min, self.max, 1)
        if self.unique:
            while num in self.used:
                num = random.randrange(self.min, self.max, self.step)
            self.used.add(num)
        
        lownum = num / self.stepratio
        if lownum == num:
            return int(lownum)
        return num