import yaml
from etypes import *
from references import *

typeMap = {
    "choice" : Choice,
    "company" : Company,
    "year" : Year,
    "filelist" : FileList,
    "number" : Number,
    "increment" : Increment,
    "sequential" : Sequential
}

referenceMap = {
    "address_house" : address_house,
    "house_address" : house_address,
    "person_house" : person_house,
    "person_job" : person_job,
    "owner" : owner,
    "neighbor" : neighbor,
}

def getTypeInstance(typeString, config):
    return typeMap[typeString.lower()](config)

class Entity:
    def __init__(self, typeString, counts):
        self.counts = counts
        self.typeString = typeString
        self.reference = False

        config = None
        with open("./entities/{}.yml".format(typeString), "r") as configFile:
            try:
                config = yaml.safe_load(configFile)
            except yaml.YAMLError as e:
                print(e)

        self.attributeNames = []
        self.attributes = []

        if "tablereference" in config:
            self.reference = True
            keys = [list(k.keys())[0] for k in list(config["tablereference"]["keys"])]
            self.keydata = referenceMap[self.typeString](self.counts)
            self.keydata = [keys] + self.keydata
            return

        for att in config["attributes"]:
            key, props = list(att.items())[0]
            self.attributeNames.append(key)
            
            if props["type"]["class"] == "reference":
                self.attributes.append(
                    Sequential(referenceMap["{}_{}".format(
                        self.typeString,
                        props["type"]["entity"]
                    )](self.counts))
                )
            else:
                self.attributes.append(
                    getTypeInstance(props["type"]["class"], props)
                )

        
    def generate(self):
        if self.reference:
            return self.keydata

        entities = [self.attributeNames] #row one is list of attributes
        for c in range(self.counts[self.typeString]):
            entityProps = []
            for att in self.attributes:
                entityProps.append(att.next())

            entities.append(entityProps)
            
        return entities



            

            