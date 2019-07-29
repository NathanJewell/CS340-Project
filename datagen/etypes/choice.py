import random 

class Choice:
    def __init__(self, config):
        self.type = config["type"]

        delimiter = self.type["del"] if "del" in self.type else " "
        self.choices = self.type["choices"].split(delimiter)

        self.dist = config["distribution"] if "distribution" in config else None
        if self.dist:
            self.random = self.dist["random"] if "random" in self.dist else False
            self.unique = self.dist["unique"] if "unique" in self.dist else False
            self.limit = self.dist["limit"] if "limit" in self.dist else 0
        
        self.used = []
    
    def next(self):
        return random.choice(self.choices)