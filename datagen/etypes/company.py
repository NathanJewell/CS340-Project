import random

class Company:
    def __init__(self, config):
        with open("data/adjectives.txt") as adjFile:
            self.adj = adjFile.readlines()
        with open("data/first-names.txt") as nameFile:
            self.names = nameFile.readlines()
        with open("data/occupations.txt") as occFile:
            self.occs = occFile.readlines()
    
    def next(self):
        return "{}\'s {} {}s".format(
            random.choice(self.names).strip(),
            random.choice(self.adj).strip().capitalize(),
            random.choice(self.occs).strip()
        )