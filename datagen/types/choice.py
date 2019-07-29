import random 

class Choice:
    def __init__(self, config):
        self.config = config
        delimiter = config["delimiter"]
        self.choices = config["choices"].split("delimiter")

        dist = config["distribution"]
        self.random = dist["random"] if "random" in dist else False
        self.unique = dist["unique"] if "unique" in dist else False
        self.limit = dist["limit"] if "limit" in dist else 0
        
        self.used = []
    
    def next(self):
        return random.choice(self.choices)