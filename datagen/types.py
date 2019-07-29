from types import *

typeMap = {
    "choice" : Choice,
    "city" : City,
    "company" : Company,
    "date" : Date,
    "fileList" : FileList,
    "firstName" : FirstName,
    "lastName" : LastName,
    "number" : Number,
    "profession" : Profession,
    "street" : Street
}

def getTypeInstance(typeString, config):
    return typeMap[typeString.toLower()](config)
