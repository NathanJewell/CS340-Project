# INSERT INTO <table> VALUES (...),(...)
import glob

loadFrom = "./generated/current/"

dataFiles = glob.glob(loadFrom + "*.csv")

statement = "INSERT INTO {} ({}) VALUES {};"
for f in dataFiles:
    table = f.split("/")[-1].split(".")[0]
    with open(f, "r") as dataFile:
        data = [l.strip() for l in dataFile.readlines()]
    
    attributes = data[0]
    data = ", ".join(["({})".format(l) for l in data[1:]])

    with open(loadFrom + table + ".sql", "w+") as insertFile:
        insertFile.write(statement.format(
            table,
            attributes,
            data
        ))


