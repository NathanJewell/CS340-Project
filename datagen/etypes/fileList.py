import random

class FileList:
    def __init__(self, config):
        self.type = config["type"]
        self.dist = config["distribution"]

        self.file = self.type["file"]
        self.ext = self.file.split(".")[-1] #we will only support csv and txt for now

        self.random = self.dist["random"] if "random" in self.dist else False
        self.unique = self.dist["unique"] if "unique" in self.dist else False
        self.limit = self.dist["limit"] if "limit" in self.dist else 0
        
        self.used = set()
        
        with open(self.file, "r") as data:
            self.choices = data.readlines()
            if self.ext == "csv":
                #column must be specified when loading from csv (0 indexed)
                self.choices = [line.split(",")[int(self.type["col"])] for line in self.choices]
    
    def next(self):
        choice = random.choice(self.choices)

        if self.unique:
            while choice in self.used:
                choice = self.randrange(self.min, self.max, self.step)
            self.used.add(num)
        elif self.limit != 0:
            if len(self.used) >= self.limit:
                choice = random.choice(list(self.used))
            self.used.add(choice)
        
        return choice.strip().capitalize()




