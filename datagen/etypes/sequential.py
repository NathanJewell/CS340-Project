
class Sequential:
    def __init__(self, sequence):
        self.sequence = sequence        
        self.current = 0
        self.first = True

    def next(self):
        if self.first:
            self.first = False
        else:
            self.current += 1

        return self.sequence[self.current]