import random 

def getRefList(counts):
    personRange = range(1, counts["person"]+1, 1)
    jobRange = range(1, counts["job"]+1, 1)

    jobRefs = []
    for person in personRange:
        job = random.choice(jobRange)
        jobRefs.append(job)

    return jobRefs
