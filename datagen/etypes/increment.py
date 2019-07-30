
class Increment:
    def __init__(self, config):
        self.type = config["type"]

        self.step = self.type["step"]
        self.start = self.type["start"] if "start" in self.type else 1
        
        self.current = self.start
        self.first = True
    def next(self):
        if self.first:
            self.first = False
            return self.current
            
        self.current += self.step
        return self.current
