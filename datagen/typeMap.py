from types import *

typeMap = {
    "choice" : Choice,
    "company" : Company,
    "year" : Year,
    "fileList" : FileList,
    "number" : Number,
    "profession" : Profession,
    "street" : Street
    "reference" : Reference
}

def getTypeInstance(typeString, config):
    return typeMap[typeString.toLower()](config)
