import random

class Year:
    def __init__(self, config):
        #TODO six levels of precision
        # 0-year 1-month 2-day 3-hour 4-minute 5-second
        # right now we're just going to support years....
        pass

    def next(self):
        return random.randrange(1800, 2019, 1)