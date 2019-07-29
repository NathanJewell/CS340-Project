import yaml
from types import getTypeInstance

class Entity:
    def __init__(self, typeString, count):
        config = None
        with open("./{}.yml".format(typeString), "r") as configFile:
            try:
                config = yaml.safe_load(configFile)
            except yaml.YAMLError as e:
                print(e)

        for att in config["attributes"]:
            self.attributes.append(
                getTypeInstance(att.key(), att)
            )

        

    def generate():
        entities = [self.attributes] #row one is list of attributes
        for c in self.count:
            entityProps = []
            for att in self.attributes:
                entityProps.append(att.next())

            entities.append(entityProps)
            
        return entities



            

            