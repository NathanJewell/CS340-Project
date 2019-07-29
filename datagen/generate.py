import yaml
from entity import Entity
import csv
import datetime
import os

def generate():
    config = None
    with open("dbconfig.yml", "r") as configFile:
        try:
            config = yaml.safe_load(configFile)
        except yaml.YAMLError as e:
            print(e)
    
    #initialize entities for the DB
    entityMap = {}
    for entity in config["db"]["entities"]:
        entityType, entityAtt = next(iter(entity.items()))
        entityMap[entityType] = Entity(entityType, entityAtt["count"])
    
    #generate data for each entity
    entityValues = {}
    for entityType, entity in entityMap.items():
        entityValues[entityType] = entity.generate()

    #export data as csv (to be imported with LOAD DATA INFILE)
    outputFolder = "./generated/output{}".format(
        datetime.datetime.now().replace(microsecond=0).isoformat()
    )
    os.mkdir(outputFolder)

    makeOutputFile = lambda et, end="csv" : "{}/{}.{}".format(
        outputFolder, et, end
    )

    formatString = ("LOAD DATA LOCAL INFILE \'{}\'"
        " INTO TABLE {}"
        " FIELDS TERMINATED BY \',\'"
        " LINES TERMINATED BY \'\\n\'"
        " IGNORE 1 LINES"
        " ({});"
    )

    formLoadStatement = lambda et, of, cols : formatString.format(
        of, #output file
        et, #entity name is table name
        ", ".join(cols)
    )

    loadStatements = []
    for et, values in entityValues.items():
        outputFile = makeOutputFile(et)
        loadStatement = formLoadStatement(et, outputFile, values[0])
        with open(outputFile, "w+") as output:
            csvWriter = csv.writer(output, delimiter=',')
            csvWriter.writerows(values)
        loadStatements.append(loadStatement)
        
    with open(makeOutputFile("load", "sql"), "w+") as sqlLoad:
        for statement in loadStatements:
            sqlLoad.write(statement)
            sqlLoad.write("\n")


if __name__=="__main__":
    generate()