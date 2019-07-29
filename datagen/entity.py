import yaml
from etypes import *

typeMap = {
    "choice" : Choice,
    "company" : Company,
    "year" : Year,
    "filelist" : FileList,
    "number" : Number,
    "reference" : Reference
}

def getTypeInstance(typeString, config):
    return typeMap[typeString.lower()](config)

class Entity:
    def __init__(self, typeString, count):
        config = None
        with open("./entities/{}.yml".format(typeString), "r") as configFile:
            try:
                config = yaml.safe_load(configFile)
            except yaml.YAMLError as e:
                print(e)

        self.attributeNames = []
        self.attributes = []
        self.count = count

        for att in config["attributes"]:
            key, props = list(att.items())[0]
            self.attributeNames.append(key)
            self.attributes.append(
                getTypeInstance(props["type"]["class"], props)
            )
        

    def generate(self):
        entities = [self.attributeNames] #row one is list of attributes
        for c in range(self.count):
            entityProps = []
            for att in self.attributes:
                entityProps.append(att.next())

            entities.append(entityProps)
            
        return entities



            

            